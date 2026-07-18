import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Map as MapIcon, 
  ChevronLeft, 
  ZoomIn, 
  ZoomOut, 
  Share2, 
  Sparkles,
  BookOpen,
  ArrowRight,
  Globe2,
  Lock
} from 'lucide-react';

export default function ConstellationMockup() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger initial entrance animations
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // The database of the user's "Mind Palace"
  const nodes = [
    {
      id: 'ivory',
      title: "Côte d'Ivoire",
      category: "History & Geo",
      emoji: "🐘",
      x: 35,
      y: 40,
      color: "from-[#0D9488] to-[#14B8A6]", // Teal
      glow: "shadow-[0_0_30px_rgba(13,148,136,0.6)]",
      synthesis: "A coastline defined not by its people, but by the cargo packed into 15th-century ships.",
      status: 'mastered',
      connections: ['resource']
    },
    {
      id: 'resource',
      title: "Resource Curse",
      category: "Economics",
      emoji: "⚖️",
      x: 65,
      y: 25,
      color: "from-[#E11D48] to-[#F43F5E]", // Rose
      glow: "shadow-[0_0_30px_rgba(225,29,72,0.6)]",
      synthesis: "Natural abundance often breeds poverty because it warps institutions to extract rather than build.",
      status: 'mastered',
      connections: ['ivory', 'ev']
    },
    {
      id: 'ev',
      title: "EV Chargers",
      category: "Tech & Infra",
      emoji: "🔌",
      x: 75,
      y: 65,
      color: "from-[#D97706] to-[#F59E0B]", // Amber
      glow: "shadow-[0_0_30px_rgba(217,119,6,0.6)]",
      synthesis: "Hardware standards aren't based on engineering logic; they are geopolitical territory wars.",
      status: 'mastered',
      connections: ['resource']
    },
    {
      id: 'ghana',
      title: "Gold Coast",
      category: "Suggested",
      emoji: "🇬🇭",
      x: 20,
      y: 65,
      color: "from-[#374151] to-[#4B5563]",
      glow: "",
      synthesis: "Unlock to explore.",
      status: 'locked',
      connections: ['ivory']
    }
  ];

  const handleNodeClick = (node) => {
    if (node.status === 'locked') return;
    setSelectedNode(node);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F9F6F0] font-sans antialiased selection:bg-[#D97706] selection:text-white flex justify-center items-center overflow-hidden">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .serif-header { font-family: 'Lora', Georgia, serif; }
        .sans-body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        
        .map-grid {
          background-image: 
            radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px),
            radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: 0 0, 20px 20px;
        }

        .line-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 2s ease-out forwards;
        }

        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      <div className="w-full max-w-md bg-gradient-to-b from-[#0F172A] to-[#020617] h-[850px] max-h-screen flex flex-col relative overflow-hidden sans-body shadow-[0_0_50px_rgba(0,0,0,0.8)] border-x border-[#1E293B]">
        
        {/* --- GLOBAL HUB HEADER --- */}
        <header className="absolute top-0 w-full px-6 pt-6 pb-4 flex items-center justify-between z-30 bg-gradient-to-b from-[#020617] to-transparent">
          <button className="w-10 h-10 rounded-full bg-[#1E293B]/80 backdrop-blur-md border border-[#374151] flex items-center justify-center text-white hover:bg-[#374151] transition">
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col items-center">
            <h1 className="text-sm font-extrabold tracking-widest uppercase text-[#E5E7EB]">
              Constellation
            </h1>
            <p className="text-[10px] text-[#D97706] font-bold tracking-wider">
              3 Expeditions Mastered
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#374151] flex items-center justify-center shadow-inner">
             <div className="w-5 h-5 bg-[#D97706] rounded-full text-[10px] flex items-center justify-center font-bold text-white">🐱</div>
          </div>
        </header>

        {/* --- INTERACTIVE MAP CANVAS --- */}
        <div className="flex-1 relative map-grid">
          
          {/* Ambient Glows */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0D9488]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#E11D48]/10 rounded-full blur-[100px]" />

          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none">
            {isLoaded && (
              <>
                {/* Ivory to Resource */}
                <line x1="35%" y1="40%" x2="65%" y2="25%" stroke="#374151" strokeWidth="2" strokeDasharray="4 4" className="line-draw" style={{ animationDelay: '0.2s' }} />
                {/* Resource to EV */}
                <line x1="65%" y1="25%" x2="75%" y2="65%" stroke="#374151" strokeWidth="2" strokeDasharray="4 4" className="line-draw" style={{ animationDelay: '0.4s' }} />
                {/* Ivory to Ghana (Locked) */}
                <line x1="35%" y1="40%" x2="20%" y2="65%" stroke="#1E293B" strokeWidth="2" strokeDasharray="2 6" className="line-draw" style={{ animationDelay: '0.6s' }} />
              </>
            )}
          </svg>

          {/* Nodes Layer */}
          <div 
            className="absolute inset-0 z-20 transition-transform duration-500 ease-out"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {nodes.map((node, i) => (
              <div 
                key={node.id}
                onClick={() => handleNodeClick(node)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                style={{ 
                  left: `${node.x}%`, 
                  top: `${node.y}%`,
                  transitionDelay: `${i * 150}ms`
                }}
              >
                {/* Node Orb */}
                <div className={`relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 ${
                  node.status === 'locked' 
                    ? 'bg-[#1E293B] border-2 border-[#374151]' 
                    : `bg-gradient-to-br ${node.color} ${node.glow} border-2 border-white/20 z-20`
                }`}>
                  <span className="text-2xl filter drop-shadow-sm">{node.emoji}</span>
                  
                  {/* Orbiting ring for active selection */}
                  {selectedNode?.id === node.id && (
                    <div className="absolute -inset-2 border border-white/30 rounded-full animate-spin" style={{ animationDuration: '4s' }} />
                  )}
                  {node.status === 'locked' && (
                    <div className="absolute -bottom-1 -right-1 bg-[#1A1A1A] p-1 rounded-full border border-[#374151]">
                      <Lock className="w-3 h-3 text-[#9CA3AF]" />
                    </div>
                  )}
                </div>

                {/* Node Label */}
                <div className={`mt-2 text-center transition-opacity ${selectedNode && selectedNode.id !== node.id ? 'opacity-30' : 'opacity-100'}`}>
                  <h3 className={`text-[11px] font-extrabold uppercase tracking-widest ${node.status === 'locked' ? 'text-[#6B7280]' : 'text-white'}`}>
                    {node.title}
                  </h3>
                  {node.status !== 'locked' && (
                    <span className="text-[9px] text-[#9CA3AF] font-medium tracking-wider">{node.category}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Map Controls */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
            <button 
              onClick={() => setZoomLevel(Math.min(zoomLevel + 0.2, 1.5))}
              className="w-10 h-10 bg-[#1E293B]/80 backdrop-blur-md rounded-full border border-[#374151] flex items-center justify-center text-white hover:bg-[#374151]"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setZoomLevel(Math.max(zoomLevel - 0.2, 0.8))}
              className="w-10 h-10 bg-[#1E293B]/80 backdrop-blur-md rounded-full border border-[#374151] flex items-center justify-center text-white hover:bg-[#374151]"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- SPACED REPETITION BOTTOM SHEET --- */}
        <div className={`absolute bottom-0 w-full z-40 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${selectedNode ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
          
          {/* Overlay to click off */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm -z-10" 
            onClick={() => setSelectedNode(null)}
          />

          {selectedNode && (
            <div className="bg-[#1E293B] border-t border-[#374151] rounded-t-3xl p-6 pb-12 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] relative">
              
              {/* Drag Handle */}
              <div className="w-12 h-1.5 bg-[#4B5563] rounded-full mx-auto mb-6" />

              {/* Header */}
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedNode.color} flex items-center justify-center text-3xl shadow-lg border border-white/20`}>
                  {selectedNode.emoji}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#FBBF24]" />
                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#FBBF24]">Expedition Mastered</span>
                  </div>
                  <h2 className="serif-header text-2xl font-bold text-white leading-tight">
                    {selectedNode.title}
                  </h2>
                </div>
              </div>

              {/* The Synthesis (Spaced Repetition Trigger) */}
              <div className="bg-[#0F172A] border border-[#374151] rounded-2xl p-5 mb-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#D97706] to-transparent" />
                <h4 className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3" /> The Synthesis
                </h4>
                <p className="serif-header text-[15px] leading-relaxed text-[#E5E7EB]">
                  "{selectedNode.synthesis}"
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 bg-[#374151] hover:bg-[#4B5563] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2">
                  <Globe2 className="w-4 h-4" /> View Full Map
                </button>
                <button className="w-14 flex-shrink-0 bg-[#0F172A] border border-[#374151] hover:bg-[#1E293B] text-white py-3.5 rounded-xl transition flex items-center justify-center">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              
              {/* Branch Hook */}
              <div className="mt-6 pt-5 border-t border-[#374151] flex items-center justify-between group cursor-pointer">
                <div>
                  <h5 className="text-[11px] font-extrabold text-[#9CA3AF] uppercase tracking-widest mb-0.5">Explore Next</h5>
                  <p className="text-sm font-bold text-white group-hover:text-[#D97706] transition">The Gold Coast (Ghana)</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center group-hover:bg-[#D97706] transition-colors">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}