#!/usr/bin/env node
// Fills the system-prompt template for one journey request.
// Usage: node fill-prompt.mjs "<user question>" <ui_calibration: novice|seeker|adept> ["<calibration context>"]
// Prints the filled prompt to stdout — pipe it into the model call.

import { readFileSync } from "node:fs";
import { toModelCalibration } from "./calibration-map.mjs";

const [question, uiLevel, context = "none"] = process.argv.slice(2);
if (!question || !uiLevel) {
  console.error('Usage: node fill-prompt.mjs "<question>" <novice|seeker|adept> ["<context>"]');
  process.exit(1);
}

const enums = JSON.parse(readFileSync(new URL("./enums.draft.json", import.meta.url), "utf8"));
const template = readFileSync(new URL("./system-prompt.txt", import.meta.url), "utf8");

const filled = template
  .replaceAll("{{user_query}}", question)
  .replaceAll("{{calibration_level}}", toModelCalibration(uiLevel))
  .replaceAll("{{calibration_context}}", context)
  .replaceAll("{{semantic_theme_enum}}", JSON.stringify(enums.semantic_theme_enum.values))
  .replaceAll("{{mascot_mood_enum}}", JSON.stringify(enums.mascot_mood_enum.values));

process.stdout.write(filled);
