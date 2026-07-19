#!/usr/bin/env node
// Curious Cat — journey payload validator (blueprint handoff checklist, item 3)
// Cheap structural pass, no model call, no dependencies.
// Usage: node validate.mjs <journey.json>   (or pipe JSON via stdin)
// Exit 0 = valid, exit 1 = rejected (reasons on stderr) → caller should retry the generation.

import { readFileSync } from "node:fs";

const enums = JSON.parse(readFileSync(new URL("./enums.draft.json", import.meta.url), "utf8"));
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

// (c) double-escaped asterisks / unicode escapes that survive parsing.
// Note: a single “ in raw JSON parses to a normal quote character and is
// harmless; the failure mode is the DOUBLE escape, which parses to a literal
// backslash sequence in the string the UI renders. So we check parsed strings.
function checkText(path, s) {
  if (/\\\*\\\*/.test(s)) errors.push(`${path}: double-escaped bold markers (\\*\\*) — will render broken on screen`);
  if (/\\u[0-9a-fA-F]{4}/.test(s)) errors.push(`${path}: literal unicode escape sequence leaked into display text`);
  // (d) markdown outside the bold-only subset
  if (/(^|\n)\s*(#{1,6}\s|>\s|-\s|\*\s(?!\*)|\d+\.\s)/.test(s)) errors.push(`${path}: forbidden markdown (header/blockquote/list) — frontend parser is bold-only`);
  if (/`[^`]+`/.test(s)) errors.push(`${path}: inline code markdown is forbidden`);
  const bolds = (s.match(/\*\*[^*]+\*\*/g) || []).length;
  if (bolds > 2) warnings.push(`${path}: ${bolds} bold spans (blueprint says at most 1-2 per card)`);
  if ((s.match(/\*\*/g) || []).length % 2 !== 0) errors.push(`${path}: unbalanced ** bold markers`);
}

function req(obj, path, key, type) {
  const v = obj?.[key];
  const ok =
    type === "array" ? Array.isArray(v) :
    type === "integer" ? Number.isInteger(v) :
    typeof v === type;
  if (!ok) errors.push(`${path}.${key}: missing or not a ${type}`);
  return ok ? v : undefined;
}

function checkOptions(card, path, { min, max, feedbackPerOption = false }) {
  const opts = req(card, path, "options", "array") ?? [];
  if (opts.length < min || opts.length > max) errors.push(`${path}.options: expected ${min}-${max} options, got ${opts.length}`);
  let correct = 0;
  opts.forEach((o, i) => {
    req(o, `${path}.options[${i}]`, "id", "string");
    req(o, `${path}.options[${i}]`, "label", "string");
    if (typeof o.is_correct !== "boolean") errors.push(`${path}.options[${i}].is_correct: missing or not boolean`);
    if (o.is_correct === true) correct++;
    // emoji is optional (Strategist ruling: omit rather than force weak matches).
    // Absent or null is fine; if present it must be one emoji, not text or several.
    if (o.emoji !== undefined && o.emoji !== null) {
      if (typeof o.emoji !== "string" || o.emoji.length === 0) {
        errors.push(`${path}.options[${i}].emoji: must be a non-empty string or omitted`);
      } else if ([...new Intl.Segmenter().segment(o.emoji)].length > 1 || /^[\x00-\x7F]+$/.test(o.emoji)) {
        errors.push(`${path}.options[${i}].emoji: "${o.emoji}" is not a single emoji character`);
      }
    }
  });
  if (correct !== 1) errors.push(`${path}.options: exactly one option must have is_correct=true, found ${correct}`);
}

function checkMood(path, mood) {
  if (typeof mood !== "string") errors.push(`${path}: missing mood`);
  else if (!MOODS.includes(mood)) errors.push(`${path}: mood "${mood}" not in mascot_mood_enum [${MOODS.join(", ")}] — frontend has no asset to render`);
}

function fail(errs) {
  errs.forEach((e) => console.error(`REJECT: ${e}`));
  process.exit(1);
}

// ---- expedition_metadata ----
const meta = journey.expedition_metadata;
if (!meta || typeof meta !== "object") errors.push("expedition_metadata: missing");
else {
  req(meta, "expedition_metadata", "user_query", "string");
  if (!CALIBRATIONS.includes(meta.calibration_level)) errors.push(`expedition_metadata.calibration_level: "${meta.calibration_level}" not one of ${CALIBRATIONS.join("/")}`);
  if (!THEMES.includes(meta.assigned_visual_theme)) errors.push(`expedition_metadata.assigned_visual_theme: "${meta.assigned_visual_theme}" not in semantic_theme_enum — no cached asset set to route to`);
  req(meta, "expedition_metadata", "total_cards", "integer");
}

// ---- journey_deck ----
const deck = Array.isArray(journey.journey_deck) ? journey.journey_deck : (errors.push("journey_deck: missing or not an array"), []);
if (meta && Number.isInteger(meta.total_cards) && meta.total_cards !== deck.length)
  errors.push(`expedition_metadata.total_cards (${meta.total_cards}) != journey_deck length (${deck.length})`);

deck.forEach((card, i) => {
  const p = `journey_deck[${i}]`;
  req(card, p, "card_id", "string");
  if (!CARD_TYPES.includes(card.type)) { errors.push(`${p}.type: unknown card type "${card.type}"`); return; }
  // Strategist ruling on §3.3: layout is a frontend concern, dropped from the model contract.
  // Tolerated if emitted (harmless extra field) but warned, so model drift stays visible.
  if ("interaction_layout" in card) warnings.push(`${p}.interaction_layout: field removed from schema (frontend hardcodes layout per card type) — model should not emit it`);

  if (card.type === "concept_card") {
    req(card, p, "act_title", "string");
    req(card, p, "heading", "string");
    const body = req(card, p, "body_markdown", "array") ?? [];
    if (body.length === 0) errors.push(`${p}.body_markdown: empty`);
    body.forEach((s, j) => typeof s === "string" ? checkText(`${p}.body_markdown[${j}]`, s) : errors.push(`${p}.body_markdown[${j}]: not a string`));
    checkMood(`${p}.mascot_state.mood`, card.mascot_state?.mood);
    if (card.mascot_state?.position !== "progress_bar") errors.push(`${p}.mascot_state.position: must be "progress_bar"`);
  }

  if (card.type === "predict_card") {
    req(card, p, "heading", "string");
    checkOptions(card, p, { min: 2, max: 3 });
    checkMood(`${p}.reveal_payload.mascot_reaction_mood`, card.reveal_payload?.mascot_reaction_mood);
    const ft = card.reveal_payload?.feedback_text;
    typeof ft === "string" ? checkText(`${p}.reveal_payload.feedback_text`, ft) : errors.push(`${p}.reveal_payload.feedback_text: missing`);
  }

  if (card.type === "checkpoint_card") {
    req(card, p, "heading", "string");
    checkOptions(card, p, { min: 2, max: 2 });
    const cf = req(card, p, "correct_feedback", "string");
    const inf = req(card, p, "incorrect_feedback", "string");
    if (cf) checkText(`${p}.correct_feedback`, cf);
    if (inf) {
      checkText(`${p}.incorrect_feedback`, inf);
      if (/^\s*(wrong|incorrect)[.!]?\s*$/i.test(inf)) errors.push(`${p}.incorrect_feedback: bare "wrong/incorrect" — must be warm and specific`);
    }
  }

  if (card.type === "sit_with_it_card") {
    req(card, p, "heading", "string");
    for (const side of ["perspective_left", "perspective_right"]) {
      req(card[side] ?? {}, `${p}.${side}`, "title", "string");
      const sum = req(card[side] ?? {}, `${p}.${side}`, "summary", "string");
      if (sum) checkText(`${p}.${side}.summary`, sum);
    }
    const syn = req(card, p, "synthesis_payload", "string");
    if (syn) checkText(`${p}.synthesis_payload`, syn);
  }
});

// ---- payoff_layer ----
const payoff = journey.payoff_layer;
if (!payoff || typeof payoff !== "object") errors.push("payoff_layer: missing");
else {
  req(payoff, "payoff_layer", "explain_it_back_prompt", "string");
  const mint = payoff.mint_card;
  if (!mint || typeof mint !== "object") errors.push("payoff_layer.mint_card: missing");
  else {
    req(mint, "payoff_layer.mint_card", "title", "string");
    req(mint, "payoff_layer.mint_card", "category", "string");
    const syn = req(mint, "payoff_layer.mint_card", "shareable_synthesis", "string");
    if (syn) checkText("payoff_layer.mint_card.shareable_synthesis", syn);
  }
}

warnings.forEach((w) => console.error(`WARN: ${w}`));
if (errors.length) fail(errors);
console.log(`OK: ${deck.length} cards, theme "${meta?.assigned_visual_theme}", ${warnings.length} warning(s)`);
