#!/usr/bin/env node
// Fills the explain-it-back template for one feedback request.
// Usage: node fill-explain-it-back-prompt.mjs "<question>" <novice|seeker|adept> "<shareable synthesis>" "<user explanation>"
// Prints the filled prompt to stdout — pipe it into the model call.

import { readFileSync } from "node:fs";
import { toModelCalibration } from "./calibration-map.mjs";

export function fillExplainItBackPrompt(question, uiLevel, shareableSynthesis, userExplanation) {
  const enums = JSON.parse(readFileSync(new URL("./enums.json", import.meta.url), "utf8"));
  const template = readFileSync(new URL("./explain-it-back-prompt.txt", import.meta.url), "utf8");

  return template
    .replaceAll("{{user_query}}", question)
    .replaceAll("{{calibration_level}}", toModelCalibration(uiLevel))
    .replaceAll("{{shareable_synthesis}}", shareableSynthesis)
    .replaceAll("{{user_explanation}}", userExplanation)
    .replaceAll("{{mascot_mood_enum}}", JSON.stringify(enums.mascot_mood_enum.values));
}

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const [question, uiLevel, shareableSynthesis, userExplanation] = process.argv.slice(2);
  if (!question || !uiLevel || !shareableSynthesis || !userExplanation) {
    console.error(
      'Usage: node fill-explain-it-back-prompt.mjs "<question>" <novice|seeker|adept> "<shareable synthesis>" "<user explanation>"'
    );
    process.exit(1);
  }
  process.stdout.write(fillExplainItBackPrompt(question, uiLevel, shareableSynthesis, userExplanation));
}
