import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  Sparkles, 
  HelpCircle, 
  Search, 
  ChevronRight, 
  ChevronLeft,
  Star, 
  Zap, 
  X, 
  ArrowRight, 
  Info,
  Map,
  Layers,
  Award,
  Pause,
  Bookmark,
  Scale,
  BookOpen,
  Globe2,
  Check,
  PenTool,
  Send,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Download,
  Share2,
  Flame,
  Maximize2,
  Sparkle,
  Clock,
  ZoomIn,
  ZoomOut
} from 'lucide-react';


// --- HIGH-FIDELITY DYNAMIC VECTOR MASCOT: CUTE CAT ---
// Expresses different moods (happy, celebrating, thinking, wide-eyed) depending on current screens.
function CuteCatSvg({ className = "w-16 h-16", hasHat = false, mood = "happy" }) {
  return (
    <svg 
      className={`${className} transition-all duration-300 drop-shadow-md`} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="55" r="44" fill="#FEF3C7" opacity="0.3" />

      {/* Pointed Ears */}
      <path d="M20,38 L34,10 L48,32 Z" fill="#E28743" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
      <path d="M26,35 L34,16 L42,30 Z" fill="#FCA5A5" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M80,38 L66,10 L52,32 Z" fill="#E28743" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
      <path d="M74,35 L66,16 L58,30 Z" fill="#FCA5A5" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" />

      {/* Head Outline */}
      <ellipse cx="50" cy="56" rx="36" ry="30" fill="#F59E0B" stroke="#1A1A1A" strokeWidth="3" />
      <ellipse cx="50" cy="68" rx="18" ry="12" fill="#FCFAF7" stroke="#1A1A1A" strokeWidth="1.5" />
      
      {/* Forehead stripes */}
      <path d="M44,28 Q50,34 50,38" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M56,28 Q50,34 50,38" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />

      {/* Expressive Eyes depending on active mood */}
      {mood === "happy" && (
        <g>
          <circle cx="34" cy="52" r="7.5" fill="#1A1A1A" />
          <circle cx="31.5" cy="49.5" r="2.5" fill="white" />
          <circle cx="66" cy="52" r="7.5" fill="#1A1A1A" />
          <circle cx="63.5" cy="49.5" r="2.5" fill="white" />
        </g>
      )}
      {mood === "squint" && (
        <g stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" fill="none">
          <path d="M28,52 Q34,46 40,52" />
          <path d="M60,52 Q66,46 72,52" />
        </g>
      )}
      {mood === "sad" && (
        <g>
          <circle cx="34" cy="52" r="7" fill="#1A1A1A" />
          <circle cx="32" cy="50" r="2.5" fill="white" />
          <circle cx="66" cy="52" r="7" fill="#1A1A1A" />
          <circle cx="64" cy="50" r="2.5" fill="white" />
        </g>
      )}

      {/* Rosy blush cheeks */}
      <circle cx="23" cy="61" r="4.5" fill="#FCA5A5" opacity="0.75" />
      <circle cx="77" cy="61" r="4.5" fill="#FCA5A5" opacity="0.75" />

      {/* Tiny sweet button nose */}
      <polygon points="47,59 53,59 50,63" fill="#FB7185" stroke="#1A1A1A" strokeWidth="1" strokeLinejoin="round" />

      {/* Mouth */}
      {mood === "happy" || mood === "squint" ? (
        <g stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" fill="none">
          <path d="M43,65 Q50,70 50,64" />
          <path d="M57,65 Q50,70 50,64" />
        </g>
      ) : (
        <path d="M46,67 Q50,64 54,67" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      )}

      {/* Playful Whiskers */}
      <g stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round">
        <line x1="22" y1="58" x2="6" y2="55" />
        <line x1="20" y1="63" x2="4" y2="64" />
        <line x1="21" y1="68" x2="6" y2="72" />
        <line x1="78" y1="58" x2="94" y2="55" />
        <line x1="80" y1="63" x2="96" y2="64" />
        <line x1="79" y1="68" x2="94" y2="72" />
      </g>

      {/* Sailor Explorer Collar */}
      <path d="M30,80 C30,80 50,92 70,80 C70,80 62,85 50,85 C38,85 30,80 30,80 Z" fill="#0D9488" stroke="#1A1A1A" strokeWidth="2" />
      <circle cx="50" cy="85" r="3" fill="#FBBF24" stroke="#1A1A1A" strokeWidth="1" />

      {/* Explorer / Sailor Captain Hat */}
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


// --- LAYER 2: THE BALANCE SCALE SVG ---
function BalanceScaleSvg({ activePerspective }) {
  const rotation = activePerspective === 'left' ? -8 : activePerspective === 'right' ? 8 : 0;
  const colorLeft = activePerspective === 'left' ? '#D97706' : '#A8A29E';
  const colorRight = activePerspective === 'right' ? '#0D9488' : '#A8A29E';

  return (
    <svg viewBox="0 0 200 120" className="w-full h-24 overflow-visible transition-all duration-700">
      <path d="M100,100 L90,120 L110,120 Z" fill="#1A1A1A" />
      <line x1="100" y1="40" x2="100" y2="100" stroke="#1A1A1A" strokeWidth="4" />
      <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '100px 40px', transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
        <line x1="40" y1="40" x2="160" y2="40" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
        <g transform="translate(40, 40)">
          <line x1="0" y1="0" x2="-15" y2="30" stroke={colorLeft} strokeWidth="1.5" />
          <line x1="0" y1="0" x2="15" y2="30" stroke={colorLeft} strokeWidth="1.5" />
          <path d="M-20,30 Q0,45 20,30 Z" fill={colorLeft} opacity="0.2" stroke={colorLeft} strokeWidth="2" />
          <circle cx="0" cy="25" r="6" fill={colorLeft} />
        </g>
        <g transform="translate(160, 40)">
          <line x1="0" y1="0" x2="-15" y2="30" stroke={colorRight} strokeWidth="1.5" />
          <line x1="0" y1="0" x2="15" y2="30" stroke={colorRight} strokeWidth="1.5" />
          <path d="M-20,30 Q0,45 20,30 Z" fill={colorRight} opacity="0.2" stroke={colorRight} strokeWidth="2" />
          <rect x="-6" y="19" width="12" height="12" fill={colorRight} />
        </g>
      </g>
    </svg>
  );
}

// --- LAYER 3: PROGRESS BAR SAILBOAT CAT ---
function CatInBoatSvg() {
  return (
    <svg viewBox="0 0 60 60" fill="none" className="w-10 h-10 drop-shadow-md overflow-visible">
      <path d="M10,50 Q30,55 50,50" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M12,42 L20,48 L40,48 L48,42 Z" fill="#78350F" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="35" y1="18" x2="35" y2="42" stroke="#1A1A1A" strokeWidth="1.5" />
      <path d="M35,20 Q25,28 35,38 Z" fill="#FCFAF7" stroke="#1A1A1A" strokeWidth="1" />
      <g transform="translate(18, 26)">
        <ellipse cx="10" cy="10" rx="8" ry="7" fill="#F59E0B" stroke="#1A1A1A" strokeWidth="1.5" />
        <ellipse cx="10" cy="13" rx="4" ry="3" fill="#FCFAF7" />
        <circle cx="7" cy="9" r="1.2" fill="#1A1A1A" />
        <circle cx="13" cy="9" r="1.2" fill="#1A1A1A" />
        <path d="M5,2 Q10,0 15,2 L14,4 L6,4 Z" fill="#1E293B" stroke="#1A1A1A" strokeWidth="1" />
      </g>
    </svg>
  );
}


export default function App() {
  const [activeMockupId, setActiveMockupId] = useState('m1');
  const [deviceScale, setDeviceScale] = useState(0.9);
  const [leftTab, setLeftTab] = useState('spec'); // spec, tokens

  // Spec Sheet Details for each mockup state
  const mockupsData = {
    m1: {
      title: "Mockup 1: Landing & Capture",
      phase: "PHASE 1: ENTRY",
      description: "The clean entry experience designed to capture active curiosity with mascot support, bypassing distracting pre-loaded list clutter.",
      guidelines: [
        "House background: Premium Paper Cream (#F9F6F0)",
        "Headline display: Bold serif Lora typography",
        "Inputs: Placed inside crisp relative boundaries to prevent keyboard clipping on small viewports",
        "Mascot: CuteCatSvg component reacts in real-time to active typing"
      ]
    },
    m2: {
      title: "Mockup 2: Charting State",
      phase: "PHASE 1: ENTRY",
      description: "A full-screen, highly styled star map loading screen that leverages delightful narrative waiting steps while APIs compile JSON data.",
      guidelines: [
        "Transition: Drastic theme switch into deep celestial navy space",
        "Visuals: Glowing golden constellation nodes connected with animated lines",
        "Wait-Time UX: Rotates active status texts, keeping users engaged",
        "Mascot: CuteCatSvg sits inside a rotating astrolabe instrument frame"
      ]
    },
    m3: {
      title: "Mockup 3: The Concept Card",
      phase: "PHASE 2: LEARNING LOOP",
      description: "The primary teaching unit. Integrates a large Layer 2 atmospheric illustration that bleeds seamlessly into native Lora copy.",
      guidelines: [
        "Layout: Image occupies top 45% of height, text flows below",
        "Factual split: 100% of copy rendered as real accessible UI text",
        "Bleed: Linear transparency overlay creates absolute layout continuity",
        "Mascot: Little CatInBoatSvg rides active coordinates on progress trail"
      ]
    },
    m4: {
      title: "Mockup 4: Predict-Before-Reveal",
      phase: "PHASE 2: LEARNING LOOP",
      description: "Tactile card designed to challenge comprehension with low-stakes predictions prior to showing factual reveals.",
      guidelines: [
        "Interaction: Tap wooden boxes (wood texture styling, haptic simulation)",
        "Reveal State: Success loads mascot holding coin; failures show gentle guides",
        "Pacing: Next button is locked until a selection is confirmed"
      ]
    },
    m5: {
      title: "Mockup 5: The Checkpoint Card",
      phase: "PHASE 2: LEARNING LOOP",
      description: "Editorial list quiz screen designed to verify knowledge retention, using supportive corrections rather than grade failures.",
      guidelines: [
        "Style: Clean, minimalist, high-contrast flat lists (no wooden textures)",
        "Accessibility: Strict text color guarantees readability across borders",
        "Mascot: Custom informative pop-up bubble displays soft guidance"
      ]
    },
    m6: {
      title: "Mockup 6: Sit-With-It Card",
      phase: "PHASE 2: LEARNING LOOP",
      description: "An even-handed layout mapping disputed or complex topics dynamically, utilizing custom tipping balance scale visuals.",
      guidelines: [
        "Design Theme: Background shifts gold or teal matching open viewpoints",
        "Interaction: BalanceScaleSvg tilts live upon expanding card sections",
        "Compliance: Main navigational flow is blocked until both views are read"
      ]
    },
    m7: {
      title: "Mockup 7: Explain It Back Workspace",
      phase: "PHASE 3: RETENTION",
      description: "A digital synthesising pad designed to close the retention loop by prompting the user to explain ideas in their own words.",
      guidelines: [
        "Layout: Notepad pattern mimics hand-written physical journals",
        "Input: Live character limits protect validation nodes",
        "Cat Feedback: Mascot reacts with custom feedback verifying user statements"
      ]
    },
    m8: {
      title: "Mockup 8: Holographic Trading Card",
      phase: "PHASE 3: RETENTION",
      description: "A premium, physically styled collectible card that serves as an earned learning trophy.",
      guidelines: [
        "Effects: 3D parallax tilt responds to coordinate inputs or mouse moves",
        "Sheen: Multi-blend linear gradients simulate classic holographic foils",
        "Engagement: Displays global reframe, offering three action branches"
      ]
    },
    m9: {
      title: "Mockup 9: Constellation Map",
      phase: "PHASE 4: HUBS",
      description: "A dark-mode knowledge galaxy showing users their explored territory. Doubles as a spaced-repetition trigger.",
      guidelines: [
        "Grid: Star coordinates connected via clean SVG vector strokes",
        "Interaction: Star clicks expand contextual memory review sheets",
        "Skins: Glow values emphasize completed nodes; locked items remain dim"
      ]
    },
    m10: {
      title: "Mockup 10: Spark Feed",
      phase: "PHASE 4: HUBS",
      description: "A highly visual scrollable feed designed to capture scrolling impulses and redirect them towards active micro-learning paths.",
      guidelines: [
        "Grid: Dual-layer visual cards containing metadata and launch triggers",
        "Contrast: Absolute high-contrast title rendering resolved",
        "Launch: Taps trigger prompt generation loading states directly"
      ]
    }
  };

  const activeSpec = mockupsData[activeMockupId];

  return (
    <div className="min-h-screen bg-[#111827] text-slate-200 flex flex-col font-sans selection:bg-[#D97706]">
      
      {/* Dynamic Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .serif-font { font-family: 'Lora', Georgia, serif; }
        .sans-font { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      {/* --- MASTER HEADER BAR --- */}
      <header className="px-6 py-4 bg-[#1F2937]/90 border-b border-[#374151] flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-white/20 flex items-center justify-center p-1">
            <CuteCatSvg className="w-8 h-8" hasHat={true} />
          </div>
          <div>
            <h1 className="text-sm font-black text-white tracking-wider uppercase">
              Curious Cat Design System Hub
            </h1>
            <p className="text-[10px] text-[#9CA3AF] font-semibold -mt-0.5">
              UX/UI SPECIFICATION & LIVE INTERACTIVE SHOWROOM
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-xs font-semibold text-[#D1D5DB] sans-font">
          <span className="bg-[#0D9488]/30 text-[#2DD4BF] border border-[#2DD4BF]/20 px-3 py-1 rounded-full uppercase tracking-wider text-[10px]">
            Lead App Designer Spec Sheet
          </span>
          <span className="text-[#9CA3AF]">Version 1.0.1 (Contrast Resolved)</span>
        </div>
      </header>

      {/* --- MAIN DASHBOARD WORKSPACE --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* --- LEFT SIDEBAR: SPECIFICATIONS & SYSTEM GUIDELINE TOKENS --- */}
        <aside className="w-[30%] bg-[#1F2937]/50 border-r border-[#374151] overflow-y-auto p-6 space-y-6 flex flex-col justify-between sans-font">
          
          <div className="space-y-6">
            {/* Sidebar Tab Switcher */}
            <div className="grid grid-cols-2 gap-2 bg-[#111827] p-1 rounded-xl border border-[#374151]">
              <button 
                onClick={() => setLeftTab('spec')}
                className={`py-2 text-xs font-extrabold uppercase rounded-lg transition-all ${leftTab === 'spec' ? 'bg-[#374151] text-white shadow-sm' : 'text-[#9CA3AF]'}`}
              >
                Spec Sheet
              </button>
              <button 
                onClick={() => setLeftTab('tokens')}
                className={`py-2 text-xs font-extrabold uppercase rounded-lg transition-all ${leftTab === 'tokens' ? 'bg-[#374151] text-white shadow-sm' : 'text-[#9CA3AF]'}`}
              >
                Design Tokens
              </button>
            </div>

            {leftTab === 'spec' ? (
              /* SPEC VIEW PANEL */
              <div className="space-y-5 animate-fadeIn">
                <span className="text-[10px] font-black text-[#D97706] tracking-widest uppercase">
                  Active Mockup Spec
                </span>
                
                <div className="bg-[#111827]/80 rounded-2xl border border-[#374151] p-4 space-y-4">
                  <div>
                    <span className="text-[9px] bg-[#374151] text-teal-300 font-extrabold px-2 py-0.5 rounded uppercase">
                      {activeSpec.phase}
                    </span>
                    <h2 className="text-base font-extrabold text-white mt-2 serif-font">
                      {activeSpec.title}
                    </h2>
                    <p className="text-xs text-[#9CA3AF] mt-1.5 leading-relaxed font-medium">
                      {activeSpec.description}
                    </p>
                  </div>

                  <div className="border-t border-[#374151] pt-3">
                    <span className="text-[10px] text-white font-extrabold uppercase tracking-wider block mb-2">
                      ⚙️ Frontend Code Guidelines:
                    </span>
                    <ul className="space-y-2 text-xs text-[#9CA3AF]">
                      {activeSpec.guidelines.map((g, idx) => (
                        <li key={idx} className="flex gap-2 items-start font-medium leading-relaxed">
                          <span className="text-[#D97706] mt-0.5">•</span>
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Chronological State Quick Navigator list */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black text-[#9CA3AF] tracking-widest uppercase block mb-1">
                    Chronological Roadmap Navigation
                  </span>
                  <div className="max-h-[220px] overflow-y-auto pr-1 space-y-1 bg-[#111827]/40 p-2 rounded-xl border border-[#374151]">
                    {Object.keys(mockupsData).map((key) => (
                      <button
                        key={key}
                        onClick={() => setActiveMockupId(key)}
                        className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                          activeMockupId === key 
                            ? 'bg-[#D97706] text-white border-transparent shadow-md' 
                            : 'bg-transparent text-[#9CA3AF] border-transparent hover:bg-[#374151]/30 hover:text-white'
                        }`}
                      >
                        <span>{mockupsData[key].title}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* TOKENS VIEW PANEL */
              <div className="space-y-5 animate-fadeIn">
                <span className="text-[10px] font-black text-[#D97706] tracking-widest uppercase">
                  Design Tokens Playbook
                </span>

                {/* Colors Card */}
                <div className="bg-[#111827]/80 rounded-2xl border border-[#374151] p-4 space-y-3">
                  <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
                    🎨 Theme Color Variables
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#F9F6F0] border border-[#374151]"></div>
                      <div className="text-xs">
                        <p className="font-extrabold text-white">#F9F6F0 (Paper Cream)</p>
                        <p className="text-[#9CA3AF] text-[10px]">House background anchor</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1A1A1A]"></div>
                      <div className="text-xs">
                        <p className="font-extrabold text-white">#1A1A1A (Carbon Charcoal)</p>
                        <p className="text-[#9CA3AF] text-[10px]">High contrast text base</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#D97706]"></div>
                      <div className="text-xs">
                        <p className="font-extrabold text-white">#D97706 (Explorer Amber)</p>
                        <p className="text-[#9CA3AF] text-[10px]">Expedition primary trigger</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#0D9488]"></div>
                      <div className="text-xs">
                        <p className="font-extrabold text-white">#0D9488 (Nautical Teal)</p>
                        <p className="text-[#9CA3AF] text-[10px]">Layer 3 brand details</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typography Card */}
                <div className="bg-[#111827]/80 rounded-2xl border border-[#374151] p-4 space-y-2.5">
                  <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
                    ✍️ Font Configuration
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div>
                      <p className="font-extrabold text-white serif-font text-sm">Lora (Serif Display)</p>
                      <p className="text-[#9CA3AF] text-[10px] mt-0.5">Used for headlines and historical reveals</p>
                    </div>
                    <div className="border-t border-[#374151] pt-2">
                      <p className="font-extrabold text-white sans-font">Plus Jakarta Sans (Body)</p>
                      <p className="text-[#9CA3AF] text-[10px] mt-0.5">Used for UI, buttons, options, and logs</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Prompt Bridge Handoff advice */}
          <div className="bg-[#111827] border border-[#374151] rounded-2xl p-4 mt-4">
            <span className="text-[9px] font-black text-emerald-400 tracking-wider uppercase block mb-1">
              💼 Chief Strategist Advisory Note
            </span>
            <p className="text-[10px] text-[#9CA3AF] leading-relaxed font-medium">
              Validate payload prompt consistency on Claude first before scaling visual render modules.
            </p>
          </div>

        </aside>


        {/* --- RIGHT PANEL: LIVE DEVICE WORKSPACE SIMULATOR --- */}
        <main className="flex-1 bg-[#111827] flex flex-col items-center justify-center p-6 relative">
          
          {/* Virtual Floating Scale Tools */}
          <div className="absolute top-4 right-6 bg-[#1F2937]/90 border border-[#374151] rounded-full px-3 py-1 flex items-center gap-3 shadow-md z-30">
            <span className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-wider">
              Interactive Scale:
            </span>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setDeviceScale(Math.max(deviceScale - 0.1, 0.6))} 
                className="w-5 h-5 rounded-full bg-[#374151] hover:bg-[#4B5563] text-white flex items-center justify-center text-xs"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-black text-white px-1.5">{Math.round(deviceScale * 100)}%</span>
              <button 
                onClick={() => setDeviceScale(Math.min(deviceScale + 0.1, 1.1))} 
                className="w-5 h-5 rounded-full bg-[#374151] hover:bg-[#4B5563] text-white flex items-center justify-center text-xs"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Responsive Phone Chassis */}
          <div className="relative transition-all duration-300 transform"
            style={{ transform: `scale(${deviceScale})` }}
          >
            {/* Phone Speaker Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1A1A1A] rounded-b-2xl z-40 flex items-center justify-center border-x border-b border-white/10">
              <div className="w-12 h-1 bg-[#4B5563] rounded-full"></div>
            </div>

            {/* iPhone Border styling */}
            <div className="w-[380px] h-[780px] bg-[#1A1A1A] rounded-[48px] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-[4px] border-[#374151] relative overflow-hidden flex flex-col">
              
              {/* Inner Live Screen Frame (Contrast inheritance fixed with text-[#1A1A1A]) */}
              <div className="flex-1 bg-[#F9F6F0] text-[#1A1A1A] rounded-[36px] overflow-hidden relative flex flex-col">
                
                {/* --- MOCKUP ROUTER SELECTOR PANEL (ACTIVE SCREEN INJECTS HERE) --- */}
                {activeMockupId === 'm1' && <LandingScreenSimulator onNavigate={(id) => setActiveMockupId(id)} />}
                {activeMockupId === 'm2' && <ChartingScreenSimulator onComplete={() => setActiveMockupId('m3')} />}
                {activeMockupId === 'm3' && <ConceptScreenSimulator onComplete={() => setActiveMockupId('m4')} />}
                {activeMockupId === 'm4' && <PredictScreenSimulator onComplete={() => setActiveMockupId('m5')} />}
                {activeMockupId === 'm5' && <CheckpointScreenSimulator onComplete={() => setActiveMockupId('m6')} />}
                {activeMockupId === 'm6' && <SitWithItScreenSimulator onComplete={() => setActiveMockupId('m7')} />}
                {activeMockupId === 'm7' && <ExplainScreenSimulator onComplete={() => setActiveMockupId('m8')} />}
                {activeMockupId === 'm8' && <MintScreenSimulator onComplete={() => setActiveMockupId('m9')} />}
                {activeMockupId === 'm9' && <ConstellationScreenSimulator onSelect={(q) => { setActiveMockupId('m3'); }} />}
                {activeMockupId === 'm10' && <SparkFeedScreenSimulator onLaunch={() => setActiveMockupId('m2')} />}

              </div>

            </div>
          </div>

        </main>

      </div>
    </div>
  );
}


// --- Mockup 1: Landing & Capture Simulator ---
function LandingScreenSimulator({ onNavigate }) {
  const [query, setQuery] = useState('');
  const [calibration, setCalibration] = useState('beginner');

  const getSpeech = () => {
    if (query) return `Oooh, "${query.slice(0, 20)}..." is a brilliant question! Let's map it.`;
    return calibration === 'beginner' 
      ? "Ahoy! I'm the Curious Cat. Ask me something, and I'll build us a cozy map from scratch!" 
      : "Direct sailing into deeper waters. Set calibrators and let's go!";
  };

  const handleLaunch = (e) => {
    e.preventDefault();
    if (!query) return;
    onNavigate('m2');
  };

  return (
    <div className="flex-1 flex flex-col p-5 bg-[#FAF8F5] text-[#1A1A1A] sans-font animate-fadeIn justify-between">
      
      {/* Header */}
      <header className="flex justify-between items-center pb-2 border-b border-[#E9E4DB] mt-6 text-[#1A1A1A]">
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 bg-[#D97706] rounded-full flex items-center justify-center text-[10px] text-white">🐱</div>
          <span className="font-extrabold text-sm serif-font text-[#1A1A1A]">Curious Cat</span>
        </div>
        <div className="flex items-center gap-1 bg-[#F3EFE6] px-2 py-0.5 rounded-full border border-[#E1DCD0] text-[10px] text-[#5C574F]">
          <Star className="w-3 h-3 text-[#D97706]" /> <span>3/12</span>
        </div>
      </header>

      {/* Mascot Hub */}
      <div className="bg-[#FCFAF7] border-2 border-[#1A1A1A] rounded-xl p-3 flex gap-3 items-start my-3 shadow-[2px_2px_0px_#1A1A1A]">
        <CuteCatSvg className="w-12 h-12" hasHat={true} />
        <div className="flex-1 bg-white border border-[#E9E4DB] rounded-lg p-2 text-[10px] text-[#1A1A1A] leading-relaxed relative">
          <div className="absolute left-0 top-3 w-2 h-2 bg-white border-l border-b border-[#E9E4DB] transform -translate-x-1 rotate-45"></div>
          {getSpeech()}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleLaunch} className="space-y-3 text-[#1A1A1A]">
        <div className="relative border-2 border-[#1A1A1A] rounded-xl overflow-hidden bg-white shadow-[3px_3px_0px_#1A1A1A]">
          <Search className="w-4 h-4 text-[#D97706] absolute top-3.5 left-3" />
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Why is Côte d'Ivoire called Ivory Coast?..."
            className="w-full pl-9 pr-3 pt-3 pb-8 text-xs font-semibold text-[#1A1A1A] placeholder-[#A8A29E] bg-transparent border-none outline-none focus:ring-0 resize-none h-20"
          />
          <div className="absolute bottom-2 left-3 text-[8px] text-[#A8A29E] italic font-semibold">AI active</div>
        </div>

        {/* Toggles */}
        <div className="bg-[#FCFAF7] border border-[#E9E4DB] p-2.5 rounded-xl space-y-1.5 text-[#1A1A1A]">
          <span className="text-[9px] font-extrabold text-[#5C574F] block uppercase tracking-wider">Calibration Profile</span>
          <div className="grid grid-cols-3 gap-1 bg-[#F3EFE6] p-1 rounded-lg border border-[#E1DCD0]">
            {['beginner', 'intermediate', 'advanced'].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setCalibration(lvl)}
                className={`py-1 rounded text-[9px] font-bold uppercase transition ${
                  calibration === lvl ? 'bg-[#1A1A1A] text-[#FCD34D]' : 'text-[#5C574F]'
                }`}
              >
                {lvl === 'beginner' ? '🛶 Novice' : lvl === 'intermediate' ? '🧭 Seeker' : '🦅 Adept'}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={!query}
          className={`w-full py-3 rounded-xl border-2 border-[#1A1A1A] font-extrabold uppercase text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 ${
            query 
              ? 'bg-[#D97706] text-white shadow-[3px_3px_0px_#1A1A1A]' 
              : 'bg-[#E1DCD0] text-[#A8A29E] cursor-not-allowed shadow-none border-dashed'
          }`}
        >
          <span>⛵ Set Sail on Expedition</span> <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Spark Switch Shortcut */}
      <div className="bg-[#F4EFE6]/70 border border-dashed border-[#C5BDB0] rounded-xl p-2.5 text-center mt-2 text-[#5C574F]">
        <p className="text-[10px]">
          Bored? Jump to the <span onClick={() => onNavigate('m10')} className="text-[#D97706] font-bold cursor-pointer hover:underline">Spark Feed 🧭</span>
        </p>
      </div>

    </div>
  );
}

// --- Mockup 2: Charting State Simulator ---
function ChartingScreenSimulator({ onComplete }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPct((p) => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + 10;
      });
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col p-5 bg-[#0B1120] text-white sans-font animate-fadeIn justify-between">
      <div className="text-center mt-12 space-y-2">
        <span className="bg-[#D97706]/20 border border-[#D97706]/40 text-[#FBBF24] rounded-full px-3 py-1 text-[8px] font-bold tracking-wider uppercase">
          Destination Set
        </span>
        <h1 className="serif-font text-base italic font-semibold px-4">
          "Why is Côte d'Ivoire called Ivory Coast?"
        </h1>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="w-32 h-32 rounded-full border-2 border-[#D97706]/30 animate-spin border-dashed relative"></div>
        <div className="absolute w-24 h-24 bg-white/95 rounded-full flex items-center justify-center shadow-lg overflow-hidden border-2 border-[#1A1A1A]">
          <CuteCatSvg className="w-16 h-16" hasHat={true} />
        </div>
      </div>

      <div className="bg-[#1E293B] border border-[#334155] p-4 rounded-2xl text-center space-y-4">
        <span className="text-[11px] font-extrabold uppercase text-[#9CA3AF] tracking-wide block">
          Drafting the story cards...
        </span>
        
        <div className="w-full bg-[#334155] h-2 rounded-full overflow-hidden">
          <div className="bg-[#D97706] h-full transition-all duration-300" style={{ width: `${pct}%` }}></div>
        </div>

        {pct >= 100 && (
          <button 
            onClick={onComplete}
            className="w-full py-2.5 rounded-lg bg-[#FCD34D] hover:bg-[#F59E0B] text-[#1A1A1A] font-extrabold text-[11px] uppercase tracking-wider transition flex items-center justify-center gap-1 animate-fadeIn"
          >
            <span>Begin Expedition</span> <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// --- Mockup 3: Concept Card Simulator ---
function ConceptScreenSimulator({ onComplete }) {
  return (
    <div className="flex-1 flex flex-col bg-[#F9F6F0] text-[#1A1A1A] animate-fadeIn justify-between">
      
      {/* Absolute floating bar */}
      <div className="absolute top-6 left-0 right-0 px-6 flex justify-between items-center z-20">
        <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white"><Pause className="w-4 h-4 fill-current" /></div>
        <span className="bg-black/30 border border-white/20 text-white rounded-full px-3 py-1 text-[9px] font-bold tracking-widest uppercase">Ivory Coast</span>
        <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white"><Bookmark className="w-4 h-4" /></div>
      </div>

      {/* SVG Image top wrapper */}
      <div className="h-[40%] bg-gradient-to-b from-[#0F766E] to-[#F9F6F0] relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 opacity-80 mix-blend-overlay">
          <svg className="w-full h-full object-cover" viewBox="0 0 100 100">
            {/* Sunrise backdrop */}
            <circle cx="50" cy="80" r="40" fill="#FBBF24" opacity="0.6" />
            <path d="M0,80 Q25,70 50,80 T100,80 L100,100 L0,100 Z" fill="#047857" />
          </svg>
        </div>
        
        {/* Visual bleed gradient overlay */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#F9F6F0] to-transparent"></div>
      </div>

      {/* Learning content */}
      <div className="flex-1 px-6 pb-20 pt-2 flex flex-col justify-between sans-font text-[#1A1A1A]">
        <div className="space-y-3">
          <span className="text-[9px] font-extrabold text-[#D97706] uppercase tracking-widest border border-[#F5E3B3] bg-[#FDF6E2] px-2 py-0.5 rounded-md inline-block">
            Concept 1
          </span>
          <h1 className="serif-font text-xl font-bold text-[#1A1A1A] leading-tight">
            A Coastline Mapped by its Cargo
          </h1>
          <div className="space-y-2 text-[12px] leading-relaxed text-[#4B5563] font-medium">
            <p>In the 1440s, Portuguese navigators were not mapping West Africa to study local kingdoms.</p>
            <p>They named coastal areas entirely on what they packed in their ships (e.g. Gold Coast, Pepper Coast).</p>
          </div>
        </div>

        <button className="text-[10px] font-extrabold text-[#0D9488] self-start flex items-center gap-1">
          <span>Expand Illustration</span> <ZoomIn className="w-3 h-3" />
        </button>
      </div>

      {/* Navigation Footer */}
      <div className="absolute bottom-0 inset-x-0 bg-white border-t border-[#E9E4DB] px-6 py-3 flex items-center justify-between z-20">
        {/* Sailor Boat HUD */}
        <div className="flex-1 relative flex items-center h-8 pr-6">
          <div className="absolute left-1.5 right-6 border-t border-dashed border-[#E1DCD0]"></div>
          <div className="relative z-10 flex justify-between w-full">
            <div className="w-2 h-2 rounded-full bg-[#D97706] relative">
              <div className="absolute bottom-1 -left-3 animate-bounce"><CatInBoatSvg /></div>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#E1DCD0]"></div>
            <div className="w-2 h-2 rounded-full bg-[#E1DCD0]"></div>
            <div className="w-2 h-2 rounded-full bg-[#E1DCD0]"></div>
          </div>
        </div>

        <button 
          onClick={onComplete}
          className="w-10 h-10 rounded-full bg-[#1A1A1A] hover:bg-[#D97706] transition flex items-center justify-center text-white shrink-0"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

    </div>
  );
}

// --- Mockup 4: Predict-Before-Reveal Simulator ---
function PredictScreenSimulator({ onComplete }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex-1 flex flex-col bg-[#F9F6F0] text-[#1A1A1A] animate-fadeIn justify-between p-5 mt-6 pb-20">
      
      <div className="space-y-4">
        <div className="text-center">
          <span className="text-[9px] uppercase tracking-widest text-[#0D9488] border border-[#CCFBF1] bg-[#F0FDFA] px-2.5 py-0.5 rounded-full inline-block">
            Prediction Time
          </span>
        </div>

        <h1 className="serif-font text-lg font-bold text-center leading-snug text-[#1A1A1A]">
          What cargo do you think they found in massive abundance along this specific coastline?
        </h1>

        {/* Tactile Cargo Boxes */}
        <div className="space-y-2">
          {[
            { id: 'timber', label: '🪵 Timber', isCorrect: false },
            { id: 'ivory', label: '🐘 Ivory', isCorrect: true },
            { id: 'pepper', label: '🌶️ Pepper', isCorrect: false }
          ].map((cargo) => {
            const hasChecked = selected !== null;

            let cName = "border-[#451A03] bg-[#78350F] text-[#FEF3C7] shadow-[2px_2px_0px_#451A03]";
            if (hasChecked) {
              if (cargo.id === 'ivory') {
                cName = "bg-emerald-500 border-emerald-600 text-white shadow-none";
              } else if (selected === cargo.id) {
                cName = "bg-rose-500 border-rose-600 text-white shadow-none";
              } else {
                cName = "bg-[#F3F4F6] border-[#E5E7EB] text-[#9CA3AF] shadow-none opacity-40";
              }
            }

            return (
              <button
                key={cargo.id}
                disabled={hasChecked}
                onClick={() => setSelected(cargo.id)}
                className={`w-full p-4 rounded-xl text-xs font-bold transition flex items-center justify-between border-2 ${cName}`}
              >
                <span>{cargo.label}</span>
                {hasChecked && cargo.isCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                {hasChecked && selected === cargo.id && !cargo.isCorrect && <XCircle className="w-4 h-4 text-white" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reveal feedback area */}
      {selected && (
        <div className="bg-white border-2 border-[#1A1A1A] rounded-xl p-3 shadow-[2px_2px_0px_#1A1A1A] flex gap-3 items-center animate-fadeIn my-2 text-[#5C574F]">
          {selected === 'ivory' ? (
            <div className="w-12 h-12 flex-shrink-0"><CuteCatSvg className="w-12 h-12" mood="squint" /></div>
          ) : (
            <div className="w-12 h-12 flex-shrink-0"><CuteCatSvg className="w-12 h-12" mood="sad" /></div>
          )}
          <div className="flex-1 text-[10px] leading-relaxed text-[#5C574F]">
            <p className="font-bold text-[#1A1A1A]">
              {selected === 'ivory' ? 'Nailed it! Spot on.' : 'A great guess, but...'}
            </p>
            This coastline was teeming with forest elephants. Portuguese named it Ivory Coast.
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="absolute bottom-0 inset-x-0 bg-white border-t border-[#E9E4DB] px-6 py-3 flex items-center justify-between z-20">
        <div className="flex-1 relative flex items-center h-8 pr-6">
          <div className="absolute left-1.5 right-6 border-t border-dashed border-[#E1DCD0]"></div>
          <div className="relative z-10 flex justify-between w-full">
            <div className="w-2 h-2 rounded-full bg-[#D97706]" />
            <div className="w-2 h-2 rounded-full bg-[#D97706] relative">
              <div className="absolute bottom-1 -left-3 animate-bounce"><CatInBoatSvg /></div>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#E1DCD0]"></div>
            <div className="w-2 h-2 rounded-full bg-[#E1DCD0]"></div>
          </div>
        </div>
        <button 
          onClick={onComplete}
          disabled={!selected}
          className={`w-10 h-10 rounded-full transition flex items-center justify-center text-white shrink-0 ${
            selected ? 'bg-[#1A1A1A] hover:bg-[#D97706]' : 'bg-[#E1DCD0] cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

    </div>
  );
}

// --- Mockup 5: Checkpoint Card Simulator ---
function CheckpointScreenSimulator({ onComplete }) {
  const [selected, setSelected] = useState(null);

  const choices = [
    { id: 'a', text: 'To trace internal African borders.', isCorrect: false, feedback: "Not quite! Remember, they didn't care about politics, just what they could load onto ships." },
    { id: 'b', text: 'To mark out resource cargo.', isCorrect: true, feedback: "Exactly! They literally mapped regions based on trade assets." },
    { id: 'c', text: 'To set up permanent colonial cities.', isCorrect: false, feedback: "Actually, settlements came centuries later. Early on, these were just ports." }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#F9F6F0] text-[#1A1A1A] animate-fadeIn justify-between p-5 mt-6 pb-20">
      
      <div className="space-y-4">
        <div>
          <span className="text-[9px] uppercase tracking-widest text-[#0D9488] border border-[#CCFBF1] bg-[#F0FDFA] px-2.5 py-0.5 rounded-full inline-block">
            Quick Check
          </span>
        </div>

        <h1 className="serif-font text-lg font-bold leading-snug text-[#1A1A1A]">
          What was the primary purpose of early West African maps?
        </h1>

        <div className="space-y-2">
          {choices.map((choice) => {
            const hasChecked = selected !== null;
            const isSelect = selected === choice.id;

            let styles = "bg-white border-[#E1DCD0] hover:border-[#D97706] text-[#4B5563]";
            if (hasChecked) {
              if (choice.isCorrect) {
                styles = "bg-emerald-55 border-emerald-500 text-emerald-950 font-semibold";
              } else if (isSelect) {
                styles = "bg-amber-55 border-amber-500 text-amber-950 font-semibold";
              } else {
                styles = "bg-white border-[#E1DCD0] text-[#9CA3AF] opacity-50";
              }
            }

            return (
              <button
                key={choice.id}
                disabled={hasChecked}
                onClick={() => setSelected(choice.id)}
                className={`w-full text-left p-3.5 rounded-xl border-2 text-[11px] leading-relaxed transition ${styles}`}
              >
                {choice.text}
              </button>
            );
          })}
        </div>
      </div>

      {/* Warm corrections chat banner */}
      {selected && (
        <div className="bg-[#FFFBEB] border-2 border-[#D97706] rounded-xl p-3 shadow-md flex gap-3 items-start animate-fadeIn relative text-[#B45309]">
          <div className="w-10 h-10 shrink-0 border border-[#E9E4DB] rounded-full bg-white flex items-center justify-center">
            <CuteCatSvg className="w-9 h-9" mood={selected === 'b' ? 'happy' : 'sad'} />
          </div>
          <div className="flex-1 text-[10px] leading-relaxed text-[#B45309]">
            <p className="font-extrabold text-[#1A1A1A]">{selected === 'b' ? 'Spot on!' : 'Almost!'}</p>
            {choices.find(c => c.id === selected)?.feedback}
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="absolute bottom-0 inset-x-0 bg-white border-t border-[#E9E4DB] px-6 py-3 flex items-center justify-between z-20">
        <div className="flex-1 relative flex items-center h-8 pr-6">
          <div className="absolute left-1.5 right-6 border-t border-dashed border-[#E1DCD0]"></div>
          <div className="relative z-10 flex justify-between w-full">
            <div className="w-2 h-2 rounded-full bg-[#D97706]" />
            <div className="w-2 h-2 rounded-full bg-[#D97706]" />
            <div className="w-2 h-2 rounded-full bg-[#D97706] relative">
              <div className="absolute bottom-1 -left-3 animate-bounce"><CatInBoatSvg /></div>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#E1DCD0]"></div>
          </div>
        </div>
        <button 
          onClick={onComplete}
          disabled={!selected}
          className={`w-10 h-10 rounded-full transition flex items-center justify-center text-white shrink-0 ${
            selected ? 'bg-[#1A1A1A] hover:bg-[#D97706]' : 'bg-[#E1DCD0] cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

    </div>
  );
}

// --- Mockup 6: Sit-With-It Card Simulator ---
function SitWithItScreenSimulator({ onComplete }) {
  const [toggle, setToggle] = useState(null); // 'left' or 'right'
  const [viewedLeft, setViewedLeft] = useState(false);
  const [viewedRight, setViewedRight] = useState(false);

  const selectSide = (side) => {
    setToggle(side);
    if (side === 'left') setViewedLeft(true);
    if (side === 'right') setViewedRight(true);
  };

  const unlocked = viewedLeft && viewedRight;

  return (
    <div className={`flex-1 flex flex-col p-5 mt-6 pb-20 justify-between transition-colors duration-500 animate-fadeIn text-[#1A1A1A] ${
      toggle === 'left' ? 'bg-[#FFFBEB]' : toggle === 'right' ? 'bg-[#F0FDFA]' : 'bg-[#F9F6F0]'
    }`}>
      
      <div className="space-y-3">
        <div className="text-center">
          <span className="text-[9px] uppercase tracking-widest text-[#5C574F] border border-[#E9E4DB] bg-white px-2.5 py-0.5 rounded-full inline-block">
            Sit With It
          </span>
        </div>

        <h1 className="serif-font text-md font-bold text-center leading-snug px-2 text-[#1A1A1A]">
          If names were colonial price tags, why did Côte d'Ivoire keep theirs?
        </h1>

        {/* Scaled Tipping Scale visual */}
        <div className="flex justify-center -my-1">
          <BalanceScaleSvg activePerspective={toggle} />
        </div>

        {/* Dual Cards */}
        <div className="space-y-2">
          <div 
            onClick={() => selectSide('left')}
            className={`p-3 rounded-xl border-2 transition cursor-pointer text-[10px] ${
              toggle === 'left' ? 'bg-white border-[#D97706]' : 'bg-white/60 border-[#E1DCD0]'
            }`}
          >
            <div className="flex justify-between font-bold text-[#D97706] mb-1">
              <span>1. Pragmatic View</span>
              {viewedLeft && <span className="text-[8px] bg-amber-100 text-[#D97706] px-1 rounded">Read</span>}
            </div>
            {toggle === 'left' && <p className="text-[9px] text-[#5C574F] mt-1 leading-relaxed">Houphouët-Boigny believed keeping the French name prevented ethnic clashes and protected cocoa brand equity.</p>}
          </div>

          <div 
            onClick={() => selectSide('right')}
            className={`p-3 rounded-xl border-2 transition cursor-pointer text-[10px] ${
              toggle === 'right' ? 'bg-white border-[#0D9488]' : 'bg-white/60 border-[#E1DCD0]'
            }`}
          >
            <div className="flex justify-between font-bold text-[#0D9488] mb-1">
              <span>2. Decolonial View</span>
              {viewedRight && <span className="text-[8px] bg-[#E0F2FE] text-[#0D9488] px-1 rounded">Read</span>}
            </div>
            {toggle === 'right' && <p className="text-[9px] text-[#5C574F] mt-1 leading-relaxed">Critics argue retaining French identifiers keeps psychological tags pointing back to the empire.</p>}
          </div>
        </div>
      </div>

      {/* Progress nodes */}
      <div className="absolute bottom-0 inset-x-0 bg-white border-t border-[#E9E4DB] px-6 py-3 flex items-center justify-between z-20">
        <div className="flex-1 relative flex items-center h-8 pr-6">
          <div className="absolute left-1.5 right-6 border-t border-dashed border-[#E1DCD0]"></div>
          <div className="relative z-10 flex justify-between w-full">
            <div className="w-2 h-2 rounded-full bg-[#D97706]" />
            <div className="w-2 h-2 rounded-full bg-[#D97706]" />
            <div className="w-2 h-2 rounded-full bg-[#D97706]" />
            <div className="w-2 h-2 rounded-full bg-[#D97706] relative">
              <div className="absolute bottom-1 -left-3 animate-bounce"><CatInBoatSvg /></div>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#E1DCD0]"></div>
          </div>
        </div>
        <button 
          onClick={onComplete}
          disabled={!unlocked}
          className={`w-10 h-10 rounded-full transition flex items-center justify-center text-white shrink-0 ${
            unlocked ? 'bg-[#1A1A1A] hover:bg-[#D97706]' : 'bg-[#E1DCD0] cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

    </div>
  );
}

// --- Mockup 7: Explain It Back Workspace Simulator ---
function ExplainScreenSimulator({ onComplete }) {
  const [text, setText] = useState('');
  const [analyzing, setAnalyzying] = useState(false);
  const [complete, setComplete] = useState(false);

  const isValid = text.trim().split(' ').length > 2;

  const handleSubmit = () => {
    setAnalyzying(true);
    setTimeout(() => {
      setAnalyzying(false);
      setComplete(true);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F9F6F0] text-[#1A1A1A] animate-fadeIn justify-between p-5 mt-6 pb-20">
      
      {!complete ? (
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-[9px] uppercase tracking-widest text-[#D97706] border border-[#F5E3B3] bg-[#FDF6E2] px-2.5 py-0.5 rounded-full inline-block">
              Explain It Back
            </span>
          </div>

          <h1 className="serif-font text-lg font-bold text-center leading-snug text-[#1A1A1A]">
            How would you summarize why they kept the name?
          </h1>

          {/* Lined journal textarea box */}
          <div className="bg-white border-2 border-[#1A1A1A] rounded-xl overflow-hidden shadow-[2px_2px_0px_#1A1A1A] flex flex-col">
            <textarea
              value={text}
              disabled={analyzing}
              onChange={(e) => setText(e.target.value)}
              placeholder="Basically, keeping the name Ivory Coast..."
              className="w-full h-32 p-3 text-xs leading-[24px] bg-[#FFFBEB] text-[#1A1A1A] repeating-linear-gradient focus:outline-none border-none resize-none font-medium"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 23px, #E5E7EB 24px)'
              }}
            />
            <div className="border-t border-[#E9E4DB] p-2 bg-white flex justify-between items-center text-[10px] text-[#5C574F]">
              <span className="text-[#9CA3AF] font-bold">Active synthesis</span>
              <button
                disabled={!isValid || analyzing}
                onClick={handleSubmit}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition ${
                  isValid ? 'bg-[#1A1A1A] text-[#FCD34D]' : 'bg-slate-200 text-[#9CA3AF]'
                }`}
              >
                {analyzing ? 'Checking...' : 'Send to Cat'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-fadeIn text-[#1A1A1A]">
          <div>
            <span className="text-[9px] uppercase tracking-widest font-bold text-[#9CA3AF]">Your Recalled synthesis</span>
            <p className="bg-white border border-[#E9E4DB] p-3 rounded-lg text-[11px] leading-relaxed italic text-[#4B5563]">"{text}"</p>
          </div>

          <div className="bg-[#FFFBEB] border-2 border-[#D97706] rounded-xl p-4 shadow-lg flex gap-3 items-start relative mt-4 text-[#B45309]">
            <div className="w-10 h-10 shrink-0 border border-[#E9E4DB] rounded-full bg-white flex items-center justify-center p-0.5">
              <CuteCatSvg className="w-9 h-9" mood="happy" />
            </div>
            <div className="flex-1 text-[10px] leading-relaxed text-[#B45309]">
              <p className="font-extrabold flex items-center gap-1">Brilliant summary! <Sparkles className="w-3.5 h-3.5 text-[#D97706]" /></p>
              You matched the decolonial reframe beautifully! Ready to mint your digital card?
            </div>
          </div>
        </div>
      )}

      {/* Progress navigation bar */}
      <div className="absolute bottom-0 inset-x-0 bg-white border-t border-[#E9E4DB] px-6 py-3 flex items-center justify-between z-20">
        <div className="flex-1 relative flex items-center h-8 pr-6">
          <div className="absolute left-1.5 right-6 border-t border-dashed border-[#E1DCD0]"></div>
          <div className="relative z-10 flex justify-between w-full">
            <div className="w-2 h-2 rounded-full bg-[#D97706]" />
            <div className="w-2 h-2 rounded-full bg-[#D97706]" />
            <div className="w-2 h-2 rounded-full bg-[#D97706]" />
            <div className="w-2 h-2 rounded-full bg-[#D97706]" />
            <div className="w-2 h-2 rounded-full bg-[#D97706] relative">
              <div className="absolute bottom-1 -left-3 animate-bounce"><CatInBoatSvg /></div>
            </div>
          </div>
        </div>
        <button 
          onClick={onComplete}
          disabled={!complete}
          className={`h-10 rounded-full px-4 text-[9px] font-extrabold uppercase transition shrink-0 flex items-center justify-center gap-1 ${
            complete ? 'bg-[#D97706] text-white hover:bg-[#C2410C]' : 'bg-[#E1DCD0] text-[#9CA3AF] cursor-not-allowed'
          }`}
        >
          Mint Card <ChevronRight className="w-3 h-3 text-white" />
        </button>
      </div>

    </div>
  );
}

// --- Mockup 8: Holographic Trading Card Simulator ---
function MintScreenSimulator({ onComplete }) {
  return (
    <div className="flex-1 flex flex-col p-5 bg-[#0B1120] text-white sans-font justify-between items-center text-center animate-fadeIn">
      
      <div className="space-y-1 mt-6">
        <span className="text-[#FCD34D] text-[9px] font-black uppercase tracking-widest">
          Expedition Nº 001 Complete
        </span>
        <h2 className="serif-font text-lg font-black tracking-wide">
          Costa do Marfim
        </h2>
      </div>

      {/* Holographic Card Container Mockup */}
      <div className="relative w-44 aspect-[3/4] rounded-2xl border-2 border-[#334155] shadow-[0_15px_40px_rgba(0,0,0,0.5)] bg-gradient-to-br from-[#0F766E] to-[#022C22] p-3 overflow-hidden flex flex-col justify-between text-left transition hover:scale-105 duration-300">
        <div className="flex justify-between items-start">
          <span className="bg-[#1A1A1A]/80 border border-white/20 text-[8px] font-extrabold text-white px-2 py-0.5 rounded-full uppercase">
            History
          </span>
          <Star className="w-3.5 h-3.5 text-[#FCD34D] fill-current" />
        </div>

        {/* Ambient sun/elephant artwork layer */}
        <div className="absolute inset-x-0 top-10 h-24 bg-gradient-to-b from-[#F59E0B]/20 to-transparent flex items-center justify-center">
          <span className="text-4xl opacity-80 filter drop-shadow">🐘</span>
        </div>

        <div className="bg-[#1A1A1A]/95 border border-white/10 p-2.5 rounded-xl space-y-1 relative z-10 mt-auto">
          <span className="text-[#FCD34D] text-[8px] font-black uppercase block tracking-wider">The Synthesis</span>
          <p className="serif-font text-[9px] leading-relaxed text-white">
            A coastline defined by cargo, not its local people.
          </p>
        </div>
      </div>

      <button 
        onClick={onComplete}
        className="w-full py-3 bg-[#D97706] hover:bg-[#B45309] text-white font-extrabold text-[10px] tracking-wider uppercase rounded-xl transition shadow-[0_5px_15px_rgba(217,119,6,0.3)]"
      >
        View Constellation Map 🌌
      </button>

    </div>
  );
}

// --- Mockup 9: The Constellation Map Simulator ---
function ConstellationScreenSimulator({ onSelect }) {
  const nodes = [
    { id: 'n1', label: "Côte d'Ivoire", emoji: "🐘", x: '30%', y: '40%', status: 'unlocked' },
    { id: 'n2', label: "EV Charger Standards", emoji: "🔌", x: '68%', y: '30%', status: 'unlocked' },
    { id: 'n3', label: "Resource Curse", emoji: "⚖️", x: '50%', y: '68%', status: 'unlocked' }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#020617] text-white sans-font p-6 justify-between animate-fadeIn">
      
      <div className="text-center mt-6">
        <h2 className="text-xs font-black tracking-widest text-[#9CA3AF] uppercase">
          Your Mind Palace
        </h2>
        <p className="text-[10px] text-emerald-400 font-extrabold tracking-wider mt-0.5 uppercase">
          Completed Nodes Connected
        </p>
      </div>

      {/* SVG Galaxy Map */}
      <div className="flex-1 relative my-4 rounded-3xl border border-[#1E293B] bg-gradient-to-b from-[#0F172A] to-[#020617] overflow-hidden">
        
        {/* SVG connection rays */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line x1="30%" y1="40%" x2="68%" y2="30%" stroke="#D97706" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
          <line x1="30%" y1="40%" x2="50%" y2="68%" stroke="#0D9488" strokeWidth="1.5" opacity="0.4" />
          <line x1="68%" y1="30%" x2="50%" y2="68%" stroke="#38BDF8" strokeWidth="1.5" opacity="0.4" />
        </svg>

        {nodes.map((node) => (
          <div 
            key={node.id}
            onClick={() => onSelect(node.id)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer flex flex-col items-center gap-1.5 transition-all duration-300 hover:scale-110"
            style={{ left: node.x, top: node.y }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D97706] to-[#FBBF24] border-2 border-white/20 shadow-[0_0_15px_rgba(217,119,6,0.5)] flex items-center justify-center text-xl">
              {node.emoji}
            </div>
            <span className="text-[8px] font-black uppercase text-center text-[#E2E8F0] block tracking-wider max-w-[80px]">
              {node.label}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}

// --- Mockup 10: The Spark Feed Simulator ---
function SparkFeedScreenSimulator({ onLaunch }) {
  const cards = [
    { id: 'c1', emoji: '🚢', tag: 'Trade History', title: "Why keeps Côte d'Ivoire its name?", color: 'bg-[#E0F2FE]' },
    { id: 'c2', emoji: '🔌', tag: 'Infrastructure', title: 'Why do charger plugs differ?', color: 'bg-[#FFFBEB]' }
  ];

  return (
    <div className="flex-1 bg-[#F4F1EA] text-[#1A1A1A] flex flex-col p-5 mt-6 pb-20 justify-between animate-fadeIn">
      
      <div className="space-y-3">
        <div>
          <h2 className="serif-font text-lg font-bold text-[#1A1A1A]">Spark Feed</h2>
          <p className="text-[10px] text-[#5C574F]">Doom-scroll substitute. Click any card to launch immediately.</p>
        </div>

        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 hide-scrollbar">
          {cards.map((c) => (
            <div 
              key={c.id}
              onClick={onLaunch}
              className="bg-white border-2 border-[#1A1A1A] rounded-xl overflow-hidden shadow-[2px_2px_0px_#1A1A1A] cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 transition"
            >
              <div className={`${c.color} h-20 flex items-center justify-center relative border-b-2 border-[#1A1A1A]`}>
                <span className="text-4xl">{c.emoji}</span>
                <span className="absolute bottom-1 left-2 bg-white/95 px-1.5 py-0.5 border border-[#1A1A1A] text-[8px] font-bold text-[#D97706] rounded">{c.tag}</span>
              </div>
              <div className="p-3 space-y-1">
                <h3 className="serif-font text-xs font-bold leading-tight text-[#1A1A1A]">{c.title}</h3>
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#0D9488] block">5 cards • Beginner</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}