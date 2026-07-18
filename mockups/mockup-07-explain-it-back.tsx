import React, { useState, useEffect } from 'react';
import { ChevronRight, Pause, Bookmark, PenTool, Sparkles, Send, MessageSquare, Award } from 'lucide-react';

// --- LAYER 3: CUTE CAT MASCOT (Reused for feedback) ---
function CuteCatSvg({ className = "w-16 h-16", hasHat = false }) {
  return (
    <svg className={`${className} transition-all duration-300 drop-shadow-md`} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="55" r="44" fill="#FEF3C7" opacity="0.3" />
      <path d="M20,38 L34,10 L48,32 Z" fill="#E28743" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
      <path d="M26,35 L34,16 L42,30 Z" fill="#FCA5A5" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M80,38 L66,10 L52,32 Z" fill="#E28743" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
      <path d="M74,35 L66,16 L58,30 Z" fill="#FCA5A5" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" />
      <ellipse cx="50" cy="56" rx="36" ry="30" fill="#F59E0B" stroke="#1A1A1A" strokeWidth="3" />
      <ellipse cx="50" cy="68" rx="18" ry="12" fill="#FCFAF7" stroke="#1A1A1A" strokeWidth="1.5" />
      <path d="M44,28 Q50,34 50,38" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M56,28 Q50,34 50,38" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M36,32 Q44,36 44,40" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
      <path d="M64,32 Q56,36 56,40" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
      
      {/* Happy Eyes */}
      <path d="M30,52 Q35,47 40,52" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M60,52 Q65,47 70,52" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
      
      <circle cx="23" cy="61" r="4.5" fill="#FCA5A5" opacity="0.75" />
      <circle cx="77" cy="61" r="4.5" fill="#FCA5A5" opacity="0.75" />
      <polygon points="47,59 53,59 50,63" fill="#FB7185" stroke="#1A1A1A" strokeWidth="1" strokeLinejoin="round" />
      <path d="M43,65 Q50,70 50,64" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M57,65 Q50,70 50,64" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <g stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round">
        <line x1="22" y1="58" x2="6" y2="55" />
        <line x1="20" y1="63" x2="4" y2="64" />
        <line x1="21" y1="68" x2="6" y2="72" />
        <line x1="78" y1="58" x2="94" y2="55" />
        <line x1="80" y1="63" x2="96" y2="64" />
        <line x1="79" y1="68" x2="94" y2="72" />
      </g>
      {hasHat && (
        <g className="animate-bounce" style={{ animationDuration: '3s' }}>
          <path d="M25,18 C28,10 44,7 52,14 L72,8 C65,1 45,-3 25,6 Z" fill="#1E293B" stroke="#1A1A1A" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M32,15 Q50,5 68,10 C68,10 50,18 32,15 Z" fill="#0F172A" stroke="#1A1A1A" strokeWidth="1.5" />
          <polygon points="48,7 50,3 52,7 56,9 52,11 50,15 48,11 44,9" fill="#FBBF24" stroke="#1A1A1A" strokeWidth="1" />
        </g>
      )}
    </svg>
  );
}

// --- LAYER 3: PROGRESS BAR CAT (Moved to Node 5 - FINAL NODE) ---
function CatInBoatSvg() {
  return (
    <svg viewBox="0 0 60 60" fill="none" className="w-10 h-10 drop-shadow-md overflow-visible">
      <path d="M10,50 Q30,55 50,50" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M12,42 L20,48 L40,48 L48,42 Z" fill="#78350F" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M15,44 L45,44" stroke="#451A03" strokeWidth="1" />
      <line x1="35" y1="18" x2="35" y2="42" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M35,20 Q25,28 35,38 Z" fill="#FCFAF7" stroke="#1A1A1A" strokeWidth="1" />
      <g transform="translate(18, 26)">
        <ellipse cx="10" cy="10" rx="8" ry="7" fill="#F59E0B" stroke="#1A1A1A" strokeWidth="1.5" />
        <path d="M4,4 L7,0 L10,3 Z" fill="#E28743" stroke="#1A1A1A" strokeWidth="1" strokeLinejoin="round" />
        <path d="M16,4 L13,0 L10,3 Z" fill="#E28743" stroke="#1A1A1A" strokeWidth="1" strokeLinejoin="round" />
        <ellipse cx="10" cy="13" rx="4" ry="3" fill="#FCFAF7" />
        <circle cx="7" cy="9" r="1.2" fill="#1A1A1A" />
        <circle cx="13" cy="9" r="1.2" fill="#1A1A1A" />
        <path d="M5,2 Q10,0 15,2 L14,4 L6,4 Z" fill="#1E293B" stroke="#1A1A1A" strokeWidth="1" />
      </g>
    </svg>
  );
}

export default function ExplainItBackMockup() {
  const [userText, setUserText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackReceived, setFeedbackReceived] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);

  const isInputValid = userText.trim().split(' ').length > 3; // Basic validation

  const handleSubmit = () => {
    if (!isInputValid) return;
    setIsSubmitting(true);
    
    // Simulate Claude API processing time (1.5 seconds)
    setTimeout(() => {
      setIsSubmitting(false);
      setFeedbackReceived(true);
    }, 1500);
  };

  const handleMint = () => {
    if (!feedbackReceived) return;
    setIsSwiping(true);
    // In a real app, this advances to the Mint/Collect screen
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#1A1A1A] font-sans antialiased selection:bg-[#D97706] selection:text-white flex justify-center items-center">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .serif-header { font-family: 'Lora', Georgia, serif; }
        .sans-body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        
        .card-swipe-up {
          transform: translateY(-100%);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .lined-paper {
          background-color: #FFFBEB;
          background-image: repeating-linear-gradient(transparent, transparent 27px, #E5E7EB 28px);
          background-attachment: local;
        }
      `}</style>

      <div className="w-full max-w-md bg-[#F9F6F0] h-[850px] max-h-screen flex flex-col relative overflow-hidden sans-body shadow-2xl">
        
        {/* --- GLOBAL APP HEADER --- */}
        <header className="px-6 pt-6 pb-4 flex items-center justify-between z-20 border-b border-[#E9E4DB] bg-white/50 backdrop-blur-md">
          <button className="w-10 h-10 rounded-full bg-white border border-[#E9E4DB] shadow-sm flex items-center justify-center text-[#5C574F] hover:bg-[#F3EFE6] transition">
            <Pause className="w-5 h-5 fill-current" />
          </button>
          
          <div className="bg-[#E0F2FE] border border-[#BAE6FD] px-4 py-1.5 rounded-full">
            <span className="text-xs font-bold text-[#0369A1] uppercase tracking-widest drop-shadow-sm">
              Ivory Coast
            </span>
          </div>

          <button className="w-10 h-10 rounded-full bg-white border border-[#E9E4DB] shadow-sm flex items-center justify-center text-[#5C574F] hover:bg-[#F3EFE6] transition">
            <Bookmark className="w-4 h-4" />
          </button>
        </header>

        {/* --- CARD CONTENT AREA --- */}
        <div className={`flex-1 overflow-y-auto pb-24 px-6 pt-8 flex flex-col transition-transform origin-bottom ${isSwiping ? 'card-swipe-up' : ''}`}>
          
          {!feedbackReceived ? (
            <>
              {/* Act Label */}
              <div className="mb-4 text-center">
                <span className="text-[10px] font-extrabold text-[#D97706] uppercase tracking-widest border border-[#F5E3B3] bg-[#FDF6E2] px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-sm">
                  <PenTool className="w-3 h-3" /> Explain It Back
                </span>
              </div>

              {/* The Synthesis Prompt */}
              <h1 className="serif-header text-2xl font-bold text-[#1A1A1A] leading-snug text-center mb-3">
                How would you explain this to a friend?
              </h1>
              <p className="text-sm text-center text-[#6B7280] font-medium mb-8 px-4">
                The best way to lock in what you've learned is to phrase it in your own words. Give it a shot!
              </p>

              {/* The Input Workspace (Styled like a journal/notepad) */}
              <div className="relative mb-6">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D97706] to-[#FBBF24] rounded-2xl blur opacity-20"></div>
                <div className="relative bg-white border-2 border-[#1A1A1A] rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] overflow-hidden flex flex-col">
                  
                  {/* Textarea */}
                  <textarea
                    value={userText}
                    onChange={(e) => setUserText(e.target.value)}
                    disabled={isSubmitting}
                    placeholder="So basically, the Ivory Coast is called that because..."
                    className="w-full h-40 resize-none p-5 text-[15px] text-[#1A1A1A] leading-[28px] lined-paper focus:outline-none placeholder:text-[#9CA3AF] disabled:opacity-50 font-medium"
                  />
                  
                  {/* Action Bar */}
                  <div className="bg-white border-t-2 border-[#1A1A1A] p-3 flex justify-between items-center">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isInputValid ? 'text-emerald-600' : 'text-[#9CA3AF]'}`}>
                      {isInputValid ? 'Ready to send' : 'Keep writing...'}
                    </span>
                    <button
                      onClick={handleSubmit}
                      disabled={!isInputValid || isSubmitting}
                      className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wide flex items-center gap-2 transition-all ${
                        isInputValid && !isSubmitting
                          ? 'bg-[#1A1A1A] text-[#FCD34D] hover:bg-[#333] shadow-sm cursor-pointer'
                          : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Sparkles className="w-4 h-4 animate-spin text-[#D97706]" />
                          Analyzing...
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
            </>
          ) : (
            
            /* --- STATE 2: THE FEEDBACK REVEAL --- */
            <div className="flex flex-col animate-fadeIn">
              
              {/* User's Submitted Text (Framed cleanly) */}
              <div className="mb-8">
                <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mb-2 flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" /> Your Explanation
                </p>
                <div className="bg-white border-2 border-[#E1DCD0] rounded-xl p-5 text-[15px] text-[#4B5563] italic leading-relaxed font-medium">
                  "{userText}"
                </div>
              </div>

              {/* Cap'n Cat's Feedback (Simulated Claude Response) */}
              <div className="relative">
                {/* Cat Avatar overlapping the box */}
                <div className="absolute -top-6 left-6 z-10 bg-white rounded-full border-2 border-[#1A1A1A] p-1 shadow-md">
                  <CuteCatSvg className="w-12 h-12" hasHat={true} />
                </div>
                
                {/* Feedback Bubble */}
                <div className="bg-[#FFFBEB] border-2 border-[#D97706] rounded-2xl pt-10 pb-6 px-6 shadow-[0_8px_30px_rgba(217,119,6,0.15)] relative mt-4">
                  <h3 className="serif-header font-bold text-lg text-[#B45309] mb-2 flex items-center gap-2">
                    Brilliant summary! <Sparkles className="w-4 h-4 text-[#D97706]" />
                  </h3>
                  <p className="text-[14px] text-[#1A1A1A] leading-relaxed font-medium">
                    You perfectly captured the core tension. It really is a tug-of-war between keeping a globally recognized "brand name" for their exports, versus shaking off a colonial label assigned by 15th-century Portuguese sailors. 
                    <br/><br/>
                    You've mapped this territory completely. Ready to mint your expedition card?
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* --- BOTTOM PROGRESS BAR & NAVIGATION (Node 5 - Final) --- */}
        <div className="absolute bottom-0 w-full bg-white border-t border-[#E9E4DB] px-6 py-4 flex items-center justify-between z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
          
          {/* Progress Tracker (Node 5 active) */}
          <div className="flex-1 relative h-10 flex items-center">
            <div className="absolute left-2 right-12 top-1/2 -translate-y-1/2 border-t-2 border-[#D97706]" />
            <div className="relative z-10 flex justify-between w-full pr-10">
              <div className="w-3 h-3 rounded-full bg-[#D97706] border-2 border-white shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#D97706] border-2 border-white shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#D97706] border-2 border-white shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#D97706] border-2 border-white shadow-sm" />
              
              {/* NODE 5: Final Node Active */}
              <div className="w-3 h-3 rounded-full bg-[#D97706] border-2 border-[#FCD34D] shadow-[0_0_10px_rgba(217,119,6,0.5)] relative">
                {/* THE CAT MASCOT (Arrived at the final destination) */}
                <div className="absolute bottom-2 -left-4 animate-bounce" style={{ animationDuration: '2.5s' }}>
                  <CatInBoatSvg />
                </div>
              </div>
            </div>
          </div>

          {/* Swipe/Next Button -> Transforms into "Mint" button */}
          {!feedbackReceived ? (
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#E1DCD0] flex items-center justify-center shadow-inner opacity-50">
              <Award className="w-6 h-6 text-[#A8A29E]" />
            </div>
          ) : (
            <button 
              onClick={handleMint}
              className="flex-shrink-0 px-6 h-14 bg-gradient-to-r from-[#D97706] to-[#F59E0B] rounded-full flex items-center justify-center transition-all shadow-[0_4px_15px_rgba(217,119,6,0.4)] group relative overflow-hidden text-white font-bold uppercase tracking-wider text-xs gap-2 hover:scale-105"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              Mint Card
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}