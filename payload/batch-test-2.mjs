#!/usr/bin/env node
// Curious Cat — post-fix confirmation batch (20 generations).
// Retests the 8 exact cases that failed in batch-test.mjs's baseline run
// (total_cards mismatch / missing is_correct), plus 12 new questions for
// continued coverage, against the hardened system-prompt.txt.
//
// Usage: node batch-test-2.mjs [--concurrency N] [--out FILE]

import Anthropic from "@anthropic-ai/sdk";
import { execFileSync } from "node:child_process";
import { writeFileSync, unlinkSync } from "node:fs";
import { fillPrompt } from "./fill-prompt.mjs";

const TEST_CASES = [
  // --- retests of the 8 baseline failures (same question + calibration) ---
  { q: "how do noise-cancelling headphones work", cal: "novice", tag: "retest: baseline failure (missing is_correct)" },
  { q: "does raising the minimum wage cause unemployment", cal: "novice", tag: "retest: baseline failure (total_cards mismatch)" },
  { q: "is nuclear power safe", cal: "seeker", tag: "retest: baseline failure (total_cards mismatch)" },
  { q: "why does time feel like it speeds up as we age", cal: "adept", tag: "retest: baseline failure (total_cards mismatch)" },
  { q: "why do we dream", cal: "adept", tag: "retest: baseline failure (missing is_correct)" },
  { q: "how does encryption keep data private", cal: "novice", tag: "retest: baseline failure (missing is_correct)" },
  { q: "how do neural networks learn", cal: "seeker", tag: "retest: baseline failure (missing is_correct)" },
  { q: "how did the printing press change society", cal: "novice", tag: "retest: baseline failure (total_cards mismatch)" },
  // --- 12 new questions for continued coverage ---
  { q: "why do we get brain freeze from eating ice cream too fast", cal: "novice", tag: "uncontested-mechanical" },
  { q: "why does glass shatter into sharp pieces instead of crumbling", cal: "seeker", tag: "uncontested-technical" },
  { q: "is intelligence mostly genetic or mostly environment", cal: "adept", tag: "adversarial: nature-vs-nurture debate" },
  { q: "why do leaves change color in autumn", cal: "novice", tag: "uncontested-mechanical" },
  { q: "why did the Roman Republic turn into an empire", cal: "seeker", tag: "adversarial: multi-cause historical debate" },
  { q: "does social media cause depression in teenagers", cal: "adept", tag: "adversarial: genuinely contested research area" },
  { q: "why does helium make your voice sound funny", cal: "novice", tag: "pop-science" },
  { q: "how do black holes form", cal: "seeker", tag: "technical" },
  { q: "why do some civilizations collapse suddenly", cal: "adept", tag: "adversarial: contested (environmental vs political vs multi-causal theories)" },
  { q: "why do we get goosebumps", cal: "novice", tag: "pop-science" },
  { q: "is artificial intelligence conscious", cal: "seeker", tag: "adversarial: genuinely open philosophical/scientific question" },
  { q: "why does inflation happen", cal: "adept", tag: "technical-economics" },
];

const MAX_RETRIES = 2;

const args = process.argv.slice(2);
const concIdx = args.indexOf("--concurrency");
const concurrency = concIdx !== -1 ? Number(args[concIdx + 1]) : 4;
const outIdx = args.indexOf("--out");
const outFile = outIdx !== -1 ? args[outIdx + 1] : "batch-results-2.json";

const payloadDir = new URL(".", import.meta.url).pathname;
const client = new Anthropic();

function validate(rawText) {
  const tmpPath = `/tmp/_cc_batch2_${Date.now()}_${Math.random().toString(36).slice(2)}.json`;
  writeFileSync(tmpPath, rawText);
  try {
    const out = execFileSync("node", ["validate.mjs", tmpPath], { cwd: payloadDir, encoding: "utf8" });
    return { ok: true, out };
  } catch (e) {
    return { ok: false, reasons: (e.stderr || "").trim() };
  } finally {
    unlinkSync(tmpPath);
  }
}

async function runOne(testCase, index) {
  const system = fillPrompt(testCase.q, testCase.cal, "none");
  const messages = [{ role: "user", content: "Generate the journey now." }];
  const attempts = [];

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
    } catch (err) {
      attempts.push({ attempt, apiError: err.message });
      return { ...testCase, index, success: false, attemptsUsed: attempt, attempts, fatalApiError: true };
    }

    const rawText = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");
    const result = validate(rawText);
    attempts.push({
      attempt,
      ok: result.ok,
      reasons: result.ok ? undefined : result.reasons,
    });

    if (result.ok) {
      let parsed = null;
      try {
        parsed = JSON.parse(rawText);
      } catch {
        // validate.mjs already confirmed this parses; defensive only
      }
      return {
        ...testCase,
        index,
        success: true,
        attemptsUsed: attempt,
        attempts,
        theme: parsed?.expedition_metadata?.assigned_visual_theme,
        totalCards: parsed?.expedition_metadata?.total_cards,
        usedSitWithIt: parsed?.journey_deck?.some((c) => c.type === "sit_with_it_card") ?? null,
      };
    }

    if (attempt === MAX_RETRIES + 1) {
      return { ...testCase, index, success: false, attemptsUsed: attempt, attempts };
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

async function runPool(items, workerFn, poolSize) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      const r = await workerFn(items[i], i);
      results[i] = r;
      const status = r.success ? `PASS (attempt ${r.attemptsUsed}/${MAX_RETRIES + 1})` : "FAIL (all attempts rejected)";
      console.error(`[${i + 1}/${items.length}] ${status} — ${items[i].q}`);
    }
  }
  await Promise.all(Array.from({ length: poolSize }, worker));
  return results;
}

async function main() {
  const startedAt = new Date().toISOString();
  const results = await runPool(TEST_CASES, runOne, concurrency);
  const finishedAt = new Date().toISOString();

  const total = results.length;
  const passedFirstTry = results.filter((r) => r.success && r.attemptsUsed === 1).length;
  const passedOnRetry = results.filter((r) => r.success && r.attemptsUsed > 1).length;
  const failedAfterAllRetries = results.filter((r) => !r.success).length;
  const firstAttemptRejections = results.filter((r) => r.attempts[0]?.ok === false).length;

  const report = {
    startedAt,
    finishedAt,
    total,
    passedFirstTry,
    passedOnRetry,
    failedAfterAllRetries,
    firstAttemptRejections,
    results,
  };

  writeFileSync(outFile, JSON.stringify(report, null, 2));

  console.error(`\n=== SUMMARY ===`);
  console.error(`Total generations: ${total}`);
  console.error(`Passed on attempt 1: ${passedFirstTry}`);
  console.error(`Passed after retry: ${passedOnRetry}`);
  console.error(`Failed after all ${MAX_RETRIES + 1} attempts: ${failedAfterAllRetries}`);
  console.error(`First-attempt rejection rate: ${firstAttemptRejections}/${total}`);
  console.error(`Full report: ${outFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
