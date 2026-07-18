import React, { useState } from 'react';
import { ChevronRight, Pause, Bookmark, HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';

// --- LAYER 3: INFORMATIVE CAT SVG (Used for feedback) ---
function InformativeCatSvg({ className = "w-16 h-16", isCorrect = true }) {
  return (
    <svg className={`${className} drop-shadow-md overflow-visible`} viewBox="0 0 100 100" fill="none">
      {/* Background Glow */}
      <circle cx="50" cy="55" r="44" fill={isCorrect ? "#D1FAE5" : "#FEF3C7"} opacity="0.5" />
      
      {/* Cat Head */}
      <ellipse cx="50" cy="56" rx="36" ry="30" fill="#F59E0B" stroke="#1A1A1A" strokeWidth="3" />
      {/* Ears */}
      <path d="M20,38 L34,10 L48,32 Z" fill="#E28743" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
      <path d="M26,35 L34,16 L42,30 Z" fill="#FCA5A5" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M80,38 L66,10 L52,32 Z" fill="#E28743" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
      <path d="M74,35 L66,16 L58,30 Z" fill="#FCA5A5" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" />
      
      {/* Eyes based on state */}
      {isCorrect ? (
        <g>
          {/* Happy Squinting Eyes */}
          <path d="M30,52 Q35,47 40,52" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M60,52 Q65,47 70,52" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      ) : (
        <g>
          {/* Encouraging, wide eyes */}
          <circle cx="34" cy="52" r="7" fill="#1A1A1A" />
          <circle cx="32" cy="50" r="2.5" fill="white" />
          <circle cx="66" cy="52" r="7" fill="#1A1A1A" />
          <circle cx="64" cy="50" r="2.5" fill="white" />
        </g>
      )}
      
      {/* Blush & Muzzle */}
      <circle cx="23" cy="61" r="5" fill="#FCA5A5" opacity={isCorrect ? "0.9" : "0.5"} />
      <circle cx="77" cy="61" r="5" fill="#FCA5A5" opacity={isCorrect ? "0.9" : "0.5"} />
      <ellipse cx="50" cy="68" rx="18" ry="12" fill="#FCFAF7" stroke="#1A1A1A" strokeWidth="1.5" />
      <polygon points="47,59 53,59 50,63" fill="#FB7185" stroke="#1A1A1A" strokeWidth="1" strokeLinejoin="round" />
      
      {/* Mouth based on state */}
      {isCorrect ? (
        <path d="M43,65 Q50,72 57,65" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      ) : (
        <path d="M46,67 Q50,65 54,67" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      )}

      {/* Whiskers */}
      <g stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round">
        <line x1="22" y1="58" x2="6" y2="55" />
        <line x1="20" y1="63" x2="4" y2="64" />
        <line x1="78" y1="58" x2="94" y2="55" />
        <line x1="80" y1="63" x2="96" y2="64" />
      </g>

      {/* Explorer Hat */}
      <g>
        <path d="M25,18 C28,10 44,7 52,14 L72,8 C65,1 45,-3 25,6 Z" fill="#1E293B" stroke="#1A1A1A" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M32,15 Q50,5 68,10 C68,10 50,18 32,15 Z" fill="#0F172A" stroke="#1A1A1A" strokeWidth="1.5" />
        <polygon points="48,7 50,3 52,7 56,9 52,11 50,15 48,11 44,9" fill="#FBBF24" stroke="#1A1A1A" strokeWidth="1" />
      </g>
    </svg>
  );
}

// --- LAYER 3: PROGRESS BAR CAT (Moved to Node 3) ---
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

export default function CheckpointCardMockup() {
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);

  // Comprehension options based on Concept Card 1
  const options = [
    { 
      id: 'a', 
      text: 'To understand the borders of local African kingdoms.', 
      isCorrect: false,
      feedback: "Not quite! Remember, they weren't interested in local politics—they were drawing a giant commercial shopping catalog."
    },
    { 
      id: 'b', 
      text: 'To mark out exactly what natural resources could be extracted and traded.', 
      isCorrect: true,
      feedback: "Exactly! They literally named the coasts after the cargo they could load onto their ships."
    },
    { 
      id: 'c', 
      text: 'To establish permanent European cities along the coastline.', 
      isCorrect: false,
      feedback: "Actually, permanent settlements came much later. Early on, these were just waystations to grab valuable cargo!"
    }
  ];

  const handleNext = () => {
    if (!selectedOptionId) return;
    setIsSwiping(true);
    setTimeout(() => {
      setIsSwiping(false);
      // In a real app, this advances to Card 4
    }, 400);
  };

  const selectedOption = options.find(o => o.id === selectedOptionId);

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#1A1A1A] font-sans antialiased selection:bg-[#D97706] selection:text-white flex justify-center items-center">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .serif-header { font-family: 'Lora', Georgia, serif; }
        .sans-body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        
        .card-swipe-out {
          transform: translateX(-120%) rotate(-5deg);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
      `}</style>

      <div className="w-full max-w-md bg-[#F9F6F0] h-[850px] max-h-screen flex flex-col relative overflow-hidden sans-body shadow-2xl">
        
        {/* --- GLOBAL APP HEADER --- */}
        <header className="px-6 pt-6 pb-4 flex items-center justify-between z-20 border-b border-[#E9E4DB] bg-[#F9F6F0]">
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
        <div className={`flex-1 overflow-y-auto pb-24 px-8 pt-8 flex flex-col transition-transform origin-bottom ${isSwiping ? 'card-swipe-out' : ''}`}>
          
          {/* Act Label */}
          <div className="mb-4">
            <span className="text-[10px] font-extrabold text-[#0D9488] uppercase tracking-widest border border-[#CCFBF1] bg-[#F0FDFA] px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-sm">
              <HelpCircle className="w-3 h-3" /> Quick Check
            </span>
          </div>

          {/* The Comprehension Question */}
          <h1 className="serif-header text-2xl font-bold text-[#1A1A1A] leading-snug mb-8">
            Based on what we've seen, what was the primary purpose of the early European maps of West Africa?
          </h1>

          {/* --- CHECKPOINT OPTIONS (Clean, Editorial UI) --- */}
          <div className="space-y-3 mb-8">
            {options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const hasAnswered = selectedOptionId !== null;
              
              let containerClass = "bg-white border-[#E1DCD0] hover:border-[#D97706] hover:shadow-md";
              let textClass = "text-[#4B5563]";
              let iconClass = "border-[#D1D5DB] text-transparent"; // Empty circle

              if (hasAnswered) {
                if (isSelected && option.isCorrect) {
                  // Correct selection
                  containerClass = "bg-emerald-50 border-emerald-500 shadow-[2px_2px_0px_#10B981]";
                  textClass = "text-emerald-900 font-bold";
                } else if (isSelected && !option.isCorrect) {
                  // Incorrect selection
                  containerClass = "bg-amber-50 border-amber-500 shadow-[2px_2px_0px_#F59E0B]";
                  textClass = "text-amber-900 font-bold";
                } else if (option.isCorrect) {
                  // Highlight correct answer if they got it wrong
                  containerClass = "bg-white border-emerald-300 border-dashed opacity-80";
                  textClass = "text-emerald-700";
                } else {
                  // Dim unselected incorrect answers
                  containerClass = "bg-white border-[#E1DCD0] opacity-50";
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => !hasAnswered && setSelectedOptionId(option.id)}
                  disabled={hasAnswered}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 flex gap-4 items-start ${containerClass} ${!hasAnswered ? 'cursor-pointer transform hover:-translate-y-0.5' : ''}`}
                >
                  {/* Dynamic Radio Icon */}
                  <div className="mt-0.5 flex-shrink-0">
                    {hasAnswered && option.isCorrect ? (
                      <CheckCircle2 className={`w-5 h-5 ${isSelected ? 'text-emerald-600' : 'text-emerald-400'}`} />
                    ) : hasAnswered && isSelected && !option.isCorrect ? (
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                    ) : (
                      <div className={`w-5 h-5 rounded-full border-2 ${iconClass}`} />
                    )}
                  </div>
                  
                  {/* Option Text */}
                  <span className={`text-[15px] leading-relaxed transition-colors ${textClass}`}>
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* --- FEEDBACK PANE (Warm Correction / Reinforcement) --- */}
          <div className={`transition-all duration-500 ease-out flex gap-4 items-start ${
            selectedOptionId ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}>
            
            {/* Contextual Mascot */}
            <div className="flex-shrink-0 mt-2">
               {selectedOption && (
                 <div className="w-14 h-14 bg-white rounded-full border-2 border-[#1A1A1A] shadow-sm flex items-center justify-center p-1">
                   <InformativeCatSvg 
                     className="w-12 h-12" 
                     isCorrect={selectedOption.isCorrect} 
                   />
                 </div>
               )}
            </div>

            {/* Chat Bubble Feedback */}
            {selectedOption && (
              <div className={`relative flex-1 p-4 rounded-2xl border-2 shadow-sm ${
                selectedOption.isCorrect 
                  ? "bg-emerald-50 border-emerald-200 text-emerald-900" 
                  : "bg-amber-50 border-amber-200 text-amber-900"
              }`}>
                {/* Speech Bubble Triangle */}
                <div className={`absolute top-6 -left-2 w-3 h-3 border-b-2 border-l-2 transform rotate-45 bg-inherit ${
                  selectedOption.isCorrect ? "border-emerald-200" : "border-amber-200"
                }`}></div>
                
                <h4 className="font-bold text-sm mb-1 flex items-center gap-1.5">
                  {selectedOption.isCorrect ? (
                    <><span>Spot on!</span> <Sparkles className="w-3.5 h-3.5 text-emerald-600" /></>
                  ) : (
                    "Almost!"
                  )}
                </h4>
                <p className="text-[13px] leading-relaxed font-medium">
                  {selectedOption.feedback}
                </p>
              </div>
            )}
          </div>

        </div>

        {/* --- BOTTOM PROGRESS BAR & NAVIGATION --- */}
        <div className="absolute bottom-0 w-full bg-white border-t border-[#E9E4DB] px-6 py-4 flex items-center justify-between z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
          
          {/* Progress Tracker (Node 3 active) */}
          <div className="flex-1 relative h-10 flex items-center">
            <div className="absolute left-2 right-12 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#E1DCD0]" />
            <div className="relative z-10 flex justify-between w-full pr-10">
              <div className="w-3 h-3 rounded-full bg-[#D97706] border-2 border-white shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#D97706] border-2 border-white shadow-sm" />
              
              {/* NODE 3: Active */}
              <div className="w-3 h-3 rounded-full bg-[#D97706] border-2 border-white shadow-sm relative">
                {/* THE CAT MASCOT (Has sailed to the third node) */}
                <div className="absolute bottom-2 -left-4 animate-bounce" style={{ animationDuration: '2.5s' }}>
                  <CatInBoatSvg />
                </div>
              </div>
              
              <div className="w-3 h-3 rounded-full bg-[#E1DCD0] border-2 border-white shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#E1DCD0] border-2 border-white shadow-sm" />
            </div>
          </div>

          {/* Swipe/Next Button (Disabled until answered) */}
          <button 
            onClick={handleNext}
            disabled={!selectedOptionId}
            className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg group relative overflow-hidden ${
              selectedOptionId 
                ? 'bg-[#1A1A1A] text-white hover:bg-[#D97706] hover:scale-105 cursor-pointer' 
                : 'bg-[#E1DCD0] text-[#A8A29E] cursor-not-allowed'
            }`}
          >
            {selectedOptionId && <div className="absolute inset-0 rounded-full border-2 border-[#D97706] opacity-0 group-hover:animate-ping" />}
            <ChevronRight className={`w-7 h-7 ${selectedOptionId ? 'group-hover:translate-x-1 transition-transform' : ''}`} />
          </button>
        </div>

      </div>
    </div>
  );
}