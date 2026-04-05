import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BootSequence [V3.13]
 * Cinematic terminal handshake for ASTREON OS.
 * Restores the 'Identity Verified' authentication flow.
 */
const BootSequence = ({ onComplete }) => {
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('INITIALIZING');
  const currentLogRef = useRef(0);
  
  const bootLogs = [
    { text: 'LOADING_NEURAL_UPLINK_V3.8', delay: 100 },
    { text: 'VERIFYING_SOVEREIGN_CREDENTIALS', delay: 400 },
    { text: 'AUTHENTICATING_IDENTITY: ROUSHAN_KUMAR', delay: 800 },
    { text: 'CALCULATING_UPLINK_STABILITY', delay: 1200 },
    { text: 'ENCRYPTING_SIGNAL_ENVELOPE', delay: 1600 },
    { text: 'READY_TO_INITIALIZE_CORE', delay: 2000 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const idx = currentLogRef.current;
      if (idx < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[idx]?.text || 'UPLINK_STABLE']);
        currentLogRef.current += 1;
      } else {
        clearInterval(interval);
        setStatus('COMPLETE');
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 800);
      }
    }, 400);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[1000] bg-[#000] flex flex-col items-center justify-center font-mono p-6"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full max-w-md space-y-8">
        {/* Terminal Header */}
        <div className="flex justify-between items-center border-b border-astreon-accent/30 pb-2">
          <span className="text-[10px] tracking-[0.3em] text-astreon-accent/80">ASTREON_OS // BOOT_SEQUENCE</span>
          <span className="text-[10px] text-astreon-accent/60">{status}</span>
        </div>

        {/* Streaming Logs */}
        <div className="space-y-2 min-h-[160px]">
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[9px] tracking-widest text-[#FFF] opacity-80"
            >
              <span className="text-astreon-accent mr-2">{'>'}</span>
              {log}
              {i === logs.length - 1 && i < bootLogs.length - 1 && (
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }} 
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-1.5 h-3 bg-astreon-accent ml-1 align-middle"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Global Progress Bar */}
        <div className="space-y-4">
          <div className="w-full h-px bg-astreon-accent/20 relative">
            <motion.div 
              className="absolute h-full bg-astreon-accent shadow-[0_0_10px_rgba(14,165,233,0.5)]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </div>
          <div className="flex justify-between text-[8px] tracking-[0.3em] text-astreon-accent/40">
            <span>UPLINK_STABILITY: 99.8%</span>
            <span>NEURAL_SYNC: LOCKED</span>
          </div>
        </div>
      </div>

      {/* Atmospheric Glitch Overlay */}
      <div className="absolute inset-0 pointer-events-none radial-vignette opacity-20" />
    </motion.div>
  );
};

export default BootSequence;
