// Journey data boundary. getJourney() is the single seam the rest of the
// app calls through — nothing outside this file should know journeys come
// from a POST to /api/generate-journey. That endpoint (api/generate-journey.mjs)
// holds the Anthropic key server-side and wraps the AI Engineer's payload/
// pipeline (fillPrompt -> Claude -> validate.mjs -> retry) unchanged.
import type { Journey } from '../types/journey'
import type { UiCalibration } from './calibration'

export async function getJourney(query: string, calibration: UiCalibration, calibrationContext?: string): Promise<Journey> {
  const res = await fetch('/api/generate-journey', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_query: query,
      ui_calibration: calibration,
      calibration_context: calibrationContext,
    }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? `Journey generation failed (${res.status})`)
  }
  return res.json() as Promise<Journey>
}

export function listSparkPrompts(): { query: string; category: string; emoji: string }[] {
  return [
    { query: "Why is Côte d'Ivoire called Ivory Coast?", category: 'Geography & Trade', emoji: '🚢' },
    { query: 'If Congo, Zambia and Angola are so resource-rich, why are they still poor?', category: 'Political Economy', emoji: '⚖️' },
    { query: "Why does my phone's battery drain faster in cold weather?", category: 'Physics & Energy', emoji: '🔋' },
  ]
}
