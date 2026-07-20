#!/usr/bin/env node
// Curious Cat — explain-it-back feedback validator.
// Cheap structural pass, no model call, no dependencies beyond the shared
// validation helpers also used by validate.mjs.
// Usage: node validate-explain-it-back.mjs <response.json>   (or pipe via stdin)
// Exit 0 = valid, exit 1 = rejected (reasons on stderr) → caller should retry.

import { readFileSync } from "node:fs";
import { checkText, checkMood } from "./validation-helpers.mjs";

const enums = JSON.parse(readFileSync(new URL("./enums.json", import.meta.url), "utf8"));
const MOODS = enums.mascot_mood_enum.values;

const raw = readFileSync(process.argv[2] ?? 0, "utf8");
const errors = [];
const warnings = [];

let text = raw.trim();
const fenced = text.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
if (fenced) {
  warnings.push("output was wrapped in a markdown code fence (prompt forbids this) — stripped before parsing");
  text = fenced[1];
}

let data;
try {
  data = JSON.parse(text);
} catch (e) {
  console.error(`REJECT: invalid JSON: ${e.message}`);
  process.exit(1);
}

if (typeof data.headline !== "string") errors.push("headline: missing or not a string");
if (typeof data.feedback_text !== "string") errors.push("feedback_text: missing or not a string");
else checkText(errors, warnings, "feedback_text", data.feedback_text);
checkMood(errors, MOODS, "mascot_reaction_mood", data.mascot_reaction_mood);

warnings.forEach((w) => console.error(`WARN: ${w}`));
if (errors.length) {
  errors.forEach((e) => console.error(`REJECT: ${e}`));
  process.exit(1);
}
console.log(`OK: mood "${data.mascot_reaction_mood}", ${warnings.length} warning(s)`);
