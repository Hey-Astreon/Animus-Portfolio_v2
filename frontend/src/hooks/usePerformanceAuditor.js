import { useEffect, useRef } from 'react';
import { useSystemStore } from '../store/useStore';

/**
 * usePerformanceAuditor
 * Tracks FPS in real-time and updates the system's Quality Tier.
 * ULTRA: > 100 FPS
 * HIGH: 60 - 100 FPS
 * MEDIUM: 30 - 60 FPS
 * LOW: < 30 FPS
 */
export const usePerformanceAuditor = () => {
  const { setFps, setQualityTier } = useSystemStore();
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const requestRef = useRef();

  useEffect(() => {
    const audit = () => {
      const now = performance.now();
      frameCount.current++;

      if (now - lastTime.current >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / (now - lastTime.current));
        
        setFps(fps);

        // Quality Tiering Logic
        if (fps >= 100) {
          setQualityTier('ULTRA');
        } else if (fps >= 58) {
          setQualityTier('HIGH');
        } else if (fps >= 28) {
          setQualityTier('MEDIUM');
        } else {
          setQualityTier('LOW');
        }

        frameCount.current = 0;
        lastTime.current = now;
      }

      requestRef.current = requestAnimationFrame(audit);
    };

    requestRef.current = requestAnimationFrame(audit);

    return () => cancelAnimationFrame(requestRef.current);
  }, [setFps, setQualityTier]);
};
