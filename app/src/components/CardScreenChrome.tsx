import { ChevronRight, Pause, Bookmark } from 'lucide-react'
import BoatChrome from './BoatChrome'
import type { MascotMood } from '../types/journey'
import type { ReactNode } from 'react'

// Shared frame for every journey_deck card: the topic header and the
// progress-trail footer (dashed line + node dots + the cat sailing between
// them, Layer 3's "traveling companion" motif) are identical across
// concept/predict/checkpoint/sit_with_it — only the middle content differs.
export default function CardScreenChrome({
  topicLabel,
  cardIndex,
  totalCards,
  boatMood,
  onNext,
  nextEnabled,
  children,
}: {
  topicLabel: string
  cardIndex: number
  totalCards: number
  boatMood: MascotMood
  onNext: () => void
  nextEnabled: boolean
  children: ReactNode
}) {
  return (
    <div className="flex-1 flex flex-col bg-[#F9F6F0] text-[#1A1A1A] relative overflow-hidden">
      <header className="px-6 pt-6 pb-3 flex items-center justify-between shrink-0 border-b border-[#E9E4DB] bg-[#F9F6F0] z-20">
        <button className="w-9 h-9 rounded-full bg-white border border-[#E9E4DB] shadow-sm flex items-center justify-center text-[#5C574F]">
          <Pause className="w-4 h-4 fill-current" />
        </button>
        <div className="bg-[#E0F2FE] border border-[#BAE6FD] px-4 py-1.5 rounded-full">
          <span className="text-[11px] font-bold text-[#0369A1] uppercase tracking-widest">{topicLabel}</span>
        </div>
        <button className="w-9 h-9 rounded-full bg-white border border-[#E9E4DB] shadow-sm flex items-center justify-center text-[#5C574F]">
          <Bookmark className="w-4 h-4" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto pb-24">{children}</div>

      <div className="absolute bottom-0 inset-x-0 bg-white border-t border-[#E9E4DB] px-6 py-4 flex items-center justify-between z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
        <div className="flex-1 relative h-10 flex items-center">
          <div className="absolute left-2 right-12 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#E1DCD0]" />
          <div className="relative z-10 flex justify-between w-full pr-10">
            {Array.from({ length: totalCards }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full border-2 border-white shadow-sm relative ${
                  i <= cardIndex ? 'bg-[#D97706]' : 'bg-[#E1DCD0]'
                }`}
              >
                {i === cardIndex && (
                  <div className="absolute bottom-2 -left-4 animate-bounce" style={{ animationDuration: '2.5s' }}>
                    <BoatChrome mood={boatMood} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={onNext}
          disabled={!nextEnabled}
          className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${
            nextEnabled ? 'bg-[#1A1A1A] text-white hover:bg-[#D97706] hover:scale-105 cursor-pointer' : 'bg-[#E1DCD0] text-[#A8A29E] cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      </div>
    </div>
  )
}
