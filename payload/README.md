# Curious Cat — Payload Layer

Built by the AI Engineer against `docs/system-prompt-blueprint.md` (schema locked).

## Contents

- **`system-prompt.txt`** — the journey-generation system prompt, verbatim from the blueprint Part 2. `{{user_query}}`, `{{calibration_level}}`, `{{calibration_context}}`, `{{semantic_theme_enum}}`, `{{mascot_mood_enum}}` are filled per-request; the two enum lists are injected from `enums.json`.
- **`enums.json`** — FINAL enum lists (2026-07-20). Sourced directly from committed assets, not a written spec: `semantic_theme_enum` is the 15 folder names under `assets/themes/`, `mascot_mood_enum` is the 7 mood tokens in `assets/mascot/cat_<mood>.svg`. Supersedes the old `enums.draft.json` (removed) — see "Enum finalization" below for what changed and why.
- **`theme_assets.json`** — maps each `semantic_theme_enum` value to its real hero/interaction PNG paths under `assets/themes/`.
- **`mascot_assets.json`** — maps each `mascot_mood_enum` value to its real SVG path under `assets/mascot/`.
- **`validate.mjs`** — the reject/retry validation pass (blueprint checklist item 3). Zero dependencies. Exit 0 = render it; exit 1 = retry the generation. Checks: valid JSON, all enum membership, exactly-one-correct options, double-escaped asterisks, leaked unicode escapes, markdown outside the bold-only subset, card-count consistency, bare "wrong" feedback.
- **`generate.mjs`** — live journey generation. Calls the real Claude Messages API (`@anthropic-ai/sdk`, `claude-opus-4-8`) with the filled system prompt, validates the raw output, and retries with rejection reasons appended on failure. `npm install` inside `payload/` first (see `package.json`). Requires Anthropic credentials on the environment. Usage: `node generate.mjs "<question>" <novice|seeker|adept> ["<context>"] [--max-retries N]`.
- **`fixtures/`** — regenerated twice on 2026-07-20: once against current `enums.json` and the fixed prompt, then again after the `branches` field was added (below), since that made every prior fixture fail the new required field. `valid-ivory-coast.json` (hand-authored, 3-card minimal validator proof) had branches hand-added, matching mockup-08's own example content (Gold Coast/Ghana, elephants, pepper trade). `regression-ivory-coast.json` and `regression-resource-curse.json` are both live-regenerated via `generate.mjs`. All three pass clean. `invalid-multi-failure.json` is untouched and still correctly fails, on the same planted defects as always — it's supposed to. `novel-question-test/` was deliberately **not** regenerated — see its `NOTE.md`.
- **`validation-helpers.mjs`** — shared checks (`checkText`, `req`, `checkMood`, `checkEmoji`) used by both `validate.mjs` and `validate-explain-it-back.mjs`, so the formatting rules (double-escape, leaked unicode, bold-only markdown) can't drift between two hand-copied implementations.
- **`explain-it-back-prompt.txt` / `fill-explain-it-back-prompt.mjs` / `validate-explain-it-back.mjs` / `generate-explain-it-back.mjs`** — the separate, lightweight "explain it back" feedback contract (see below). Mirrors the main journey pipeline's file structure at a smaller scale.
- **`batch-test.mjs`/`batch-test-2.mjs`/`batch-test-3.mjs`** and their `batch-results*.json` — live reliability batches, in order: (1) 30-generation baseline that found the `total_cards`/`is_correct` bugs, (2) 20-generation confirmation after the prompt fix, (3) 10-generation + 5-explain-it-back confirmation for the `branches` field and the new endpoint. All real, all committed as evidence, not summaries.

## Enum finalization (2026-07-20)

`enums.draft.json` was written before the Lead Designer's real Imagen asset-generation pass and was never reconciled against it afterward. When the real assets landed, the theme and mood names had changed (renamed/regrouped) without anyone updating the payload config — e.g. the draft's `maritime_trade` became the asset folder `maritime_history`, `human_body_medicine`/`natural_world_biology` don't map cleanly onto any single real folder, and the draft's `wide_eyed`/`quizzical` moods were never built — the real library shipped `mind_blown`/`navigating` instead. Only `economics_markets` matched exactly, and the counts didn't even align (14 draft themes vs. 15 real folders).

Resolved by treating the real committed files as the authoritative source (stronger evidence than an explicitly-unsigned-off draft doc) and regenerating `enums.json` from the actual folder/file names on disk.

**`heavy_industry_mining` hero — resolved.** Of the two hero candidates, `heavy_industry_mining_hero_visual.png` (no suffix) has a defective white/blank band across the bottom third that breaks bottom-bleed masking against UI chrome — every other theme's hero darkens toward the bottom instead (confirmed by inspecting `space_astrophysics` and `maritime_history` heroes for comparison). `heavy_industry_mining_hero_visual (1).png` matches the expected pattern and is the keeper referenced in `theme_assets.json`. The defective file is left on disk, untouched, flagged via `theme_assets.json`'s `_rejected_hero_candidate` field rather than deleted.

## Rulings received from the Chief Strategist (2026-07-18)

- **§3.3 approved** — `interaction_layout` dropped from the model contract; frontend hardcodes layout per card type. The validator now warns (not rejects) if the model emits it, so drift stays visible.
- **§3.4 ruled** — fixed at the API boundary, no renames: `calibration-map.mjs` maps UI `novice/seeker/adept` → model `fresh/mid/deep`. Must be called before filling `{{calibration_level}}`.
- **§3.5 approved** — validator's parsed-string escape check confirmed correct; the Strategist is folding the reasoning back into the blueprint doc itself.
- **§3.1 / §3.2 routed to the Lead Designer** — enum config on hold until their ruling comes back.

## Open items — blocked on stakeholder decisions, not silently resolved here

1. ~~Transcript missing~~ **RESOLVED** — `docs/audit-and-pushback exchange.txt` is now in the repo and has been read in full. It confirms: (a) the `body_markdown` fix was a rename from `body_paragraphs` — the array-of-strings shape is final, the fix was framing entries as markdown fragments so bold emphasis survives; (b) Layer 3 was fully accepted as written — cat never composited into generated imagery, including cover/mint, with the image-conditioned middle path explicitly considered and rejected; (c) the double-escape rule traces to the Designer's final sign-off memo, matching this validator's approach of checking parsed strings.
6. **NEW — calibration naming mismatch.** The UI's calibration control is Novice / Seeker / Adept (handoff report, Mockup 1; the Designer's schema examples use `"seeker"`), but the blueprint's prompt and schema use `fresh` / `mid` / `deep`. The frontend and the model contract disagree on the enum. Needs a ruling: align one to the other, or add an explicit mapping at the API boundary. The validator currently enforces the blueprint's `fresh/mid/deep`.
2. ~~`semantic_theme_enum` is a proposal.~~ **RESOLVED 2026-07-20** — see "Enum finalization" above. Final list is the 15 real `assets/themes/` folder names, in `enums.json`.
3. ~~`mascot_mood_enum` has an asset gap.~~ **RESOLVED 2026-07-20** — see "Enum finalization" above. Final list is the 7 real `assets/mascot/cat_<mood>.svg` moods, in `enums.json`. (Note: the asset gap described here referred to the old mockup's `CuteCatSvg` component, which is a separate, superseded prototype — the real shipped library is the standalone SVG files.)
4. **`interaction_layout` — recommend removing from the LLM's decision space.** Engineering position: `"3d_crates"` vs `"list"` is a rendering concern (depends on option label length and asset availability, not pedagogy), and `sit_with_it_card`'s layout is always `"balanced_scale"` — a constant, not a decision. Every field the model must emit is a field it can get wrong. Recommend the frontend hardcode layout per card type and the field be dropped from the schema. **The schema is marked locked, so this is a flagged recommendation, not a change** — the validator currently enforces the field as specified.
5. **Technical note on formatting rule 4 (unicode escapes):** a *single* escape like `“` in raw JSON is harmless — every JSON parser turns it into the literal character before the UI ever sees it. The historical bug was the *double* escape (`\\u201C`), which parses to a visible backslash sequence on screen. The validator therefore checks parsed strings for surviving escape sequences rather than rejecting well-formed single escapes, which would cause spurious retries.

## Live API wiring — verified 2026-07-20

`generate.mjs` has been run against the real Claude Messages API (`claude-opus-4-8`), not simulated:

- **Uncontested question** ("why does bread go stale faster in the fridge than on the counter") → 6 cards, no `sit_with_it_card`, validated clean on attempt 1/3. Real theme `chemistry_materials`, real moods (`thinking`, `neutral`, `mind_blown`, `navigating`, `happy`).
- **Contested question** ("why are resource-rich countries often poor") → 7 cards, correctly produced a `sit_with_it_card` with a genuine fair map (Sachs-Warner "the economics itself is harmful" vs. Acemoglu-Robinson "it's institutions, not resources") and a synthesis that names the disagreement rather than resolving it, matching blueprint rule 1.7. Real theme `economics_markets`. Validated clean on attempt 1/3.

Both runs used the final `enums.json` (real theme/mood values) end-to-end — fill-prompt → live model call → `validate.mjs` — and both passed on the first attempt, so **the reject/retry branch itself has not yet been exercised against a live rejection** (only against the hand-built fixtures in `fixtures/`, and manually-orchestrated dispatches in an earlier session). The happy path is proven live; a live-triggered retry is not yet observed.

## `branches` field and the explain-it-back contract — added 2026-07-20

Two real gaps the Frontend Engineer flagged rather than working around while building the actual app in `app/`: the schema had no field for the three follow-up curiosities the product brief and mint/constellation mockups both call for, and there was no formal contract for "explain it back" feedback (it existed in the original hand-built prototype per the product brief §10, but never made it into the blueprint).

**`branches`** — added under `payoff_layer`, sibling of `mint_card`. Exactly 3 entries, always. Each is `{ hook, category, emoji }`: `hook` is a complete, launchable question phrased exactly like `user_query` (so tapping it can re-enter the same generation pipeline with zero massaging), `category` is a freeform display tag (same pattern as `mint_card.category`), `emoji` is **mandatory** — unlike option emoji, branches are always 3 concrete questions, not abstract debate positions, so the Strategist ruled the "omit when weak" carve-out doesn't apply here.

**Explain-it-back** — a separate, lightweight endpoint (`explain-it-back-prompt.txt` + its own fill/validate/generate files), not bundled into the main journey call, since the user's explanation doesn't exist until after the deck is finished. Request: `user_query`, `calibration_level`, `shareable_synthesis` (the mint_card's "aha" line — the actual grading anchor), `user_explanation`. Response: `mascot_reaction_mood` (reuses the existing `mascot_mood_enum`, no new enum), `headline`, `feedback_text`. Deliberately has no pass/fail or quality-tier field — this is a retention mechanic, not a test the user can fail, per the brief's own framing; mood alone carries enough signal for the frontend to differentiate a strong answer from a shaky one.

**Live verification (`batch-test-3.mjs` → `batch-results-3.json`):**
- 10/10 fresh journeys passed (9 clean on attempt 1, 1 after a single retry — reason not captured due to a script gap, noted honestly rather than guessed at). `branches` was exactly 3 with emoji present on every single one, no exceptions.
- 5/5 explain-it-back calls passed clean on attempt 1, spanning strong/partial/off-target answers. Mood correctly tracked quality (`celebrating` for strong, `encouraging` for partial/off-target) and tone stayed warm and non-punitive throughout — no "wrong," "incorrect," or "actually" in any response, missing pieces delivered as natural continuations.

## Not yet done

- Fix the gap in `batch-test-3.mjs`: it only logs rejection reasons on final failure, not on a retry that later succeeds — meaning the one retry observed in the branches confirmation batch has no recorded reason. Worth fixing before the next batch that needs full attempt-by-attempt detail.
- Broader regression on `branches` specifically: 10 generations is enough to confirm the mechanism works, not enough for a failure-rate number the way the 30-generation baseline was for the core schema.
- Scale/reliability testing generally — real evidence now exists at small-to-moderate n (30 + 20 for the core schema, 10 + 5 for branches/explain-it-back), not at the "dozens-to-hundreds" scale that would support a genuine production failure-rate claim.
