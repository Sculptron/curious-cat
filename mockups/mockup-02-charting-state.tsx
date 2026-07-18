import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, Navigation, CheckCircle2, ArrowRight } from 'lucide-react';

// --- HIGH-FIDELITY CUSTOM VECTOR MASCOT: CUTE CAT ---
// Reused perfectly from Mockup 1 for consistent identity.
function CuteCatSvg({ className = "w-16 h-16", hasHat = false }) {
  return (
    <svg 
      className={`${className} transition-all duration-300 drop-shadow-md`} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="55" r="44" fill="#FEF3C7" opacity="0.1" />
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
      <g>
        <circle cx="34" cy="52" r="7.5" fill="#1A1A1A" />
        <circle cx="31.5" cy="49.5" r="2.5" fill="white" />
        <circle cx="36" cy="54.5" r="1.2" fill="white" />
        <circle cx="66" cy="52" r="7.5" fill="#1A1A1A" />
        <circle cx="63.5" cy="49.5" r="2.5" fill="white" />
        <circle cx="68" cy="54.5" r="1.2" fill="white" />
      </g>
      <circle cx="23" cy="61" r="4.5" fill="#FCA5A5" opacity="0.75" />
      <circle cx="77" cy="61" r="4.5" fill="#FCA5A5" opacity="0.75" />
      <polygon points="47,59 53,59 50,63" fill="#FB7185" stroke="#1A1A1A" strokeWidth="1" strokeLinejoin="round" />
      <path d="M43,65 Q50,70 50,64" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M57,65 Q50,70 50,64" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" />
      <g stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round">
        <line x1="22" y1="58" x2="6" y2="55" />
        <line x1="20" y1="63" x2="4" y2="64" />
        <line x1="21" y1="68" x2="6" y2="72" />
        <line x1="78" y1="58" x2="94" y2="55" />
        <line x1="80" y1="63" x2="96" y2="64" />
        <line x1="79" y1="68" x2="94" y2="72" />
      </g>
      <path d="M30,80 C30,80 50,92 70,80 C70,80 62,85 50,85 C38,85 30,80 30,80 Z" fill="#0D9488" stroke="#1A1A1A" strokeWidth="2" />
      <circle cx="50" cy="85" r="3" fill="#FBBF24" stroke="#1A1A1A" strokeWidth="1" />
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

// Custom CSS keyframes for drawing lines in the constellation background
const starMapStyles = `
  @keyframes drawLine {
    0% { stroke-dashoffset: 100; opacity: 0; }
    20% { opacity: 0.5; }
    100% { stroke-dashoffset: 0; opacity: 0.3; }
  }
  @keyframes twinkle {
    0%, 100% { opacity: 0.2; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  .line-draw {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    animation: drawLine 4s ease-out forwards;
  }
  .star-twinkle {
    animation: twinkle 3s ease-in-out infinite;
  }
`;

export default function ChartingState() {
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // For demo trigger

  // The specific curiosity the user entered
  const activeQuery = "Why is Côte d'Ivoire called Ivory Coast?";

  // Dynamic status text to make the Claude/Image API wait feel productive
  const phases = [
    "Plotting initial coordinates...",
    "Consulting historical trade archives...",
    "Calibrating to [Seeker] knowledge level...",
    "Drafting the story cards...",
    "Painting the expedition canvas...",
    "Binding the final deck...",
    "Expedition mapped and ready."
  ];

  const handleStartDemo = () => {
    setHasStarted(true);
    setProgress(0);
    setPhaseIndex(0);
    setIsComplete(false);
  };

  useEffect(() => {
    if (!hasStarted) return;

    // Simulate an 8-10 second loading process
    const totalDuration = 8000; 
    const updateInterval = 100;
    const progressStep = 100 / (totalDuration / updateInterval);
    
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += progressStep;
      
      if (currentProgress >= 100) {
        setProgress(100);
        setPhaseIndex(phases.length - 1);
        setIsComplete(true);
        clearInterval(interval);
      } else {
        setProgress(currentProgress);
        // Map progress to phase text
        const mappedIndex = Math.floor((currentProgress / 100) * (phases.length - 1));
        setPhaseIndex(mappedIndex);
      }
    }, updateInterval);

    return () => clearInterval(interval);
  }, [hasStarted]);

  return (
    <div className="min-h-screen bg-[#111827] text-white font-sans antialiased flex justify-center selection:bg-[#D97706]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .serif-header { font-family: 'Lora', Georgia, serif; }
        .sans-body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        ${starMapStyles}
      `}</style>

      <div className="w-full max-w-md bg-gradient-to-b from-[#0B1120] to-[#1E293B] min-h-screen flex flex-col relative border-x border-[#374151] overflow-hidden sans-body shadow-2xl">
        
        {/* --- BACKGROUND LAYER: Animated Star Map --- */}
        <div className="absolute inset-0 z-0 opacity-60">
          <svg width="100%" height="100%" viewBox="0 0 400 800" fill="none" preserveAspectRatio="xMidYMid slice">
            {/* Ambient grid lines */}
            <path d="M0 200 L400 200 M0 400 L400 400 M0 600 L400 600" stroke="#374151" strokeWidth="0.5" strokeDasharray="4 4" />
            <path d="M100 0 L100 800 M200 0 L200 800 M300 0 L300 800" stroke="#374151" strokeWidth="0.5" strokeDasharray="4 4" />
            
            {/* Animated Constellation Lines */}
            {hasStarted && (
              <g stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="80" y1="150" x2="200" y2="250" className="line-draw" style={{ animationDelay: '0s' }} />
                <line x1="200" y1="250" x2="320" y2="180" className="line-draw" style={{ animationDelay: '1s' }} />
                <line x1="200" y1="250" x2="240" y2="400" className="line-draw" style={{ animationDelay: '2.5s' }} />
                <line x1="240" y1="400" x2="120" y2="500" className="line-draw" style={{ animationDelay: '4s' }} />
                <line x1="240" y1="400" x2="340" y2="480" className="line-draw" style={{ animationDelay: '4.5s' }} />
                <line x1="120" y1="500" x2="180" y2="650" className="line-draw" style={{ animationDelay: '6s' }} />
              </g>
            )}

            {/* Stars */}
            <g fill="#FBBF24">
              <circle cx="80" cy="150" r="3" className="star-twinkle" style={{ animationDelay: '0s' }} />
              <circle cx="200" cy="250" r="4" className="star-twinkle" style={{ animationDelay: '1s' }} />
              <circle cx="320" cy="180" r="2" className="star-twinkle" style={{ animationDelay: '2s' }} />
              <circle cx="240" cy="400" r="3.5" className="star-twinkle" style={{ animationDelay: '1.5s' }} />
              <circle cx="120" cy="500" r="2.5" className="star-twinkle" style={{ animationDelay: '0.5s' }} />
              <circle cx="340" cy="480" r="2" className="star-twinkle" style={{ animationDelay: '2.5s' }} />
              <circle cx="180" cy="650" r="4" className="star-twinkle" style={{ animationDelay: '3s' }} />
            </g>
          </svg>
        </div>

        {/* --- DEMO TRIGGER (Only visible before starting) --- */}
        {!hasStarted ? (
          <div className="flex-1 flex flex-col items-center justify-center z-10 p-8 text-center bg-black/40 backdrop-blur-sm">
            <div className="bg-[#1A1A1A] p-4 rounded-full mb-6 border-2 border-[#D97706] shadow-[0_0_20px_rgba(217,119,6,0.3)]">
              <Navigation className="w-8 h-8 text-[#D97706] transform -rotate-45" />
            </div>
            <h2 className="serif-header text-2xl font-bold mb-3 text-[#F9F6F0]">
              Mockup 2: The Charting State
            </h2>
            <p className="text-sm text-[#9CA3AF] mb-8 leading-relaxed max-w-[280px]">
              This high-delight loading screen bridges the gap while Claude and the Image Engine generate the journey payload.
            </p>
            <button 
              onClick={handleStartDemo}
              className="w-full bg-[#D97706] text-white font-bold py-4 px-6 rounded-2xl border-2 border-[#FBBF24] shadow-[0px_4px_15px_rgba(217,119,6,0.4)] hover:bg-[#F59E0B] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Simulate API Generation
            </button>
          </div>
        ) : (
          /* --- MAIN CHARTING UI --- */
          <div className="flex-1 flex flex-col items-center justify-between z-10 px-8 py-12 animate-fadeIn">
            
            {/* Top Text: The User's Query */}
            <div className="w-full text-center mt-6 space-y-3">
              <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#1E293B]/80 border border-[#374151] backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#FBBF24]" />
                <span className="text-[10px] uppercase font-extrabold text-[#FBBF24] tracking-widest">
                  Destination Set
                </span>
              </div>
              <h2 className="serif-header text-xl md:text-2xl font-bold text-[#F9F6F0] leading-tight px-4 opacity-90 italic">
                "{activeQuery}"
              </h2>
            </div>

            {/* Center: The Astrolabe / Compass / Mascot Anchor */}
            <div className="relative flex items-center justify-center my-12 w-64 h-64">
              
              {/* Outer Golden Ring (Astrolabe effect) */}
              <div 
                className="absolute inset-0 rounded-full border border-dashed border-[#FBBF24]/40"
                style={{ animation: isComplete ? 'none' : 'spin 20s linear infinite' }}
              />
              
              {/* Middle Compass Ring */}
              <div 
                className="absolute inset-4 rounded-full border-2 border-[#374151]"
              >
                {/* Compass ticks */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-3 bg-[#D97706] rounded-sm" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-3 bg-[#D97706] rounded-sm" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-1.5 bg-[#D97706] rounded-sm" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-1.5 bg-[#D97706] rounded-sm" />
              </div>

              {/* Inner Spinning Navigation Element */}
              <div 
                className={`absolute inset-8 rounded-full border-[3px] border-t-[#D97706] border-r-[#D97706] border-b-transparent border-l-transparent transition-transform duration-1000 ${isComplete ? 'rotate-[720deg]' : 'animate-spin'}`}
                style={!isComplete ? { animationDuration: '3s' } : {}}
              />

              {/* The Cat Mascot inside the protective glowing orb */}
              <div className={`relative w-28 h-28 bg-[#FFFBEB] rounded-full border-4 border-[#1E293B] shadow-[0_0_30px_rgba(217,119,6,0.3)] flex items-center justify-center z-10 transition-transform duration-700 ${isComplete ? 'scale-110 shadow-[0_0_50px_rgba(251,191,36,0.5)]' : 'scale-100'}`}>
                <CuteCatSvg className="w-20 h-20" hasHat={true} />
              </div>

              {/* Success Badge overlay */}
              {isComplete && (
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-1 border-2 border-[#0B1120] z-20 animate-bounce">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
              )}
            </div>

            {/* Bottom: Progress and Status Info */}
            <div className="w-full mt-auto space-y-6 bg-[#0F172A]/60 p-6 rounded-3xl border border-[#374151] backdrop-blur-md">
              
              {/* Dynamic Status Text */}
              <div className="h-10 flex items-center justify-center">
                <p 
                  key={phaseIndex} 
                  className="text-sm font-semibold text-[#E5E7EB] text-center animate-fadeIn tracking-wide"
                >
                  {phases[phaseIndex]}
                </p>
              </div>

              {/* Progress Bar Container */}
              {!isComplete ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-extrabold uppercase tracking-widest text-[#9CA3AF]">
                    <span>Cartography</span>
                    <span className="text-[#FBBF24]">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-[#1E293B] h-2.5 rounded-full overflow-hidden border inset-shadow border-[#374151]">
                    <div 
                      className="h-full bg-gradient-to-r from-[#D97706] to-[#FBBF24] rounded-full relative"
                      style={{ 
                        width: `${progress}%`,
                        transition: 'width 100ms linear'
                      }}
                    >
                      {/* Shimmer effect on progress bar */}
                      <div className="absolute top-0 left-0 bottom-0 right-0 overflow-hidden rounded-full">
                        <div className="w-full h-full bg-white/20 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Ready State Action Button */
                <button 
                  onClick={() => window.location.reload()}
                  className="w-full bg-[#FBBF24] text-[#1A1A1A] font-extrabold py-4 px-6 rounded-xl shadow-[0px_4px_0px_0px_#B45309] hover:bg-[#FCD34D] active:translate-y-1 active:shadow-none transition duration-150 flex items-center justify-center gap-2 uppercase tracking-wide animate-fadeIn"
                >
                  <span>Begin Expedition</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}