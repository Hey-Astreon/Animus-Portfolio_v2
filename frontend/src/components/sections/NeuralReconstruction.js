import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import { Database, Cpu, Activity, Zap } from 'lucide-react';

// Thematic timeline progression (Glowy Silver -> Cyan -> Electric Blue)
const memories = [
  {
    id: 'MEM_01',
    year: '2023',
    title: 'Neural Initialization',
    location: 'BCA - Amity University Noida',
    desc: 'Commenced professional synchronization. Building foundational architectures in Software Engineering and Logic Systems.',
    icon: Database,
    color: '#94a3b8', // Glowy Silver
    glow: 'rgba(148,163,184,0.6)',
  },
  {
    id: 'MEM_02',
    year: '2024',
    title: 'System Architecture',
    location: 'Full-Stack Deployment',
    desc: 'Architected multiple full-stack systems including AI CRM Interaction Hubs and Dynamic Quiz Management Systems.',
    icon: Cpu,
    color: '#06b6d4', // Bright Cyan
    glow: 'rgba(6,182,212,0.6)',
  },
  {
    id: 'MEM_03',
    year: '2025',
    title: 'Gemini Certification',
    location: 'Google Cloud / Generative AI',
    desc: 'Bypassed standard engineering protocols to become a Google Gemini Certified Engineer. Specializing in Agentic Automation.',
    icon: Activity,
    color: '#0ea5e9', // Deep Cyan/Sky
    glow: 'rgba(14,165,233,0.6)',
  },
  {
    id: 'MEM_04',
    year: '2026+',
    title: 'Future Horizon',
    location: 'Next-Gen AI Systems',
    desc: 'Synthesizing advanced degree with real-world AI engineering. Researching autonomous agentic frameworks and neural-UI interfaces.',
    icon: Zap,
    color: '#3b82f6', // Blueprint Blue
    glow: 'rgba(59,130,246,0.6)',
  }
];

const MemoryCard = ({ memory, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;
  
  // High-precision trigger for Scroll-Ignition
  const ignitionRef = useRef(null);
  const isIgnited = useInView(ignitionRef, { margin: "-45% 0px -45% 0px" });
  
  const entryRef = useRef(null);
  const isInView = useInView(entryRef, { once: true, margin: '-50px' });

  return (
    <div 
      ref={entryRef}
      className={`relative flex flex-col md:flex-row items-center justify-between mb-40 last:mb-0 w-full min-h-[30vh] ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* 1. Scrolling Central Holographic Node (Quantum Unfolding) */}
      <motion.div 
        ref={ignitionRef}
        className="absolute left-[30px] md:left-1/2 w-20 h-20 z-20 flex items-center justify-center transition-all duration-700"
        style={{ translateX: "-50%" }}
        initial={{ scale: 0.1, opacity: 0 }}
        animate={isIgnited ? { scale: 1, opacity: 1 } : { scale: 0.2, opacity: 0.3 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Orbital Resonance Rings */}
        <motion.div 
          className="absolute inset-0 rounded-full border border-dashed opacity-60 mix-blend-screen"
          style={{ borderColor: memory.color }}
          animate={{ rotate: isIgnited || isHovered ? 360 : 0, scale: isIgnited ? 1.1 : 1 }}
          transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, scale: { duration: 0.5 } }}
        />
        <motion.div 
          className="absolute inset-[6px] rounded-full border border-solid opacity-30 mix-blend-screen"
          style={{ borderColor: memory.color }}
          animate={{ rotate: isIgnited || isHovered ? -360 : 0 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Atmospheric Node Glow */}
        {isIgnited && (
          <motion.div 
            className="absolute inset-[-20px] rounded-full mix-blend-screen pointer-events-none"
            style={{ background: `radial-gradient(circle, ${memory.glow} 0%, transparent 60%)` }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        
        {/* Physical Node Core */}
        <div 
          className="w-12 h-12 rounded-full bg-astreon-bg-alt flex items-center justify-center border-[3px] shadow-2xl relative z-10 transition-all duration-700"
          style={{ 
            borderColor: isIgnited ? memory.color : '#1e293b',
            boxShadow: isIgnited ? `0 0 25px ${memory.glow}` : 'none'
          }}
        >
           <memory.icon 
              size={20} 
              className="transition-colors duration-700 relative z-20" 
              style={{ color: isIgnited ? '#ffffff' : '#64748b' }} 
           />
        </div>
      </motion.div>

      {/* 2. Hardline Connector & High-Speed Data Packet Injector */}
      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-[8%] h-[2px] z-10 overflow-hidden ${isEven ? 'left-[42%]' : 'right-[42%]'}`}>
         <div className="w-full h-full bg-astreon-border/20 absolute inset-0" />
         
         {/* Solid Hardware Link */}
         <motion.div 
           className="h-full absolute top-0"
           style={{ backgroundColor: memory.color, width: isIgnited ? '100%' : '0%', left: isEven ? 'auto' : 0, right: isEven ? 0 : 'auto' }}
           transition={{ duration: 0.6, ease: "anticipate" }}
         />
         
         {/* Laser Pulse Injection Component */}
         {isIgnited && (
           <motion.div
             className="absolute top-0 bottom-0 w-[40%] bg-white/90"
             style={{ 
                boxShadow: `0 0 10px 2px ${memory.color}, 0 0 20px 5px rgba(255,255,255,0.8)`
             }}
             initial={{ [isEven ? 'right' : 'left']: '0%', opacity: 1 }}
             animate={{ [isEven ? 'right' : 'left']: '200%', opacity: 0 }}
             transition={{ duration: 0.5, ease: "easeIn", delay: 0.15 }}
           />
         )}
      </div>

      {/* 3. Immersive Memory Card with Holographic Rarities */}
      <motion.div 
        className={`w-full pl-24 md:pl-0 md:w-[40%] group z-20 ${isEven ? 'md:text-right' : 'md:text-left'}`}
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02, y: -5 }}
      >
        <div 
          className="p-8 md:p-10 bg-astreon-bg-alt/40 border transition-all duration-700 relative backdrop-blur-md overflow-hidden"
          style={{ 
            borderColor: isIgnited || isHovered ? `${memory.color}80` : 'rgba(255,255,255,0.05)',
            boxShadow: isIgnited || isHovered ? `0 15px 40px -10px ${memory.glow}` : 'none'
          }}
        >
            {/* Holographic Trading Card Flare */}
            <div className="absolute inset-0 pointer-events-none mix-blend-overlay">
              <motion.div 
                className="absolute top-0 bottom-0 w-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-[30deg]"
                initial={{ left: "-150%" }}
                animate={isHovered || isIgnited ? { left: "150%" } : { left: "-150%" }}
                transition={{ 
                  duration: 2.5, 
                  ease: "easeInOut", 
                  repeat: Infinity, 
                  repeatType: "loop",
                  repeatDelay: 3
                }}
              />
            </div>

            {/* Tactical Brackets [ ] Overlay */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] transition-colors duration-700 pointer-events-none z-10" style={{ borderColor: isIgnited || isHovered ? memory.color : 'transparent' }} />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] transition-colors duration-700 pointer-events-none z-10" style={{ borderColor: isIgnited || isHovered ? memory.color : 'transparent' }} />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] transition-colors duration-700 pointer-events-none z-10" style={{ borderColor: isIgnited || isHovered ? memory.color : 'transparent' }} />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] transition-colors duration-700 pointer-events-none z-10" style={{ borderColor: isIgnited || isHovered ? memory.color : 'transparent' }} />

            {/* Sub-Header: Year & Pulse Indicator */}
            <div className={`flex items-center gap-4 mb-6 relative z-10 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                <motion.div 
                  className="px-4 py-1.5 font-mono font-black text-lg rounded-sm transition-colors duration-700 shadow-md"
                  initial={false}
                  animate={{ scale: isIgnited ? 1.05 : 1 }}
                  style={{ 
                    backgroundColor: isIgnited ? `${memory.color}20` : 'rgba(255,255,255,0.03)',
                    color: isIgnited ? memory.color : '#64748b',
                    border: `1px solid ${isIgnited ? `${memory.color}40` : 'rgba(255,255,255,0.1)'}`
                  }}
                >
                    {memory.year}
                </motion.div>
                {isIgnited && (
                  <motion.div 
                    className="flex gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: memory.color }} />
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse delay-75" style={{ backgroundColor: memory.color }} />
                  </motion.div>
                )}
            </div>

            {/* Liquid Data Typography */}
            <motion.h3 
              className="font-display text-3xl md:text-4xl font-black mb-4 tracking-tight relative z-10 bg-clip-text text-transparent"
              style={{
                backgroundImage: isIgnited || isHovered 
                  ? `linear-gradient(90deg, #ffffff, ${memory.color}, #ffffff)` 
                  : 'linear-gradient(90deg, #f8fafc, #cbd5e1)',
                backgroundSize: '200% auto'
              }}
              animate={{ 
                backgroundPosition: isIgnited || isHovered ? ['0% center', '200% center'] : '0% center' 
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
                {memory.title}
            </motion.h3>
            
            <p 
              className="font-mono text-xs tracking-[0.2em] font-bold uppercase mb-8 transition-colors duration-700 relative z-10"
              style={{ color: isIgnited ? memory.color : '#64748b' }}
            >
              {memory.location}
            </p>
            
            <p className="text-base md:text-sm text-astreon-text-muted leading-relaxed opacity-90 font-mono tracking-tight relative z-10">
                {'>'} {memory.desc}
            </p>
        </div>
      </motion.div>

      {/* Empty Spacer Column (Hidden on mobile for alignment) */}
      <div className="hidden md:block md:w-[40%]" />
    </div>
  );
};

const NeuralReconstruction = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="reconstruction" className="relative py-40 z-10 overflow-hidden" data-testid="reconstruction-section">
      <div className="max-w-6xl mx-auto px-6" ref={containerRef}>
        
        {/* Section Header */}
        <div className="text-center mb-40">
            <motion.div 
                className="inline-flex items-center gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
            >
                <div className="hidden md:block h-px w-12 bg-astreon-accent/60" />
                <span className="font-mono text-xs tracking-[0.6em] text-astreon-accent font-bold">NEURAL_RECONSTRUCTION</span>
                <div className="hidden md:block h-px w-12 bg-astreon-accent/60" />
            </motion.div>

            <motion.h2 
                className="font-display text-5xl md:text-7xl font-black text-astreon-text-primary mb-6"
                initial={{ opacity: 0, skewX: 10 }}
                animate={isInView ? { opacity: 1, skewX: 0 } : {}}
                transition={{ duration: 0.8 }}
            >
                Core <span className="text-astreon-accent">Journey</span>
            </motion.h2>
            <p className="font-mono text-[9px] md:text-[10px] tracking-[0.5em] text-astreon-text-muted opacity-60 uppercase bg-astreon-bg-alt/50 inline-block px-4 py-2 border border-astreon-border/20">
                Authentication ^ Node Synch History
            </p>
        </div>

        {/* High-Fidelity Timeline Container */}
        <div className="relative">
          {/* Main Vertical Data Stream (Backbone) */}
          <div className="absolute left-[30px] md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-astreon-border/10">
            <motion.div 
                className="w-full bg-gradient-to-b from-slate-400 via-cyan-400 to-blue-500 origin-top"
                style={{ 
                    scaleY,
                    boxShadow: '0 0 15px rgba(6,182,212,0.5)'
                }}
            />
          </div>

          {/* Sequential Memory Nodes */}
          <div className="relative pt-12">
            {memories.map((m, i) => (
              <MemoryCard key={m.id} memory={m} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default NeuralReconstruction;
