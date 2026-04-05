import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, BookOpen, ShieldCheck, Cpu } from 'lucide-react';
import { useArchiveStore } from '../../store/useStore';

const LedgerNode = ({ data, index, isLast }) => {
  const [isHovered, setIsHovered] = useState(false);
  const accentColor = "#0ea5e9";
  const verifiedColor = "#10b981";

  return (
    <div className="relative flex gap-8 md:gap-16 group">
      {/* 1. DATA-TRANSMISSION LINE (Backbone) */}
      <div className="flex flex-col items-center">
        <motion.div 
          className="w-4 h-4 rounded-full border-2 relative z-10 flex items-center justify-center bg-astreon-bg-alt"
          style={{ borderColor: isHovered ? accentColor : 'rgba(255,255,255,0.2)' }}
          animate={{ scale: isHovered ? 1.2 : 1 }}
        >
          {data.isVerified && (
            <motion.div 
              className="absolute inset-0 rounded-full bg-astreon-accent/20"
              animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}
          <div className={`w-1.5 h-1.5 rounded-full ${data.isVerified ? 'bg-astreon-accent' : 'bg-white/20'}`} />
        </motion.div>
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-astreon-border/40 to-transparent" />
        )}
      </div>

      {/* 2. LEDGER CARD */}
      <motion.div 
        className="flex-1 mb-16 relative p-6 border border-astreon-border/20 bg-astreon-bg-alt/10 backdrop-blur-md overflow-hidden group/card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ x: 10, borderColor: 'rgba(14,165,233,0.3)' }}
      >
        {/* Holographic ID Background Stamp */}
        <div className="absolute -right-4 -top-4 font-mono text-6xl font-black opacity-[0.03] select-none pointer-events-none transition-opacity duration-700 group-hover/card:opacity-[0.08]">
          {data.metadata.split('_')[0]}
        </div>

        {/* Scanning Beam Overlay */}
        <motion.div 
          className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-astreon-accent/5 to-transparent pointer-events-none z-20"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "100%" : "-100%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 relative z-10">
          <div className="space-y-1">
            <div className="font-mono text-[9px] tracking-[0.4em] uppercase text-astreon-accent font-bold">
              NODE_ID // {data.id}
            </div>
            <h3 className="font-display text-2xl font-black text-astreon-text group-hover/card:text-astreon-accent transition-colors duration-300">
              {data.title}
            </h3>
            <div className="flex items-center gap-2 text-astreon-text-muted font-mono text-[11px] uppercase tracking-wider">
              <BookOpen size={12} className="text-astreon-accent/60" />
              {data.organization}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-astreon-surface/40 border border-astreon-border/10 rounded-sm">
              <Calendar size={12} className="text-astreon-accent" />
              <span className="font-mono text-[10px] font-bold text-astreon-text/80">{data.date}</span>
            </div>
            {data.isVerified && (
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/5 border border-green-500/20 rounded-sm overflow-hidden relative">
                <motion.div 
                  className="absolute inset-0 bg-green-500/10"
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <ShieldCheck size={12} className="text-green-400" />
                <span className="font-mono text-[9px] font-bold text-green-400 uppercase tracking-widest">Verified_Sync</span>
              </div>
            )}
          </div>
        </div>

        {/* Curriculum Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          <div className="space-y-2">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-astreon-text-muted opacity-40">Technical_Path:</span>
            <div className="font-mono text-[11px] text-astreon-text/80 h-px bg-white/10 w-full mb-2" />
            <div className="flex flex-wrap gap-2">
              {data.curriculum.map((item, i) => (
                <span key={i} className="px-2 py-0.5 bg-astreon-surface/30 border border-astreon-border/10 text-[9px] font-mono text-astreon-text-muted">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-end items-end opacity-20 group-hover/card:opacity-60 transition-opacity duration-700">
             <div className="font-mono text-[8px] text-right">
                {data.metadata} <br/>
                STABLE_RECONSTRUCTION // SUCCESS
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const NeuralLedger = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const ledgerData = useArchiveStore((state) => state.ledgerData);

  return (
    <section id="ledger" ref={ref} className="relative py-32 z-10 bg-astreon-bg">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="flex items-center gap-6 mb-24"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-2">
              <Cpu size={16} className="text-astreon-accent" />
              <span className="font-mono text-[10px] tracking-[0.6em] uppercase text-astreon-text-muted font-bold">Data Training Centres</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-black text-astreon-text tracking-tighter">
              Neural <span className="text-astreon-accent">Ledger</span>
            </h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-astreon-accent/30 via-astreon-accent/10 to-transparent" />
        </motion.div>

        {/* Ledger Nodes */}
        <div className="relative">
          {ledgerData.map((data, idx) => (
            <LedgerNode 
              key={data.id} 
              data={data} 
              index={idx} 
              isLast={idx === ledgerData.length - 1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NeuralLedger;
