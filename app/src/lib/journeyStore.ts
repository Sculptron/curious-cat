// Local persistence — there is no backend yet, so the Constellation and
// calibration profile live in localStorage. Structured so swapping in a real
// backend later only means replacing these two functions' bodies.
import type { UiCalibration } from './calibration'
import type { Journey } from '../types/journey'

const CALIBRATION_KEY = 'curious-cat:calibration'
const CONSTELLATION_KEY = 'curious-cat:constellation'

export function loadCalibration(): UiCalibration {
  const stored = localStorage.getItem(CALIBRATION_KEY)
  return stored === 'novice' || stored === 'seeker' || stored === 'adept' ? stored : 'novice'
}

export function saveCalibration(level: UiCalibration): void {
  localStorage.setItem(CALIBRATION_KEY, level)
}

export interface ConstellationNode {
  id: string
  title: string
  category: string
  synthesis: string
  query: string
  completedAt: number
}

export function loadConstellation(): ConstellationNode[] {
  try {
    const raw = localStorage.getItem(CONSTELLATION_KEY)
    return raw ? (JSON.parse(raw) as ConstellationNode[]) : []
  } catch {
    return []
  }
}

export function recordCompletedJourney(journey: Journey, completedAt: number): ConstellationNode {
  const node: ConstellationNode = {
    id: `${journey.expedition_metadata.user_query}-${completedAt}`,
    title: journey.payoff_layer.mint_card.title,
    category: journey.payoff_layer.mint_card.category,
    synthesis: journey.payoff_layer.mint_card.shareable_synthesis,
    query: journey.expedition_metadata.user_query,
    completedAt,
  }
  const existing = loadConstellation()
  localStorage.setItem(CONSTELLATION_KEY, JSON.stringify([...existing, node]))
  return node
}
