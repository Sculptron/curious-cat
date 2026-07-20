import { ArrowRight, Flame } from 'lucide-react'
import CatMascot from '../components/CatMascot'
import { listSparkPrompts } from '../lib/journeySource'

export default function SparkFeedScreen({ onLaunch }: { onLaunch: (query: string) => void }) {
  const sparks = listSparkPrompts()

  return (
    <div className="flex-1 flex flex-col bg-[#F4F1EA] text-[#1A1A1A] overflow-y-auto">
      <header className="px-6 pt-6 pb-4 flex items-center gap-3 bg-white border-b border-[#E9E4DB] sticky top-0">
        <div className="w-10 h-10 rounded-full bg-[#FCFAF7] border-2 border-[#1A1A1A] flex items-center justify-center overflow-hidden">
          <CatMascot mood="happy" className="w-9 h-9" />
        </div>
        <div>
          <h1 className="serif-header text-lg font-bold leading-none">Spark Feed</h1>
          <div className="flex items-center gap-1 mt-1 text-[#D97706]">
            <Flame className="w-3 h-3 fill-current" />
            <span className="text-[9px] uppercase tracking-wider font-extrabold">Ignite Curiosity</span>
          </div>
        </div>
      </header>

      <div className="flex-1 px-5 py-6 space-y-5">
        {sparks.map((spark) => (
          <button
            key={spark.query}
            onClick={() => onLaunch(spark.query)}
            className="w-full text-left bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#1A1A1A] transition"
          >
            <div className="bg-[#FFFBEB] h-28 flex items-center justify-center relative border-b-2 border-[#1A1A1A]">
              <span className="text-5xl">{spark.emoji}</span>
              <span className="absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border-2 border-[#1A1A1A] text-[#D97706] bg-[#FDF6E2]">
                {spark.category}
              </span>
            </div>
            <div className="p-4 flex items-center justify-between gap-3">
              <h3 className="serif-header text-base font-bold leading-snug">{spark.query}</h3>
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
