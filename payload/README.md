# Curious Cat — Payload Layer

Built by the AI Engineer against `docs/system-prompt-blueprint.md` (schema locked).

## Contents

- **`system-prompt.txt`** — the journey-generation system prompt, verbatim from the blueprint Part 2. `{{user_query}}`, `{{calibration_level}}`, `{{calibration_context}}`, `{{semantic_theme_enum}}`, `{{mascot_mood_enum}}` are filled per-request; the two enum lists are injected from `enums.draft.json`.
- **`enums.draft.json`** — DRAFT proposals for both enum lists. **Not signed off.** Rename to `enums.json` only after Lead Designer approval.
- **`validate.mjs`** — the reject/retry validation pass (blueprint checklist item 3). Zero dependencies. Exit 0 = render it; exit 1 = retry the generation. Checks: valid JSON, all enum membership, exactly-one-correct options, double-escaped asterisks, leaked unicode escapes, markdown outside the bold-only subset, card-count consistency, bare "wrong" feedback.
- **`fixtures/`** — one known-good journey and one multi-failure journey proving the validator catches every rejection category.

## Rulings received from the Chief Strategist (2026-07-18)

- **§3.3 approved** — `interaction_layout` dropped from the model contract; frontend hardcodes layout per card type. The validator now warns (not rejects) if the model emits it, so drift stays visible.
- **§3.4 ruled** — fixed at the API boundary, no renames: `calibration-map.mjs` maps UI `novice/seeker/adept` → model `fresh/mid/deep`. Must be called before filling `{{calibration_level}}`.
- **§3.5 approved** — validator's parsed-string escape check confirmed correct; the Strategist is folding the reasoning back into the blueprint doc itself.
- **§3.1 / §3.2 routed to the Lead Designer** — enum config on hold until their ruling comes back.

## Open items — blocked on stakeholder decisions, not silently resolved here

1. ~~Transcript missing~~ **RESOLVED** — `docs/audit-and-pushback exchange.txt` is now in the repo and has been read in full. It confirms: (a) the `body_markdown` fix was a rename from `body_paragraphs` — the array-of-strings shape is final, the fix was framing entries as markdown fragments so bold emphasis survives; (b) Layer 3 was fully accepted as written — cat never composited into generated imagery, including cover/mint, with the image-conditioned middle path explicitly considered and rejected; (c) the double-escape rule traces to the Designer's final sign-off memo, matching this validator's approach of checking parsed strings.
6. **NEW — calibration naming mismatch.** The UI's calibration control is Novice / Seeker / Adept (handoff report, Mockup 1; the Designer's schema examples use `"seeker"`), but the blueprint's prompt and schema use `fresh` / `mid` / `deep`. The frontend and the model contract disagree on the enum. Needs a ruling: align one to the other, or add an explicit mapping at the API boundary. The validator currently enforces the blueprint's `fresh/mid/deep`.
2. **`semantic_theme_enum` is a proposal.** The blueprint names 4 themes; the other 10 in the draft are AI Engineer guesses at coverage. The real list lives in the Lead Designer's asset-mapping spec.
3. **`mascot_mood_enum` has an asset gap.** The blueprint's own examples use moods (`neutral`, `celebrating`, `encouraging`) that the current `CuteCatSvg` asset library does not implement — it has only `happy`/`squint`/`sad` eye states plus hat/boat/coin variants. Either the asset library grows to the 6-mood draft list, or the enum shrinks to what exists. Decision is the Lead Designer's.
4. **`interaction_layout` — recommend removing from the LLM's decision space.** Engineering position: `"3d_crates"` vs `"list"` is a rendering concern (depends on option label length and asset availability, not pedagogy), and `sit_with_it_card`'s layout is always `"balanced_scale"` — a constant, not a decision. Every field the model must emit is a field it can get wrong. Recommend the frontend hardcode layout per card type and the field be dropped from the schema. **The schema is marked locked, so this is a flagged recommendation, not a change** — the validator currently enforces the field as specified.
5. **Technical note on formatting rule 4 (unicode escapes):** a *single* escape like `“` in raw JSON is harmless — every JSON parser turns it into the literal character before the UI ever sees it. The historical bug was the *double* escape (`\\u201C`), which parses to a visible backslash sequence on screen. The validator therefore checks parsed strings for surviving escape sequences rather than rejecting well-formed single escapes, which would cause spurious retries.

## Not yet done (next steps once enums are signed off)

- Live end-to-end test against the two known-good cases: Ivory Coast (uncontested — expect no `sit_with_it_card`) and resource curse (contested — expect one), then novel questions.
- Wire the retry loop: call Claude → `validate.mjs` → on reject, retry with the rejection reasons appended.
