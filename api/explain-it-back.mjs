// Curious Cat — serverless "explain it back" feedback endpoint.
//
// Same relationship to payload/generate-explain-it-back.mjs that
// generate-journey.mjs has to generate.mjs: fillExplainItBackPrompt() is
// imported unchanged, validate-explain-it-back.mjs is invoked exactly as
// generate-explain-it-back.mjs already invokes it, and only the CLI-only
// orchestration shell is re-hosted as an HTTP handler.
import Anthropic from "@anthropic-ai/sdk";
import { execFileSync } from "node:child_process";
import { writeFileSync, unlinkSync } from "node:fs";
import { fillExplainItBackPrompt } from "../payload/fill-explain-it-back-prompt.mjs";

export const config = { maxDuration: 30 };

const payloadDir = new URL("../payload/", import.meta.url).pathname;
const MAX_RETRIES = 2;

function stripFence(text) {
  const trimmed = text.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  return fenced ? fenced[1] : trimmed;
}

function validate(rawText) {
  const tmpPath = `/tmp/_cc_eib_${Date.now()}_${Math.random().toString(36).slice(2)}.json`;
  writeFileSync(tmpPath, rawText);
  try {
    const out = execFileSync(process.execPath, ["validate-explain-it-back.mjs", tmpPath], {
      cwd: payloadDir,
      encoding: "utf8",
    });
    return { ok: true, out };
  } catch (e) {
    return { ok: false, reasons: (e.stderr || "").trim() };
  } finally {
    unlinkSync(tmpPath);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { user_query, ui_calibration, shareable_synthesis, user_explanation } = req.body ?? {};
  if (!user_query || !ui_calibration || !shareable_synthesis || !user_explanation) {
    res.status(400).json({
      error:
        'Missing required fields: "user_query", "ui_calibration", "shareable_synthesis", and "user_explanation" are all required',
    });
    return;
  }

  let system;
  try {
    system = fillExplainItBackPrompt(user_query, ui_calibration, shareable_synthesis, user_explanation);
  } catch (e) {
    res.status(400).json({ error: e.message });
    return;
  }

  const client = new Anthropic();
  const messages = [{ role: "user", content: "Give your feedback now." }];

  for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
    let response;
    try {
      response = await client.messages.create({
        model: "claude-opus-4-8",
        max_tokens: 1024,
        thinking: { type: "adaptive" },
        system,
        messages,
      });
    } catch (e) {
      res.status(502).json({ error: `Claude API call failed: ${e.message}` });
      return;
    }

    const rawText = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("");

    const result = validate(rawText);

    if (result.ok) {
      res.status(200).json(JSON.parse(stripFence(rawText)));
      return;
    }

    if (attempt === MAX_RETRIES + 1) {
      res.status(502).json({ error: "Feedback failed validation after all retries", reasons: result.reasons });
      return;
    }

    messages.push({ role: "assistant", content: response.content });
    messages.push({
      role: "user",
      content:
        "Your previous output was rejected by the validator for the following reasons:\n" +
        result.reasons +
        "\n\nFix every listed issue and return ONLY the corrected JSON object — no preamble, no code fences.",
    });
  }
}
