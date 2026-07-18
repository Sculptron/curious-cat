import React, { useState, useEffect, useRef } from 'react';
import { Share2, Download, Sparkles, ChevronRight, Map, ArrowRight, Star } from 'lucide-react';

// A bespoke, premium illustration for the trading card featuring an African Elephant and a Compass Rose.
function ElephantCardArt() {
  return (
    <svg viewBox="0 0 300 400" className="w-full h-full object-cover rounded-xl" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="cardBg" x1="0" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F766E" />
          <stop offset="50%" stopColor="#047857" />
          <stop offset="100%" stopColor="#022C22" />
        </linearGradient>
        <radialGradient id="cardSun" cx="150" cy="150" r="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FCD34D" stopOpacity="1" />
          <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="goldTrim" x1="0" y1="0" x2="300" y2="400">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>
      </defs>

      {/* Base Background */}
      <rect width="300" height="400" fill="url(#cardBg)" />
      
      {/* Sun/Aura */}
      <circle cx="150" cy="180" r="140" fill="url(#cardSun)" />

      {/* Abstract Compass Rose Pattern in background */}
      <g stroke="#FDE68A" strokeWidth="1" opacity="0.15">
        <circle cx="150" cy="180" r="100" fill="none" />
        <circle cx="150" cy="180" r="120" fill="none" strokeDasharray="4 4" />
        <line x1="150" y1="40" x2="150" y2="320" />
        <line x1="10" y1="180" x2="290" y2="180" />
        <line x1="50" y1="80" x2="250" y2="280" />
        <line x1="50" y1="280" x2="250" y2="80" />
      </g>

      {/* Majestic African Elephant Silhouette */}
      <g transform="translate(45, 120)">
        <path d="M100,180 L100,100 C100,80 110,60 135,55 C160,50 180,55 195,70 C215,90 215,115 215,130 L215,180 L190,180 L190,120 C190,110 180,105 170,105 C160,105 155,110 155,120 L155,180 L125,180 L125,110 C125,100 120,95 110,95 L110,180 Z" fill="#022C22" />
        {/* Trunk & Tusks */}
        <path d="M195,85 C220,90 240,120 230,160 C228,170 215,175 205,170 C215,160 215,120 200,110 Z" fill="#022C22" />
        {/* The Golden Ivory Tusk */}
        <path d="M200,100 C230,110 255,90 275,70 C260,85 235,95 200,90 Z" fill="#FCFAF7" opacity="0.95" />
        <path d="M200,100 C230,110 255,90 275,70 C260,85 235,95 200,90 Z" fill="url(#goldTrim)" opacity="0.4" />
      </g>

      {/* Coastal Terrain */}
      <path d="M-20,300 Q60,260 150,280 T320,260 L320,400 L-20,400 Z" fill="#064E3B" opacity="0.8" />
      <path d="M-50,330 Q80,290 180,310 T350,280 L350,400 L-50,400 Z" fill="#022C22" />
    </svg>
  );
}

export default function MintCardMockup() {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [showCelebration, setShowCelebration] = useState(true);

  // Auto-hide the initial confetti/celebration toast
  useEffect(() => {
    const timer = setTimeout(() => setShowCelebration(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to the card's center
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max rotation in degrees
    const rotateXMax = 15;
    const rotateYMax = 15;
    
    // Calculate rotation (-1 to 1 multiplier)
    const rotateX = ((centerY - y) / centerY) * rotateXMax;
    const rotateY = ((x - centerX) / centerX) * rotateYMax;
    
    setRotation({ x: rotateX, y: rotateY });
    
    // Calculate glare position (0% to 100%)
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly snap back to center
    setRotation({ x: 0, y: 0 });
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <div className="min-h-screen bg-[#111827] text-white font-sans antialiased selection:bg-[#D97706] selection:text-white flex justify-center items-center overflow-hidden">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .serif-header { font-family: 'Lora', Georgia, serif; }
        .sans-body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        
        .holo-card-container {
          perspective: 1200px;
          transform-style: preserve-3d;
        }

        .holo-card {
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
        }

        .holo-card.snap-back {
          transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .holo-glare {
          background: radial-gradient(
            circle at var(--glare-x) var(--glare-y), 
            rgba(255, 255, 255, 0.8) 0%, 
            rgba(255, 215, 0, 0.3) 20%, 
            rgba(255, 0, 128, 0.2) 40%, 
            transparent 60%
          );
          mix-blend-mode: color-dodge;
          pointer-events: none;
          z-index: 20;
          transition: opacity 0.3s;
        }

        .holo-foil {
          background: linear-gradient(
            115deg, 
            transparent 20%, 
            rgba(217, 119, 6, 0.4) 30%, 
            rgba(16, 185, 129, 0.4) 40%, 
            rgba(59, 130, 246, 0.4) 50%, 
            transparent 60%
          );
          background-size: 200% 200%;
          background-position: var(--glare-x) var(--glare-y);
          mix-blend-mode: overlay;
          pointer-events: none;
          z-index: 15;
          opacity: 0.6;
        }

        .float-anim {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      <div className="w-full max-w-md bg-gradient-to-b from-[#1E293B] to-[#0F172A] h-[850px] max-h-screen flex flex-col relative overflow-hidden sans-body shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Celebration Toast (Auto-hides) */}
        <div className={`absolute top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${showCelebration ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}>
          <div className="bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-[0_4px_20px_rgba(217,119,6,0.5)] flex items-center gap-2 border border-[#FDE68A]">
            <Sparkles className="w-4 h-4" />
            Expedition Added to Constellation!
          </div>
        </div>

        {/* --- GLOBAL APP HEADER (Dark Mode for Minting) --- */}
        <header className="px-6 pt-6 pb-4 flex items-center justify-between z-20">
          <button className="flex items-center gap-2 text-[#9CA3AF] hover:text-white transition text-xs font-bold uppercase tracking-widest">
            <Map className="w-4 h-4" /> Constellation
          </button>
          
          <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#374151] flex items-center justify-center">
            <div className="w-4 h-4 bg-[#D97706] rounded-full text-[8px] flex items-center justify-center font-bold">🐱</div>
          </div>
        </header>

        {/* --- CARD CONTENT AREA --- */}
        <div className="flex-1 overflow-y-auto pb-12 px-6 pt-2 flex flex-col items-center hide-scrollbar">
          
          {/* Header Text */}
          <div className="text-center mb-8">
            <h2 className="text-[#FBBF24] text-[10px] font-extrabold uppercase tracking-[0.3em] mb-2">Expedition Nº 001</h2>
            <h1 className="serif-header text-3xl font-bold text-white leading-tight">
              Costa do Marfim
            </h1>
          </div>

          {/* 3D Container Wrapper */}
          <div className="holo-card-container w-full max-w-[320px] aspect-[3/4] relative z-30 mb-10 float-anim">
            
            {/* The Rotatable Card Element */}
            <div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setIsHovered(true)}
              className={`holo-card w-full h-full rounded-2xl border-[3px] border-[#374151] shadow-2xl relative bg-[#1A1A1A] cursor-pointer overflow-hidden ${!isHovered ? 'snap-back' : ''}`}
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                '--glare-x': `${glarePosition.x}%`,
                '--glare-y': `${glarePosition.y}%`,
                boxShadow: isHovered 
                  ? `${-rotation.y * 1.5}px ${rotation.x * 1.5}px 30px rgba(217, 119, 6, 0.4)`
                  : '0 20px 40px rgba(0,0,0,0.5)'
              }}
            >
              {/* Layer 2: The Art */}
              <div className="absolute inset-0.5 rounded-[10px] overflow-hidden bg-[#064E3B]">
                <ElephantCardArt />
              </div>

              {/* Holographic Glare Overlays (Activated on Hover) */}
              <div className={`absolute inset-0 holo-glare rounded-xl ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
              <div className={`absolute inset-0 holo-foil rounded-xl ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

              {/* Card Typography Overlay (Z-translated for 3D depth) */}
              <div 
                className="absolute inset-0 p-5 flex flex-col justify-between pointer-events-none"
                style={{ transform: 'translateZ(30px)' }}
              >
                {/* Top Badge */}
                <div className="flex justify-between items-start">
                  <div className="bg-[#1A1A1A]/80 backdrop-blur-md border border-[#FDE68A]/30 px-3 py-1 rounded-full text-[9px] text-[#FDE68A] font-bold tracking-widest uppercase">
                    History & Geo
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/80 backdrop-blur-md border border-[#FDE68A]/30 flex items-center justify-center">
                    <Star className="w-4 h-4 text-[#FDE68A] fill-[#FDE68A]" />
                  </div>
                </div>

                {/* Bottom Text Block ("The Aha Moment") */}
                <div className="bg-[#1A1A1A]/90 backdrop-blur-md border-t border-[#FDE68A]/40 -mx-5 -mb-5 p-5">
                  <h3 className="text-[#FBBF24] text-[10px] font-extrabold uppercase tracking-widest mb-1">The Synthesis</h3>
                  <p className="serif-header text-sm text-white leading-relaxed">
                    A coastline defined not by its people, but by the cargo packed into 15th-century ships.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons for the Card */}
          <div className="flex gap-4 w-full max-w-[320px] mb-12">
            <button className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Save
            </button>
            <button className="flex-1 bg-[#D97706] hover:bg-[#F59E0B] border border-[#FDE68A]/50 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(217,119,6,0.3)] transition flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>

          {/* Continuing the Loop */}
          <div className="w-full text-left border-t border-[#374151] pt-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#0D9488]" />
              <h3 className="text-[#9CA3AF] text-[11px] font-extrabold uppercase tracking-widest">
                Continue down the rabbit hole...
              </h3>
            </div>

            <div className="space-y-3">
              {/* Branch 1 */}
              <button className="w-full bg-[#1E293B] border border-[#374151] hover:border-[#0D9488] p-4 rounded-2xl flex items-center justify-between group transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0D9488]/20 flex items-center justify-center text-lg">🇬🇭</div>
                  <div className="text-left">
                    <h4 className="text-[#E5E7EB] font-bold text-sm group-hover:text-[#5EEAD4] transition">How did the Gold Coast become Ghana?</h4>
                    <p className="text-[#9CA3AF] text-[10px] mt-0.5 font-medium uppercase tracking-wider">Historical Identity</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#4B5563] group-hover:text-[#5EEAD4] transition-transform group-hover:translate-x-1" />
              </button>

              {/* Branch 2 */}
              <button className="w-full bg-[#1E293B] border border-[#374151] hover:border-[#D97706] p-4 rounded-2xl flex items-center justify-between group transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D97706]/20 flex items-center justify-center text-lg">🐘</div>
                  <div className="text-left">
                    <h4 className="text-[#E5E7EB] font-bold text-sm group-hover:text-[#FBBF24] transition">African vs. Asian Elephants</h4>
                    <p className="text-[#9CA3AF] text-[10px] mt-0.5 font-medium uppercase tracking-wider">Biology & Evolution</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#4B5563] group-hover:text-[#FBBF24] transition-transform group-hover:translate-x-1" />
              </button>

              {/* Branch 3 */}
              <button className="w-full bg-[#1E293B] border border-[#374151] hover:border-[#E11D48] p-4 rounded-2xl flex items-center justify-between group transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E11D48]/20 flex items-center justify-center text-lg">🌶️</div>
                  <div className="text-left">
                    <h4 className="text-[#E5E7EB] font-bold text-sm group-hover:text-[#FDA4AF] transition">The history of the Pepper Trade</h4>
                    <p className="text-[#9CA3AF] text-[10px] mt-0.5 font-medium uppercase tracking-wider">Global Economics</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#4B5563] group-hover:text-[#FDA4AF] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}