import React, { useState } from 'react';
import { ChevronRight, Pause, Bookmark, Maximize2, Share2 } from 'lucide-react';

// --- HIGH-FIDELITY LAYER 2 ILLUSTRATION (IVORY COAST THEME) ---
// A text-free, atmospheric SVG depicting the Ivory Coast theme.
// Deep teals, forest greens, and an amber sunset.
function Layer2Illustration() {
  return (
    <svg viewBox="0 0 400 350" fill="none" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="350" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F766E" /> {/* Teal top */}
          <stop offset="60%" stopColor="#047857" /> {/* Emerald mid */}
          <stop offset="100%" stopColor="#F9F6F0" /> {/* Bleeds into the UI cream color! */}
        </linearGradient>
        <radialGradient id="sun" cx="200" cy="180" r="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FBBF24" stopOpacity="1"/>
          <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#D97706" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Background Gradient */}
      <rect width="400" height="350" fill="url(#sky)" />

      {/* The glowing sun/atmosphere */}
      <circle cx="200" cy="160" r="140" fill="url(#sun)" />

      {/* Background Coastal Mountains / Trees */}
      <path d="M0,250 Q50,220 100,240 T250,210 T400,260 L400,350 L0,350 Z" fill="#065F46" opacity="0.6"/>
      <path d="M-50,280 Q80,240 180,270 T350,230 T450,290 L450,350 L-50,350 Z" fill="#047857" opacity="0.8"/>

      {/* Foreground Silhouettes - Abstract African Elephant & Palm Leaves */}
      <g fill="#022C22">
        {/* Palm Fronds Left */}
        <path d="M-20,350 C-20,250 50,180 80,150 C50,180 0,220 -40,250 Z" />
        <path d="M0,350 C20,270 80,200 120,180 C80,220 40,270 -20,320 Z" />
        {/* Palm Fronds Right */}
        <path d="M420,350 C420,230 320,160 280,130 C320,170 380,210 440,240 Z" />
        <path d="M400,350 C380,260 300,190 250,170 C310,210 360,260 420,320 Z" />
        
        {/* Abstract Majestic Elephant Silhouette */}
        <path d="M140,350 L140,280 C140,260 150,240 170,235 C190,230 220,230 240,240 C255,247 260,265 260,280 L260,350 L235,350 L235,290 C235,280 230,275 220,275 C210,275 205,280 205,290 L205,350 L180,350 L180,295 C180,285 175,280 165,280 L165,350 Z" />
        {/* Elephant Trunk & Tusks */}
        <path d="M255,250 C280,255 290,280 285,310 C283,320 275,325 265,320 C275,310 275,280 260,270 Z" />
        <path d="M260,265 C285,270 300,260 315,245 C305,255 285,260 260,255 Z" fill="#FCFAF7" opacity="0.9" /> {/* The Ivory Tusk highlighting */}
      </g>
    </svg>
  );
}

// --- LAYER 3: THE CAT (IN A BOAT!) ---
// A specialized mini-mascot for the Ivory Coast progress bar.
function CatInBoatSvg() {
  return (
    <svg viewBox="0 0 60 60" fill="none" className="w-10 h-10 drop-shadow-md overflow-visible">
      {/* Water ripple */}
      <path d="M10,50 Q30,55 50,50" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      
      {/* Boat Hull */}
      <path d="M12,42 L20,48 L40,48 L48,42 Z" fill="#78350F" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M15,44 L45,44" stroke="#451A03" strokeWidth="1" />
      
      {/* Tiny Mast and Sail */}
      <line x1="35" y1="18" x2="35" y2="42" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M35,20 Q25,28 35,38 Z" fill="#FCFAF7" stroke="#1A1A1A" strokeWidth="1" />

      {/* Tiny Cap'n Cat popping out of the boat */}
      <g transform="translate(18, 26)">
        {/* Cat Head */}
        <ellipse cx="10" cy="10" rx="8" ry="7" fill="#F59E0B" stroke="#1A1A1A" strokeWidth="1.5" />
        {/* Ears */}
        <path d="M4,4 L7,0 L10,3 Z" fill="#E28743" stroke="#1A1A1A" strokeWidth="1" strokeLinejoin="round" />
        <path d="M16,4 L13,0 L10,3 Z" fill="#E28743" stroke="#1A1A1A" strokeWidth="1" strokeLinejoin="round" />
        {/* Face */}
        <ellipse cx="10" cy="13" rx="4" ry="3" fill="#FCFAF7" />
        <circle cx="7" cy="9" r="1.2" fill="#1A1A1A" />
        <circle cx="13" cy="9" r="1.2" fill="#1A1A1A" />
        {/* Captain Hat */}
        <path d="M5,2 Q10,0 15,2 L14,4 L6,4 Z" fill="#1E293B" stroke="#1A1A1A" strokeWidth="1" />
      </g>
    </svg>
  );
}

export default function ConceptCardMockup() {
  const [isSwiping, setIsSwiping] = useState(false);

  const handleNext = () => {
    setIsSwiping(true);
    setTimeout(() => {
      setIsSwiping(false);
      // In a real app, this would advance the deck index.
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#1A1A1A] font-sans antialiased selection:bg-[#D97706] selection:text-white flex justify-center items-center">
      
      {/* Font Injection */}
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

      {/* Main Mobile Frame */}
      <div className="w-full max-w-md bg-[#F9F6F0] h-[850px] max-h-screen flex flex-col relative overflow-hidden sans-body shadow-2xl">
        
        {/* --- GLOBAL APP HEADER (Minimalist for Expedition Mode) --- */}
        <header className="absolute top-0 w-full px-6 pt-6 pb-4 flex items-center justify-between z-20">
          {/* Pause / Menu Button */}
          <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition">
            <Pause className="w-5 h-5 fill-current" />
          </button>
          
          {/* Subtle Topic Pill */}
          <div className="bg-black/20 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full">
            <span className="text-xs font-bold text-white uppercase tracking-widest drop-shadow-sm">
              Ivory Coast
            </span>
          </div>

          <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition">
            <Bookmark className="w-4 h-4" />
          </button>
        </header>

        {/* --- THE CARD CONTAINER --- */}
        <div className={`flex-1 flex flex-col relative transition-transform origin-bottom ${isSwiping ? 'card-swipe-out' : ''}`}>
          
          {/* Layer 2: Generated Image Area */}
          <div className="h-[45%] w-full relative shrink-0">
            {/* The actual illustration */}
            <Layer2Illustration />
            
            {/* THE BLEED EFFECT: 
              This gradient creates a seamless physical transition from the SVG art 
              into the `#F9F6F0` native UI background of the text area. 
            */}
            <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#F9F6F0] to-transparent" />
          </div>

          {/* Text & Content Area */}
          <div className="flex-1 px-8 pb-24 pt-4 flex flex-col">
            
            {/* Act / Card Label */}
            <div className="mb-4">
              <span className="text-[10px] font-extrabold text-[#D97706] uppercase tracking-widest border border-[#F5E3B3] bg-[#FDF6E2] px-2.5 py-1 rounded-md">
                Concept 1
              </span>
            </div>

            {/* Editorial Serif Header */}
            <h1 className="serif-header text-3xl font-bold text-[#1A1A1A] leading-[1.15] mb-6">
              A Coastline Mapped by its Cargo
            </h1>

            {/* Content Body */}
            <div className="space-y-5 text-[15px] text-[#4B5563] leading-relaxed font-medium">
              <p>
                In the 1440s, Portuguese navigators weren't mapping West Africa to study its local kingdoms. They were mapping it based entirely on what they could pack into the hulls of their ships.
              </p>
              <p>
                They literally named regions after their primary commercial exports. One stretch was named the <strong className="text-[#1A1A1A]">Pepper Coast</strong>. Further down was the <strong className="text-[#1A1A1A]">Gold Coast</strong> (modern-day Ghana). 
              </p>
              <p>
                But this specific stretch of land was populated by massive forest elephants. The tusks harvested here were enormous, beautiful, and highly coveted in Europe.
              </p>
            </div>

            {/* Interactive Image Action (Optional UI delight) */}
            <div className="mt-auto pt-6 pb-2">
              <button className="flex items-center gap-2 text-xs font-bold text-[#0D9488] hover:text-[#0F766E] transition">
                <Maximize2 className="w-4 h-4" /> Expand Illustration
              </button>
            </div>
          </div>
        </div>

        {/* --- BOTTOM PROGRESS BAR & NAVIGATION (Layer 3) --- */}
        <div className="absolute bottom-0 w-full bg-white border-t border-[#E9E4DB] px-6 py-4 flex items-center justify-between z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
          
          {/* Constellation Nodes / Progress Tracker */}
          <div className="flex-1 relative h-10 flex items-center">
            
            {/* The Track Line */}
            <div className="absolute left-2 right-12 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#E1DCD0]" />
            
            {/* The Nodes */}
            <div className="relative z-10 flex justify-between w-full pr-10">
              <div className="w-3 h-3 rounded-full bg-[#D97706] border-2 border-white shadow-sm relative">
                {/* THE CAT MASCOT (Riding the progress bar!) */}
                <div className="absolute bottom-2 -left-4 animate-bounce" style={{ animationDuration: '2s' }}>
                  <CatInBoatSvg />
                </div>
              </div>
              <div className="w-3 h-3 rounded-full bg-[#E1DCD0] border-2 border-white shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#E1DCD0] border-2 border-white shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#E1DCD0] border-2 border-white shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#E1DCD0] border-2 border-white shadow-sm" />
            </div>
          </div>

          {/* Main Action: Swipe/Next Button */}
          <button 
            onClick={handleNext}
            className="flex-shrink-0 w-14 h-14 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white hover:bg-[#D97706] hover:scale-105 transition-all shadow-lg group relative overflow-hidden"
          >
            {/* Pulse effect rings */}
            <div className="absolute inset-0 rounded-full border-2 border-[#D97706] opacity-0 group-hover:animate-ping" />
            <ChevronRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}