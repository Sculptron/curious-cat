To: Chief Strategist
From: Backend/API Engineer
Re: Serverless Endpoint Build Report — Live Deployment Status & Items Requiring Your Attention

---

## 1. Context Absorbed

Before building, I read the Product Brief, the System Prompt Blueprint, the AI Engineer's full `payload/` directory (system prompt, fill/validate scripts, calibration mapping, enums, `HANDOFF-REPORT.md`), and the Frontend Engineer's integration seams in `app/src/lib/` and `app/src/types/journey.ts`. The problem statement was narrow and specific: journey generation and explain-it-back only ran as local Node scripts holding the Anthropic key in a shell environment variable — correct for testing, but unshippable, since a key in browser-side code can be read by anyone who opens dev tools. Nothing in the app could safely call Claude from an actual browser. That gap is now closed.

## 2. What Is Built and Verified

**a. `api/generate-journey.mjs` and `api/explain-it-back.mjs`** — Vercel Node.js serverless functions. Each holds `ANTHROPIC_API_KEY` server-side only. Neither forks the AI Engineer's logic: `fillPrompt()` / `fillExplainItBackPrompt()` are imported unchanged from `payload/`, and `validate.mjs` / `validate-explain-it-back.mjs` are invoked exactly the way the AI Engineer's own `generate.mjs` / `generate-explain-it-back.mjs` already invoke them — spawned as a subprocess against a temp file, same protocol, zero modification to either validator. The only thing that's genuinely new code is the retry-loop orchestration, rewritten as an HTTP handler instead of a CLI loop, because `generate.mjs` itself parses `argv` and calls `process.exit()` — it isn't importable as a function as-is, and I flagged that distinction rather than quietly forking its internals.

**b. Root `package.json` + `vercel.json`** — installs `@anthropic-ai/sdk` for the functions, points the build at `app/` (`app/dist` as output), and sets `maxDuration: 60` on the functions plus `includeFiles: "payload/**"` so the enum/prompt/asset JSON files `payload/` reads at runtime actually ship with the deployed function bundle.

**c. Frontend seams rewired.** `app/src/lib/journeySource.ts` and `explainItBack.ts` — previously local fixtures/heuristics — now `fetch()` the real endpoints. `listSparkPrompts()` was left untouched (unrelated static data, not part of the seam).

**d. A real gap found and fixed, not just wrapped.** `getJourney(query)` never actually received a calibration level — `App.tsx` tracked `calibration` state but never passed it anywhere, so the seam had nothing to calibrate against once it started making a real call that needed one. I widened the seam's signature and threaded `calibration` from `App.tsx` through to both `getJourney()` and, as a new prop, into `ExplainItBackScreen` (which needs the UI-vocabulary `novice/seeker/adept`, not the model-vocabulary `fresh/mid/deep` already baked into the `Journey` object — `calibration-map.mjs` only maps one direction, so the journey's stored value can't be reverse-mapped).

**e. Verification — real, live Claude calls, not simulated.** Before reporting anything working, I invoked both handler functions directly with mock request objects against the real Anthropic API: a journey generation ("why do onions make you cry?") validated clean on attempt 1/3; a real explain-it-back call returned correct `celebrating` feedback for a strong answer. Error paths (missing fields, invalid calibration enum, wrong HTTP method) all returned the correct status codes and messages. `tsc -b`, `oxlint`, and `vite build` all pass clean on the frontend changes.

**f. Live in production, confirmed by the Strategist directly** — after deployment, three different real user prompts were run against the live Vercel URL and all three completed the full loop successfully.

## 3. Items Requiring Your Attention — Flagged, Not Silently Resolved

**3.1 Deployment Protection was on by default, now off for Production.** Vercel's "Vercel Authentication" setting was gating the public URL behind a login/access-request flow, which is why early sharers were prompted to sign up and request access. I walked the Strategist through disabling it for Production only (Preview deployments remain protected, which is the right default — those are your own in-progress branches).

**3.2 No usage cap or rate limit exists on either endpoint.** Anyone holding the production link can trigger a real, billed Claude call just by typing a question. Fine for a small initial feedback group; a real cost-exposure risk if the link travels further than intended. Not built, because it wasn't asked for — flagging it as an open decision, not a silent gap. A lightweight guard (shared password, or a simple per-IP/per-session rate limit in the function itself) is a small addition whenever you want it.

**3.3 Vercel plan tier is still Hobby (free), by the Strategist's own choice, to test before paying.** `maxDuration: 60` is configured, but Hobby hard-caps functions at 10 seconds regardless of that config. Single-attempt generations have consistently come back in a few seconds; a generation that needs even one validator-triggered retry (roughly 1-in-10-ish based on the AI Engineer's own batch testing in `payload/README.md`) means a second sequential Claude call, which can plausibly exceed 10 seconds and fail outright with no journey delivered. This hasn't bitten the three real test prompts yet, but it's a live risk, not a hypothetical one, and worth revisiting before this goes to a wider audience.

**3.4 `calibration_context` (cross-journey memory) is stubbed to `"none"`.** Product Brief §11 lists this as an explicitly undecided question — whether a later journey should be able to say "you already know this from your EV rabbit hole." I did not invent a Constellation-derived summary to fill this in; the plumbing (`calibration_context` param, threaded end-to-end from the frontend call through to `fillPrompt()`) is already in place and ready the moment there's a ruling on what that context should actually contain.

## 4. Next Steps (none of these are blocking — the loop works today)

1. Decide on Vercel plan tier before wider sharing, given §3.3 — either upgrade to Pro now, or keep gathering real retry-frequency evidence on Hobby first and decide from data.
2. Decide whether a lightweight access gate is worth adding before this goes past the initial small feedback circle, given §3.2's open cost exposure.
3. Rule on §3.4 whenever cross-journey calibration context is designed — the seam is already wired to receive it.
4. Optional, cosmetic: a custom domain on the live Vercel deployment, whenever wanted — unrelated to how the app functions.

The backend layer is live and working end to end against real user prompts. Nothing in the original task proved unbuildable; the only open items are cost/access/plan decisions that are the Strategist's to make, not engineering blockers.
