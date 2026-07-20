// Journey data boundary. There is no backend yet (Product Brief §11 leaves
// backend/auth undecided), and this app must not call the live Claude API
// directly from the browser — that's the AI Engineer's payload/ lane, and
// doing it client-side would mean shipping an API key to the browser. So for
// now this resolves against local, schema-valid fixtures (normalized copies
// of the AI Engineer's real journeys — see src/data/fixtures/README).
// getJourney() is the single seam a real backend call would replace later;
// nothing outside this file should know journeys come from local JSON.
import type { Journey } from '../types/journey'
import ivoryCoast from '../data/fixtures/ivory-coast.json'
import resourceCurse from '../data/fixtures/resource-curse.json'
import phoneBattery from '../data/fixtures/phone-battery.json'

const FIXTURES = [ivoryCoast, resourceCurse, phoneBattery] as unknown as Journey[]

function pickFixture(query: string): Journey {
  const q = query.toLowerCase()
  if (q.includes('ivory') || q.includes('ivoire') || q.includes('elephant')) return FIXTURES[0]
  if (q.includes('resource') || q.includes('poor') || q.includes('congo') || q.includes('zambia') || q.includes('angola')) {
    return FIXTURES[1]
  }
  if (q.includes('battery') || q.includes('cold') || q.includes('phone')) return FIXTURES[2]
  // No match: cycle through fixtures by query length so repeated novel
  // questions still feel varied during dev, rather than always landing on
  // the same journey.
  return FIXTURES[query.length % FIXTURES.length]
}

export async function getJourney(query: string): Promise<Journey> {
  // Simulated latency, matching the "charting" loading beat's purpose
  // (Mockup 2) — real generation is genuinely multi-second.
  await new Promise((resolve) => setTimeout(resolve, 1800))
  return pickFixture(query)
}

export function listSparkPrompts(): { query: string; category: string; emoji: string }[] {
  return [
    { query: "Why is Côte d'Ivoire called Ivory Coast?", category: 'Geography & Trade', emoji: '🚢' },
    { query: 'If Congo, Zambia and Angola are so resource-rich, why are they still poor?', category: 'Political Economy', emoji: '⚖️' },
    { query: "Why does my phone's battery drain faster in cold weather?", category: 'Physics & Energy', emoji: '🔋' },
  ]
}
