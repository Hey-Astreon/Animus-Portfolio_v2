import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import AstreonCore from '../AnimusCore/AstreonCore';
import { useSystemStore, useThemeStore } from '../../store/useStore';

const Hero = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const { setTarget, setFocusStatus, setSystemStatus } = useSystemStore();
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';

  // Mouse Parallax for Background Title
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = useCallback((e) => {
    setMousePos({
      x: (e.clientX - window.innerWidth / 2) / 50,
      y: (e.clientY - window.innerHeight / 2) / 50,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    // Boot sequence
    const bootTimer = setTimeout(() => {
      setIsBooted(true);
      setSystemStatus('optimal');
    }, 400);
    const contentTimer = setTimeout(() => setShowContent(true), 1200);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(bootTimer);
      clearTimeout(contentTimer);
    };
  }, [handleMouseMove, setSystemStatus]);

  const springConfig = { damping: 25, stiffness: 150 };
  const parallaxX = useSpring(mousePos.x, springConfig);
  const parallaxY = useSpring(mousePos.y, springConfig);

  return (
    <section 
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => {
        setTarget('ROUSHAN_KUMAR');
        setFocusStatus('FOCUSED');
      }}
      onMouseLeave={() => {
        setTarget('SYSTEM_IDLE');
        setFocusStatus('SCANNING');
      }}
    >
      {/* 0. INITIAL SYSTEM BOOT (Glitch Overlay) */}
      <AnimatePresence>
        {!isBooted && (
          <motion.div 
            className="absolute inset-0 z-[100] bg-astreon-bg flex items-center justify-center p-20"
            exit={{ opacity: 0 }}
          >
            <div className="w-full flex flex-col gap-4">
              <motion.div 
                className="w-full h-px bg-astreon-accent/40"
                animate={{ scaleX: [0, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 0.5 }}
              />
              <div className="flex justify-between font-mono text-[8px] opacity-40">
                <span>INITIALIZING_CORE_SYSTEMS</span>
                <span>[ OK ]</span>
              </div>
              <motion.div 
                className="w-full h-px bg-astreon-accent/40"
                animate={{ scaleX: [0, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. LARGE BACKGROUND TYPOGRAPHY (Parallax) */}
      <motion.div 
        className="absolute inset-0 z-0 flex items-center justify-center select-none pointer-events-none opacity-5 overflow-hidden"
        style={{ x: parallaxX, y: parallaxY }}
      >
        <span className="font-display font-black text-[25vw] leading-none text-astreon-text-primary tracking-[-0.05em] whitespace-nowrap">
          ANIMUS_CORE
        </span>
      </motion.div>

      {/* 2. TECHNICAL METADATA LAYER (HEADER) */}
      <div className="absolute top-20 sm:top-24 left-0 right-0 z-20 flex flex-col items-center">
        <motion.div
          className="flex items-center gap-3 sm:gap-6"
          initial={{ opacity: 0, y: -20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-8 sm:w-16 h-px bg-astreon-accent/40" />
          <span className="font-mono text-[clamp(7px,2vw,10px)] tracking-[0.3em] sm:tracking-[0.5em] uppercase text-astreon-text-primary font-semibold text-center px-2 sm:px-4">
            ROUSHAN KUMAR // PYTHON & AI DEVELOPER
          </span>
          <div className="w-8 sm:w-16 h-px bg-astreon-accent/40" />
        </motion.div>
      </div>

      {/* 3. PRIMARY SYSTEM CORE (Orb + PFP) */}
      <div className="relative z-10 w-[min(90vw,650px)] h-[min(90vw,650px)] flex items-center justify-center scale-95 md:scale-100 transition-transform duration-700">
        <AstreonCore isBooted={isBooted} />
      </div>

      {/* 4. TECHNICAL METADATA LAYER (FOOTER) */}
      <div className="absolute bottom-20 sm:bottom-24 left-0 right-0 z-20 flex flex-col items-center">
        <motion.div
          className="px-6 sm:px-8 py-2 sm:py-3 border-x border-astreon-border/30 backdrop-blur-sm bg-astreon-surface/10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={showContent ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span className="font-mono text-[clamp(7px,2vw,10px)] tracking-[0.3em] sm:tracking-[0.6em] uppercase text-astreon-text-primary text-center px-4">
            BCA STUDENT | AI & PERFORMANCE ARCHITECT
          </span>
        </motion.div>
        
        {/* Interaction Prompts */}
        <motion.div 
          className="mt-6 sm:mt-12 flex gap-6 sm:gap-12"
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          <a href="#identity" className="group flex flex-col items-center gap-2 sm:gap-4 no-underline">
            <span className="font-mono text-[clamp(7px,2vw,9px)] font-bold tracking-[0.15em] sm:tracking-[0.3em] text-astreon-text-secondary group-hover:text-astreon-accent transition-colors duration-300">
              [ INITIALIZE_IDENTITY ]
            </span>
            <div className="w-px h-6 sm:h-12 bg-gradient-to-b from-astreon-accent/60 via-astreon-accent/20 to-transparent group-hover:h-16 transition-all duration-500" />
          </a>
          <a href="#modules" className="group flex flex-col items-center gap-2 sm:gap-4 no-underline">
            <span className="font-mono text-[clamp(7px,2vw,9px)] font-bold tracking-[0.15em] sm:tracking-[0.3em] text-astreon-text-secondary group-hover:text-astreon-accent transition-colors duration-300">
              [ EXPLORE_MODULES ]
            </span>
            <div className="w-px h-6 sm:h-12 bg-gradient-to-b from-astreon-accent/60 via-astreon-accent/20 to-transparent group-hover:h-16 transition-all duration-500" />
          </a>
        </motion.div>
      </div>

      {/* 5. SYSTEM CORNER DECORATIONS */}
      <div className="absolute inset-10 border border-astreon-border/10 pointer-events-none rounded-sm">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-astreon-accent/40" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-astreon-accent/40" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-astreon-accent/40" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-astreon-accent/40" />
      </div>
    </section>
  );
};

export default Hero;
