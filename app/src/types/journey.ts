// Mirrors the AI Engineer's locked contract in ../../../payload/{enums.json,validate.mjs}
// and docs/system-prompt-blueprint.md Part 2. Do not add fields the payload
// doesn't emit (e.g. no `interaction_layout` — that's a frontend-only concern,
// per payload/HANDOFF-REPORT.md §3.3) and do not invent fields payload never
// promised (e.g. no branch suggestions — see flagged gap in the build notes).

export const SEMANTIC_THEMES = [
  'abstract_philosophy',
  'ancient_civilizations',
  'art_culture_music',
  'biology_ecosystems',
  'chemistry_materials',
  'earth_geology',
  'economics_markets',
  'geopolitics_borders',
  'heavy_industry_mining',
  'infrastructure_urbanism',
  'maritime_history',
  'modern_computing_silicon',
  'physics_energy',
  'psychology_neuroscience',
  'space_astrophysics',
] as const
export type SemanticTheme = (typeof SEMANTIC_THEMES)[number]

export const MASCOT_MOODS = [
  'neutral',
  'happy',
  'celebrating',
  'encouraging',
  'thinking',
  'mind_blown',
  'navigating',
] as const
export type MascotMood = (typeof MASCOT_MOODS)[number]

// Model contract vocabulary (fresh/mid/deep). The UI vocabulary is
// novice/seeker/adept — see src/lib/calibration.ts for the boundary mapping.
export const MODEL_CALIBRATIONS = ['fresh', 'mid', 'deep'] as const
export type ModelCalibration = (typeof MODEL_CALIBRATIONS)[number]

export interface JourneyOption {
  id: string
  label: string
  is_correct: boolean
  emoji?: string
}

export interface ConceptCard {
  card_id: string
  type: 'concept_card'
  act_title: string
  heading: string
  body_markdown: string[]
  mascot_state: { position: 'progress_bar'; mood: MascotMood }
}

export interface PredictCard {
  card_id: string
  type: 'predict_card'
  heading: string
  options: JourneyOption[]
  reveal_payload: {
    mascot_reaction_mood: MascotMood
    feedback_text: string
  }
}

export interface CheckpointCard {
  card_id: string
  type: 'checkpoint_card'
  heading: string
  options: JourneyOption[]
  correct_feedback: string
  incorrect_feedback: string
}

export interface SitWithItCard {
  card_id: string
  type: 'sit_with_it_card'
  heading: string
  perspective_left: { title: string; summary: string }
  perspective_right: { title: string; summary: string }
  synthesis_payload: string
}

export type JourneyCard = ConceptCard | PredictCard | CheckpointCard | SitWithItCard

// payoff_layer.branches: exactly 3, emoji mandatory (unlike option.emoji
// above) — branches are always concrete, launchable questions, not abstract
// debate positions, per payload/validation-helpers.mjs's checkEmoji rule.
export interface Branch {
  hook: string
  category: string
  emoji: string
}

export interface Journey {
  expedition_metadata: {
    user_query: string
    calibration_level: ModelCalibration
    assigned_visual_theme: SemanticTheme
    total_cards: number
  }
  journey_deck: JourneyCard[]
  payoff_layer: {
    explain_it_back_prompt: string
    branches: Branch[]
    mint_card: {
      title: string
      category: string
      shareable_synthesis: string
    }
  }
}

// payload/explain-it-back-prompt.txt's response contract — a separate,
// lightweight endpoint from journey generation (no pass/fail field on
// purpose: this is a retention mechanic, not a gradeable test).
export interface ExplainItBackFeedback {
  mascot_reaction_mood: MascotMood
  headline: string
  feedback_text: string
}
