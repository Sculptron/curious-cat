import CatMascot from './CatMascot'
import type { MascotMood } from '../types/journey'

// Hand-authored decorative UI chrome (the "cat sails the progress bar" motif
// from the UX handoff report, §2 Layer 3) — not a payload-driven asset. The
// mascot mood image itself always comes from the real fixed SVG library;
// this hull/sail is just frontend decoration around it, same category as the
// hand-authored crates and balance-scale graphics elsewhere in the app.
export default function BoatChrome({ mood }: { mood: MascotMood }) {
  return (
    <div className="relative w-10 h-10 drop-shadow-md overflow-visible">
      <svg viewBox="0 0 60 60" fill="none" className="absolute inset-0 w-full h-full">
        <path d="M10,50 Q30,55 50,50" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <path d="M12,42 L20,48 L40,48 L48,42 Z" fill="#78350F" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M15,44 L45,44" stroke="#451A03" strokeWidth="1" />
        <line x1="35" y1="18" x2="35" y2="42" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M35,20 Q25,28 35,38 Z" fill="#FCFAF7" stroke="#1A1A1A" strokeWidth="1" />
      </svg>
      <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-[#1A1A1A] overflow-hidden">
        <CatMascot mood={mood} className="w-full h-full" />
      </div>
    </div>
  )
}
