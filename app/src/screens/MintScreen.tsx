import { useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { Download, Share2, Sparkles, Star, ArrowRight } from 'lucide-react'
import { themeImageUrl } from '../lib/assets'
import BoldText from '../components/BoldText'
import type { Journey } from '../types/journey'

export default function MintScreen({
  journey,
  onBranch,
  onViewConstellation,
}: {
  journey: Journey
  onBranch: (hook: string) => void
  onViewConstellation: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  function handleMouseMove(e: MouseEvent) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    setRotation({ x: ((centerY - y) / centerY) * 15, y: ((x - centerX) / centerX) * 15 })
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
  }

  function handleMouseLeave() {
    setHovered(false)
    setRotation({ x: 0, y: 0 })
    setGlare({ x: 50, y: 50 })
  }

  const mint = journey.payoff_layer.mint_card

  return (
    <div className="flex-1 flex flex-col p-6 bg-gradient-to-b from-[#1E293B] to-[#0F172A] text-white overflow-y-auto">
      <div className="text-center mb-6 mt-2">
        <h2 className="text-[#FBBF24] text-[10px] font-extrabold uppercase tracking-[0.3em] mb-2">Expedition Complete</h2>
        <h1 className="serif-header text-2xl font-bold">{mint.title}</h1>
      </div>

      <div
        className="mx-auto w-full max-w-[280px] aspect-[3/4] float-anim mb-8"
        style={{ perspective: '1200px' }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => setHovered(true)}
          className="w-full h-full rounded-2xl border-[3px] border-[#374151] shadow-2xl relative bg-[#1A1A1A] cursor-pointer overflow-hidden"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d',
            transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.25,0.8,0.25,1)',
            '--glare-x': `${glare.x}%`,
            '--glare-y': `${glare.y}%`,
          } as CSSProperties}
        >
          <img
            src={themeImageUrl(journey.expedition_metadata.assigned_visual_theme, 'hero')}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
          <div className={`absolute inset-0 holo-glare rounded-xl ${hovered ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`absolute inset-0 holo-foil rounded-xl ${hovered ? 'opacity-100' : 'opacity-0'}`} />

          <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between items-start">
              <div className="bg-[#1A1A1A]/80 border border-[#FDE68A]/30 px-3 py-1 rounded-full text-[9px] text-[#FDE68A] font-bold tracking-widest uppercase">
                {mint.category}
              </div>
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/80 border border-[#FDE68A]/30 flex items-center justify-center">
                <Star className="w-4 h-4 text-[#FDE68A] fill-[#FDE68A]" />
              </div>
            </div>
            <div className="bg-[#1A1A1A]/90 border-t border-[#FDE68A]/40 -mx-4 -mb-4 p-4">
              <h3 className="text-[#FBBF24] text-[10px] font-extrabold uppercase tracking-widest mb-1">The Synthesis</h3>
              <p className="serif-header text-sm text-white leading-relaxed">
                <BoldText text={mint.shareable_synthesis} />
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 max-w-[280px] mx-auto w-full mb-10">
        <button className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2">
          <Download className="w-4 h-4" /> Save
        </button>
        <button className="flex-1 bg-[#D97706] hover:bg-[#F59E0B] border border-[#FDE68A]/50 text-white py-3 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2">
          <Share2 className="w-4 h-4" /> Share
        </button>
      </div>

      <div className="w-full max-w-[280px] mx-auto">
        <div className="flex items-center gap-2 mb-3 text-[#9CA3AF]">
          <Sparkles className="w-3.5 h-3.5" />
          <h3 className="text-[11px] font-extrabold uppercase tracking-widest">Continue down the rabbit hole...</h3>
        </div>
        <div className="space-y-3">
          {journey.payoff_layer.branches.map((branch) => (
            <button
              key={branch.hook}
              onClick={() => onBranch(branch.hook)}
              className="w-full bg-[#1E293B] border border-[#374151] hover:border-[#D97706] p-4 rounded-2xl flex items-center justify-between group transition text-left"
            >
              <span className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[#D97706]/20 flex items-center justify-center text-lg shrink-0">{branch.emoji}</span>
                <span>
                  <span className="block text-sm font-bold text-[#E5E7EB] group-hover:text-[#FBBF24]">{branch.hook}</span>
                  <span className="block text-[10px] mt-0.5 font-medium uppercase tracking-wider text-[#9CA3AF]">{branch.category}</span>
                </span>
              </span>
              <ArrowRight className="w-4 h-4 text-[#4B5563] group-hover:text-[#FBBF24] shrink-0" />
            </button>
          ))}
        </div>
        <button onClick={onViewConstellation} className="w-full text-[#9CA3AF] text-xs font-bold uppercase tracking-widest py-4 hover:text-white transition">
          View Constellation Map 🌌
        </button>
      </div>
    </div>
  )
}
