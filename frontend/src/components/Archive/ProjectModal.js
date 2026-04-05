import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useArchiveStore, useThemeStore } from '../../store/useStore';
import { X, ExternalLink, Github, Code, Zap, Cpu } from 'lucide-react';

const ProjectModal = () => {
  const { isModalOpen, activeProject, closeProject } = useArchiveStore();
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';

  // System Focal Lock (V3.15.1)
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  // Keyboard accessibility
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeProject();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeProject]);

  if (!activeProject) return null;

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProject}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full lg:w-[65%] z-[110] bg-astreon-bg border-l border-astreon-accent/30 shadow-2xl overflow-y-auto"
          >
            {/* Header / Control Bar */}
            <div className="sticky top-0 z-[120] flex items-center justify-between p-6 bg-astreon-bg/80 backdrop-blur-xl border-b border-astreon-accent/10">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-astreon-accent/10 flex items-center justify-center border border-astreon-accent/20">
                  <Code className="w-5 h-5 text-astreon-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-astreon-text">{activeProject.title}</h2>
                  <p className="text-xs font-mono text-astreon-accent uppercase tracking-widest">Genetic_Archive // Node_{activeProject.id}</p>
                </div>
              </div>
              <button 
                onClick={closeProject}
                className="p-3 rounded-full hover:bg-astreon-accent/10 text-astreon-text/60 hover:text-astreon-accent transition-all hover:rotate-90 duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-8 space-y-12">
              
              {/* Cinematic Hero Image */}
              <motion.div 
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative group aspect-video rounded-2xl overflow-hidden border border-astreon-accent/20 bg-black"
              >
                <img 
                  src={activeProject.image} 
                  alt={activeProject.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Interaction Prompt Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                   <div className="flex -space-x-2">
                     {activeProject.tags?.slice(0, 3).map((tag, i) => (
                       <span key={i} className="px-3 py-1 bg-astreon-accent/20 backdrop-blur-md rounded-full text-[10px] font-mono text-astreon-accent border border-astreon-accent/30 lowercase">
                         {tag}
                       </span>
                     ))}
                   </div>
                   <div className="flex space-x-3">
                      <a 
                        href={activeProject.github} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-3 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 text-white transition-all border border-white/10"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a 
                        href={activeProject.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-6 py-2 bg-astreon-accent rounded-xl hover:bg-astreon-accent/80 text-white font-bold flex items-center space-x-2 transition-all shadow-[0_0_20px_rgba(14,165,233,0.4)]"
                      >
                        <span>UPLINK</span>
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                   </div>
                </div>
              </motion.div>

              {/* Data Grid: Metadata Logs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "STATUS", value: "DEPOLYED_STABLE", color: "text-green-500", icon: Zap },
                  { label: "FRAMEWORK", value: activeProject.technologies?.[0] || 'Vite/CRA', color: "text-astreon-accent", icon: Cpu },
                  { label: "RECONSTRUCTION", value: "100.0%", color: "text-blue-400", icon: Code },
                ].map((stat, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-astreon-accent/5 border border-astreon-accent/10 space-y-2">
                    <div className="flex items-center space-x-2 text-[10px] font-mono text-astreon-text/40 tracking-[0.2em]">
                      <stat.icon className="w-3 h-3" />
                      <span>{stat.label}</span>
                    </div>
                    <p className={`text-lg font-bold tracking-tight ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Terminal Intelligence: Description */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="h-[1px] flex-grow bg-astreon-accent/20" />
                  <span className="text-[10px] font-mono text-astreon-accent tracking-[0.4em] uppercase">Architecture_Digest</span>
                  <div className="h-[1px] flex-grow bg-astreon-accent/20" />
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-astreon-text/80 leading-relaxed text-lg font-light">
                    {activeProject.description || "Synthesizing full project telemetry... The archive documentation for this genetic node is currently active and verified. Protocol V3.15 provides an immersive documentation interface."}
                  </p>
                </div>
              </div>

              {/* Tech Stack Matrix */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-astreon-text tracking-widest uppercase flex items-center">
                  <Cpu className="w-4 h-4 mr-2 text-astreon-accent" />
                  Technology_Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeProject.technologies?.map((tech, i) => (
                    <span key={i} className="px-4 py-2 rounded-xl bg-astreon-accent/5 border border-astreon-accent/10 text-xs font-mono text-astreon-text/70 hover:border-astreon-accent/40 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

             {/* Footer Signature */}
             <div className="p-8 border-t border-astreon-accent/10 text-[10px] font-mono text-astreon-accent/30 tracking-[0.5em] text-center uppercase">
                End_Extraction // Animus_OS_Archives
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
