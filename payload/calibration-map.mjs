// Curious Cat — calibration boundary mapping (Strategist ruling on §3.4)
//
// The UI speaks Novice/Seeker/Adept (good product copy, Mockup 1's segmented
// control). The model contract speaks fresh/mid/deep (good internal vocabulary
// for the prompt layer). Neither renames; this lookup at the API boundary is
// the single place the two vocabularies meet. Call toModelCalibration() on the
// frontend's value before filling {{calibration_level}} in the system prompt.

const UI_TO_MODEL = {
  novice: "fresh",
  seeker: "mid",
  adept: "deep",
};

export function toModelCalibration(uiLevel) {
  const model = UI_TO_MODEL[String(uiLevel).toLowerCase()];
  if (!model) {
    throw new Error(
      `Unknown UI calibration level "${uiLevel}" — expected one of: ${Object.keys(UI_TO_MODEL).join(", ")}`
    );
  }
  return model;
}

export const MODEL_CALIBRATION_LEVELS = Object.values(UI_TO_MODEL);
