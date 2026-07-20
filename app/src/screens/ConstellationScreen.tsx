import { useState } from 'react'
import { Sparkles, BookOpen, Globe2 } from 'lucide-react'
import type { ConstellationNode } from '../lib/journeyStore'
import BoldText from '../components/BoldText'

// Node positions are laid out deterministically from index (no Math.random)
// so the map doesn't jump around between renders.
const POSITIONS = [
  { x: 30, y: 30 },
  { x: 68, y: 45 },
  { x: 45, y: 68 },
  { x: 78, y: 22 },
  { x: 20, y: 62 },
]

export default function ConstellationScreen({ nodes }: { nodes: ConstellationNode[] }) {
  const [selected, setSelected] = useState<ConstellationNode | null>(null)

  if (nodes.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#0B1120] text-white">
        <p className="text-sm text-[#9CA3AF]">Complete an expedition and it'll appear here as a star in your mind palace.</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-[#0F172A] to-[#020617] text-white relative overflow-hidden">
      <div className="text-center pt-6 pb-2">
        <h2 className="text-xs font-black tracking-widest text-[#9CA3AF] uppercase">Your Mind Palace</h2>
        <p className="text-[10px] text-emerald-400 font-extrabold tracking-wider mt-0.5 uppercase">
          {nodes.length} Expedition{nodes.length === 1 ? '' : 's'} Mastered
        </p>
      </div>

      <div className="flex-1 relative m-4 rounded-3xl border border-[#1E293B] bg-gradient-to-b from-[#0F172A] to-[#020617] overflow-hidden">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.slice(1).map((_, i) => {
            const a = POSITIONS[i % POSITIONS.length]
            const b = POSITIONS[(i + 1) % POSITIONS.length]
            return (
              <line key={i} x1={`${a.x}%`} y1={`${a.y}%`} x2={`${b.x}%`} y2={`${b.y}%`} stroke="#D97706" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
            )
          })}
        </svg>

        {nodes.map((node, i) => {
          const pos = POSITIONS[i % POSITIONS.length]
          return (
            <button
              key={node.id}
              onClick={() => setSelected(node)}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 hover:scale-110 transition"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D97706] to-[#FBBF24] border-2 border-white/20 shadow-[0_0_15px_rgba(217,119,6,0.5)] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-[8px] font-black uppercase text-center text-[#E2E8F0] max-w-[80px]">{node.title}</span>
            </button>
          )
        })}
      </div>

      <div className={`absolute bottom-0 w-full transition-transform duration-500 ${selected ? 'translate-y-0' : 'translate-y-full'}`}>
        {selected && (
          <div className="bg-[#1E293B] border-t border-[#374151] rounded-t-3xl p-6 pb-10 relative" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-[#4B5563] rounded-full mx-auto mb-5" />
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FBBF24]" />
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#FBBF24]">{selected.category}</span>
            </div>
            <h2 className="serif-header text-xl font-bold text-white mb-4">{selected.title}</h2>
            <div className="bg-[#0F172A] border border-[#374151] rounded-2xl p-4 mb-4">
              <h4 className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3 h-3" /> The Synthesis
              </h4>
              <p className="serif-header text-sm leading-relaxed text-[#E5E7EB]">
                "<BoldText text={selected.synthesis} />"
              </p>
            </div>
            <button onClick={() => setSelected(null)} className="w-full bg-[#374151] text-white py-3 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2">
              <Globe2 className="w-4 h-4" /> Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
