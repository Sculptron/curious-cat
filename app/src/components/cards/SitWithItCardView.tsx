import { useState } from 'react'
import { Scale, Globe2, BookOpen, Check, Sparkles } from 'lucide-react'
import BalanceScale from '../BalanceScale'
import BoldText from '../BoldText'
import type { SitWithItCard } from '../../types/journey'

// interaction_layout is hardcoded ("balanced_scale") rather than read from
// the payload — see payload/HANDOFF-REPORT.md §3.3. Next is locked in the
// parent until both perspectives have been opened at least once.
export default function SitWithItCardView({ card, onBothViewed }: { card: SitWithItCard; onBothViewed: () => void }) {
  const [active, setActive] = useState<'left' | 'right' | null>(null)
  const [viewedLeft, setViewedLeft] = useState(false)
  const [viewedRight, setViewedRight] = useState(false)

  function select(side: 'left' | 'right') {
    setActive(side)
    if (side === 'left') setViewedLeft(true)
    else setViewedRight(true)
    if ((side === 'left' && viewedRight) || (side === 'right' && viewedLeft)) onBothViewed()
  }

  const bgClass = active === 'left' ? 'bg-[#FFFBEB]' : active === 'right' ? 'bg-[#F0FDFA]' : 'bg-transparent'
  const allViewed = viewedLeft && viewedRight

  return (
    <div className={`px-6 pt-6 flex flex-col gap-4 transition-colors duration-500 ${bgClass}`}>
      <span className="text-[10px] font-extrabold text-[#6B7280] uppercase tracking-widest border border-[#E5E7EB] bg-white px-3 py-1 rounded-full inline-flex items-center gap-1.5 self-center">
        <Scale className="w-3 h-3" /> Sit With It
      </span>
      <h1 className="serif-header text-lg font-bold text-center leading-snug text-[#1A1A1A]">{card.heading}</h1>
      <p className="text-xs text-center text-[#6B7280] font-medium">Tap both perspectives to explore the nuance.</p>

      <div className="flex justify-center -mb-2">
        <BalanceScale active={active} />
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => select('left')}
          className={`p-4 rounded-2xl border-2 text-left transition-all ${
            active === 'left' ? 'bg-white border-[#D97706] shadow-md' : 'bg-white/60 border-[#E1DCD0]'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${active === 'left' ? 'bg-[#FEF3C7] text-[#D97706]' : 'bg-[#F3EFE6] text-[#A8A29E]'}`}>
              <Globe2 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-[#B45309]">{card.perspective_left.title}</h3>
            {viewedLeft && <Check className="w-4 h-4 text-[#D97706] ml-auto" />}
          </div>
          {active === 'left' && (
            <p className="text-[13px] leading-relaxed text-[#4B5563]">
              <BoldText text={card.perspective_left.summary} />
            </p>
          )}
        </button>

        <button
          onClick={() => select('right')}
          className={`p-4 rounded-2xl border-2 text-left transition-all ${
            active === 'right' ? 'bg-white border-[#0D9488] shadow-md' : 'bg-white/60 border-[#E1DCD0]'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${active === 'right' ? 'bg-[#E0F2FE] text-[#0D9488]' : 'bg-[#F3EFE6] text-[#A8A29E]'}`}>
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-[#0F766E]">{card.perspective_right.title}</h3>
            {viewedRight && <Check className="w-4 h-4 text-[#0D9488] ml-auto" />}
          </div>
          {active === 'right' && (
            <p className="text-[13px] leading-relaxed text-[#4B5563]">
              <BoldText text={card.perspective_right.summary} />
            </p>
          )}
        </button>
      </div>

      {allViewed && (
        <div className="mt-4 text-center pb-2">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#D97706]" />
            <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Synthesis</span>
          </div>
          <p className="text-[13px] italic text-[#4B5563] px-2">
            <BoldText text={card.synthesis_payload} />
          </p>
        </div>
      )}
    </div>
  )
}
