#!/usr/bin/env node
// End-to-end reject/retry loop, exercised for real (not simulated).
// Reads raw model output from stdin (unmodified — including any code fence,
// double-escaping, etc. the model actually produced), validates it, and on
// rejection prints the retry prompt to append to a second model call.
//
// Usage:  <raw model stdout> | node generate-and-validate.mjs [--retry-prompt-out FILE]
//
// This does NOT call the model itself — this repo has no model API wiring.
// It is the validation half of the loop, built to run against real,
// unedited model output so the fence-strip and rejection paths are
// exercised on live data rather than hand-cleaned fixtures.

import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  writeFileSync("/tmp/_cc_raw_output.json", raw);
  try {
    const out = execFileSync("node", ["validate.mjs", "/tmp/_cc_raw_output.json"], {
      cwd: new URL(".", import.meta.url).pathname,
      encoding: "utf8",
    });
    process.stdout.write(out);
    process.exit(0);
  } catch (e) {
    const reasons = (e.stderr || "").trim();
    console.error(reasons);
    const retryPromptOutIdx = process.argv.indexOf("--retry-prompt-out");
    const retryAddendum =
      "\n\nYour previous output was rejected by the validator for the following reasons:\n" +
      reasons +
      "\n\nFix every listed issue and return ONLY the corrected JSON object — no preamble, no code fences.";
    if (retryPromptOutIdx !== -1) {
      writeFileSync(process.argv[retryPromptOutIdx + 1], retryAddendum);
    } else {
      process.stderr.write("\n--- retry addendum (append to original prompt for the retry call) ---\n" + retryAddendum + "\n");
    }
    process.exit(1);
  }
});
