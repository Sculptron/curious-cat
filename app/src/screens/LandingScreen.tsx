import { useState, type FormEvent } from 'react'
import { Search, ArrowRight, Sparkle } from 'lucide-react'
import CatMascot from '../components/CatMascot'
import { UI_CALIBRATIONS, CALIBRATION_LABELS, type UiCalibration } from '../lib/calibration'

function catSpeech(query: string, calibration: UiCalibration): string {
  if (query.trim().length > 0) {
    const clipped = query.length > 40 ? `${query.slice(0, 40)}...` : query
    return `Oooh, "${clipped}" is a brilliant question! Let's map it.`
  }
  switch (calibration) {
    case 'novice':
      return "Ahoy! I'm the Curious Cat. Tell me what you're wondering, and I'll build us a cozy map from scratch!"
    case 'seeker':
      return 'Intriguing! We will skip the basic coordinates and look deeper into the structural gears.'
    case 'adept':
      return "Excellent. Direct sailing into deep, uncontested waters. I'll prepare the advanced treatises!"
  }
}

export default function LandingScreen({
  calibration,
  onCalibrationChange,
  onLaunch,
  onOpenSparks,
}: {
  calibration: UiCalibration
  onCalibrationChange: (level: UiCalibration) => void
  onLaunch: (query: string) => void
  onOpenSparks: () => void
}) {
  const [query, setQuery] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    onLaunch(query.trim())
  }

  return (
    <div className="flex-1 flex flex-col p-6 gap-5 overflow-y-auto">
      <div className="bg-[#FCFAF7] border-2 border-[#1A1A1A] rounded-2xl p-4 shadow-[4px_4px_0px_0px_#1A1A1A] flex gap-4 items-start">
        <div className="w-16 h-16 bg-[#FFFBEB] rounded-xl shrink-0 flex items-center justify-center border-2 border-[#1A1A1A]">
          <CatMascot mood="happy" className="w-14 h-14" />
        </div>
        <div className="flex-1 bg-white border-2 border-[#1A1A1A] rounded-xl p-3 text-xs text-[#1A1A1A] leading-relaxed font-semibold relative">
          <div className="absolute left-0 top-4 w-3 h-3 bg-white border-l-2 border-b-2 border-[#1A1A1A] -translate-x-1.5 rotate-45" />
          {catSpeech(query, calibration)}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="flex items-center gap-1 text-xs font-extrabold text-[#5C574F] uppercase tracking-wider mb-2">
            Enter your raw curiosity <Sparkle className="w-3.5 h-3.5 text-[#D97706]" />
          </label>
          <div className="relative rounded-2xl border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] bg-white overflow-hidden">
            <Search className="w-5 h-5 text-[#D97706] absolute top-4 left-4" />
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Why is Côte d'Ivoire called Ivory Coast?..."
              className="w-full bg-transparent pl-12 pr-4 pt-4 pb-4 text-sm text-[#1A1A1A] font-medium placeholder-[#A8A29E] focus:outline-none min-h-[110px] resize-none"
            />
          </div>
        </div>

        <div className="bg-[#FCFAF7] border-2 border-[#1A1A1A] rounded-2xl p-4">
          <h4 className="text-xs font-extrabold text-[#1A1A1A] uppercase tracking-wider mb-3">Where are you starting from?</h4>
          <div className="grid grid-cols-3 gap-2 bg-[#F3EFE6] p-1.5 rounded-xl border-2 border-[#1A1A1A]">
            {UI_CALIBRATIONS.map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => onCalibrationChange(lvl)}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  calibration === lvl ? 'bg-[#1A1A1A] text-[#FCD34D]' : 'text-[#5C574F]'
                }`}
              >
                {CALIBRATION_LABELS[lvl].emoji} {CALIBRATION_LABELS[lvl].label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!query.trim()}
          className={`w-full py-4 rounded-2xl border-2 border-[#1A1A1A] font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 transition ${
            query.trim()
              ? 'bg-[#D97706] text-white shadow-[4px_4px_0px_0px_#1A1A1A] hover:bg-[#C2410C]'
              : 'bg-[#E1DCD0] text-[#A8A29E] cursor-not-allowed border-dashed shadow-none'
          }`}
        >
          ⛵ Set Sail on Expedition <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="bg-[#F4EFE6]/70 border border-dashed border-[#C5BDB0] rounded-xl p-3 text-center">
        <p className="text-xs text-[#5C574F]">
          Not sure what to ask?{' '}
          <button onClick={onOpenSparks} className="text-[#D97706] font-extrabold hover:underline">
            Jump to the Spark Feed
          </button>
        </p>
      </div>
    </div>
  )
}
