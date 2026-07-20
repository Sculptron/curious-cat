import { useState } from 'react'
import { HelpCircle, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react'
import CatMascot from '../CatMascot'
import BoldText from '../BoldText'
import type { CheckpointCard } from '../../types/journey'

export default function CheckpointCardView({ card, onAnswered }: { card: CheckpointCard; onAnswered: () => void }) {
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
      <span className="text-[10px] font-extrabold text-[#0D9488] uppercase tracking-widest border border-[#CCFBF1] bg-[#F0FDFA] px-3 py-1 rounded-full inline-flex items-center gap-1.5 self-start">
        <HelpCircle className="w-3 h-3" /> Quick Check
      </span>
      <h1 className="serif-header text-xl font-bold leading-snug text-[#1A1A1A]">{card.heading}</h1>

      <div className="space-y-3">
        {card.options.map((opt) => {
          const isSelected = selectedId === opt.id
          let containerClass = 'bg-white border-[#E1DCD0] text-[#4B5563]'
          if (answered) {
            if (opt.is_correct) containerClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold'
            else if (isSelected) containerClass = 'bg-amber-50 border-amber-500 text-amber-900 font-semibold'
            else containerClass = 'bg-white border-[#E1DCD0] text-[#9CA3AF] opacity-50'
          }
          return (
            <button
              key={opt.id}
              disabled={answered}
              onClick={() => select(opt.id)}
              className={`w-full text-left p-4 rounded-2xl border-2 flex gap-3 items-start transition ${containerClass}`}
            >
              <span className="mt-0.5 shrink-0">
                {answered && opt.is_correct ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : answered && isSelected ? (
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                ) : (
                  <span className="block w-5 h-5 rounded-full border-2 border-[#D1D5DB]" />
                )}
              </span>
              {opt.emoji && <span className="text-lg leading-none mt-0.5 shrink-0">{opt.emoji}</span>}
              <span className="text-[15px] leading-relaxed">{opt.label}</span>
            </button>
          )
        })}
      </div>

      {selected && (
        <div
          className={`flex gap-3 items-start p-4 rounded-2xl border-2 shadow-sm ${
            selected.is_correct ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}
        >
          <CatMascot mood={selected.is_correct ? 'happy' : 'encouraging'} className="w-12 h-12 shrink-0" />
          <div className="flex-1 text-[13px] leading-relaxed">
            <h4 className="font-bold text-sm mb-1 flex items-center gap-1.5">
              {selected.is_correct ? (
                <>
                  Spot on! <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                </>
              ) : (
                'Almost!'
              )}
            </h4>
            <BoldText text={selected.is_correct ? card.correct_feedback : card.incorrect_feedback} />
          </div>
        </div>
      )}
    </div>
  )
}
