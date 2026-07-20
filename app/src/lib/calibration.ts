// UI vocabulary (Novice/Seeker/Adept, Mockup 1's segmented control) vs. model
// vocabulary (fresh/mid/deep, the payload/system-prompt.txt contract). This
// mapping must stay identical to ../../../payload/calibration-map.mjs — that
// file is the source of truth (owned by the AI Engineer); this is the
// frontend-side copy of the same tiny boundary table, since payload/ is
// read-only for this app and the table is stable enough not to warrant a
// cross-package import.
import type { ModelCalibration } from '../types/journey'

export const UI_CALIBRATIONS = ['novice', 'seeker', 'adept'] as const
export type UiCalibration = (typeof UI_CALIBRATIONS)[number]

const UI_TO_MODEL: Record<UiCalibration, ModelCalibration> = {
  novice: 'fresh',
  seeker: 'mid',
  adept: 'deep',
}

export function toModelCalibration(uiLevel: UiCalibration): ModelCalibration {
  return UI_TO_MODEL[uiLevel]
}

export const CALIBRATION_LABELS: Record<UiCalibration, { emoji: string; label: string }> = {
  novice: { emoji: '🛶', label: 'Novice' },
  seeker: { emoji: '🧭', label: 'Seeker' },
  adept: { emoji: '🦅', label: 'Adept' },
}
