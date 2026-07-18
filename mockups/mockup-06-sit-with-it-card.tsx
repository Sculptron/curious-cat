import React, { useState } from 'react';
import { ChevronRight, Pause, Bookmark, Scale, BookOpen, Globe2, Sparkles, Check } from 'lucide-react';

// --- LAYER 2: THE BALANCE SCALE SVG ---
// A beautiful, abstract scale that tips based on the active perspective.
function BalanceScaleSvg({ activePerspective }) {
  const rotation = activePerspective === 'left' ? -8 : activePerspective === 'right' ? 8 : 0;
  const colorLeft = activePerspective === 'left' ? '#D97706' : '#A8A29E';
  const colorRight = activePerspective === 'right' ? '#0D9488' : '#A8A29E';

  return (
    <svg viewBox="0 0 200 120" className="w-full h-32 overflow-visible transition-all duration-700">
      {/* Base / Fulcrum */}
      <path d="M100,100 L90,120 L110,120 Z" fill="#1A1A1A" />
      <line x1="100" y1="40" x2="100" y2="100" stroke="#1A1A1A" strokeWidth="4" />
      
      {/* The Tipping Beam */}
      <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '100px 40px', transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
        <line x1="40" y1="40" x2="160" y2="40" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
        
        {/* Left Pan (Pragmatism) */}
        <g transform="translate(40, 40)">
          <line x1="0" y1="0" x2="-15" y2="30" stroke={colorLeft} strokeWidth="1.5" />
          <line x1="0" y1="0" x2="15" y2="30" stroke={colorLeft} strokeWidth="1.5" />
          <path d="M-20,30 Q0,45 20,30 Z" fill={colorLeft} opacity="0.2" stroke={colorLeft} strokeWidth="2" />
          {/* Abstract weight */}
          <circle cx="0" cy="25" r="6" fill={colorLeft} className="transition-all duration-500" style={{ transform: activePerspective === 'left' ? 'scale(1.2)' : 'scale(1)' }} />
        </g>

        {/* Right Pan (Decolonization) */}
        <g transform="translate(160, 40)">
          <line x1="0" y1="0" x2="-15" y2="30" stroke={colorRight} strokeWidth="1.5" />
          <line x1="0" y1="0" x2="15" y2="30" stroke={colorRight} strokeWidth="1.5" />
          <path d="M-20,30 Q0,45 20,30 Z" fill={colorRight} opacity="0.2" stroke={colorRight} strokeWidth="2" />
          {/* Abstract weight */}
          <rect x="-6" y="19" width="12" height="12" fill={colorRight} className="transition-all duration-500" style={{ transform: activePerspective === 'right' ? 'scale(1.2)' : 'scale(1)' }} />
        </g>
      </g>
    </svg>
  );
}

// --- LAYER 3: PROGRESS BAR CAT (Moved to Node 4) ---
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

export default function SitWithItCardMockup() {
  const [activePerspective, setActivePerspective] = useState(null); // 'left' or 'right'
  const [viewedLeft, setViewedLeft] = useState(false);
  const [viewedRight, setViewedRight] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleSelectLeft = () => {
    setActivePerspective('left');
    setViewedLeft(true);
  };

  const handleSelectRight = () => {
    setActivePerspective('right');
    setViewedRight(true);
  };

  const allViewed = viewedLeft && viewedRight;

  const handleNext = () => {
    if (!allViewed) return;
    setIsSwiping(true);
    setTimeout(() => {
      setIsSwiping(false);
      // Advances to Card 5
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

        .perspective-bg-transition {
          transition: background-color 0.8s ease-in-out;
        }
      `}</style>

      {/* Dynamic Background color based on active perspective */}
      <div className={`w-full max-w-md h-[850px] max-h-screen flex flex-col relative overflow-hidden sans-body shadow-2xl perspective-bg-transition ${
        activePerspective === 'left' ? 'bg-[#FFFBEB]' : 
        activePerspective === 'right' ? 'bg-[#F0FDFA]' : 
        'bg-[#F9F6F0]'
      }`}>
        
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
        <div className={`flex-1 overflow-y-auto pb-24 px-6 pt-8 flex flex-col transition-transform origin-bottom ${isSwiping ? 'card-swipe-out' : ''}`}>
          
          {/* Act Label */}
          <div className="mb-4 text-center">
            <span className="text-[10px] font-extrabold text-[#6B7280] uppercase tracking-widest border border-[#E5E7EB] bg-white px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-sm">
              <Scale className="w-3 h-3" /> Sit With It
            </span>
          </div>

          {/* The Complex Prompt */}
          <h1 className="serif-header text-[22px] font-bold text-[#1A1A1A] leading-snug text-center mb-2 px-2">
            Many African nations rejected their colonial names post-independence. Why didn't Côte d'Ivoire?
          </h1>
          <p className="text-sm text-center text-[#6B7280] font-medium mb-4">
            Tap both perspectives to explore the nuance.
          </p>

          {/* The Balance Scale Graphic */}
          <div className="flex justify-center -mb-2 z-10 relative">
             <BalanceScaleSvg activePerspective={activePerspective} />
          </div>

          {/* --- THE TWO PERSPECTIVES (Split UI Layout) --- */}
          <div className="flex flex-col gap-3 relative z-20">
            
            {/* Perspective 1: The Pragmatist / Brand argument */}
            <div 
              onClick={handleSelectLeft}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-500 overflow-hidden ${
                activePerspective === 'left' 
                  ? 'bg-white border-[#D97706] shadow-[0_8px_30px_rgba(217,119,6,0.15)] scale-[1.02]' 
                  : 'bg-white/60 border-[#E1DCD0] hover:bg-white hover:border-[#FCD34D] scale-100 opacity-80'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activePerspective === 'left' ? 'bg-[#FEF3C7] text-[#D97706]' : 'bg-[#F3EFE6] text-[#A8A29E]'}`}>
                  <Globe2 className="w-4 h-4" />
                </div>
                <h3 className={`font-bold text-[15px] uppercase tracking-wider ${activePerspective === 'left' ? 'text-[#B45309]' : 'text-[#6B7280]'}`}>
                  1. The Pragmatic View
                </h3>
                {viewedLeft && <Check className="w-4 h-4 text-[#D97706] ml-auto" />}
              </div>
              
              <div className={`transition-all duration-500 ${activePerspective === 'left' ? 'max-h-48 opacity-100' : 'max-h-12 opacity-40'}`}>
                <p className="text-[14px] leading-relaxed text-[#4B5563] font-medium line-clamp-3">
                  {activePerspective === 'left' 
                    ? "First president Houphouët-Boigny argued that keeping the French name 'Côte d'Ivoire' prevented favoritism among the nation's 60+ ethnic groups. Furthermore, the name had massive international brand equity for their booming cocoa and coffee exports."
                    : "Focuses on unity, international brand equity, and avoiding ethnic favoritism..."}
                </p>
              </div>
            </div>

            {/* Perspective 2: The Decolonial argument */}
            <div 
              onClick={handleSelectRight}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-500 overflow-hidden ${
                activePerspective === 'right' 
                  ? 'bg-white border-[#0D9488] shadow-[0_8px_30px_rgba(13,148,136,0.15)] scale-[1.02]' 
                  : 'bg-white/60 border-[#E1DCD0] hover:bg-white hover:border-[#5EEAD4] scale-100 opacity-80'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activePerspective === 'right' ? 'bg-[#E0F2FE] text-[#0D9488]' : 'bg-[#F3EFE6] text-[#A8A29E]'}`}>
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className={`font-bold text-[15px] uppercase tracking-wider ${activePerspective === 'right' ? 'text-[#0F766E]' : 'text-[#6B7280]'}`}>
                  2. The Decolonial View
                </h3>
                {viewedRight && <Check className="w-4 h-4 text-[#0D9488] ml-auto" />}
              </div>
              
              <div className={`transition-all duration-500 ${activePerspective === 'right' ? 'max-h-48 opacity-100' : 'max-h-12 opacity-40'}`}>
                <p className="text-[14px] leading-relaxed text-[#4B5563] font-medium line-clamp-3">
                  {activePerspective === 'right' 
                    ? "Critics argue the name is literally a European price tag. Nations like Gold Coast (Ghana) and Rhodesia (Zimbabwe) shed their colonial extraction-names immediately to reclaim their indigenous identity and sever psychological ties to the empire."
                    : "Focuses on reclaiming indigenous identity and rejecting the 'price tag' label..."}
                </p>
              </div>
            </div>
          </div>

          {/* Conclusion Text (Appears only when both are viewed) */}
          <div className={`mt-8 text-center transition-all duration-700 transform ${allViewed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
             <div className="inline-flex items-center justify-center gap-2 mb-2">
               <Sparkles className="w-4 h-4 text-[#D97706]" />
               <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Synthesis</span>
             </div>
             <p className="text-[14px] italic text-[#4B5563] px-4">
               History rarely has one clean answer. The tension between economic pragmatism and cultural reclamation continues today.
             </p>
          </div>

        </div>

        {/* --- BOTTOM PROGRESS BAR & NAVIGATION --- */}
        <div className="absolute bottom-0 w-full bg-white border-t border-[#E9E4DB] px-6 py-4 flex items-center justify-between z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
          
          {/* Progress Tracker (Node 4 active) */}
          <div className="flex-1 relative h-10 flex items-center">
            <div className="absolute left-2 right-12 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#E1DCD0]" />
            <div className="relative z-10 flex justify-between w-full pr-10">
              <div className="w-3 h-3 rounded-full bg-[#D97706] border-2 border-white shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#D97706] border-2 border-white shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#D97706] border-2 border-white shadow-sm" />
              
              {/* NODE 4: Active */}
              <div className="w-3 h-3 rounded-full bg-[#D97706] border-2 border-white shadow-sm relative">
                {/* THE CAT MASCOT (Has sailed to the fourth node) */}
                <div className="absolute bottom-2 -left-4 animate-bounce" style={{ animationDuration: '2.5s' }}>
                  <CatInBoatSvg />
                </div>
              </div>
              
              <div className="w-3 h-3 rounded-full bg-[#E1DCD0] border-2 border-white shadow-sm" />
            </div>
          </div>

          {/* Swipe/Next Button (Disabled until BOTH are viewed) */}
          <button 
            onClick={handleNext}
            disabled={!allViewed}
            className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg group relative overflow-hidden ${
              allViewed 
                ? 'bg-[#1A1A1A] text-white hover:bg-[#D97706] hover:scale-105 cursor-pointer' 
                : 'bg-[#E1DCD0] text-[#A8A29E] cursor-not-allowed'
            }`}
          >
            {allViewed && <div className="absolute inset-0 rounded-full border-2 border-[#D97706] opacity-0 group-hover:animate-ping" />}
            <ChevronRight className={`w-7 h-7 ${allViewed ? 'group-hover:translate-x-1 transition-transform' : ''}`} />
          </button>
        </div>

      </div>
    </div>
  );
}