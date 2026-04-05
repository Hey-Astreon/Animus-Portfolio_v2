import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Zap } from 'lucide-react';
import { useSystemStore } from '../../store/useStore';

const CortexPulse = () => {
  const { inversionActive, toggleInversion } = useSystemStore();

  return (
    <motion.div 
      className="fixed bottom-8 left-8 z-[60] flex flex-col items-start gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <button
        onClick={toggleInversion}
        className="group relative flex items-center gap-4 bg-transparent border-none p-0 cursor-pointer outline-none"
      >
        {/* The Pulse Core */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <motion.div 
            className="absolute inset-0 rounded-full border border-astreon-accent/30"
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute inset-2 rounded-full border border-astreon-accent/60"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2
            }}
          />
          <div className={`relative z-10 p-2 transition-colors duration-500 ${inversionActive ? 'text-pink-400' : 'text-astreon-accent'}`}>
            <Compass className={`w-5 h-5 transition-transform duration-700 ${inversionActive ? 'rotate-180' : 'rotate-0'}`} />
          </div>
        </div>

        {/* Telemetry Readout */}
        <div className="flex flex-col items-start font-mono text-[9px] tracking-[0.2em] uppercase overflow-hidden">
          <span className="text-astreon-text-muted opacity-60">PERSPECTIVE_ENGINE</span>
          <motion.span 
            className={`font-bold transition-colors duration-500 ${inversionActive ? 'text-pink-400' : 'text-astreon-accent'}`}
            key={inversionActive ? 'singularity' : 'corridor'}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {inversionActive ? 'SINGULARITY_FLOW' : 'CORRIDOR_FLOW'}
          </motion.span>
        </div>

        {/* Tactical Hover Indication */}
        <motion.div 
          className="absolute -right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Zap className="w-3 h-3 text-astreon-accent" />
        </motion.div>
      </button>

      {/* Vertical Status Bar */}
      <div className="h-12 w-px bg-gradient-to-b from-astreon-accent/40 to-transparent ml-6" />
    </motion.div>
  );
};

export default CortexPulse;
