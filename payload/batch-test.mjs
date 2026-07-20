#!/usr/bin/env node
// Curious Cat — 30-generation live reliability test.
// Runs a deliberately varied, partly-adversarial fixed test set through the
// same fill -> live call -> validate.mjs -> retry logic as generate.mjs,
// with limited concurrency, and writes a structured report.
//
// Usage: node batch-test.mjs [--concurrency N] [--out FILE]
//
// This exists to answer two questions with real evidence, not guesses:
// (1) roughly what fraction of live generations get rejected on the first
//     attempt, and (2) does the retry loop actually recover from a real
//     rejection, not just a hand-built fixture one.

import Anthropic from "@anthropic-ai/sdk";
import { execFileSync } from "node:child_process";
import { writeFileSync, unlinkSync } from "node:fs";
import { fillPrompt } from "./fill-prompt.mjs";

const TEST_CASES = [
  { q: "why does soda go flat", cal: "novice", tag: "uncontested-mechanical" },
  { q: "how do vaccines cause immunity", cal: "seeker", tag: "uncontested-mechanical" },
  { q: "why is the sky blue", cal: "adept", tag: "uncontested-mechanical" },
  { q: "how do noise-cancelling headphones work", cal: "novice", tag: "uncontested-technical" },
  { q: "why is yawning contagious", cal: "seeker", tag: "adversarial: mild scientific uncertainty (mirror-neuron/empathy theory vs alternatives) — should NOT trigger sit_with_it_card" },
  { q: "why did the Roman Empire fall", cal: "adept", tag: "adversarial: classic multi-cause historical debate" },
  { q: "does raising the minimum wage cause unemployment", cal: "novice", tag: "adversarial: real contested economics debate" },
  { q: "is nuclear power safe", cal: "seeker", tag: "adversarial: politically charged, false-balance risk" },
  { q: "what causes economic recessions", cal: "adept", tag: "adversarial: contested economics (Keynesian vs monetarist vs real-business-cycle)" },
  { q: "is free will real", cal: "novice", tag: "adversarial: abstract philosophical debate, emoji-omission stress test" },
  { q: "what is consciousness", cal: "seeker", tag: "abstract-genuinely-mysterious-not-policy-contested" },
  { q: "why does time feel like it speeds up as we age", cal: "adept", tag: "repeat-of-known-fixture (consistency check against prior novel-question test)" },
  { q: "is math discovered or invented", cal: "novice", tag: "adversarial: genuinely disputed among philosophers/mathematicians" },
  { q: "is a virus alive or not alive", cal: "seeker", tag: "adversarial: real edge-case biology debate" },
  { q: "why do we dream", cal: "adept", tag: "adversarial: multiple competing scientific theories, none proven" },
  { q: "how does encryption keep data private", cal: "novice", tag: "technical" },
  { q: "why do batteries degrade over time", cal: "seeker", tag: "technical" },
  { q: "how does GPS calculate your location", cal: "adept", tag: "technical" },
  { q: "why is compound interest so powerful", cal: "novice", tag: "technical-numeric" },
  { q: "how do neural networks learn", cal: "seeker", tag: "technical" },
  { q: "why did the Berlin Wall fall", cal: "adept", tag: "historical" },
  { q: "how did the printing press change society", cal: "novice", tag: "historical" },
  { q: "why did Japan close itself off during the Edo period", cal: "seeker", tag: "historical" },
  { q: "what caused World War 1", cal: "adept", tag: "adversarial: classic multi-cause historical debate" },
  { q: "why did the Soviet Union collapse", cal: "novice", tag: "adversarial: historians still disagree on the primary cause" },
  { q: "why does popcorn pop", cal: "seeker", tag: "pop-science" },
  { q: "why do onions make you cry", cal: "adept", tag: "pop-science" },
  { q: "why does coffee make you need to pee", cal: "novice", tag: "pop-science" },
  { q: "why do cats purr", cal: "seeker", tag: "adversarial: mechanism/purpose still debated among biologists" },
  { q: "why does music give people chills", cal: "adept", tag: "pop-science-neuroscience" },
];

const MAX_RETRIES = 2;

const args = process.argv.slice(2);
const concIdx = args.indexOf("--concurrency");
const concurrency = concIdx !== -1 ? Number(args[concIdx + 1]) : 4;
const outIdx = args.indexOf("--out");
const outFile = outIdx !== -1 ? args[outIdx + 1] : "batch-results.json";

const payloadDir = new URL(".", import.meta.url).pathname;
const client = new Anthropic();

function validate(rawText) {
  const tmpPath = `/tmp/_cc_batch_${Date.now()}_${Math.random().toString(36).slice(2)}.json`;
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
