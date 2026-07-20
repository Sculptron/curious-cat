#!/usr/bin/env node
// Curious Cat — confirmation batch for the two new additions: branches
// (exactly 3, mandatory emoji, on the main journey call) and the separate
// explain-it-back endpoint (varied answer quality). Smaller than the full
// reliability batches — this targets the two new features specifically,
// not general schema reliability (already proven at 95% first-attempt-clean).
//
// Usage: node batch-test-3.mjs [--concurrency N] [--out FILE]

import Anthropic from "@anthropic-ai/sdk";
import { execFileSync } from "node:child_process";
import { writeFileSync, unlinkSync } from "node:fs";
import { fillPrompt } from "./fill-prompt.mjs";
import { fillExplainItBackPrompt } from "./fill-explain-it-back-prompt.mjs";

const JOURNEY_CASES = [
  { q: "why do zebras have stripes", cal: "novice" },
  { q: "why does the moon look bigger near the horizon", cal: "seeker" },
  { q: "is capitalism the best economic system", cal: "adept" },
  { q: "why do we get hiccups", cal: "novice" },
  { q: "why did ancient Egypt build pyramids", cal: "seeker" },
  { q: "should college be free", cal: "adept" },
  { q: "why does bacon smell so good when cooking", cal: "novice" },
  { q: "how do submarines control their depth", cal: "seeker" },
  { q: "why do some languages have grammatical gender", cal: "adept" },
  { q: "why do we get déjà vu", cal: "novice" },
];

const EXPLAIN_IT_BACK_CASES = [
  {
    q: "why do zebras have stripes",
    cal: "novice",
    synthesis: "Zebra stripes work like a group camouflage trick, confusing predators about where one zebra ends and the next begins in a moving herd.",
    explanation: "The stripes make it hard for lions to tell where one zebra stops and another starts when they're all running together.",
    expectedQuality: "strong",
  },
  {
    q: "why do we get hiccups",
    cal: "novice",
    synthesis: "A hiccup is your diaphragm spasming involuntarily, then your vocal cords slamming shut right after, which makes the hic sound.",
    explanation: "I think it's just your stomach twitching randomly when you eat too fast.",
    expectedQuality: "off-target",
  },
  {
    q: "why did ancient Egypt build pyramids",
    cal: "seeker",
    synthesis: "Pyramids were built as god-scale afterlife machines, engineered to launch a pharaoh's soul into eternity, not just as tombs.",
    explanation: "They were tombs for pharaohs and also showed off how powerful Egypt was.",
    expectedQuality: "partial",
  },
  {
    q: "should college be free",
    cal: "adept",
    synthesis: "The debate isn't really about fairness versus cost — it's a disagreement about who should absorb the risk of an investment with uncertain returns: individuals, or society as a whole.",
    explanation: "It's about whether individuals or society should bear the risk of an education that might not pay off.",
    expectedQuality: "strong",
  },
  {
    q: "why do we get déjà vu",
    cal: "novice",
    synthesis: "Déjà vu is likely a brief glitch where your brain's familiarity-detection system fires before your memory-recall system catches up, so a new moment feels tagged as remembered.",
    explanation: "It's your brain remembering a dream you had.",
    expectedQuality: "off-target",
  },
];

const MAX_RETRIES = 2;

const args = process.argv.slice(2);
const concIdx = args.indexOf("--concurrency");
const concurrency = concIdx !== -1 ? Number(args[concIdx + 1]) : 4;
const outIdx = args.indexOf("--out");
const outFile = outIdx !== -1 ? args[outIdx + 1] : "batch-results-3.json";

const payloadDir = new URL(".", import.meta.url).pathname;
const client = new Anthropic();

function validateWith(script, rawText, prefix) {
  const tmpPath = `/tmp/_cc_${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}.json`;
  writeFileSync(tmpPath, rawText);
  try {
    const out = execFileSync("node", [script, tmpPath], { cwd: payloadDir, encoding: "utf8" });
    return { ok: true, out };
  } catch (e) {
    return { ok: false, reasons: (e.stderr || "").trim() };
  } finally {
    unlinkSync(tmpPath);
  }
}

async function runJourney(testCase, index) {
  const system = fillPrompt(testCase.q, testCase.cal, "none");
  const messages = [{ role: "user", content: "Generate the journey now." }];

  for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 8192,
      thinking: { type: "adaptive" },
      system,
      messages,
    });
    const rawText = response.content.filter((b) => b.type === "text").map((b) => b.text).join("");
    const result = validateWith("validate.mjs", rawText, "batch3j");

    if (result.ok) {
      let parsed = null;
      try {
        parsed = JSON.parse(rawText);
      } catch {}
      const branches = parsed?.payoff_layer?.branches ?? [];
      return {
        ...testCase,
        index,
        success: true,
        attemptsUsed: attempt,
        branchCount: branches.length,
        branchesHaveEmoji: branches.every((b) => typeof b.emoji === "string" && b.emoji.length > 0),
        branchHooks: branches.map((b) => b.hook),
      };
    }
    if (attempt === MAX_RETRIES + 1) {
      return { ...testCase, index, success: false, attemptsUsed: attempt, lastRejectReasons: result.reasons };
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

async function runExplainItBack(testCase, index) {
  const system = fillExplainItBackPrompt(testCase.q, testCase.cal, testCase.synthesis, testCase.explanation);
  const messages = [{ role: "user", content: "Give your feedback now." }];

  for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 1024,
      thinking: { type: "adaptive" },
      system,
      messages,
    });
    const rawText = response.content.filter((b) => b.type === "text").map((b) => b.text).join("");
    const result = validateWith("validate-explain-it-back.mjs", rawText, "batch3e");

    if (result.ok) {
      let parsed = null;
      try {
        parsed = JSON.parse(rawText);
      } catch {}
      return {
        ...testCase,
        index,
        success: true,
        attemptsUsed: attempt,
        mascotReactionMood: parsed?.mascot_reaction_mood,
        headline: parsed?.headline,
        feedbackText: parsed?.feedback_text,
      };
    }
    if (attempt === MAX_RETRIES + 1) {
      return { ...testCase, index, success: false, attemptsUsed: attempt, lastRejectReasons: result.reasons };
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

async function runPool(items, workerFn, poolSize, label) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      const r = await workerFn(items[i], i);
      results[i] = r;
      console.error(`[${label} ${i + 1}/${items.length}] ${r.success ? "PASS" : "FAIL"} (attempt ${r.attemptsUsed}) — ${items[i].q}`);
    }
  }
  await Promise.all(Array.from({ length: poolSize }, worker));
  return results;
}

async function main() {
  const journeyResults = await runPool(JOURNEY_CASES, runJourney, concurrency, "journey");
  const eibResults = await runPool(EXPLAIN_IT_BACK_CASES, runExplainItBack, concurrency, "eib");

  const report = {
    journey: {
      total: journeyResults.length,
      passed: journeyResults.filter((r) => r.success).length,
      branchCountAlways3: journeyResults.filter((r) => r.success).every((r) => r.branchCount === 3),
      branchesAlwaysHaveEmoji: journeyResults.filter((r) => r.success).every((r) => r.branchesHaveEmoji),
      results: journeyResults,
    },
    explainItBack: {
      total: eibResults.length,
      passed: eibResults.filter((r) => r.success).length,
      results: eibResults,
    },
  };

  writeFileSync(outFile, JSON.stringify(report, null, 2));
  console.error(`\n=== SUMMARY ===`);
  console.error(`Journey: ${report.journey.passed}/${report.journey.total} passed | branches always exactly 3: ${report.journey.branchCountAlways3} | always had emoji: ${report.journey.branchesAlwaysHaveEmoji}`);
  console.error(`Explain-it-back: ${report.explainItBack.passed}/${report.explainItBack.total} passed`);
  console.error(`Full report: ${outFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
