import React, { useState, useEffect } from 'react';
import { useSystemStore, useThemeStore } from '../../store/useStore';

/**
 * SystemHUD: Animus Edition
 * A diagnostic overlay with segmented progress bars and synchronization telemetry.
 */
const SystemHUD = () => {
  const { currentSection, systemStatus, target, focusStatus } = useSystemStore();
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';
  
  const [fps, setFps] = useState(60);
  const [sync, setSync] = useState(98.2);
  const [uptime, setUptime] = useState(0);
  const [latency, setLatency] = useState(12);
  const [time, setTime] = useState(new Date().toISOString().slice(11, 19));
  const [logs, setLogs] = useState(["BOOT_SEQUENCE_COMPLETE", "MEMORY_CACHED", "VOID_INITIALIZED"]);

  useEffect(() => {
    // Real Clock
    const timeInterval = setInterval(() => {
      setTime(new Date().toISOString().slice(11, 19));
      setUptime(prev => prev + 1);
      
      // Fluctuating Latency
      setLatency(prev => {
        const next = prev + (Math.random() - 0.5) * 5;
        return Math.floor(Math.min(Math.max(next, 9), 45));
      });

      // Subtle sync fluctuation
      setSync(prev => {
        const next = prev + (Math.random() - 0.5) * 0.1;
        return Math.min(Math.max(next, 97.5), 99.9);
      });
      
      // Random system logs
      if (Math.random() > 0.8) {
        const systemLogs = [
          "NEURAL_LINK_STABLE", "SYNC_RECALIBRATING", "DATA_STREAM_ACTIVE", 
          "SHARD_GEOMETRY_OPTIMIZED", "LATENCY_NOMINAL", "CORE_PULSE_DETECTED"
        ];
        setLogs(prev => [systemLogs[Math.floor(Math.random() * systemLogs.length)], ...prev.slice(0, 2)]);
      }
    }, 1000);

    // FPS Calculation
    let frames = 0;
    let startTime = performance.now();
    
    const countFrames = () => {
      frames++;
      const now = performance.now();
      if (now >= startTime + 1000) {
        setFps(Math.round(frames * 1000 / (now - startTime)));
        frames = 0;
        startTime = now;
      }
      requestAnimationFrame(countFrames);
    };
    
    const frameId = requestAnimationFrame(countFrames);

    return () => {
      clearInterval(timeInterval);
      cancelAnimationFrame(frameId);
    };
  }, []);

  // UI Helper: Segmented Bar
  const SegmentedBar = ({ percent, segments = 10, colorClass = "bg-astreon-accent" }) => (
    <div className="flex gap-0.5">
      {Array.from({ length: segments }).map((_, i) => (
        <div 
          key={i} 
          className={`w-2 h-1.5 transition-all duration-500 ${
            (i / segments) * 100 < percent ? colorClass : 'bg-astreon-border/20'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-[60] font-mono text-[9px] tracking-[0.2em] uppercase pointer-events-none select-none">
      <div className={`p-5 glass border border-astreon-border/30 backdrop-blur-xl ${isDark ? 'text-astreon-accent' : 'text-astreon-text-primary'}`}>
        <div className="flex flex-col gap-4">
          
          {/* Header Status */}
          <div className="flex items-center justify-between gap-8 border-b border-astreon-border/10 pb-2">
            <span className="opacity-50">SYNC_STATUS:</span>
            <span className="font-bold flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-astreon-accent animate-pulse" />
              {sync.toFixed(1)}%
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center mb-1">
              <span className="opacity-50">MEMORY_SEQUENCE:</span>
              <span className="font-bold opacity-90">{currentSection.split(' ')[0]}</span>
            </div>
            <SegmentedBar percent={sync} segments={12} />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center mb-1">
              <span className="opacity-50">HEARTBEAT:</span>
              <span className="font-bold opacity-90">{fps} Hz</span>
            </div>
            <SegmentedBar percent={(fps / 144) * 100} segments={12} />
          </div>

          <div className="h-px bg-astreon-border/10 my-1" />

          {/* Sub Telemetry Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 opacity-70">
            <div className="flex flex-col gap-0.5">
              <span className="text-[7px] opacity-40">TARGET_ID:</span>
              <span className="text-astreon-accent font-bold truncate max-w-[80px]">{target}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[7px] opacity-40">LATENCY_MS:</span>
              <span className="flex items-center gap-1.5">
                <div className={`w-1 h-1 rounded-full ${latency > 30 ? 'bg-orange-500' : 'bg-green-500'}`} />
                {latency}ms
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[7px] opacity-40">UPTIME_SES:</span>
              <span>{uptime}S</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[7px] opacity-40">LOCAL_TIME:</span>
              <span>{time}</span>
            </div>
          </div>

          <div className="h-px bg-astreon-border/10 my-1" />
          
          {/* System Logs Ticker */}
          <div className="flex flex-col gap-1 opacity-40 text-[7px] leading-tight overflow-hidden h-[30px]">
            {logs.map((log, i) => (
              <div key={`${log}-${i}`} className="animate-in fade-in slide-in-from-left duration-500">
                {'>'} {log}
              </div>
            ))}
          </div>

        </div>
      </div>
      
      {/* Simulation ID Tag */}
      <div className="mt-2 text-right opacity-30 text-[8px] tracking-[0.5em] font-bold">
        ANIMUS_SYSTEM_UPGRADE_V3.0
      </div>
    </div>
  );
};

export default SystemHUD;
