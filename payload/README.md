# Curious Cat — Payload Layer

Built by the AI Engineer against `docs/system-prompt-blueprint.md` (schema locked).

## Contents

- **`system-prompt.txt`** — the journey-generation system prompt, verbatim from the blueprint Part 2. `{{user_query}}`, `{{calibration_level}}`, `{{calibration_context}}`, `{{semantic_theme_enum}}`, `{{mascot_mood_enum}}` are filled per-request; the two enum lists are injected from `enums.json`.
- **`enums.json`** — FINAL enum lists (2026-07-20). Sourced directly from committed assets, not a written spec: `semantic_theme_enum` is the 15 folder names under `assets/themes/`, `mascot_mood_enum` is the 7 mood tokens in `assets/mascot/cat_<mood>.svg`. Supersedes the old `enums.draft.json` (removed) — see "Enum finalization" below for what changed and why.
- **`theme_assets.json`** — maps each `semantic_theme_enum` value to its real hero/interaction PNG paths under `assets/themes/`.
- **`mascot_assets.json`** — maps each `mascot_mood_enum` value to its real SVG path under `assets/mascot/`.
- **`validate.mjs`** — the reject/retry validation pass (blueprint checklist item 3). Zero dependencies. Exit 0 = render it; exit 1 = retry the generation. Checks: valid JSON, all enum membership, exactly-one-correct options, double-escaped asterisks, leaked unicode escapes, markdown outside the bold-only subset, card-count consistency, bare "wrong" feedback.
- **`generate.mjs`** — live journey generation. Calls the real Claude Messages API (`@anthropic-ai/sdk`, `claude-opus-4-8`) with the filled system prompt, validates the raw output, and retries with rejection reasons appended on failure. `npm install` inside `payload/` first (see `package.json`). Requires Anthropic credentials on the environment. Usage: `node generate.mjs "<question>" <novice|seeker|adept> ["<context>"] [--max-retries N]`.
- **`fixtures/`** — one known-good journey and one multi-failure journey proving the validator catches every rejection category. Note: everything under `fixtures/` (including `novel-question-test/`) was generated and validated against the *old draft* enum, before real assets existed. Several now fail re-validation against `enums.json` (e.g. `wide_eyed`/`quizzical` moods, `maritime_trade`/`human_body_medicine` themes) — this is expected, not a regression. They remain useful as historical proof that the validator and retry loop work; they are not current regression fixtures. Superseded by fresh runs once live API wiring exists.

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

## Not yet done

- Wire `assets/mascot/cat_<mood>.svg` into the frontend's Layer 3 chrome rendering, keyed off `mascot_state.mood` (via `mascot_assets.json`) — no frontend runtime exists in this repo yet to wire it into (mockups are static `.tsx` reference files, not a buildable app).
- Observe the live retry branch actually firing (a real rejection → real retry → real pass), not just the validator's fixture-based proof.
- Broader regression: a few more novel-question runs across different themes, plus checking `checkpoint_card`'s exactly-2-option rule holds under live generation (the prior session's real regression was on the old draft enum's model output, not this one).
- Scale/reliability testing — 3 live generations (2 in this session, 1 smoke test) prove the design is sound, not the production failure rate. Wants dozens-to-hundreds of runs.
