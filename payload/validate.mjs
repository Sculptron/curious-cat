#!/usr/bin/env node
// Curious Cat — journey payload validator (blueprint handoff checklist, item 3)
// Cheap structural pass, no model call, no dependencies.
// Usage: node validate.mjs <journey.json>   (or pipe JSON via stdin)
// Exit 0 = valid, exit 1 = rejected (reasons on stderr) → caller should retry the generation.

import { readFileSync } from "node:fs";
import { checkText, req, checkMood, checkEmoji } from "./validation-helpers.mjs";

const enums = JSON.parse(readFileSync(new URL("./enums.json", import.meta.url), "utf8"));
const THEMES = enums.semantic_theme_enum.values;
const MOODS = enums.mascot_mood_enum.values;
const CALIBRATIONS = ["fresh", "mid", "deep"];
const CARD_TYPES = ["concept_card", "predict_card", "checkpoint_card", "sit_with_it_card"];

const raw = readFileSync(process.argv[2] ?? 0, "utf8");
const errors = [];
const warnings = [];

// (a) valid JSON — also strip accidental code fences, a known LLM failure mode
let text = raw.trim();
const fenced = text.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
if (fenced) {
  warnings.push("output was wrapped in a markdown code fence (prompt forbids this) — stripped before parsing");
  text = fenced[1];
}
let journey;
try {
  journey = JSON.parse(text);
} catch (e) {
  fail([`invalid JSON: ${e.message}`]);
}

function checkOptions(card, path, { min, max }) {
  const opts = req(errors, card, path, "options", "array") ?? [];
  if (opts.length < min || opts.length > max) errors.push(`${path}.options: expected ${min}-${max} options, got ${opts.length}`);
  let correct = 0;
  opts.forEach((o, i) => {
    req(errors, o, `${path}.options[${i}]`, "id", "string");
    req(errors, o, `${path}.options[${i}]`, "label", "string");
    if (typeof o.is_correct !== "boolean") errors.push(`${path}.options[${i}].is_correct: missing or not boolean`);
    if (o.is_correct === true) correct++;
    // emoji is optional (Strategist ruling: omit rather than force weak matches)
    checkEmoji(errors, `${path}.options[${i}].emoji`, o.emoji, { required: false });
  });
  if (correct !== 1) errors.push(`${path}.options: exactly one option must have is_correct=true, found ${correct}`);
}

function checkBranches(payoff) {
  const branches = req(errors, payoff, "payoff_layer", "branches", "array") ?? [];
  if (branches.length !== 3) errors.push(`payoff_layer.branches: expected exactly 3 branches, got ${branches.length}`);
  branches.forEach((b, i) => {
    const p = `payoff_layer.branches[${i}]`;
    req(errors, b, p, "hook", "string");
    req(errors, b, p, "category", "string");
    // emoji is mandatory on branches (Strategist ruling: always 3 concrete,
    // launchable questions, not abstract debate positions — much lower risk
    // of a weak forced match than sit_with_it options)
    checkEmoji(errors, `${p}.emoji`, b?.emoji, { required: true });
  });
}

function checkMoodField(path, mood) {
  checkMood(errors, MOODS, path, mood);
}

function fail(errs) {
  errs.forEach((e) => console.error(`REJECT: ${e}`));
  process.exit(1);
}

// ---- expedition_metadata ----
const meta = journey.expedition_metadata;
if (!meta || typeof meta !== "object") errors.push("expedition_metadata: missing");
else {
  req(errors, meta, "expedition_metadata", "user_query", "string");
  if (!CALIBRATIONS.includes(meta.calibration_level)) errors.push(`expedition_metadata.calibration_level: "${meta.calibration_level}" not one of ${CALIBRATIONS.join("/")}`);
  if (!THEMES.includes(meta.assigned_visual_theme)) errors.push(`expedition_metadata.assigned_visual_theme: "${meta.assigned_visual_theme}" not in semantic_theme_enum — no cached asset set to route to`);
  req(errors, meta, "expedition_metadata", "total_cards", "integer");
}

// ---- journey_deck ----
const deck = Array.isArray(journey.journey_deck) ? journey.journey_deck : (errors.push("journey_deck: missing or not an array"), []);
if (meta && Number.isInteger(meta.total_cards) && meta.total_cards !== deck.length)
  errors.push(`expedition_metadata.total_cards (${meta.total_cards}) != journey_deck length (${deck.length})`);

deck.forEach((card, i) => {
  const p = `journey_deck[${i}]`;
  req(errors, card, p, "card_id", "string");
  if (!CARD_TYPES.includes(card.type)) { errors.push(`${p}.type: unknown card type "${card.type}"`); return; }
  // Strategist ruling on §3.3: layout is a frontend concern, dropped from the model contract.
  // Tolerated if emitted (harmless extra field) but warned, so model drift stays visible.
  if ("interaction_layout" in card) warnings.push(`${p}.interaction_layout: field removed from schema (frontend hardcodes layout per card type) — model should not emit it`);

  if (card.type === "concept_card") {
    req(errors, card, p, "act_title", "string");
    req(errors, card, p, "heading", "string");
    const body = req(errors, card, p, "body_markdown", "array") ?? [];
    if (body.length === 0) errors.push(`${p}.body_markdown: empty`);
    body.forEach((s, j) => typeof s === "string" ? checkText(errors, warnings, `${p}.body_markdown[${j}]`, s) : errors.push(`${p}.body_markdown[${j}]: not a string`));
    checkMoodField(`${p}.mascot_state.mood`, card.mascot_state?.mood);
    if (card.mascot_state?.position !== "progress_bar") errors.push(`${p}.mascot_state.position: must be "progress_bar"`);
  }

  if (card.type === "predict_card") {
    req(errors, card, p, "heading", "string");
    checkOptions(card, p, { min: 2, max: 3 });
    checkMoodField(`${p}.reveal_payload.mascot_reaction_mood`, card.reveal_payload?.mascot_reaction_mood);
    const ft = card.reveal_payload?.feedback_text;
    typeof ft === "string" ? checkText(errors, warnings, `${p}.reveal_payload.feedback_text`, ft) : errors.push(`${p}.reveal_payload.feedback_text: missing`);
  }

  if (card.type === "checkpoint_card") {
    req(errors, card, p, "heading", "string");
    checkOptions(card, p, { min: 2, max: 2 });
    const cf = req(errors, card, p, "correct_feedback", "string");
    const inf = req(errors, card, p, "incorrect_feedback", "string");
    if (cf) checkText(errors, warnings, `${p}.correct_feedback`, cf);
    if (inf) {
      checkText(errors, warnings, `${p}.incorrect_feedback`, inf);
      if (/^\s*(wrong|incorrect)[.!]?\s*$/i.test(inf)) errors.push(`${p}.incorrect_feedback: bare "wrong/incorrect" — must be warm and specific`);
    }
  }

  if (card.type === "sit_with_it_card") {
    req(errors, card, p, "heading", "string");
    for (const side of ["perspective_left", "perspective_right"]) {
      req(errors, card[side] ?? {}, `${p}.${side}`, "title", "string");
      const sum = req(errors, card[side] ?? {}, `${p}.${side}`, "summary", "string");
      if (sum) checkText(errors, warnings, `${p}.${side}.summary`, sum);
    }
    const syn = req(errors, card, p, "synthesis_payload", "string");
    if (syn) checkText(errors, warnings, `${p}.synthesis_payload`, syn);
  }
});

// ---- payoff_layer ----
const payoff = journey.payoff_layer;
if (!payoff || typeof payoff !== "object") errors.push("payoff_layer: missing");
else {
  req(errors, payoff, "payoff_layer", "explain_it_back_prompt", "string");
  checkBranches(payoff);
  const mint = payoff.mint_card;
  if (!mint || typeof mint !== "object") errors.push("payoff_layer.mint_card: missing");
  else {
    req(errors, mint, "payoff_layer.mint_card", "title", "string");
    req(errors, mint, "payoff_layer.mint_card", "category", "string");
    const syn = req(errors, mint, "payoff_layer.mint_card", "shareable_synthesis", "string");
    if (syn) checkText(errors, warnings, "payoff_layer.mint_card.shareable_synthesis", syn);
  }
}

warnings.forEach((w) => console.error(`WARN: ${w}`));
if (errors.length) fail(errors);
console.log(`OK: ${deck.length} cards, theme "${meta?.assigned_visual_theme}", ${warnings.length} warning(s)`);
