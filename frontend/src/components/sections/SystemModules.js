import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Database, Cpu, Activity, Github } from 'lucide-react';
import { useThemeStore, useArchiveStore, useSystemStore } from '../../store/useStore';

const ModuleCard = ({ m, variants }) => {
  const [isHovered, setIsHovered] = useState(false);
  const openProject = useArchiveStore((state) => state.openProject);
  const accentColor = "#0ea5e9";

  return (
    <motion.article
      className="group relative p-8 border border-astreon-border/30 bg-astreon-bg-alt/30 transition-all duration-500 overflow-hidden cursor-pointer"
      variants={variants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => openProject(m)}
      whileHover={{ y: -8, borderColor: accentColor }}
    >
      {/* 1. KINETIC HARDWARE BRACKETS (Spring Physics) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2" 
          style={{ borderColor: accentColor }}
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            opacity: isHovered ? 1 : 0.2
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2" 
          style={{ borderColor: accentColor }}
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            opacity: isHovered ? 1 : 0.2
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        />
      </div>

      {/* 2. SCANNING BEAM REVEAL OVERLAY */}
      <motion.div 
        className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-astreon-accent/10 to-transparent pointer-events-none z-20"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "100%" : "-100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Background ID Scanline */}
      <div className="absolute top-0 right-0 p-4 opacity-[0.03] font-mono text-6xl select-none pointer-events-none group-hover:opacity-[0.07] transition-opacity duration-700">
        {m.id.split('-')[1]}
      </div>

      <div className="flex items-start justify-between mb-8 relative z-10">
        <div className="flex flex-col gap-1">
          <div className="font-mono text-[9px] tracking-[0.4em] uppercase font-bold transition-colors duration-500" style={{ color: accentColor }}>
            {m.id} // {m.category}
          </div>
          <motion.div 
            className="h-px bg-astreon-accent/60"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? 32 : 16 }}
          />
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-astreon-surface/40 border border-astreon-border/10">
          <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-60 font-bold">{m.status}</span>
        </div>
      </div>

      <div className="relative overflow-hidden mb-5 min-h-[64px]">
        <motion.h3 
          className="font-display text-3xl font-black text-astreon-text tracking-tight transition-colors duration-500"
          animate={{ 
            color: isHovered ? accentColor : '',
            letterSpacing: isHovered ? '0.02em' : '0em'
          }}
        >
          {m.title}
        </motion.h3>
      </div>
      
      <motion.p 
        className="font-mono text-[13px] text-astreon-text-muted leading-relaxed mb-10 min-h-[48px] relative z-10"
        animate={{ opacity: isHovered ? 1 : 0.6 }}
      >
        {'>'} {m.desc}
      </motion.p>

      <div className="flex items-center justify-between pt-6 border-t border-astreon-border/10 relative z-10">
        <div className="flex flex-wrap gap-2">
          {m.tech.map((t) => (
            <span key={t} className="px-3 py-1.5 text-[10px] font-mono font-bold border border-astreon-border/20 bg-astreon-bg-alt tracking-tighter uppercase whitespace-nowrap group-hover:border-astreon-accent/30 transition-colors duration-500">
              {t}
            </span>
          ))}
        </div>
        <motion.div 
          className="flex items-center space-x-3"
          style={{ color: accentColor }}
          animate={{ 
            x: isHovered ? 0 : -10,
            opacity: isHovered ? 1 : 0
          }}
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest">View_Node</span>
          <ArrowUpRight size={20} />
        </motion.div>
      </div>
    </motion.article>
  );
};

const SystemModules = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const theme = useThemeStore((state) => state.theme);
  const projects = useArchiveStore((state) => state.projects);
  
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="modules" ref={ref} className="relative py-40 z-10" data-testid="modules-section">
      <motion.div className="max-w-6xl mx-auto px-6" style={{ y }}>
        {/* Header Navigation Metadata */}
        <motion.div 
          className="flex items-center gap-6 mb-8" 
          initial="hidden" 
          animate={isInView ? 'visible' : 'hidden'} 
          variants={fadeUp}
        >
          <Database size={14} className="text-astreon-accent" />
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-astreon-text font-bold">Genetic_Archive</span>
          <div className="flex-1 h-px bg-gradient-to-r from-astreon-accent/30 to-transparent" />
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-astreon-text opacity-40">SEQ_V3.16</span>
        </motion.div>

        <motion.h2 
          className="font-display text-6xl font-black tracking-tight mb-20 text-astreon-text" 
          initial="hidden" 
          animate={isInView ? 'visible' : 'hidden'} 
          variants={fadeUp}
        >
          Memory <span className="text-astreon-accent">Sequences</span>
        </motion.h2>

        {/* Grid Systems */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {projects.map((m) => (
            <ModuleCard key={m.id} m={m} variants={fadeUp} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SystemModules;
