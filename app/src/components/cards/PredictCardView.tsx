import { useState } from 'react'
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react'
import CatMascot from '../CatMascot'
import BoldText from '../BoldText'
import type { PredictCard } from '../../types/journey'

// interaction_layout is intentionally not read from the payload (dropped
// from the model's decision space per payload/HANDOFF-REPORT.md §3.3) —
// predict_card always renders as the tactile "cargo crates" layout.
export default function PredictCardView({ card, onAnswered }: { card: PredictCard; onAnswered: () => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const answered = selectedId !== null
  const selected = card.options.find((o) => o.id === selectedId)

  function select(id: string) {
    if (answered) return
    setSelectedId(id)
    onAnswered()
  }

  return (
    <div className="px-6 pt-6 flex flex-col gap-6">
      <span className="text-[10px] font-extrabold text-[#0D9488] uppercase tracking-widest border border-[#CCFBF1] bg-[#F0FDFA] px-3 py-1 rounded-full inline-flex items-center gap-1.5 self-center">
        <Sparkles className="w-3 h-3" /> Prediction Time
      </span>
      <h1 className="serif-header text-xl font-bold text-center leading-snug text-[#1A1A1A]">{card.heading}</h1>

      <div className="space-y-3">
        {card.options.map((opt) => {
          const isSelected = selectedId === opt.id
          let classes = 'border-[#451A03] bg-[#78350F] text-[#FEF3C7] shadow-[3px_3px_0px_#451A03]'
          if (answered) {
            if (opt.is_correct) classes = 'bg-emerald-500 border-emerald-600 text-white shadow-none'
            else if (isSelected) classes = 'bg-rose-500 border-rose-600 text-white shadow-none'
            else classes = 'bg-[#F3F4F6] border-[#E5E7EB] text-[#9CA3AF] shadow-none opacity-40'
          }
          return (
            <button
              key={opt.id}
              disabled={answered}
              onClick={() => select(opt.id)}
              className={`w-full relative p-4 rounded-xl text-sm font-bold transition flex items-center justify-between border-2 overflow-hidden ${classes}`}
            >
              {!answered && <div className="absolute inset-0 crate-texture opacity-30 mix-blend-overlay" />}
              <span className="flex items-center gap-3 relative z-10">
                {opt.emoji && <span className="text-2xl">{opt.emoji}</span>}
                <span className="serif-header">{opt.label}</span>
              </span>
              {answered && opt.is_correct && <CheckCircle2 className="w-5 h-5 relative z-10" />}
              {answered && isSelected && !opt.is_correct && <XCircle className="w-5 h-5 relative z-10" />}
            </button>
          )
        })}
      </div>

      {selected && (
        <div className="bg-white border-2 border-[#1A1A1A] rounded-xl p-4 shadow-[2px_2px_0px_#1A1A1A] flex gap-3 items-center">
          <CatMascot mood={card.reveal_payload.mascot_reaction_mood} className="w-14 h-14 shrink-0" />
          <div className="flex-1 text-[13px] leading-relaxed text-[#4B5563]">
            <p className="font-bold text-[#1A1A1A] mb-1">{selected.is_correct ? 'Nailed it! Spot on.' : 'A great guess, but...'}</p>
            <BoldText text={card.reveal_payload.feedback_text} />
          </div>
        </div>
      )}
    </div>
  )
}
