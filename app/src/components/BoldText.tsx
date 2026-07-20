// Renders the payload's bold-only markdown subset (docs/system-prompt-blueprint.md
// §1.5 — "**bold**" is the ONLY permitted markdown). No markdown library needed
// for a single-token grammar; a manual split also means we never risk
// dangerouslySetInnerHTML on model-generated text.
export default function BoldText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          // No color override — bold spans render in dark card bodies
          // (light bg) and the mint/constellation screens (dark bg) alike,
          // so this must inherit the caller's text color, not hardcode one.
          <strong key={i} className="font-bold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}
