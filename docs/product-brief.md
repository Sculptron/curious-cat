# Curious Cat — Product Brief

*A gamified, illustrated learning app for adult curiosity. Prepared as a reference document for collaborators, designers, and AI agents working on this project.*

## 1. The Idea, in One Paragraph

Curious Cat is a mobile-first app built around a single loop: a person has a random, specific curiosity — *why do EV chargers have compatibility issues, why is Côte d'Ivoire called Ivory Coast, why is a resource-rich country still poor* — and instead of that thought dying in a chatbot tab or getting buried under doom-scrolling, they bring it to Curious Cat, type it in as a question, and are taken on a short, beautifully illustrated, game-like "expedition" that actually teaches them the answer — calibrated to what they already know, checked for understanding along the way, and capped with something to say out loud to someone else.

## 2. The Origin Story

The founder used Claude's "Learning Mode" (/learn) to understand why certain EVs have charging compatibility issues. The conversation calibrated his existing knowledge first, built up concept by concept, checked his understanding before advancing, and ended with a satisfying reframe. It was genuinely joyful — and it prompted a realization: **as adults, we stop asking "dumb" questions.** Childhood curiosity gets buried under social pressure and "adulting," even though the impulse to ask *why* is one of the most distinctly human traits. That personal experience is the entire reason this product exists — the goal is to give that feeling a permanent home, not a one-off chat.

## 3. Why Not Just Keep Using Claude / Gemini / a Chatbot?

This was explicitly considered and rejected. The reasoning:

- A great learning conversation in a chatbot **gets buried** under every other chat and project the person has open. There's no dedicated home for "the parts of me that are curious."
- Chat is **session-based**; this product wants to be **identity-based** — "I'm a person who explores things" — which requires persistence, memory across curiosities, and a growing sense of progress that a chat history doesn't provide.
- The bet is that a **dedicated, gamified, visually distinctive place** — not "a chatbot with a skin" — is what makes the habit stick.

## 4. Core Design Philosophy

**The teaching and the delight are two separate channels, and they should stay separate:**

- **Information channel (Claude API):** 100% of the actual teaching — facts, sequencing, calibration, pedagogy — is handled by an LLM (Claude), which outputs a **structured journey** (JSON: cards, checkpoints, branches), not streaming prose. This is the single biggest architectural decision in the product. It's what turns a chat into something that can be rendered as a game.
- **Emotion channel (image generation):** Illustrations exist purely to make the journey visually stunning and memorable. **They never carry the actual teaching content and never need to be factually accurate.** This was a deliberate simplification after early exploration — see Section 7.

This split is what makes the whole thing feasible: because images are never load-bearing for facts, there's no need for factual grounding, vision-model verification passes, or diagram accuracy — an image can only be "ugly," never "wrong."

## 5. The Core Loop

- **Capture.** The user types the specific question that's on their mind — this is the emotional entry point of the entire product, and prototyping confirmed it matters a lot: starting the journey with the user's *own* words made it feel personally theirs in a way a pre-set topic list did not.
- **Calibrate.** A short, tappable "where are you starting from?" question (borrowed directly from the Claude Learning Mode experience that inspired the app) tunes how much the journey builds up vs. assumes. Ideally this calibration persists across a person's history — a later journey should be able to say "you already know this from your EV rabbit hole."
- **Journey.** A swipeable, card-based path — one idea per card. Cards alternate between:
- **Concept cards** — one idea, delivered in a few sentences.
- **Predict-before-reveal cards** — a guess, then a reveal.
- **Checkpoint cards** — a quick right/wrong comprehension check with a gentle correction.
- **"Sit with it" / thinking cards** — for genuinely contested or open questions, presented as a fair map of viewpoints rather than a single verdict (important for topics like the resource curse, where the product should stay even-handed rather than push an ideological reading).
- **Explain it back.** Before the journey ends, the user writes a one-sentence explanation in their own words, and the Claude API gives brief, warm, specific feedback on it. This closes the loop and is believed to be the actual retention mechanism.
- **Payoff + mint.** The journey ends with a reframe (the "aha" line the person should walk away able to repeat) and mints a **collectible card** — a shareable, illustrated summary of the expedition, styled like a trading card.
- **Branch.** Three follow-up curiosities are offered, engineered to make "one more" easy — curiosity should visibly beget curiosity.

## 6. Retention Mechanics (Why People Come Back)

Open-ended curiosity has no natural finish line the way a language course does, so completion isn't the retention metric. Instead:

- **The Constellation.** Every finished journey becomes a node in a personal, growing knowledge map. Retention is measured as *territory explored*, not lessons completed — closer to a Duolingo streak reimagined for open-ended learning.
- **Resurfacing.** Spaced-repetition-style check-ins days after a journey ("quick one: why can a plug fit perfectly and charging still fail?") to convert one-time learning into retained knowledge.
- **The Spark feed.** A doom-scroll substitute: a feed of illustrated, one-line curiosity hooks the person can swipe past or tap into. This is explicitly meant to compete with Instagram/TikTok idle-scrolling time, but make the person smarter instead of sadder.
- **Collectible mint cards.** Designed to be screenshotted and shared — the organic growth loop.

## 7. The Visual System — Three Layers

This is the product's most-refined and most-differentiating design decision, arrived at after real back-and-forth (see Section 9 for the reasoning trail).

**Layer 1 — Style System (constant / the brand).** The unchanging "hand": palette logic, line weight, filled-silhouette-plus-linework look, typography (a serif display face + a clean sans body face), motion language, iconography for progress/sparks/etc. This is what makes any journey unmistakably *Curious Cat*, regardless of subject — the same way a Kurzgesagt video is recognizable from one frame no matter the topic.

**Layer 2 — Journey World (variable / the personalization).** Each curiosity gets its own illustrated cast, drawn from its own subject matter: elephants, ships, and flags for an Ivory Coast journey; ore, rails, and tipped scales for a resource-curse journey; plugs and whispering machines for an EV-charging journey. This is what makes a journey feel *built specifically for this question*, because visually, it is. Generated per-journey by the image model, wrapped in the Layer 1 style prefix so it never looks like a different app.

**Layer 3 — The Cat (the constant traveler).** A single recurring mascot character who visits each journey's world rather than *being* the journey's theme — like a picture-book protagonist or a travel-show host. The cat owns the **narrative frame** (capture screen, the "charting" loading moment, reactions to correct guesses, the mint screen, the progress trail); the journey world owns the **canvas** (concept and reveal illustrations are cat-free so the topic gets the spotlight). This layer is the emotional anchor and the reason for a name like "Curious Cat" — the aim is the same mechanism Duolingo gets from its owl, earned through genuine companionship in the learning, not guilt.

**Technical note on the mascot:** cross-journey character consistency (the classic diffusion-model weakness) is intended to be solved with a locked **character sheet** — a fixed reference design of the cat (proportions, expressions, a consistent marker like a collar) used as image-conditioning input on every generation that includes it, the same reference-image workflow used in tools like Nano Banana.

**Key production rule: no text ever appears inside a generated image.** All copy is rendered as real UI typography. This was learned directly from testing — even frontier image models (tested with Gemini/Nano Banana) reliably produce duplicated headers, garbled labels, and — critically — **inaccurate diagrams that look plausible** (e.g., a "CCS plug vs. NACS port" illustration with invented, non-matching connector geometry). Because Layer 2 images are explicitly decorative rather than diagrammatic (see Section 4), this failure mode is designed out of the product rather than patched around.

## 8. Technical Architecture (V1 scope)

- **Frontend:** Mobile-first PWA (installable, no app-store friction). Card-based, swipeable UI.
- **Teaching engine:** Claude API, prompted to output a structured journey — roughly: acts → cards (concept / predict / checkpoint / thinking) → branches — as JSON, plus per-act "visual" prompts for the image layer.
- **Image engine:** An open-source/API image model (candidates discussed: Flux for the general illustration lane, image-conditioned editing à la Nano Banana for anything needing a consistent character or accurate real-world reference) generating a small number of real images per journey — a hero illustration, a few milestone illustrations at act breaks, and the mint card — rather than one image per card, for cost and pacing reasons.
- **Caching:** Popular journeys' illustrations can be cached and reused across users since they're decorative, not personalized to facts — only calibration-specific text differs per user.
- **Data:** Journey history, constellation state, and calibration profile persist per user (backend TBD — Supabase or similar suggested for an MVP).

## 9. How the Design Evolved (Decision Trail)

Useful context for any collaborator so prior ground isn't re-litigated:

- **Started as "just gamify Learning Mode."** Quickly reframed: the real differentiator isn't the chat, it's everything *around* it (capture, memory, resurfacing, a dedicated identity).
- **Visual ambition raised.** Founder pushed for generative illustrations as a core differentiator, inspired by a NotebookLM-generated infographic and directly by testing Gemini's image generation on the EV transcript.
- **Accuracy vs. beauty tension surfaced.** Testing showed image models render legible text and layouts well now, but still **hallucinate factual/geometric details confidently** — a serious problem if an illustration is claimed to *carry* the teaching.
- **Resolved by architectural split (Section 4):** rather than solving image accuracy (grounding assets, VLM verification, etc.), the simpler and more robust decision was to make images purely atmospheric and give Claude 100% ownership of factual teaching. This deleted an entire category of engineering and QA problems.
- **Visual system further refined into two layers, then three.** Initially proposed a single locked "house style" for all journeys. Founder correctly pushed back that a fully uniform mascot-driven look across every journey would feel mundane and less personalized, given how purpose-built the first prototype's imagery (elephant, ship, flag) felt for its specific topic. Resolved into the current three-layer system (Section 7): constant style + per-journey world + a constant traveling mascot.
- **Named "Curious Cat."** Chosen after the visual system had already taken shape — the name captures the mascot-as-companion idea and comes with a built-in idiom to play with in marketing ("curiosity killed the cat…").

## 10. Prototypes Built So Far

Two working, fully interactive React/JSX artifacts exist, each demonstrating the full loop end-to-end for one hand-authored curiosity:

- **Expedition Nº 001 — "Why is there 'ivory' in Ivory Coast?"** First full prototype. Established the card types, the calibration mechanic, the coastline/ship progress motif, the mint card, and the constellation screen. Also where the "ask your own question first" capture screen was added after initial feedback, and where a first mascot-less illustration style was established (later revised once the cat concept was introduced).
- **Expedition Nº 002 — "If Congo/Zambia/Angola are resource-rich, why are they still poor?"** Second prototype, built specifically to demonstrate the three-layer visual system working together: the constant Curious Cat mascot appears in the fixed narrative beats (capture, "charting" loading state, correct-answer reactions, the mint emblem, the progress trail) while a fully bespoke journey-world cast (open-pit mine, the value-chain "smile curve," colonial-era rail lines, a tipped scale, a forked path) carries the topic-specific imagery. Also demonstrates the product's intended editorial stance on genuinely contested topics — presenting competing economic explanations (institutions-first vs. structure-first vs. curse-is-overstated) as a fair map rather than a single verdict — and includes a live call to the real Claude API for the "explain it back" feedback step.

Both prototypes intentionally use simple hand-coded SVG illustrations as a stand-in for what a real image-generation pipeline would produce — the founder has explicitly acknowledged prototype visuals are a lower bar than the intended final quality.

## 11. Open Questions / Not Yet Decided

- Whether journeys can be reliably **auto-generated** by a Claude system prompt at the same quality as the hand-authored prototypes — this is flagged as the next major validation step and the core remaining product risk.
- Exact image-generation model/pipeline choice for production (Flux vs. others; how image-conditioning/reference-based editing gets used for the recurring mascot).
- Whether/how calibration and constellation state should carry context *across* different journeys (e.g., "you already know this from your EV rabbit hole").
- Full mechanics of the Spark feed (the doom-scroll-substitute surface) — described conceptually but not yet prototyped.
- Monetization, backend/auth stack, and go-to-market are all undecided — this brief is intentionally scoped to product and design, not business model.

## 12. Who This Product Is For

Adults who used to ask a lot of questions as kids and miss that feeling — people for whom a good explanation is genuinely delightful, not just useful. The tone throughout should be playful and a little irreverent (hence the cat), never academic or "edtech."

*This brief reflects the state of the concept as of the two prototypes described in Section 10. Update it as the design evolves rather than re-explaining context from scratch in new conversations.*
