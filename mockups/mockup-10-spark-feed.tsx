import React, { useState } from 'react';
import { Compass, Sparkles, Navigation, X, ArrowRight, Layers, Flame, BookOpen, Clock, Heart, Bookmark } from 'lucide-react';

// --- LAYER 3: CUTE CAT MASCOT (Reused for the top header) ---
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

export default function SparkFeedMockup() {
  const [selectedSpark, setSelectedSpark] = useState(null);
  const [isLaunching, setIsLaunching] = useState(false);

  // The database of curated sparks
  const sparks = [
    {
      id: 'ivory',
      emoji: '🚢',
      category: 'Geography & Trade',
      categoryColor: 'text-[#D97706]',
      categoryBg: 'bg-[#FFFBEB]',
      title: "Why Côte d'Ivoire kept its colonial trade name",
      hook: "While other West African nations changed colonial titles upon independence, Côte d'Ivoire held tight. Why? Let's check the map.",
      length: '5 Cards',
      level: 'Beginner',
      headerBg: 'bg-[#E0F2FE]'
    },
    {
      id: 'ev',
      emoji: '🔌',
      category: 'Modern Hardware',
      categoryColor: 'text-[#0D9488]',
      categoryBg: 'bg-[#F0FDFA]',
      title: "The physical reasons EV plugs don't match",
      hook: "If standard household plugs took decades to converge, electric vehicle ports are undergoing an even wilder geopolitical standard war.",
      length: '7 Cards',
      level: 'Intermediate',
      headerBg: 'bg-[#FFFBEB]'
    },
    {
      id: 'curse',
      emoji: '⚖️',
      category: 'Economic Paradox',
      categoryColor: 'text-[#E11D48]',
      categoryBg: 'bg-[#FFF1F2]',
      title: "Understanding the Resource Curse",
      hook: "Why does natural abundance often breed poverty? Let's trace value chain smile curves, institutions, and structural economics.",
      length: '8 Cards',
      level: 'Advanced',
      headerBg: 'bg-[#FFF1F2]'
    },
    {
      id: 'sahara',
      emoji: '🌳',
      category: 'Historical Quirks',
      categoryColor: 'text-[#65A30D]',
      categoryBg: 'bg-[#F7FEE7]',
      title: "The loneliest tree in the Sahara",
      hook: "Why did a single acacia tree, surrounded by 400 kilometers of empty sand, have its own specific map coordinate for European navigators?",
      length: '4 Cards',
      level: 'Beginner',
      headerBg: 'bg-[#FEF3C7]'
    }
  ];

  const handleLaunch = (spark) => {
    setSelectedSpark(spark);
    setIsLaunching(true);
    // In a real app, this would route to Mockup 2 (Charting State)
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#1A1A1A] font-sans antialiased selection:bg-[#D97706] selection:text-white flex justify-center items-center">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .serif-header { font-family: 'Lora', Georgia, serif; }
        .sans-body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="w-full max-w-md bg-[#F4F1EA] h-[850px] max-h-screen flex flex-col relative overflow-hidden sans-body shadow-2xl">
        
        {/* --- GLOBAL APP HEADER --- */}
        <header className="px-6 pt-6 pb-4 flex items-center justify-between z-20 bg-white border-b border-[#E9E4DB] sticky top-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FCFAF7] border-2 border-[#1A1A1A] flex items-center justify-center overflow-hidden">
              <CuteCatSvg className="w-10 h-10" hasHat={false} />
            </div>
            <div>
              <h1 className="serif-header text-lg font-bold tracking-tight text-[#1A1A1A] leading-none">
                Spark Feed
              </h1>
              <div className="flex items-center gap-1 mt-1 text-[#D97706]">
                <Flame className="w-3 h-3 fill-current" />
                <span className="text-[9px] uppercase tracking-wider font-extrabold">
                  Ignite Curiosity
                </span>
              </div>
            </div>
          </div>
          
          <button className="w-10 h-10 rounded-full bg-[#F3EFE6] hover:bg-[#E9E4DB] border border-[#E1DCD0] flex items-center justify-center text-[#5C574F] transition">
            <Bookmark className="w-4 h-4" />
          </button>
        </header>

        {/* --- THE FEED (Vertical Scroll) --- */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 hide-scrollbar">
          
          {sparks.map((spark) => (
            <div 
              key={spark.id}
              onClick={() => handleLaunch(spark)}
              className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#1A1A1A] transition cursor-pointer group relative"
            >
              {/* Category Tag Overlay */}
              <div className="absolute top-4 left-4 z-10">
                <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] ${spark.categoryColor} ${spark.categoryBg}`}>
                  {spark.category}
                </span>
              </div>

              {/* Header Visual Area (Replaces a static image with bold, expressive emoji/color) */}
              <div className={`${spark.headerBg} h-36 flex items-center justify-center relative border-b-2 border-[#1A1A1A] overflow-hidden`}>
                {/* Decorative background circle */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                   <div className="w-32 h-32 rounded-full bg-black/10 mix-blend-overlay"></div>
                </div>
                <span className="text-6xl filter drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">
                  {spark.emoji}
                </span>
              </div>

              {/* Content Area */}
              <div className="p-5">
                <h2 className="serif-header text-[22px] font-bold text-[#1A1A1A] leading-snug mb-2 group-hover:text-[#D97706] transition-colors">
                  {spark.title}
                </h2>
                <p className="text-[14px] text-[#5C574F] font-medium leading-relaxed mb-5">
                  {spark.hook}
                </p>

                {/* Footer Metadata */}
                <div className="flex items-center justify-between border-t border-[#E9E4DB] pt-4">
                  <div className="flex items-center gap-4 text-xs font-bold text-[#A8A29E]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#D97706]" />
                      {spark.length}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#0D9488]" />
                      {spark.level}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center group-hover:bg-[#D97706] transition-colors shadow-sm">
                     <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* End of Feed Prompt */}
          <div className="text-center py-6 pb-12">
            <p className="text-sm font-bold text-[#A8A29E] mb-2">You've reached the end of the feed.</p>
            <button className="text-[#D97706] text-xs font-extrabold uppercase tracking-widest hover:underline flex items-center justify-center gap-1 mx-auto">
              <Sparkles className="w-3.5 h-3.5" /> Generate new sparks
            </button>
          </div>

        </div>

        {/* --- SIMULATED LAUNCH TRANSITION OVERLAY --- */}
        {isLaunching && (
          <div className="absolute inset-0 bg-[#F9F6F0] z-50 flex flex-col items-center justify-center p-8 animate-fadeIn">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full border-4 border-dashed border-[#D97706] animate-spin flex items-center justify-center">
                <Compass className="w-8 h-8 text-[#D97706] transform rotate-45" />
              </div>
              <div className="absolute inset-2 bg-white border-2 border-[#1A1A1A] rounded-full flex items-center justify-center overflow-hidden shadow-md">
                <CuteCatSvg className="w-20 h-20" hasHat={true} />
              </div>
            </div>
            <h3 className="serif-header text-xl font-bold text-[#1A1A1A] text-center mb-2">
              Plotting Coordinates...
            </h3>
            <p className="text-xs text-[#5C574F] text-center max-w-[260px] leading-relaxed italic">
              Loading the "{selectedSpark?.title}" expedition.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}