import React, { useState } from 'react';
import { ChevronRight, Pause, Bookmark, Sparkles, CheckCircle2, XCircle } from 'lucide-react';

// --- LAYER 3: CELEBRATING CAT SVG ---
// A specialized version of our mascot for the correct answer reveal.
function CelebratingCatSvg({ className = "w-24 h-24" }) {
  return (
    <svg className={`${className} drop-shadow-xl overflow-visible`} viewBox="0 0 100 100" fill="none">
      {/* Sparkle bursts behind */}
      <g className="animate-spin" style={{ animationDuration: '8s', transformOrigin: '50% 50%' }}>
        <path d="M50,0 L53,40 L90,50 L53,60 L50,100 L47,60 L10,50 L47,40 Z" fill="#FDE68A" opacity="0.4" />
        <path d="M15,15 L45,45 M85,15 L55,45 M15,85 L45,55 M85,85 L55,55" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
      </g>
      
      {/* Cat Head */}
      <ellipse cx="50" cy="56" rx="36" ry="30" fill="#F59E0B" stroke="#1A1A1A" strokeWidth="3" />
      {/* Ears */}
      <path d="M20,38 L34,10 L48,32 Z" fill="#E28743" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
      <path d="M26,35 L34,16 L42,30 Z" fill="#FCA5A5" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M80,38 L66,10 L52,32 Z" fill="#E28743" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
      <path d="M74,35 L66,16 L58,30 Z" fill="#FCA5A5" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" />
      
      {/* Happy Squinting Eyes */}
      <path d="M28,52 Q34,46 40,52" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M60,52 Q66,46 72,52" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
      
      {/* Blush & Muzzle */}
      <circle cx="23" cy="61" r="5" fill="#FCA5A5" opacity="0.9" />
      <circle cx="77" cy="61" r="5" fill="#FCA5A5" opacity="0.9" />
      <ellipse cx="50" cy="68" rx="18" ry="12" fill="#FCFAF7" stroke="#1A1A1A" strokeWidth="1.5" />
      <polygon points="47,59 53,59 50,63" fill="#FB7185" stroke="#1A1A1A" strokeWidth="1" strokeLinejoin="round" />
      
      {/* Big Open Happy Mouth */}
      <path d="M42,65 Q50,75 58,65 Z" fill="#E11D48" stroke="#1A1A1A" strokeWidth="2" strokeLinejoin="round" />
      <path d="M46,65 Q50,70 54,65 Z" fill="#FDA4AF" /> {/* Tongue */}

      {/* Whiskers */}
      <g stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round">
        <line x1="22" y1="58" x2="6" y2="55" />
        <line x1="20" y1="63" x2="4" y2="64" />
        <line x1="78" y1="58" x2="94" y2="55" />
        <line x1="80" y1="63" x2="96" y2="64" />
      </g>

      {/* Explorer Hat */}
      <g className="animate-bounce" style={{ animationDuration: '2s' }}>
        <path d="M25,18 C28,10 44,7 52,14 L72,8 C65,1 45,-3 25,6 Z" fill="#1E293B" stroke="#1A1A1A" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M32,15 Q50,5 68,10 C68,10 50,18 32,15 Z" fill="#0F172A" stroke="#1A1A1A" strokeWidth="1.5" />
        <polygon points="48,7 50,3 52,7 56,9 52,11 50,15 48,11 44,9" fill="#FBBF24" stroke="#1A1A1A" strokeWidth="1" />
      </g>
      
      {/* Giant Gold Coin Held in Paw */}
      <g transform="translate(65, 65) rotate(-15)" className="animate-pulse">
        <circle cx="15" cy="15" r="15" fill="#FBBF24" stroke="#1A1A1A" strokeWidth="2" />
        <circle cx="15" cy="15" r="11" fill="#F59E0B" />
        <path d="M15,6 L15,24 M10,15 L20,15" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <circle cx="10" cy="10" r="3" fill="#FFFBEB" opacity="0.8" />
        {/* Cat Paw overlapping coin */}
        <ellipse cx="5" cy="20" rx="8" ry="6" fill="#F59E0B" stroke="#1A1A1A" strokeWidth="1.5" transform="rotate(30 5 20)" />
      </g>
    </svg>
  );
}

// --- LAYER 3: PROGRESS BAR CAT (Moved to Node 2) ---
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

export default function PredictCardMockup() {
  const [selectedCargo, setSelectedCargo] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);

  // The 3 gamified options
  const cargoOptions = [
    { id: 'timber', emoji: '🪵', label: 'Timber', isCorrect: false },
    { id: 'ivory', emoji: '🐘', label: 'Ivory', isCorrect: true },
    { id: 'pepper', emoji: '🌶️', label: 'Pepper', isCorrect: false }
  ];

  const handleNext = () => {
    if (!selectedCargo) return;
    setIsSwiping(true);
    setTimeout(() => {
      setIsSwiping(false);
      // Advances deck in real app
    }, 400);
  };

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
        
        .crate-texture {
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 10px,
            rgba(0,0,0,0.05) 10px,
            rgba(0,0,0,0.05) 11px
          );
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
          <div className="mb-4 text-center">
            <span className="text-[10px] font-extrabold text-[#0D9488] uppercase tracking-widest border border-[#CCFBF1] bg-[#F0FDFA] px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" /> Prediction Time
            </span>
          </div>

          {/* The Question */}
          <h1 className="serif-header text-2xl font-bold text-[#1A1A1A] leading-snug text-center mb-8">
            What cargo do you think the Portuguese found in massive abundance along this specific coast?
          </h1>

          {/* --- GAMIFIED INTERACTION: THE CRATES --- */}
          <div className="space-y-4 mb-8">
            {cargoOptions.map((cargo) => {
              const isSelected = selectedCargo === cargo.id;
              const showResult = selectedCargo !== null;
              
              let borderClass = "border-[#451A03]";
              let bgClass = "bg-[#78350F]";
              let textClass = "text-[#FEF3C7]";
              
              // State specific styling
              if (showResult) {
                if (isSelected && cargo.isCorrect) {
                  borderClass = "border-emerald-600";
                  bgClass = "bg-emerald-500";
                  textClass = "text-white";
                } else if (isSelected && !cargo.isCorrect) {
                  borderClass = "border-rose-700";
                  bgClass = "bg-rose-500";
                  textClass = "text-white";
                } else if (cargo.isCorrect) {
                  // Highlight correct one if they missed it
                  borderClass = "border-emerald-400 border-dashed";
                  bgClass = "bg-[#F9F6F0]";
                  textClass = "text-emerald-700";
                } else {
                  // Dim the others
                  borderClass = "border-[#E5E7EB]";
                  bgClass = "bg-[#F3F4F6]";
                  textClass = "text-[#9CA3AF]";
                }
              }

              return (
                <button
                  key={cargo.id}
                  onClick={() => !showResult && setSelectedCargo(cargo.id)}
                  disabled={showResult}
                  className={`w-full relative flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-300 transform ${
                    !showResult ? "hover:-translate-y-1 hover:shadow-[4px_6px_0px_#451A03] cursor-pointer shadow-[4px_4px_0px_#451A03]" : ""
                  } ${bgClass} ${borderClass} overflow-hidden`}
                >
                  {/* Subtle wood texture effect */}
                  {!showResult && <div className="absolute inset-0 crate-texture opacity-30 mix-blend-overlay"></div>}
                  
                  <div className="flex items-center gap-4 relative z-10">
                    {/* Icon slot collapses entirely when the payload omits emoji (abstract
                        options get no icon rather than a weak match or empty placeholder) */}
                    {cargo.emoji && (
                      <span className={`text-4xl filter drop-shadow-md transition-transform ${isSelected && !cargo.isCorrect ? 'grayscale opacity-50' : ''}`}>
                        {cargo.emoji}
                      </span>
                    )}
                    <span className={`text-xl font-bold tracking-wide serif-header ${textClass}`}>
                      {cargo.label}
                    </span>
                  </div>

                  {/* Icon Indicators for Revealed State */}
                  {showResult && cargo.isCorrect && isSelected && (
                    <CheckCircle2 className="w-8 h-8 text-white relative z-10 animate-bounce" />
                  )}
                  {showResult && !cargo.isCorrect && isSelected && (
                    <XCircle className="w-8 h-8 text-white relative z-10" />
                  )}
                  {showResult && cargo.isCorrect && !isSelected && (
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest relative z-10">Actual Cargo</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* --- THE REVEAL CONTENT (Only shows after selection) --- */}
          <div className={`transition-all duration-500 ease-out origin-top flex flex-col items-center text-center ${
            selectedCargo ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8 pointer-events-none"
          }`}>
            
            {/* Mascot Reaction */}
            <div className="mb-4">
              {selectedCargo === 'ivory' ? (
                <div className="relative">
                  <CelebratingCatSvg />
                  <div className="absolute -top-4 -right-12 bg-white border-2 border-[#1A1A1A] rounded-xl p-2 shadow-[2px_2px_0px_#1A1A1A] text-[10px] font-bold transform rotate-6">
                    Nailed it!
                  </div>
                </div>
              ) : (
                <div className="w-16 h-16 bg-[#F3EFE6] rounded-full border-2 border-[#E1DCD0] flex items-center justify-center text-2xl shadow-inner">
                  🙀
                </div>
              )}
            </div>

            {/* Dynamic Reveal Text based on choice */}
            {selectedCargo === 'ivory' ? (
              <h3 className="text-xl serif-header font-bold text-emerald-700 mb-2">Spot on!</h3>
            ) : (
              <h3 className="text-xl serif-header font-bold text-[#D97706] mb-2">A great guess, but...</h3>
            )}
            
            <p className="text-[15px] text-[#4B5563] leading-relaxed font-medium">
              While pepper and timber were highly valuable exports in nearby regions, <strong className="text-[#1A1A1A]">this specific coastline was teeming with massive forest elephants.</strong> 
              <br/><br/>
              The Portuguese named it <em>Costa do Marfim</em>—the Ivory Coast—because of the sheer volume of elephant tusks traded along its shores.
            </p>
          </div>

        </div>

        {/* --- BOTTOM PROGRESS BAR & NAVIGATION --- */}
        <div className="absolute bottom-0 w-full bg-white border-t border-[#E9E4DB] px-6 py-4 flex items-center justify-between z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
          
          {/* Progress Tracker (Node 2 active) */}
          <div className="flex-1 relative h-10 flex items-center">
            <div className="absolute left-2 right-12 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#E1DCD0]" />
            <div className="relative z-10 flex justify-between w-full pr-10">
              <div className="w-3 h-3 rounded-full bg-[#D97706] border-2 border-white shadow-sm" />
              
              {/* NODE 2: Active */}
              <div className="w-3 h-3 rounded-full bg-[#D97706] border-2 border-white shadow-sm relative">
                {/* THE CAT MASCOT (Has sailed to the second node) */}
                <div className="absolute bottom-2 -left-4 animate-bounce" style={{ animationDuration: '2.5s' }}>
                  <CatInBoatSvg />
                </div>
              </div>
              
              <div className="w-3 h-3 rounded-full bg-[#E1DCD0] border-2 border-white shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#E1DCD0] border-2 border-white shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#E1DCD0] border-2 border-white shadow-sm" />
            </div>
          </div>

          {/* Swipe/Next Button (Disabled until a guess is made) */}
          <button 
            onClick={handleNext}
            disabled={!selectedCargo}
            className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg group relative overflow-hidden ${
              selectedCargo 
                ? 'bg-[#1A1A1A] text-white hover:bg-[#D97706] hover:scale-105 cursor-pointer' 
                : 'bg-[#E1DCD0] text-[#A8A29E] cursor-not-allowed'
            }`}
          >
            {selectedCargo && <div className="absolute inset-0 rounded-full border-2 border-[#D97706] opacity-0 group-hover:animate-ping" />}
            <ChevronRight className={`w-7 h-7 ${selectedCargo ? 'group-hover:translate-x-1 transition-transform' : ''}`} />
          </button>
        </div>

      </div>
    </div>
  );
}