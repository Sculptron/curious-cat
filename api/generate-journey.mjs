// Curious Cat — serverless journey-generation endpoint.
//
// This is an HTTP-shaped re-hosting of payload/generate.mjs's reject/retry
// loop, not a fork of its logic: fillPrompt() is imported unchanged from
// payload/fill-prompt.mjs, and validate.mjs is invoked exactly the way
// generate.mjs already invokes it (spawned as a subprocess against a temp
// file, same protocol). Only the orchestration shell changes, because
// generate.mjs's is a CLI loop (argv, process.exit, stdout) and this one
// has to return an HTTP response instead. Holds ANTHROPIC_API_KEY
// server-side only — never sent to the client.
import Anthropic from "@anthropic-ai/sdk";
import { execFileSync } from "node:child_process";
import { writeFileSync, unlinkSync } from "node:fs";
import { fillPrompt } from "../payload/fill-prompt.mjs";

export const config = { maxDuration: 60 };

const payloadDir = new URL("../payload/", import.meta.url).pathname;
const MAX_RETRIES = 2;

function stripFence(text) {
  const trimmed = text.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  return fenced ? fenced[1] : trimmed;
}

function validate(rawText) {
  const tmpPath = `/tmp/_cc_gen_${Date.now()}_${Math.random().toString(36).slice(2)}.json`;
  writeFileSync(tmpPath, rawText);
  try {
    const out = execFileSync(process.execPath, ["validate.mjs", tmpPath], {
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

  const { user_query, ui_calibration, calibration_context } = req.body ?? {};
  if (!user_query || !ui_calibration) {
    res.status(400).json({ error: 'Missing required fields: "user_query" and "ui_calibration"' });
    return;
  }

  let system;
  try {
    system = fillPrompt(user_query, ui_calibration, calibration_context || "none");
  } catch (e) {
    res.status(400).json({ error: e.message });
    return;
  }

  const client = new Anthropic();
  const messages = [{ role: "user", content: "Generate the journey now." }];

  for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
    let response;
    try {
      response = await client.messages.create({
        model: "claude-opus-4-8",
        max_tokens: 8192,
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
      res.status(502).json({ error: "Journey failed validation after all retries", reasons: result.reasons });
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
