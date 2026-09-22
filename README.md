# Curious Cat 🐱

**Turns a random question into a short, illustrated, game-like lesson.**

You type in something you've always wondered ("Why do cats knead?", "Why did Rome collapse?"). Instead of a wall of chatbot text, you get a short "expedition": a series of cards that teach the answer, check your understanding along the way, and end by asking you to explain it back in your own words.

**Status:** working prototype. React frontend plus a serverless API that generates each lesson live with the Anthropic Claude API. Not yet publicly launched.

---

## The hard part: making the AI reliable

Every lesson is generated from scratch by the AI, and the app only works if the AI returns a strict structure: the right card types, the right number of answer options, every required field filled in. One missing field and the screen breaks.

So I didn't trust the AI to get it right. I built a loop around it:

1. **Rules in writing.** A system prompt that spells out exactly what a valid lesson looks like → [`payload/system-prompt.txt`](payload/system-prompt.txt)
2. **An automatic checker.** Every response is checked against those rules before a user ever sees it. Anything that breaks a rule is rejected → [`payload/validate.mjs`](payload/validate.mjs)
3. **Retry with the reason.** A rejected response goes back to the AI with the specific failure attached, and it's asked to fix it.
4. **Test in batches, not one at a time.** Problems that show up once in 30 runs never show up when you test by hand.

## What the testing actually found

| Round | What I ran | What happened |
|---|---|---|
| **New-topic test** | 6 questions across new subjects (dreams, Rome, cat behaviour, phone batteries, time perception) | 2 rejected: a quiz card came back with 3 answer options instead of 2. **Root cause:** the 2-option rule was stated once in the prompt but never reinforced, right next to a different card type that allows 2–3. Fixed the prompt; both passed on retry. The rejected and fixed outputs are kept as evidence in [`payload/fixtures/novel-question-test/`](payload/fixtures/novel-question-test/). |
| **Batch 1** | 30 live generations | **22/30 clean on the first try.** Found two new failure patterns: card count not matching the actual number of cards (4/30), and a required "correct answer" field missing entirely (4/30). The second was likely the AI over-applying a nearby rule that says an emoji is optional. The retry loop recovered all 8; **0 of 30 failed outright.** → [`batch-results.json`](payload/batch-results.json) |
| **The fix** | Prompt changes | Reinforced both rules, and added a direct contrast: *the correct-answer field is never optional; the emoji is.* |
| **Batch 2** | 20 generations, including the 8 exact inputs that failed before | **19/20 clean on the first try** (up from 22/30). The card-count bug didn't come back. The missing-field bug appeared once on a new question, so it's improved but not fully eliminated at this sample size. → [`batch-results-2.json`](payload/batch-results-2.json) |

That's the whole method: **read real outputs → find the pattern → fix the instruction → re-test on the cases that failed.**

---

## How I built it

I'm not a developer. I build through AI orchestration. I set the product direction, write and tune the prompts, define the rules, and test the output. Claude Code writes the code. The work was split across defined roles (product strategist, designer, backend), each with its own brief, and the decisions are documented in [`docs/`](docs/).

## What's in this repo

| Folder | What it is |
|---|---|
| [`docs/`](docs/) | Product brief, UX handoff, system prompt blueprint |
| [`payload/`](payload/) | The AI layer: system prompt, validator, batch tests and their results |
| [`app/`](app/) | The working React frontend |
| [`api/`](api/) | Serverless endpoints that call the AI (API keys are server-side only) |
| [`mockups/`](mockups/), [`design/`](design/) | The 10 screen mockups and design system |
| [`assets/`](assets/) | Theme illustrations and mascot artwork |
