// Curious Cat — shared validation helpers used by validate.mjs and
// validate-explain-it-back.mjs. Kept in one place on purpose: the
// formatting rules (double-escape, leaked unicode, bold-only markdown)
// must behave identically everywhere they're checked, not drift between
// two hand-copied implementations.

export function checkText(errors, warnings, path, s) {
  if (/\\\*\\\*/.test(s)) errors.push(`${path}: double-escaped bold markers (\\*\\*) — will render broken on screen`);
  if (/\\u[0-9a-fA-F]{4}/.test(s)) errors.push(`${path}: literal unicode escape sequence leaked into display text`);
  if (/(^|\n)\s*(#{1,6}\s|>\s|-\s|\*\s(?!\*)|\d+\.\s)/.test(s)) errors.push(`${path}: forbidden markdown (header/blockquote/list) — frontend parser is bold-only`);
  if (/`[^`]+`/.test(s)) errors.push(`${path}: inline code markdown is forbidden`);
  const bolds = (s.match(/\*\*[^*]+\*\*/g) || []).length;
  if (bolds > 2) warnings.push(`${path}: ${bolds} bold spans (blueprint says at most 1-2 per card)`);
  if ((s.match(/\*\*/g) || []).length % 2 !== 0) errors.push(`${path}: unbalanced ** bold markers`);
}

export function req(errors, obj, path, key, type) {
  const v = obj?.[key];
  const ok =
    type === "array" ? Array.isArray(v) :
    type === "integer" ? Number.isInteger(v) :
    typeof v === type;
  if (!ok) errors.push(`${path}.${key}: missing or not a ${type}`);
  return ok ? v : undefined;
}

export function checkMood(errors, MOODS, path, mood) {
  if (typeof mood !== "string") errors.push(`${path}: missing mood`);
  else if (!MOODS.includes(mood)) errors.push(`${path}: mood "${mood}" not in mascot_mood_enum [${MOODS.join(", ")}] — frontend has no asset to render`);
}

// Options' emoji is optional (Strategist ruling: omit rather than force weak
// matches). Branches' emoji is mandatory (Strategist ruling: branches are
// always 3 concrete, launchable questions — much lower risk of a weak
// forced match than an abstract sit_with_it option). Same shape check
// either way; `required` decides whether omission itself is an error.
export function checkEmoji(errors, path, emoji, { required = false } = {}) {
  if (emoji === undefined || emoji === null) {
    if (required) errors.push(`${path}: emoji is required and was omitted`);
    return;
  }
  if (typeof emoji !== "string" || emoji.length === 0) {
    errors.push(`${path}: must be a non-empty string${required ? "" : " or omitted"}`);
  } else if ([...new Intl.Segmenter().segment(emoji)].length > 1 || /^[\x00-\x7F]+$/.test(emoji)) {
    errors.push(`${path}: "${emoji}" is not a single emoji character`);
  }
}
