To: Chief Strategist
From: AI Engineer
Re: Payload Layer Build Report — System Prompt, Validation Pass & Items Requiring Your Ruling

---

## 1. Context Absorbed

Before building, I read the Product Brief, the UX/UI Design Handoff Report, the full audit-and-pushback transcript between you and the Lead Designer, and the System Prompt Blueprint, plus the ten mockups and the Interactive Spec Hub source. I am treating the following as binding, not advisory:

- **The channel split.** Claude owns 100% of factual teaching; images are purely atmospheric and never factually load-bearing. The prompt never asks the model to describe specific imagery — only to classify theme.
- **Resolution A (Hybrid-Cached Archetypes).** The model classifies each expedition into one of 12–15 cached Semantic Themes. It writes no image-generation prompts. Latency and cost stay bounded.
- **Resolution B, as you locked it.** The cat is permanently frontend chrome, rendered from a static SVG/Lottie library, driven only by a closed-enum mood flag. It is never composited into generated Layer 2 imagery — including the cover and mint moments. I read the transcript closely enough to know this was a close call in which the image-conditioned middle path was explicitly proposed and rejected. I am building on that decision, not around it, and I am not reopening it.
- **Resolution C (dynamic card composition).** Card count and sequence are pedagogy-driven, never templated.
- **The `body_markdown` fix.** The transcript confirms the final schema shape: an array of markdown-fragment strings (renamed from `body_paragraphs`), bold-only, threaded through `feedback_text` and `synthesis_payload`. The blueprint schema is the truly final version and I built against it verbatim.

## 2. What Is Built and Verified

All deliverables live in `payload/` in the repo.

**a. `system-prompt.txt`** — the blueprint's Part 2 system prompt as a deployable template. The five `{{variables}}` (user query, calibration level, calibration context, and the two enum lists) are injected per-request; the enums come from a config file, so finalizing them requires no prompt rewrite.

**b. `validate.mjs`** — the reject/retry validation pass from the blueprint's handoff checklist (item 3). Zero dependencies, no model call, runs in milliseconds. On every generated journey it checks:

- valid JSON (with detection of accidental markdown code fences);
- every enum value against the fixed lists — calibration level, semantic theme, all mascot moods (an out-of-enum mood means the frontend has nothing to render, so it is a hard reject);
- exactly one `is_correct: true` per predict/checkpoint option set;
- double-escaped bold markers (`\*\*`) and unicode escape sequences that would print as broken characters on the user's screen;
- any markdown outside the bold-only subset (headers, blockquotes, lists, inline code);
- `total_cards` consistency, all required fields per card type, and bare "wrong/incorrect" feedback (which the blueprint forbids — corrections must be warm and specific).

Exit 0 means render it; exit 1 means retry the generation with the rejection reasons attached.

**c. Verification.** Two fixtures prove the validator works: a hand-built Ivory Coast journey passes clean, and a deliberately broken journey with ten planted defects (invalid calibration enum, invented theme, invented mascot mood, header and list markdown, double-escaped asterisks, two-correct-answers, card-count mismatch, bare "Wrong." feedback, missing synthesis) is rejected with every defect individually named. All ten are caught.

**d. `enums.draft.json`** — proposed enum lists, explicitly marked DRAFT and not shippable until the Lead Designer signs off (see §3).

## 3. Items Requiring a Ruling — Flagged, Not Silently Resolved

Per your instruction, I have not guessed on any of these. Each needs a decision from you and/or the Lead Designer.

**3.1 `semantic_theme_enum` (Lead Designer sign-off).** The blueprint names four themes; I drafted ten more as proposals to react against, chosen to cover the two prototypes plus common adult-curiosity territory. The authoritative list lives in the Designer's asset-mapping spec — my draft is a strawman, not a decision.

**3.2 `mascot_mood_enum` has an asset gap (Lead Designer sign-off).** The blueprint's own examples use moods (`neutral`, `celebrating`, `encouraging`) that the current mockup asset library does not implement — `CuteCatSvg` today has three eye states (happy, squint, sad) plus hat, boat, and coin variants. The transcript specifies a target library of 20–30 Lottie/SVG animations, so I drafted a seven-mood target set (including the Designer's own `quizzical` example) assuming the library grows. Either the assets grow to the enum or the enum shrinks to the assets; the checklist's warning stands — a missing mood silently flattens emotional beats.

**3.3 `interaction_layout` — my recommendation is to remove it from the LLM's decision space.** `"3d_crates"` vs `"list"` is a rendering concern (it depends on option label length and asset availability, not pedagogy), and `sit_with_it_card`'s layout is always `"balanced_scale"` — a constant, not a choice. Every field the model must emit is a field it can get wrong; this one buys us nothing pedagogical in exchange for that risk. Since the schema is marked locked, this is flagged pushback, not a quiet change: the validator enforces the field exactly as specified until you rule. If you agree, the frontend hardcodes layout per card type and the field is dropped from the schema.

**3.4 NEW — calibration enum mismatch between the UI and the model contract.** The shipped calibration control is **Novice / Seeker / Adept** (Mockup 1; the Designer's schema examples use `"seeker"`), but the blueprint's prompt and final schema use **`fresh` / `mid` / `deep`**. The two halves of the product currently disagree on this enum. Options: rename one side to match the other, or add a fixed mapping at the API boundary (novice→fresh, seeker→mid, adept→deep). Cheap either way, but it must be decided before the first live integration, or the very first frontend request will fail validation. The validator enforces the blueprint's version in the meantime.

**3.5 One technical correction to blueprint formatting rule 4, stated plainly.** The rule treats any unicode escape (e.g. `“`) as a failure, but a *single* well-formed escape inside JSON is harmless — every parser converts it to the literal character before the UI sees it. The failure mode with a history behind it, per the Designer's sign-off memo, is the *double* escape, which survives parsing and prints as visible broken characters. My validator therefore checks parsed strings for surviving escape sequences rather than rejecting well-formed single escapes — the strict-literal reading of rule 4 would cause spurious retries (added latency and cost) on outputs that would have rendered perfectly.

## 4. Next Steps (blocked only on §3 rulings)

1. Swap draft enums for the signed-off lists (config change only; no prompt rewrite).
2. Wire the live generation loop: Claude call → validator → on reject, one retry with the rejection reasons appended to the request.
3. Run the blueprint's two known-good regression cases: **Ivory Coast** (uncontested — expect concept/predict/checkpoint composition and *no* `sit_with_it_card`) and the **resource curse** (contested — expect exactly the fair-map `sit_with_it_card` behavior). Confirm the model chooses card composition correctly on both before opening to novel questions.
4. Then novel-question testing, which is the real validation of the product's core remaining risk (Product Brief §11): whether auto-generated journeys match hand-authored quality.

The payload layer is otherwise ready. Nothing in the blueprint proved unbuildable; the only open items are the ones its own checklist predicted, plus the calibration mismatch surfaced in §3.4.
