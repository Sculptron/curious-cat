// Boundary seam for the "explain it back" feedback call, same pattern as
// journeySource.ts's getJourney(). The real contract now exists —
// payload/explain-it-back-prompt.txt + validate-explain-it-back.mjs,
// confirmed live by the AI Engineer — but it's a live Anthropic Messages
// API call made from a Node script with a server-side key
// (generate-explain-it-back.mjs). There is still no backend proxy in this
// repo for a browser to call it through, so this stays a local
// approximation of the real response shape until one exists. Swapping in
// a real fetch() to a backend later means changing only this file.
import type { ExplainItBackFeedback } from '../types/journey'

function keyPhrase(shareableSynthesis: string): string {
  const bold = shareableSynthesis.match(/\*\*([^*]+)\*\*/)
  return bold ? bold[1] : shareableSynthesis.replace(/\*\*/g, '')
}

function wordOverlap(a: string, b: string): number {
  const words = (s: string) =>
    new Set(
      s
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 3),
    )
  const setA = words(a)
  const setB = words(b)
  if (setA.size === 0 || setB.size === 0) return 0
  let shared = 0
  for (const w of setA) if (setB.has(w)) shared++
  return shared / Math.min(setA.size, setB.size)
}

export async function getExplainItBackFeedback(userExplanation: string, shareableSynthesis: string): Promise<ExplainItBackFeedback> {
  // Matches generate-explain-it-back.mjs's own latency shape (a single,
  // small Claude call) closely enough for the loading beat to feel right.
  await new Promise((resolve) => setTimeout(resolve, 1200))

  const overlap = wordOverlap(userExplanation, shareableSynthesis)
  const phrase = keyPhrase(shareableSynthesis)

  if (overlap > 0.3) {
    return {
      mascot_reaction_mood: 'celebrating',
      headline: 'You nailed the core of it!',
      feedback_text: `That's exactly the shift the whole idea hinges on — you landed on **${phrase}**, which is the one thing worth carrying out of this expedition.`,
    }
  }
  return {
    mascot_reaction_mood: 'encouraging',
    headline: "You're circling it!",
    feedback_text: `You're onto the right idea. The piece worth adding: **${phrase}** — that's the detail that ties the whole thing together.`,
  }
}
