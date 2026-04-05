import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Activity, Database, Terminal } from 'lucide-react';
import { useSystemStore } from '../../store/useStore';

const GithubProtocol = () => {
    const { commitData, uplinkStatus, isHandshaking } = useSystemStore();
    const [logs, setLogs] = useState(['INIT_STABLE_REPLICATION...']);
    const logPool = [
        'UPLINK_STABLE // CONNECTED',
        'SYNCING_NRN_NODES...',
        'FEAT: DEPLOY_V3.27_STABLE',
        'MERGING_ARCHITECT_LOGIC...',
        'OPTIMIZING_NEURAL_LATENCY',
        'FIX: READABILITY_SYNC_V3.27',
        'ANALYZING_COMMIT_HISTORY...',
        'UPLINK_LATENCY: 12ms',
        'PEERING_REMOTE_CORRIDOR...',
        'SHARD_GEOMETRY_OPTIMIZED'
    ];

    // 1. Live Terminal Ticker Logic (Slowed slightly for readability)
    useEffect(() => {
        const interval = setInterval(() => {
            setLogs(prev => {
                const next = [...prev, logPool[Math.floor(Math.random() * logPool.length)]];
                return next.slice(-4); // Keep last 4 logs
            });
        }, 2500); // 2.5s for readability
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div 
            className="relative p-5 border border-astreon-border/30 bg-astreon-bg-alt/20 backdrop-blur-md group h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            {/* 1. ARCHITECTURAL HEADER */}
            <div className="flex items-center justify-between mb-8 border-b border-astreon-border/10 pb-4">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Github size={24} className="text-astreon-accent" />
                        <motion.div 
                            className="absolute -inset-1 border border-astreon-accent/30 rounded-full"
                            animate={{ scale: [1, 1.4, 1], opacity: [1, 0, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-mono text-[11px] tracking-[0.4em] uppercase font-bold text-astreon-text">GitHub Protocol</span>
                        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-astreon-accent/60">Uplink_Node: CORE_V3.27</span>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-3 py-1 bg-astreon-surface/40 border border-astreon-border/10">
                    <Activity size={12} className="text-astreon-accent animate-pulse" />
                    <span className="font-mono text-[10px] tracking-[0.3em] font-bold text-astreon-accent">{uplinkStatus}</span>
                </div>
            </div>

            {/* 2. 3D CONTRIBUTION MATRIX (Sovereign Build) */}
            <div className="relative mb-8 h-28 flex items-end justify-center gap-1 overflow-hidden perspective-1000">
                {commitData.map((val, idx) => (
                    <motion.div
                        key={idx}
                        className="w-2.5 bg-gradient-to-t from-astreon-accent/10 via-astreon-accent/40 to-astreon-accent rounded-sm"
                        initial={{ height: 0 }}
                        animate={{ 
                            height: `${val * 0.7}%`,
                            opacity: isHandshaking ? 1 : 0.6,
                            // Physical Scale Shifting Removed for Stability
                            shadow: isHandshaking ? "0 0 12px rgba(14,165,233,0.4)" : "none"
                        }}
                        transition={{ 
                            type: 'spring', 
                            damping: 15, 
                            stiffness: 100, 
                            delay: idx * 0.01 
                        }}
                    />
                ))}

                {/* LASER SCANNER OVERLAY */}
                <motion.div 
                    className="absolute inset-x-0 top-0 h-px bg-astreon-accent/40 shadow-[0_0_8px_rgba(14,165,233,0.8)] pointer-events-none"
                    animate={{ y: [0, 112] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                />
            </div>

            {/* 3. TERTIARY METADATA & LOGS */}
            <div className="grid grid-cols-2 gap-6 mb-6 border-t border-astreon-border/10 pt-5">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-astreon-text-muted mb-2 block">Commit_Frequency</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl font-black text-astreon-text">0.98</span>
                    <span className="font-mono text-[11px] text-astreon-accent opacity-60">AVG/DAY</span>
                  </div>
                </div>
                <div>
                  <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-astreon-text-muted mb-2 block">Data_Nodes</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl font-black text-astreon-text">12+</span>
                    <span className="font-mono text-[11px] text-astreon-accent opacity-60">ACTIVE</span>
                  </div>
                </div>
            </div>

            {/* 4. LIVE LOG EMULATION (Wow Factor Scale-Up) */}
            <div className="bg-itreon-surface/20 p-4 rounded border border-astreon-border/5 relative overflow-hidden group-hover:border-astreon-accent/20 transition-colors duration-500">
                <Terminal size={12} className="absolute right-3 top-3 text-astreon-accent/20" />
                <div className="font-mono text-[10px] tracking-[0.2em] leading-relaxed text-astreon-text-muted space-y-2">
                    <AnimatePresence mode="popLayout">
                        {logs.map((log, i) => (
                            <motion.div 
                                key={log + i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-2"
                            >
                                <span className="text-astreon-accent opacity-40">{'>'}</span>
                                {log}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Hardware Branding */}
            <div className="absolute -bottom-2 right-4 px-2 py-0.5 bg-astreon-bg-alt border border-astreon-border/20 text-[7px] font-mono tracking-[0.5em] text-astreon-accent/40 uppercase">
                Stable_Replication // v3.27
            </div>
        </motion.div>
    );
};

export default GithubProtocol;
