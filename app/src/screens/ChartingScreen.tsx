import { useEffect, useState } from 'react'
import { Sparkles, CheckCircle2 } from 'lucide-react'
import CatMascot from '../components/CatMascot'

const PHASES = [
  'Plotting initial coordinates...',
  'Consulting historical trade archives...',
  'Calibrating to your knowledge level...',
  'Drafting the story cards...',
  'Painting the expedition canvas...',
  'Binding the final deck...',
]

export default function ChartingScreen({ query, ready, onDone }: { query: string; ready: boolean; onDone: () => void }) {
  const [phaseIndex, setPhaseIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPhaseIndex((p) => Math.min(p + 1, PHASES.length - 1))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex-1 flex flex-col p-8 justify-between bg-gradient-to-b from-[#0B1120] to-[#1E293B] text-white">
      <div className="text-center mt-6 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E293B]/80 border border-[#374151]">
          <Sparkles className="w-3.5 h-3.5 text-[#FBBF24]" />
          <span className="text-[10px] uppercase font-extrabold text-[#FBBF24] tracking-widest">Destination Set</span>
        </div>
        <h2 className="serif-header text-xl font-bold leading-tight opacity-90 italic px-2">"{query}"</h2>
      </div>

      <div className="relative flex items-center justify-center my-10 w-56 h-56 mx-auto">
        <div className="absolute inset-0 rounded-full border border-dashed border-[#FBBF24]/40 animate-spin" style={{ animationDuration: '20s' }} />
        <div
          className={`absolute w-28 h-28 bg-[#FFFBEB] rounded-full border-4 border-[#1E293B] shadow-[0_0_30px_rgba(217,119,6,0.3)] flex items-center justify-center transition-transform duration-700 ${
            ready ? 'scale-110 shadow-[0_0_50px_rgba(251,191,36,0.5)]' : ''
          }`}
        >
          <CatMascot mood={ready ? 'celebrating' : 'thinking'} className="w-20 h-20" />
        </div>
        {ready && (
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-1 border-2 border-[#0B1120]">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
        )}
      </div>

      <div className="bg-[#0F172A]/60 p-6 rounded-3xl border border-[#374151] space-y-4">
        <p className="text-sm font-semibold text-center text-[#E5E7EB]">{ready ? 'Expedition mapped and ready.' : PHASES[phaseIndex]}</p>
        {ready ? (
          <button
            onClick={onDone}
            className="w-full py-3.5 rounded-xl bg-[#FBBF24] text-[#1A1A1A] font-extrabold text-xs uppercase tracking-wider hover:bg-[#FCD34D] transition"
          >
            Begin Expedition
          </button>
        ) : (
          <div className="w-full bg-[#1E293B] h-2.5 rounded-full overflow-hidden border border-[#374151]">
            <div
              className="h-full bg-gradient-to-r from-[#D97706] to-[#FBBF24] rounded-full transition-all"
              style={{ width: `${((phaseIndex + 1) / PHASES.length) * 100}%` }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
