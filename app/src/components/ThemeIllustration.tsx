import { themeImageUrl } from '../lib/assets'
import type { SemanticTheme } from '../types/journey'

// Layer 2: the "journey world" atmosphere. The bottom-fade bleed (UX handoff
// report, Layer 1 "The Bleed Effect") was only ever validated against
// placeholder color blocks — this is the first time it renders against real
// generated art, which turned out to be square (1024x1024), not the
// tall/landscape illustrations the mockups assumed. object-cover + top
// positioning is a first pass, not a confirmed-good crop.
export default function ThemeIllustration({
  theme,
  variant,
  // A percentage height here silently collapses to 0: it resolves against
  // ConceptCardView's own wrapper div, which is auto-height (content-sized),
  // not against the scrollable ancestor several levels up — CSS percentage
  // heights only look at the *immediate* containing block. vh sidesteps the
  // whole containing-block chain. Caught by actually screenshotting the
  // concept card: the hero illustration was rendering at 0px, not "small".
  heightClassName = 'h-[38vh]',
  bleedColor = '#F9F6F0',
}: {
  theme: SemanticTheme
  variant: 'hero' | 'interact'
  heightClassName?: string
  bleedColor?: string
}) {
  return (
    <div className={`relative w-full ${heightClassName} shrink-0 overflow-hidden`}>
      <img
        src={themeImageUrl(theme, variant)}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-top"
        draggable={false}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${bleedColor}, transparent)` }}
      />
    </div>
  )
}
