import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const year = new Date().getFullYear();
  const [uptime, setUptime] = useState('00:00:00');

  // Tactical Uptime Chronometer
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const h = Math.floor(elapsed / 3600000).toString().padStart(2, '0');
      const m = Math.floor((elapsed % 3600000) / 60000).toString().padStart(2, '0');
      const s = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
      setUptime(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative z-10 py-16 border-t border-astreon-border/20 bg-astreon-bg/5" data-testid="footer">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-display font-black text-sm tracking-tighter text-astreon-text">ASTREON</span>
            <div className="flex items-center space-x-3">
              <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-astreon-text-muted opacity-40">
                © {year} All systems reserved // V3.16.5_STABLE
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="font-mono text-[7px] tracking-[0.4em] uppercase text-astreon-accent opacity-50">Session_Uptime</span>
              <span className="font-mono text-[10px] text-astreon-text font-bold tracking-widest">{uptime}</span>
            </div>
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="font-mono text-[7px] tracking-[0.4em] uppercase text-astreon-accent opacity-50">Local_Stability</span>
              <span className="font-mono text-[10px] text-astreon-text font-bold tracking-widest">100.0%</span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <motion.a
                href="#hero"
                className="font-mono text-[9px] tracking-[0.3em] uppercase text-astreon-text-muted hover:text-astreon-text transition-colors duration-300 flex items-center gap-2"
                whileHover={{ y: -2 }}
            >
                Terminal_Reset
                <motion.span animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>↑</motion.span>
            </motion.a>
            <div className="flex items-center gap-2">
              <motion.div 
                animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-astreon-accent shadow-[0_0_8px_rgba(14,165,233,0.6)]" 
              />
              <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-astreon-text-muted">System_Operational</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
