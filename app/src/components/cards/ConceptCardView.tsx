import { Maximize2 } from 'lucide-react'
import ThemeIllustration from '../ThemeIllustration'
import BoldText from '../BoldText'
import type { ConceptCard, SemanticTheme } from '../../types/journey'

export default function ConceptCardView({ card, theme }: { card: ConceptCard; theme: SemanticTheme }) {
  return (
    <div className="flex flex-col">
      <ThemeIllustration theme={theme} variant="hero" />
      <div className="px-6 pt-4 flex flex-col gap-3">
        <span className="text-[10px] font-extrabold text-[#D97706] uppercase tracking-widest border border-[#F5E3B3] bg-[#FDF6E2] px-2.5 py-1 rounded-md inline-block self-start">
          {card.act_title}
        </span>
        <h1 className="serif-header text-2xl font-bold text-[#1A1A1A] leading-tight">{card.heading}</h1>
        <div className="space-y-3 text-[15px] text-[#4B5563] leading-relaxed font-medium">
          {card.body_markdown.map((paragraph, i) => (
            <p key={i}>
              <BoldText text={paragraph} />
            </p>
          ))}
        </div>
        <button className="flex items-center gap-2 text-xs font-bold text-[#0D9488] self-start mt-2">
          <Maximize2 className="w-4 h-4" /> Expand Illustration
        </button>
      </div>
    </div>
  )
}
