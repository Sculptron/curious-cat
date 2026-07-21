// Boundary seam for the "explain it back" feedback call, same pattern as
// journeySource.ts's getJourney(). Calls /api/explain-it-back
// (api/explain-it-back.mjs), which holds the Anthropic key server-side and
// wraps the AI Engineer's payload/ explain-it-back pipeline unchanged.
import type { ExplainItBackFeedback } from '../types/journey'
import type { UiCalibration } from './calibration'

export async function getExplainItBackFeedback(
  userQuery: string,
  calibration: UiCalibration,
  shareableSynthesis: string,
  userExplanation: string,
): Promise<ExplainItBackFeedback> {
  const res = await fetch('/api/explain-it-back', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_query: userQuery,
      ui_calibration: calibration,
      shareable_synthesis: shareableSynthesis,
      user_explanation: userExplanation,
    }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? `Explain-it-back feedback failed (${res.status})`)
  }
  return res.json() as Promise<ExplainItBackFeedback>
}
