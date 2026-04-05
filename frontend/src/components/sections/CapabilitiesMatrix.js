import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useThemeStore, useSystemStore } from '../../store/useStore';
import GithubProtocol from '../AnimusCore/GithubProtocol';

const skillCategories = [
  { 
    name: 'Core Logic', 
    code: 'LGC', 
    skills: [
      { name: 'Python', p: 95 }, 
      { name: 'JavaScript', p: 90 }, 
      { name: 'TypeScript', p: 85 }
    ] 
  },
  { 
    name: 'AI Systems', 
    code: 'NRN', 
    skills: [
      { name: 'Prompt Engineering', p: 90 }, 
      { name: 'LangGraph', p: 88 }, 
      { name: 'Gemini API', p: 92 }, 
      { name: 'LLM Integration', p: 85 }, 
      { name: 'Logic Systems', p: 80 }
    ] 
  },
  { 
    name: 'Frontend Interface', 
    code: 'UIX', 
    skills: [
      { name: 'React', p: 90 }, 
      { name: 'Next.js', p: 85 }, 
      { name: 'Tailwind', p: 95 }, 
      { name: 'Three.js', p: 82 },
      { name: 'WebGL', p: 80 },
      { name: 'Framer Motion', p: 90 }
    ] 
  },
  { 
    name: 'Backend Systems', 
    code: 'DAT', 
    skills: [
      { name: 'FastAPI', p: 85 }, 
      { name: 'Node.js', p: 90 }, 
      { name: 'Django', p: 82 },
      { name: 'Next.js', p: 80 },
      { name: 'MySQL', p: 85 },
      { name: 'PostgreSQL', p: 88 }
    ] 
  },
];

const ProficiencyBar = ({ value }) => {
  const bars = 10;
  const filled = Math.round((value / 100) * bars);
  return (
    <div className="flex gap-1 font-mono text-[10px] text-astreon-accent/60 group-hover:text-astreon-accent transition-colors duration-300">
      <span>[</span>
      {Array.from({ length: bars }).map((_, i) => (
        <span key={i} className={i < filled ? 'opacity-100' : 'opacity-20'}>|</span>
      ))}
      <span>]</span>
    </div>
  );
};

const CapabilitiesMatrix = () => {
  const ref = useRef(null);
  const [hoveredCat, setHoveredCat] = useState(null);
  const { setHandshaking } = useSystemStore();
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const theme = useThemeStore((state) => state.theme);
  
  // 3D Perspective Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 100 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 100 });

  function handleMouse(event) {
    const rect = ref.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xVal = (mouseX / rect.width) - 0.5;
    const yVal = (mouseY / rect.height) - 0.5;
    x.set(xVal);
    y.set(yVal);
  }

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scrollY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section 
      id="matrix" 
      ref={ref} 
      className="relative py-32 z-10 overflow-hidden" 
      data-testid="matrix-section"
    >
      <motion.div 
        className="max-w-6xl mx-auto px-6 relative" 
        style={{ y: scrollY }}
      >
        {/* Header Metadata */}
        <motion.div className="flex items-center gap-4 mb-8" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}>
          <div className="w-1.5 h-1.5 bg-astreon-accent" />
          <span className="font-mono text-[12px] tracking-[0.3em] uppercase text-astreon-text-muted">Capabilities_Matrix</span>
          <div className="flex-1 h-px bg-astreon-border/20" />
          <span className="font-mono text-[12px] tracking-[0.4em] uppercase text-astreon-text-muted opacity-50">NODE_MAP_v3.27</span>
        </motion.div>

        <motion.h2 className="font-display text-7xl font-black tracking-tight mb-24 text-astreon-text" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}>
          System <span className="text-astreon-accent">Arsenal</span>
        </motion.h2>

        {/* Tactical Grid Upgrade (V3.26 Neural Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 relative px-2">
          
          {/* FEATURED: GITHUB NEURAL UPLINK (V3.27) */}
          <motion.div 
            className="lg:col-span-2 perspective-1000"
            onMouseMove={handleMouse}
            style={{ rotateX, rotateY }}
          >
            <GithubProtocol />
          </motion.div>

          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              className="relative p-5 border border-astreon-border/30 bg-astreon-bg-alt/10 backdrop-blur-sm group hover:border-astreon-accent/40 transition-all duration-500 perspective-1000"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              onMouseMove={handleMouse}
              style={{ rotateX, rotateY }}
              onMouseEnter={() => {
                setHoveredCat(cat.code);
                setHandshaking(true);
              }}
              onMouseLeave={() => {
                setHoveredCat(null);
                setHandshaking(false);
              }}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { delay: idx * 0.08, duration: 0.6 } }
              }}
              data-testid={`skill-category-${cat.code.toLowerCase()}`}
            >
              {/* KINETIC ENERGY STREAM (Category Intensity) */}
              <div 
                className={`absolute inset-0 bg-gradient-to-b from-astreon-accent/10 via-astreon-accent/5 to-transparent transition-opacity duration-1000 ${hoveredCat === cat.code ? 'opacity-100' : 'opacity-0'}`} 
              />

              {/* HOLOGRAPHIC SCANLINE */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-transparent via-astreon-accent/5 to-transparent h-20 w-full pointer-events-none"
                animate={{ y: ['-100%', '300%'] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              />

              {/* Hardware Brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-astreon-accent/30 group-hover:border-astreon-accent transition-colors duration-500" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-astreon-accent/30 group-hover:border-astreon-accent transition-colors duration-500" />

              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs font-bold text-astreon-accent opacity-60 group-hover:opacity-100">{cat.code}</span>
                  <h3 className="font-display font-bold text-sm tracking-widest uppercase text-astreon-text">{cat.name}</h3>
                </div>
                <div className="font-mono text-[6px] text-astreon-accent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {hoveredCat === cat.code ? 'CALIBRATING...' : 'IDLE'}
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-1.5 group/skill">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-mono tracking-wider text-astreon-text-muted group-hover/skill:text-astreon-text transition-colors duration-300">
                        {skill.name}
                      </span>
                      <ProficiencyBar value={skill.p} />
                    </div>
                    <motion.div 
                      className="h-[1px] bg-astreon-accent/10 group-hover/skill:bg-astreon-accent/40 transition-colors duration-500"
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ delay: 1, duration: 1 }}
                    />
                  </div>
                ))}
              </div>

              {/* Sub-Pixel Metadata Readout */}
              <div className="mt-8 pt-4 border-t border-astreon-border/10 flex items-center justify-between relative z-10">
                <span className="font-mono text-[6px] tracking-widest text-astreon-text-muted opacity-30 group-hover:opacity-60 transition-opacity duration-500 uppercase">
                  NODE_HEALTH: OPTIMAL
                </span>
                <span className="font-mono text-[6px] tracking-widest text-astreon-text-muted opacity-30 group-hover:opacity-60 transition-opacity duration-500 uppercase">
                  v3.25 // SECURE
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Telemetry Footer */}
        <motion.div 
          className="flex flex-col items-center mt-32 space-y-3"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
        >
          <div className="flex items-center space-x-4">
            <motion.div 
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 bg-astreon-accent rounded-full shadow-[0_0_12px_rgba(14,165,233,0.8)]"
            />
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-astreon-accent font-bold">
              NEURAL_CONNECTIVITY: 100.0% // UPLINK_STABLE
            </span>
          </div>
          <div className="font-mono text-[8px] tracking-[0.3em] uppercase text-astreon-text-muted px-4 py-1 border-x border-astreon-border/20">
            SCANNING_SUBSYSTEMS // ARSENAL_SYNC_V3.25 // NODE_HEALTH: OPTIMAL
          </div>
        </motion.div>
      </motion.div>

      {/* Background Schema Pulse (Internal Vignette) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />
    </section>
  );
};

export default CapabilitiesMatrix;
