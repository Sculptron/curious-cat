#!/usr/bin/env node
// Curious Cat — live "explain it back" feedback generation with reject/retry.
// Usage: node generate-explain-it-back.mjs "<question>" <novice|seeker|adept> "<shareable synthesis>" "<user explanation>" [--max-retries N]
//
// Calls the real Claude Messages API with the filled explain-it-back
// prompt, validates the raw output, and retries with rejection reasons
// appended on failure — same pattern as generate.mjs, sized for a much
// smaller response.

import Anthropic from "@anthropic-ai/sdk";
import { execFileSync } from "node:child_process";
import { writeFileSync, unlinkSync } from "node:fs";
import { fillExplainItBackPrompt } from "./fill-explain-it-back-prompt.mjs";

const args = process.argv.slice(2);
const retriesFlagIdx = args.indexOf("--max-retries");
const maxRetries = retriesFlagIdx !== -1 ? Number(args[retriesFlagIdx + 1]) : 2;
const positional =
  retriesFlagIdx === -1
    ? args
    : args.filter((_, i) => i !== retriesFlagIdx && i !== retriesFlagIdx + 1);
const [question, uiLevel, shareableSynthesis, userExplanation] = positional;

if (!question || !uiLevel || !shareableSynthesis || !userExplanation) {
  console.error(
    'Usage: node generate-explain-it-back.mjs "<question>" <novice|seeker|adept> "<shareable synthesis>" "<user explanation>" [--max-retries N]'
  );
  process.exit(1);
}

const payloadDir = new URL(".", import.meta.url).pathname;

function validate(rawText) {
  const tmpPath = `/tmp/_cc_eib_${Date.now()}_${Math.random().toString(36).slice(2)}.json`;
  writeFileSync(tmpPath, rawText);
  try {
    const out = execFileSync("node", ["validate-explain-it-back.mjs", tmpPath], {
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

async function run() {
  const client = new Anthropic();
  const system = fillExplainItBackPrompt(question, uiLevel, shareableSynthesis, userExplanation);
  const messages = [{ role: "user", content: "Give your feedback now." }];

  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 1024,
      thinking: { type: "adaptive" },
      system,
      messages,
    });

    const rawText = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("");

    const result = validate(rawText);

    if (result.ok) {
      process.stdout.write(rawText.trim() + "\n");
      console.error(`\n--- validated OK on attempt ${attempt}/${maxRetries + 1} ---`);
      console.error(result.out.trim());
      return;
    }

    console.error(`--- attempt ${attempt}/${maxRetries + 1} REJECTED ---`);
    console.error(result.reasons);

    if (attempt === maxRetries + 1) {
      console.error(`\nGiving up after ${maxRetries + 1} attempts.`);
      process.exit(1);
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

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
