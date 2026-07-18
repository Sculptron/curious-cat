import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Sparkles, 
  HelpCircle, 
  Search, 
  ChevronRight, 
  Star, 
  Zap, 
  X, 
  ArrowRight, 
  Info,
  Map,
  Layers,
  Sparkle
} from 'lucide-react';

// --- HIGH-FIDELITY CUSTOM VECTOR MASCOT: CUTE CAT ---
// A highly polished, adorable, hand-crafted ginger tabby explorer.
function CuteCatSvg({ className = "w-16 h-16", hasHat = false, mood = "happy" }) {
  return (
    <svg 
      className={`${className} transition-all duration-300 drop-shadow-md`} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Glow / Shadow background ring (soft amber ambient aura) */}
      <circle cx="50" cy="55" r="44" fill="#FEF3C7" opacity="0.3" />

      {/* Back layer: Cute pointed Left Ear */}
      <path 
        d="M20,38 L34,10 L48,32 Z" 
        fill="#E28743" 
        stroke="#1A1A1A" 
        strokeWidth="3" 
        strokeLinejoin="round" 
      />
      {/* Inner Pink Left Ear */}
      <path 
        d="M26,35 L34,16 L42,30 Z" 
        fill="#FCA5A5" 
        stroke="#1A1A1A" 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
      />
      
      {/* Back layer: Cute pointed Right Ear */}
      <path 
        d="M80,38 L66,10 L52,32 Z" 
        fill="#E28743" 
        stroke="#1A1A1A" 
        strokeWidth="3" 
        strokeLinejoin="round" 
      />
      {/* Inner Pink Right Ear */}
      <path 
        d="M74,35 L66,16 L58,30 Z" 
        fill="#FCA5A5" 
        stroke="#1A1A1A" 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
      />

      {/* Round, squishy cheeks & head outline */}
      <ellipse cx="50" cy="56" rx="36" ry="30" fill="#F59E0B" stroke="#1A1A1A" strokeWidth="3" />

      {/* Fluffy white muzzle patch */}
      <ellipse cx="50" cy="68" rx="18" ry="12" fill="#FCFAF7" stroke="#1A1A1A" strokeWidth="1.5" />
      
      {/* Cute Tabby forehead stripes */}
      <path d="M44,28 Q50,34 50,38" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M56,28 Q50,34 50,38" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M36,32 Q44,36 44,40" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
      <path d="M64,32 Q56,36 56,40" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />

      {/* Large, beautiful reflective eyes with glints */}
      <g>
        {/* Left Eye */}
        <circle cx="34" cy="52" r="7.5" fill="#1A1A1A" />
        <circle cx="31.5" cy="49.5" r="2.5" fill="white" /> {/* Primary shiny glint */}
        <circle cx="36" cy="54.5" r="1.2" fill="white" /> {/* Secondary reflection */}

        {/* Right Eye */}
        <circle cx="66" cy="52" r="7.5" fill="#1A1A1A" />
        <circle cx="63.5" cy="49.5" r="2.5" fill="white" /> {/* Primary shiny glint */}
        <circle cx="68" cy="54.5" r="1.2" fill="white" /> {/* Secondary reflection */}
      </g>

      {/* Rosy blush cheeks */}
      <circle cx="23" cy="61" r="4.5" fill="#FCA5A5" opacity="0.75" />
      <circle cx="77" cy="61" r="4.5" fill="#FCA5A5" opacity="0.75" />

      {/* Tiny sweet button nose (pink polygon) */}
      <polygon points="47,59 53,59 50,63" fill="#FB7185" stroke="#1A1A1A" strokeWidth="1" strokeLinejoin="round" />

      {/* Happy mouth whiskers curve */}
      <path d="M43,65 Q50,70 50,64" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M57,65 Q50,70 50,64" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" />

      {/* Playful organic whiskers (left & right) */}
      <g stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round">
        {/* Left whiskers */}
        <line x1="22" y1="58" x2="6" y2="55" />
        <line x1="20" y1="63" x2="4" y2="64" />
        <line x1="21" y1="68" x2="6" y2="72" />
        {/* Right whiskers */}
        <line x1="78" y1="58" x2="94" y2="55" />
        <line x1="80" y1="63" x2="96" y2="64" />
        <line x1="79" y1="68" x2="94" y2="72" />
      </g>

      {/* Cute Sailor Explorer Collar (Layer 1 theme anchor) */}
      <path d="M30,80 C30,80 50,92 70,80 C70,80 62,85 50,85 C38,85 30,80 30,80 Z" fill="#0D9488" stroke="#1A1A1A" strokeWidth="2" />
      <circle cx="50" cy="85" r="3" fill="#FBBF24" stroke="#1A1A1A" strokeWidth="1" /> {/* Gold button */}

      {/* CONDITIONAL COMPONENT LAYER: Explorer / Sailor Captain Hat */}
      {hasHat && (
        <g className="animate-bounce" style={{ animationDuration: '3s' }}>
          {/* Main Dark Navy Hat base tilted slightly to the left */}
          <path 
            d="M25,18 C28,10 44,7 52,14 L72,8 C65,1 45,-3 25,6 Z" 
            fill="#1E293B" 
            stroke="#1A1A1A" 
            strokeWidth="2.5" 
            strokeLinejoin="round" 
          />
          <path 
            d="M32,15 Q50,5 68,10 C68,10 50,18 32,15 Z" 
            fill="#0F172A" 
            stroke="#1A1A1A" 
            strokeWidth="1.5" 
          />
          {/* Gold emblem (Compass star) on hat */}
          <polygon points="48,7 50,3 52,7 56,9 52,11 50,15 48,11 44,9" fill="#FBBF24" stroke="#1A1A1A" strokeWidth="1" />
        </g>
      )}
    </svg>
  );
}

export default function App() {
  // State Management
  const [curiosityQuery, setCuriosityQuery] = useState('');
  const [calibration, setCalibration] = useState('beginner'); // beginner, intermediate, advanced
  const [activeTab, setActiveTab] = useState('explore'); // explore, constellation, sparks
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const [currentExpedition, setCurrentExpedition] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  
  // Custom toast helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Cat Speech Bubble updates based on typing & calibration
  const getCatSpeech = () => {
    if (isSubmitting) {
      return "Hold tight! Charting the stars and drawing the coastal maps for our voyage...";
    }
    if (curiosityQuery.trim().length > 0) {
      return `Oooh, "${curiosityQuery.slice(0, 30)}${curiosityQuery.length > 30 ? '...' : ''}" is a brilliant question! Let's map it.`;
    }
    switch(calibration) {
      case 'beginner':
        return "Ahoy! I'm the Curious Cat. Tell me what you're wondering, and I'll build us a cozy map from scratch!";
      case 'intermediate':
        return "Intriguing! We will skip the basic coordinates and look deeper into the structural gears.";
      case 'advanced':
        return "Excellent. Direct sailing into deep, uncontested waters. I'll prepare the advanced treatises!";
      default:
        return "I'm ready for our next expedition. What's on your mind today?";
    }
  };

  // Handle setting a preset question
  const selectSuggestion = (text) => {
    setCuriosityQuery(text);
    triggerToast("✨ Query loaded! Set your starting point & tap Set Sail.");
  };

  // Simulated expedition launching
  const handleSetSail = (e) => {
    e.preventDefault();
    if (!curiosityQuery.trim()) {
      triggerToast("🐾 Please whisper a curiosity to the Cat first!");
      return;
    }
    
    setIsSubmitting(true);
    setSimulatedProgress(0);
  };

  // Simulate loading steps for the Claude-generated journey
  useEffect(() => {
    let interval;
    if (isSubmitting) {
      interval = setInterval(() => {
        setSimulatedProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              // Direct route into the simulated expedition
              setCurrentExpedition({
                title: curiosityQuery,
                caliber: calibration,
                isIvoryCoast: curiosityQuery.toLowerCase().includes('ivory') || curiosityQuery.toLowerCase().includes('ivoire')
              });
              setIsSubmitting(false);
            }, 800);
            return 100;
          }
          return prev + 12;
        });
      } , 250);
    }
    return () => clearInterval(interval);
  }, [isSubmitting, curiosityQuery]);

  const resetAll = () => {
    setCurrentExpedition(null);
    setCuriosityQuery('');
    setSimulatedProgress(0);
    setCalibration('beginner');
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#1A1A1A] font-sans antialiased selection:bg-[#D97706] selection:text-white flex justify-center">
      
      {/* Dynamic Google Fonts injection for authentic, beautiful typography */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .serif-header {
          font-family: 'Lora', Georgia, serif;
        }
        .sans-body {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }
        /* Custom scrollbar for mobile spark feed */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Main Responsive Mobile Frame (PWA feel) */}
      <div className="w-full max-w-md bg-[#FAF8F5] min-h-screen flex flex-col shadow-2xl relative border-x border-[#E9E4DB] overflow-x-hidden sans-body">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-4 left-4 right-4 bg-[#1A1A1A] text-white py-3 px-4 rounded-xl text-xs z-50 flex items-center shadow-lg transform transition-all duration-300 border border-[#D97706]/30">
            <Zap className="w-4 h-4 mr-2 text-[#D97706] animate-pulse" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* --- APP HEADER --- */}
        <header className="px-6 pt-5 pb-3 border-b border-[#E9E4DB] flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-2.5">
            {/* Embedded redesigned cat avatar in header */}
            <div className="w-10 h-10 rounded-full bg-[#FCFAF7] border-2 border-[#1A1A1A] shadow-sm flex items-center justify-center overflow-hidden">
              <CuteCatSvg className="w-10 h-10" hasHat={true} />
            </div>
            <div>
              <h1 className="serif-header text-lg font-extrabold tracking-tight text-[#1A1A1A]">
                Curious Cat
              </h1>
              <p className="text-[9px] uppercase tracking-wider font-extrabold text-[#D97706] -mt-1">
                Expedition Hub
              </p>
            </div>
          </div>
          
          {/* Constellation Indicator */}
          <div className="flex items-center gap-1.5 bg-[#F3EFE6] px-2.5 py-1 rounded-full border border-[#E1DCD0]">
            <Star className="w-3.5 h-3.5 text-[#D97706] fill-[#D97706]" />
            <span className="text-xs font-bold text-[#5C574F]">3/12 Explored</span>
          </div>
        </header>

        {/* --- MAIN PAGE ROUTER --- */}
        {currentExpedition ? (
          /* --- SIMULATED EXPEDITION RUNNING VIEW --- */
          <div className="flex-1 flex flex-col p-6 animate-fadeIn">
            {/* Header back button */}
            <button 
              onClick={resetAll}
              className="self-start flex items-center text-xs font-semibold text-[#5C574F] bg-white border border-[#E9E4DB] px-3 py-1.5 rounded-lg mb-6 hover:bg-[#F3EFE6] transition"
            >
              <X className="w-3.5 h-3.5 mr-1" /> Back to Port
            </button>

            {/* Expedition Header */}
            <div className="mb-4">
              <span className="text-[10px] uppercase font-bold text-[#D97706] tracking-widest bg-[#FDF6E2] border border-[#F5E3B3] px-2.5 py-1 rounded-full">
                Active Expedition • {currentExpedition.caliber} level
              </span>
              <h2 className="serif-header text-2xl font-bold mt-3 text-[#1A1A1A] leading-tight">
                {currentExpedition.title}
              </h2>
            </div>

            {/* EXPEDITION CARD SIMULATION */}
            <div className="flex-1 bg-white rounded-2xl border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] overflow-hidden flex flex-col my-4">
              
              {/* Layer 2: Theme Graphic (Dynamic SVG) */}
              <div className={`h-48 relative flex items-center justify-center overflow-hidden border-b-2 border-[#1A1A1A] ${
                currentExpedition.isIvoryCoast ? 'bg-gradient-to-b from-[#E0F2FE] to-[#F0FDFA]' : 'bg-gradient-to-b from-[#FEF3C7] to-[#FFFBEB]'
              }`}>
                {currentExpedition.isIvoryCoast ? (
                  // Custom stunning Portuguese Sailing Caravel ship for Expedition #001
                  <svg className="w-full h-full p-4" viewBox="0 0 200 120" fill="none">
                    {/* Ocean Waves */}
                    <path d="M0,100 Q25,95 50,100 T100,100 T150,100 T200,100 L200,120 L0,120 Z" fill="#0F766E" opacity="0.8"/>
                    <path d="M0,105 Q35,102 70,105 T140,105 T200,105 L200,120 L0,120 Z" fill="#0D9488" />
                    
                    {/* Clouds */}
                    <circle cx="30" cy="30" r="10" fill="white" opacity="0.6" />
                    <circle cx="45" cy="30" r="14" fill="white" opacity="0.6" />
                    
                    {/* Sun */}
                    <circle cx="110" cy="35" r="15" fill="#F59E0B" opacity="0.2" />
                    <circle cx="110" cy="35" r="10" fill="#F59E0B" />

                    {/* Ship */}
                    <g transform="translate(60, 45)">
                      {/* Wooden Hull */}
                      <path d="M10,40 C10,40 25,48 50,48 C75,48 90,38 90,38 L85,48 L15,48 Z" fill="#78350F" />
                      <rect x="20" y="38" width="55" height="3" fill="#451A03" />
                      
                      {/* Masts */}
                      <line x1="35" y1="10" x2="35" y2="40" stroke="#451A03" strokeWidth="2.5" />
                      <line x1="65" y1="5" x2="65" y2="40" stroke="#451A03" strokeWidth="2.5" />

                      {/* Main Square Sail */}
                      <path d="M35,10 Q20,20 35,35 Q50,20 35,10 Z" fill="#FCFAF7" stroke="#D1FAE5" strokeWidth="1" />
                      {/* Red Navigator Cross emblem on Sail */}
                      <line x1="35" y1="18" x2="35" y2="28" stroke="#DC2626" strokeWidth="1.5" />
                      <line x1="30" y1="23" x2="40" y2="23" stroke="#DC2626" strokeWidth="1.5" />

                      {/* Fore Sail */}
                      <path d="M65,5 Q55,15 65,30 Q75,15 65,5 Z" fill="#FCFAF7" stroke="#D1FAE5" strokeWidth="1" />
                      
                      {/* Crow's Nest Flag */}
                      <path d="M65,5 L75,8 L65,11 Z" fill="#D97706" />
                    </g>
                  </svg>
                ) : (
                  // Universal Custom Curiosity illustration
                  <svg className="w-full h-full p-4" viewBox="0 0 200 120" fill="none">
                    <circle cx="100" cy="60" r="45" fill="#FEF3C7" />
                    <circle cx="100" cy="60" r="35" fill="#FCD34D" opacity="0.6" />
                    <g transform="translate(85, 45)">
                      <HelpCircle className="w-8 h-8 text-[#D97706]" strokeWidth={1.5} />
                    </g>
                    {/* Whimsical orbits */}
                    <path d="M50,60 Q100,20 150,60" stroke="#D97706" strokeDasharray="3,3" strokeWidth="1.5" />
                    <path d="M50,60 Q100,100 150,60" stroke="#0D9488" strokeDasharray="3,3" strokeWidth="1.5" />
                  </svg>
                )}

                {/* Redesigned Mascot Badge overlay (delightful, floating cute cat) */}
                <div className="absolute top-3 right-3 bg-white border-2 border-[#1A1A1A] p-1 rounded-full shadow-lg">
                  <CuteCatSvg className="w-8 h-8" hasHat={true} />
                </div>
              </div>

              {/* Card Learning Core (Facts/Claude Prompt Output Style) */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="serif-header text-lg font-bold text-[#1a1a1a] mb-2 leading-snug">
                    {currentExpedition.isIvoryCoast 
                      ? "Act I: Sailors, Tusks, and Trade Coordinates" 
                      : "Expedition Initialization Success!"}
                  </h3>
                  <p className="text-sm text-[#5C574F] leading-relaxed">
                    {currentExpedition.isIvoryCoast ? (
                      <span>
                        In the 1440s, Portuguese sailors were looking for alternate trade routes around the massive underbelly of West Africa. They mapped distinct stretches based on their major commercial exports. One region was famous for its pepper; another for its gold. 
                        <strong className="block text-[#1A1A1A] mt-2 font-semibold">But this specific coastline was populated by massive forest elephants, and the ivory trade quickly came to define it globally.</strong>
                      </span>
                    ) : (
                      <span>
                        The Claude Knowledge Engine has synthesized your personalized, interactive curiosity path. Since you selected the <strong className="text-[#D97706]">{currentExpedition.caliber}</strong> profile, we have bypassed irrelevant summaries to construct a beautiful, gamified, 5-card explanation loop checking your understanding along the way!
                      </span>
                    )}
                  </p>
                </div>

                {/* Interactive Footer element */}
                <div className="mt-5 pt-4 border-t border-[#E9E4DB] flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-[#0D9488] font-semibold bg-[#F0FDFA] border border-[#CCFBF1] px-2.5 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    <span>Fact Checked</span>
                  </div>
                  <button 
                    onClick={() => triggerToast("✨ Wireframe Demonstration: Ready to progress to Card 2 in Production app!")} 
                    className="flex items-center gap-1 text-xs font-bold text-white bg-[#1A1A1A] px-4 py-2 rounded-lg hover:bg-[#333] transition"
                  >
                    Next Concept <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Playful Reset button */}
            <p className="text-center text-[11px] text-[#5C574F] italic">
              * This is an interactive mockup of Act I. Click "Back to Port" to explore other questions or check out the Calibration controls.
            </p>
          </div>
        ) : (
          /* --- WIREFRAME MAIN LANDING PAGE VIEW --- */
          <div className="flex-1 flex flex-col">
            
            {/* SUB-NAVIGATIONAL TAB SYSTEM */}
            <div className="grid grid-cols-3 border-b border-[#E9E4DB] bg-white">
              <button 
                onClick={() => setActiveTab('explore')}
                className={`py-3 text-xs font-bold tracking-tight transition duration-200 border-b-2 flex flex-col items-center justify-center gap-1 ${
                  activeTab === 'explore' 
                    ? 'border-[#D97706] text-[#D97706] bg-[#FCFAF7]' 
                    : 'border-transparent text-[#5C574F] hover:text-[#1a1a1a]'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Explore</span>
              </button>
              <button 
                onClick={() => {
                  setActiveTab('constellation');
                  triggerToast("🌌 Map Loaded: See how your completed curiosities expand!");
                }}
                className={`py-3 text-xs font-bold tracking-tight transition duration-200 border-b-2 flex flex-col items-center justify-center gap-1 ${
                  activeTab === 'constellation' 
                    ? 'border-[#D97706] text-[#D97706] bg-[#FCFAF7]' 
                    : 'border-transparent text-[#5C574F] hover:text-[#1a1a1a]'
                }`}
              >
                <Map className="w-4 h-4" />
                <span>Constellation</span>
              </button>
              <button 
                onClick={() => {
                  setActiveTab('sparks');
                  triggerToast("🔥 Sparks Loaded: Scroll to discover curated mysteries!");
                }}
                className={`py-3 text-xs font-bold tracking-tight transition duration-200 border-b-2 flex flex-col items-center justify-center gap-1 ${
                  activeTab === 'sparks' 
                    ? 'border-[#D97706] text-[#D97706] bg-[#FCFAF7]' 
                    : 'border-transparent text-[#5C574F] hover:text-[#1a1a1a]'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Spark Feed</span>
              </button>
            </div>

            {/* TAB CONTENTS */}
            {activeTab === 'explore' && (
              <div className="flex-1 flex flex-col p-6 space-y-6">
                
                {/* --- REDESIGNED MASCOT CHAT BANNER (Layer 3: Cute, Professional Cat) --- */}
                <div className="bg-[#FCFAF7] border-2 border-[#1A1A1A] rounded-2xl p-4 shadow-[4px_4px_0px_0px_#1A1A1A] relative flex gap-4 items-start">
                  
                  {/* Newly designed adorable vector Cat Mascot inside a beautiful frame */}
                  <div className="w-16 h-16 bg-[#FFFBEB] rounded-xl flex-shrink-0 relative flex items-center justify-center border-2 border-[#1A1A1A] shadow-inner">
                    <CuteCatSvg className="w-14 h-14" hasHat={true} />
                  </div>

                  {/* Speech Bubble text */}
                  <div className="flex-1">
                    <div className="bg-white border-2 border-[#1A1A1A] rounded-xl p-3 relative text-xs text-[#1A1A1A] leading-relaxed shadow-sm">
                      {/* Little triangle for Speech bubble arrow */}
                      <div className="absolute left-0 top-4 w-3 h-3 bg-white border-l-2 border-b-2 border-[#1A1A1A] transform -translate-x-1.8 rotate-45"></div>
                      <p className="font-semibold text-[#1A1A1A]">{getCatSpeech()}</p>
                    </div>
                  </div>
                </div>

                {/* --- CLEAN & CONCISE CAPTURE FORM (Preserved & breathable space) --- */}
                <form onSubmit={handleSetSail} className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold text-[#5C574F] uppercase tracking-wider mb-2 flex items-center gap-1">
                      <span>Enter your raw curiosity</span>
                      <Sparkle className="w-3.5 h-3.5 text-[#D97706]" />
                    </label>
                    
                    <div className="relative rounded-2xl border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] overflow-hidden bg-white">
                      <div className="absolute top-4 left-4 text-[#D97706]">
                        <Search className="w-5 h-5" />
                      </div>
                      
                      <textarea
                        value={curiosityQuery}
                        onChange={(e) => setCuriosityQuery(e.target.value)}
                        placeholder="Why is Côte d'Ivoire called Ivory Coast?..."
                        className="w-full bg-transparent pl-12 pr-4 pt-4 pb-12 text-sm text-[#1A1A1A] font-medium placeholder-[#A8A29E] focus:outline-none focus:ring-0 min-h-[110px] resize-none"
                      />
                      
                      {/* Clear query button */}
                      {curiosityQuery && (
                        <button
                          type="button"
                          onClick={() => setCuriosityQuery('')}
                          className="absolute bottom-3 right-4 bg-[#F3EFE6] border border-[#E1DCD0] px-2.5 py-1 rounded-lg text-xs hover:bg-[#E9E4DB] text-[#5C574F] font-bold transition"
                        >
                          Clear
                        </button>
                      )}

                      <div className="absolute bottom-3 left-4 text-[10px] text-[#A8A29E] font-semibold italic flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Active Cartography Engine
                      </div>
                    </div>
                  </div>

                  {/* --- CALIBRATION TOGGLES --- */}
                  <div className="bg-[#FCFAF7] border-2 border-[#1A1A1A] rounded-2xl p-4 shadow-[3px_3px_0px_0px_#1A1A1A]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <Info className="w-4 h-4 text-[#D97706]" />
                        <h4 className="text-xs font-extrabold text-[#1A1A1A] uppercase tracking-wider">
                          Where are you starting from?
                        </h4>
                      </div>
                      <span className="text-[9px] bg-[#E9E4DB] px-2 py-0.5 rounded text-[#5C574F] font-extrabold uppercase">
                        Calibrator V1
                      </span>
                    </div>

                    {/* Segmented tactile selector */}
                    <div className="grid grid-cols-3 gap-2 bg-[#F3EFE6] p-1.5 rounded-xl border-2 border-[#1A1A1A]">
                      <button
                        type="button"
                        onClick={() => {
                          setCalibration('beginner');
                          triggerToast("💡 Calibration set to Curious Novice: Gentle, story-driven learning.");
                        }}
                        className={`py-2 px-1 rounded-lg text-xs font-bold text-center transition-all ${
                          calibration === 'beginner'
                            ? 'bg-[#1A1A1A] text-[#FCD34D] shadow-sm'
                            : 'text-[#5C574F] hover:text-[#1A1A1A]'
                        }`}
                      >
                        🛶 Novice
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCalibration('intermediate');
                          triggerToast("🧭 Calibration set to Informed Seeker: Dive deeper into core mechanics.");
                        }}
                        className={`py-2 px-1 rounded-lg text-xs font-bold text-center transition-all ${
                          calibration === 'intermediate'
                            ? 'bg-[#1A1A1A] text-[#FCD34D] shadow-sm'
                            : 'text-[#5C574F] hover:text-[#1A1A1A]'
                        }`}
                      >
                        🧭 Seeker
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCalibration('advanced');
                          triggerToast("🦅 Calibration set to Daring Adept: Expert mode, nuanced perspectives.");
                        }}
                        className={`py-2 px-1 rounded-lg text-xs font-bold text-center transition-all ${
                          calibration === 'advanced'
                            ? 'bg-[#1A1A1A] text-[#FCD34D] shadow-sm'
                            : 'text-[#5C574F] hover:text-[#1A1A1A]'
                        }`}
                      >
                        🦅 Adept
                      </button>
                    </div>
                  </div>

                  {/* --- SUBMIT / SET SAIL BUTTON --- */}
                  <button
                    type="submit"
                    className="w-full bg-[#D97706] text-white font-bold py-4 px-6 rounded-2xl border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] hover:bg-[#C2410C] active:translate-y-1 active:shadow-[2px_2px_0px_0px_#1A1A1A] transition duration-150 flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
                  >
                    <span>⛵ Set Sail on Expedition</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>

                {/* --- CLEAN REPLACEMENT PLACEHOLDER CARD --- */}
                <div className="bg-[#F4EFE6]/70 border border-dashed border-[#C5BDB0] rounded-xl p-4 text-center">
                  <p className="text-xs text-[#5C574F] leading-relaxed">
                    Not sure what to ask yet? Switch to the <button onClick={() => setActiveTab('sparks')} className="text-[#D97706] font-extrabold hover:underline">Spark Feed</button> for beautiful, hand-curated questions designed to replace aimless social media scrolling.
                  </p>
                </div>

              </div>
            )}

            {activeTab === 'constellation' && (
              /* --- HIGH FIDELITY CONSTELLATION MAP --- */
              <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="serif-header text-xl font-bold mb-1 text-[#1A1A1A]">Your Constellation</h3>
                  <p className="text-xs text-[#5C574F] leading-relaxed">
                    Every completed journey connects as a glowing node in your personalized mind palace. Swipe & tap nodes to review spaced-repetition notes.
                  </p>
                </div>

                {/* Visual Map Canvas Grid */}
                <div className="flex-1 min-h-[300px] border-2 border-[#1A1A1A] rounded-2xl bg-[#F4F1EA] relative overflow-hidden flex items-center justify-center p-4 shadow-inner">
                  
                  {/* Glowing Lines Connecting Nodes */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line x1="120" y1="80" x2="280" y2="120" stroke="#D97706" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="120" y1="80" x2="160" y2="240" stroke="#D97706" strokeWidth="2" />
                    <line x1="280" y1="120" x2="220" y2="210" stroke="#0D9488" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="160" y1="240" x2="220" y2="210" stroke="#0D9488" strokeWidth="2.5" />
                  </svg>

                  {/* Node 1: Ivory Coast */}
                  <div 
                    onClick={() => {
                      setCuriosityQuery("Why is Côte d'Ivoire called Ivory Coast?");
                      setCurrentExpedition({
                        title: "Why is Côte d'Ivoire called Ivory Coast?",
                        caliber: "Seeker",
                        isIvoryCoast: true
                      });
                      triggerToast("✨ Loaded from Constellation Map Memory!");
                    }}
                    className="absolute top-12 left-16 bg-white border-2 border-[#1A1A1A] p-2 rounded-xl shadow-[2px_2px_0px_0px_#1A1A1A] cursor-pointer transform hover:scale-110 transition flex flex-col items-center"
                  >
                    <span className="text-lg">🐘</span>
                    <span className="text-[9px] font-bold mt-1 text-[#1A1A1A]">Ivory Coast</span>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute -top-1 -right-1"></div>
                  </div>

                  {/* Node 2: EV Chargers */}
                  <div 
                    onClick={() => triggerToast("⚡ EV Charger expedition under design review.")}
                    className="absolute top-24 right-12 bg-white border-2 border-[#1A1A1A] p-2 rounded-xl shadow-[2px_2px_0px_0px_#1A1A1A] cursor-pointer transform hover:scale-110 transition flex flex-col items-center"
                  >
                    <span className="text-lg">🔌</span>
                    <span className="text-[9px] font-bold mt-1 text-[#1A1A1A]">EV Chargers</span>
                  </div>

                  {/* Node 3: Resource Curse */}
                  <div 
                    onClick={() => triggerToast("⚖️ Resource Curse expedition under design review.")}
                    className="absolute bottom-16 left-28 bg-white border-2 border-[#1A1A1A] p-2 rounded-xl shadow-[2px_2px_0px_0px_#1A1A1A] cursor-pointer transform hover:scale-110 transition flex flex-col items-center"
                  >
                    <span className="text-lg">⚖️</span>
                    <span className="text-[9px] font-bold mt-1 text-[#1A1A1A]">Resource Curse</span>
                  </div>

                  {/* Node 4: Future Locked Node */}
                  <div className="absolute bottom-28 right-16 bg-white/50 border border-dashed border-[#A8A29E] p-2 rounded-xl flex flex-col items-center opacity-60">
                    <span className="text-lg">🔒</span>
                    <span className="text-[9px] font-bold mt-1 text-[#5C574F]">Locked Space</span>
                  </div>

                  {/* Legend Overlay */}
                  <div className="absolute bottom-3 left-3 bg-white/95 border border-[#1A1A1A] py-1 px-2.5 rounded-lg text-[9px] font-bold text-[#5C574F]">
                    🟠 Active Paths • 🟢 Memory Mastered
                  </div>
                </div>

                <div className="bg-[#FCFAF7] border border-[#E9E4DB] rounded-xl p-3 text-center text-xs text-[#5C574F]">
                  💡 <strong>Did you know?</strong> You have unlocked 25% of the West African trade history nodes. Keep asking to reveal cosmic routes!
                </div>
              </div>
            )}

            {activeTab === 'sparks' && (
              /* --- EXTREMELY BEAUTIFUL SPARK FEED TAB --- */
              <div className="flex-1 p-6 flex flex-col space-y-4">
                <div>
                  <h3 className="serif-header text-xl font-extrabold mb-1 text-[#1A1A1A]">Spark Feed</h3>
                  <p className="text-xs text-[#5C574F] leading-relaxed">
                    Swipe through fascinating micro-mysteries curated to ignite your curiosity. Tap any Spark card to load its journey.
                  </p>
                </div>

                {/* Scrollable feed wrapper */}
                <div className="flex-1 space-y-5 overflow-y-auto pr-1 max-h-[420px] hide-scrollbar">
                  
                  {/* Spark Card 1: Ivory Coast */}
                  <div 
                    onClick={() => {
                      setCuriosityQuery("Why is Côte d'Ivoire called Ivory Coast?");
                      setCurrentExpedition({
                        title: "Why is Côte d'Ivoire called Ivory Coast?",
                        caliber: "beginner",
                        isIvoryCoast: true
                      });
                      triggerToast("⚓ Launching: Why is there 'ivory' in Ivory Coast?");
                    }}
                    className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_#1A1A1A] transition cursor-pointer"
                  >
                    <div className="bg-[#E0F2FE] h-28 flex items-center justify-center relative border-b-2 border-[#1A1A1A]">
                      <span className="text-5xl">🚢</span>
                      <div className="absolute bottom-2 left-2 bg-white border border-[#1A1A1A] px-2 py-0.5 rounded text-[10px] font-extrabold text-[#D97706]">
                        GEOGRAPHY & HISTORICAL TRADE
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="serif-header text-md font-bold text-[#1A1A1A] mb-1">
                        Why Côte d'Ivoire kept its colonial trade name
                      </h4>
                      <p className="text-xs text-[#5C574F] line-clamp-2 leading-relaxed">
                        While other West African nations changed colonial titles upon independence, Côte d'Ivoire held tight. Why? Let's check the map.
                      </p>
                      <div className="mt-3 flex items-center justify-between text-[11px] font-extrabold text-[#D97706]">
                        <span>Beginner Expedition • 5 Cards</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Spark Card 2: EV Chargers */}
                  <div 
                    onClick={() => {
                      setCuriosityQuery("Why do EV chargers have compatibility issues?");
                      setCurrentExpedition({
                        title: "Why do EV chargers have compatibility issues?",
                        caliber: "intermediate",
                        isIvoryCoast: false
                      });
                      triggerToast("⚡ Launching: EV Chargers Rabbit Hole!");
                    }}
                    className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_#1A1A1A] transition cursor-pointer"
                  >
                    <div className="bg-[#FFFBEB] h-28 flex items-center justify-center relative border-b-2 border-[#1A1A1A]">
                      <span className="text-5xl">🔌</span>
                      <div className="absolute bottom-2 left-2 bg-white border border-[#1A1A1A] px-2 py-0.5 rounded text-[10px] font-extrabold text-[#0D9488]">
                        MODERN COMPATIBILITY
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="serif-header text-md font-bold text-[#1A1A1A] mb-1">
                        The physical reasons EV plugs don't match
                      </h4>
                      <p className="text-xs text-[#5C574F] line-clamp-2 leading-relaxed">
                        If standard household plugs took decades to converge, electric vehicle ports are undergoing an even wilder standard war.
                      </p>
                      <div className="mt-3 flex items-center justify-between text-[11px] font-extrabold text-[#0D9488]">
                        <span>Intermediate Expedition • 7 Cards</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Spark Card 3: Resource Curse */}
                  <div 
                    onClick={() => {
                      setCuriosityQuery("If Congo/Zambia/Angola are resource-rich, why are they poor?");
                      setCurrentExpedition({
                        title: "If Congo/Zambia/Angola are resource-rich, why are they poor?",
                        caliber: "advanced",
                        isIvoryCoast: false
                      });
                      triggerToast("⚖️ Launching: Resource Curse Paradox!");
                    }}
                    className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_#1A1A1A] transition cursor-pointer"
                  >
                    <div className="bg-[#FFF1F2] h-28 flex items-center justify-center relative border-b-2 border-[#1A1A1A]">
                      <span className="text-5xl">⚖️</span>
                      <div className="absolute bottom-2 left-2 bg-white border border-[#1A1A1A] px-2 py-0.5 rounded text-[10px] font-extrabold text-[#E11D48]">
                        ECONOMIC PARADOX
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="serif-header text-md font-bold text-[#1A1A1A] mb-1">
                        Understanding the Resource Curse & Dutch Disease
                      </h4>
                      <p className="text-xs text-[#5C574F] line-clamp-2 leading-relaxed">
                        Why does natural abundance often breed poverty? Let's trace value chain smile curves, institutions, and structural economics.
                      </p>
                      <div className="mt-3 flex items-center justify-between text-[11px] font-extrabold text-[#E11D48]">
                        <span>Advanced Expedition • 8 Cards</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* --- BOTTOM ADAPTIVE BRAND NAVIGATION & TRIVIA --- */}
            <div className="bg-white border-t border-[#E9E4DB] px-6 py-4 flex items-center justify-between text-xs">
              <span className="text-[#5C574F] font-semibold">Ready for a random prompt?</span>
              <button 
                onClick={() => {
                  const suggestions = [
                    "Why is Côte d'Ivoire called Ivory Coast?",
                    "Why do EV chargers have compatibility issues?",
                    "If Congo/Zambia are resource-rich, why are they poor?",
                    "Why did a single tree in the Sahara have its own map coordinate?"
                  ];
                  const randomQ = suggestions[Math.floor(Math.random() * suggestions.length)];
                  setCuriosityQuery(randomQ);
                  triggerToast("🔮 Loaded a fascinating query to your input bar!");
                }}
                className="text-[#D97706] font-extrabold flex items-center gap-1 hover:underline"
              >
                Roll the Dice 🎲
              </button>
            </div>

          </div>
        )}

        {/* --- FULL-SCREEN LOADING/CHARTING ANIMATION MODAL --- */}
        {isSubmitting && (
          <div className="absolute inset-0 bg-[#FAF8F5]/98 z-50 flex flex-col items-center justify-center p-8 animate-fadeIn">
            
            {/* Redesigned Loader Cat (Rotating compass with adorable mascot head inside) */}
            <div className="relative mb-8">
              <div className="w-28 h-28 rounded-full border-4 border-dashed border-[#D97706] animate-spin flex items-center justify-center" style={{ animationDuration: '8s' }} />
              <div className="absolute inset-2 bg-white border-2 border-[#1A1A1A] rounded-full flex items-center justify-center overflow-hidden shadow-md">
                <CuteCatSvg className="w-20 h-20" hasHat={true} />
              </div>
            </div>

            {/* Descriptive Status text */}
            <h3 className="serif-header text-xl font-extrabold text-[#1A1A1A] text-center mb-2">
              Preparing Cartography...
            </h3>
            <p className="text-xs text-[#5C574F] text-center max-w-[280px] leading-relaxed mb-6">
              Our cute companion is busy plotting course coordinates and consulting the Claude API to draw your personalized, interactive pathway: <br />
              <strong className="text-[#1A1A1A] text-sm mt-2 block italic font-semibold">"{curiosityQuery}"</strong>
            </p>

            {/* Interactive Progress Bar */}
            <div className="w-full bg-[#E9E4DB] h-3.5 rounded-full overflow-hidden border-2 border-[#1A1A1A] p-0.5">
              <div 
                className="bg-[#D97706] h-full transition-all duration-300 rounded-full"
                style={{ width: `${simulatedProgress}%` }}
              ></div>
            </div>

            <div className="mt-3 text-[11px] font-extrabold text-[#D97706] tracking-wider uppercase">
              {simulatedProgress}% Map Drawn
            </div>
          </div>
        )}

      </div>
    </div>
  );
}