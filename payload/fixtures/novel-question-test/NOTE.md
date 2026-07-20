# Status: historical artifact, not current regression coverage

Every file in this directory fails current `validate.mjs` — but not because
anything is currently broken. They were captured against the retired draft
enum (`enums.draft.json`, since replaced by `enums.json`) and document a real
incident from that session: the `checkpoint_card` "always exactly 2 options"
bug, caught live, fed back through the retry loop, and fixed in
`system-prompt.txt` (see git history — commit `7a02213`).

The `*-REJECTED-checkpoint-3-options.json` / `*-RETRY-PASSED.json` pairs
(01-dreams, 03-cat-kneading) are the actual before/after evidence of that fix
working. Regenerating them today wouldn't reproduce the bug — it's fixed —
so regeneration would just produce a clean pass and destroy the only record
of what the original failure looked like. Left as-is on purpose.

The four `*-PASSED.json` files (02-rome-collapse, 04-phone-battery,
05/06-time-perception) were general novel-question diversity proof, not bug
documentation specifically — less critical to preserve verbatim, but not
worth regenerating either now that far more current, larger-scale coverage
exists: see `payload/batch-results.json` (30 live generations) and
`payload/batch-results-2.json` (20 live generations), both run against the
current `enums.json` and the fixed prompt.

If genuinely current novel-question fixtures are needed again, generate them
fresh with `generate.mjs` rather than trying to repair these.
