import { useState } from 'react'
import { PenTool, Send, Sparkles, ChevronRight, MessageSquare, Award } from 'lucide-react'
import CatMascot from '../components/CatMascot'
import BoldText from '../components/BoldText'
import { getExplainItBackFeedback } from '../lib/explainItBack'
import type { UiCalibration } from '../lib/calibration'
import type { ExplainItBackFeedback, Journey } from '../types/journey'

export default function ExplainItBackScreen({
  journey,
  calibration,
  onMint,
}: {
  journey: Journey
  calibration: UiCalibration
  onMint: () => void
}) {
  const [text, setText] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [feedback, setFeedback] = useState<ExplainItBackFeedback | null>(null)
  const isValid = text.trim().split(/\s+/).length > 2

  async function submit() {
    if (!isValid) return
    setAnalyzing(true)
    try {
      const result = await getExplainItBackFeedback(
        journey.expedition_metadata.user_query,
        calibration,
        journey.payoff_layer.mint_card.shareable_synthesis,
        text,
      )
      setFeedback(result)
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'The cat could not read your explanation. Please try again.')
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-[#F9F6F0] text-[#1A1A1A] relative overflow-hidden">
      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-24">
        {!feedback ? (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-[10px] font-extrabold text-[#D97706] uppercase tracking-widest border border-[#F5E3B3] bg-[#FDF6E2] px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                <PenTool className="w-3 h-3" /> Explain It Back
              </span>
            </div>
            <h1 className="serif-header text-xl font-bold text-center leading-snug">{journey.payoff_layer.explain_it_back_prompt}</h1>
            <div className="bg-white border-2 border-[#1A1A1A] rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] overflow-hidden flex flex-col">
              <textarea
                value={text}
                disabled={analyzing}
                onChange={(e) => setText(e.target.value)}
                placeholder="So basically..."
                className="w-full h-36 resize-none p-4 text-sm leading-[26px] lined-paper focus:outline-none font-medium"
              />
              <div className="border-t-2 border-[#1A1A1A] p-3 flex justify-between items-center">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isValid ? 'text-emerald-600' : 'text-[#9CA3AF]'}`}>
                  {isValid ? 'Ready to send' : 'Keep writing...'}
                </span>
                <button
                  onClick={submit}
                  disabled={!isValid || analyzing}
                  className={`px-4 py-2 rounded-lg font-bold text-xs uppercase flex items-center gap-2 ${
                    isValid && !analyzing ? 'bg-[#1A1A1A] text-[#FCD34D]' : 'bg-[#E5E7EB] text-[#9CA3AF]'
                  }`}
                >
                  {analyzing ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" /> Analyzing...
                    </>
                  ) : (
                    <>
                      Send to Cat <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mb-2 flex items-center gap-1">
                <MessageSquare className="w-3 h-3" /> Your Explanation
              </p>
              <div className="bg-white border-2 border-[#E1DCD0] rounded-xl p-4 text-sm text-[#4B5563] italic leading-relaxed">"{text}"</div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 left-4 z-10 bg-white rounded-full border-2 border-[#1A1A1A] p-1">
                <CatMascot mood={feedback.mascot_reaction_mood} className="w-12 h-12" />
              </div>
              <div className="bg-[#FFFBEB] border-2 border-[#D97706] rounded-2xl pt-8 pb-5 px-5 mt-4">
                <h3 className="serif-header font-bold text-base text-[#B45309] mb-2 flex items-center gap-2">
                  {feedback.headline} <Sparkles className="w-4 h-4 text-[#D97706]" />
                </h3>
                <p className="text-sm text-[#1A1A1A] leading-relaxed">
                  <BoldText text={feedback.feedback_text} />
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 inset-x-0 bg-white border-t border-[#E9E4DB] px-6 py-4 flex items-center justify-end z-20">
        {!feedback ? (
          <div className="w-14 h-14 rounded-full bg-[#E1DCD0] flex items-center justify-center opacity-50">
            <Award className="w-6 h-6 text-[#A8A29E]" />
          </div>
        ) : (
          <button
            onClick={onMint}
            className="px-6 h-14 bg-gradient-to-r from-[#D97706] to-[#F59E0B] rounded-full flex items-center gap-2 text-white font-bold uppercase tracking-wider text-xs"
          >
            Mint Card <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
