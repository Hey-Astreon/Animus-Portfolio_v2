import React, { useEffect, useMemo, useRef } from 'react';
import { useScroll } from 'framer-motion';
import { useThemeStore, useSystemStore } from '../../store/useStore';

/**
 * AnimusVoid Engine
 * A high-performance, interactive Z-axis shard system inspired by the Animus Memory Corridor.
 * Optimized for 100+ FPS using Zero-Render refs and Canvas2D.
 */
const AnimusVoid = () => {
  const canvasRef = useRef(null);
  const theme = useThemeStore((state) => state.theme);
  const qualityTier = useSystemStore((state) => state.qualityTier);
  const isDark = theme === 'dark';
  
  // High-performance refs (No React re-renders)
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const ripplesRef = useRef([]); // Tracking V3.14 interactive data waves
  const shardsRef = useRef([]);
  const requestRef = useRef();
  const scrollRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const dprRef = useRef(window.devicePixelRatio || 1);

  const { scrollY } = useScroll();

  // 1. Fragment Generation (Geometric Shards) - Quality Aware
  useEffect(() => {
    const shardCounts = { ULTRA: 120, HIGH: 80, MEDIUM: 40, LOW: 20 };
    const shardCount = shardCounts[qualityTier] || 80;
    const shards = [];
    
    for (let i = 0; i < shardCount; i++) {
      const z = Math.random() * 2000; // Depth layer
      shards.push({
        x: (Math.random() - 0.5) * 3500,
        y: (Math.random() - 0.5) * 2500,
        z: z,
        baseZ: z,
        size: 2 + Math.random() * 5,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.008,
        opacity: 0.15 + Math.random() * 0.45,
        points: Array.from({ length: 3 + Math.floor(Math.random() * 2) }, () => ({
          x: (Math.random() - 0.5) * 45,
          y: (Math.random() - 0.5) * 45
        }))
      });
    }
    shardsRef.current = shards;
  }, [qualityTier]);

  // 2. Animation Loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    const dpr = dprRef.current;
    const now = performance.now();
    
    // 1. Velocity & Scroll Tracking
    const currentScrollY = scrollY.get();
    const deltaTime = Math.max(1, now - lastTimeRef.current);
    const scrollDelta = Math.abs(currentScrollY - lastScrollYRef.current);
    
    // Calculate raw velocity and lerp it for smoothness
    const rawVelocity = Math.min(1, scrollDelta / (deltaTime * 0.5));
    velocityRef.current += (rawVelocity - velocityRef.current) * 0.1;
    
    // Smooth scroll tracking
    scrollRef.current += (currentScrollY - scrollRef.current) * 0.1;
    
    // Update tracking refs
    lastScrollYRef.current = currentScrollY;
    lastTimeRef.current = now;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.translate(width / (2 * dpr), height / (2 * dpr));

    const mouse = mouseRef.current;
    const accentColor = "#0EA5E9";
    const shardColor = isDark ? "255, 255, 255" : "0, 0, 0";

    // Ripple Dynamics [V3.14.1 Optimized]
    if (ripplesRef.current.length > 0) {
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const ripple = ripplesRef.current[i];
        ripple.radius += (ripple.maxRadius - ripple.radius) * 0.05 + 6;
        ripple.opacity *= 0.95;
        if (ripple.opacity < 0.01 || ripple.radius >= ripple.maxRadius) {
          ripplesRef.current.splice(i, 1);
        }
      }
    }

    shardsRef.current.forEach(shard => {
      // 2. Fundamental Transformation (Velocity Aware)
      const vFactor = velocityRef.current;
      
      // Z-Axis Transformation with velocity-induced path elongation
      let z = (shard.baseZ - scrollRef.current * (0.8 + vFactor * 1.5)) % 2000;
      if (z < 0) z += 2000;
      
      const scale = 600 / (600 + z);
      let px = shard.x * scale;
      let py = shard.y * scale;
      
      const centerX = width / (2 * dpr);
      const centerY = height / (2 * dpr);
      const relMouseX = mouse.x - centerX;
      const relMouseY = mouse.y - centerY;

      const dx = relMouseX - px;
      const dy = relMouseY - py;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Kinetic Displacement [V3.14.1 HP Logic]
      let rippleForceX = 0, rippleForceY = 0, rippleScaleBoost = 1, rippleColorAlpha = vFactor * 0.5;

      if (ripplesRef.current.length > 0) {
        ripplesRef.current.forEach(ripple => {
          const rippleX = ripple.x - centerX;
          const rippleY = ripple.y - centerY;
          const rDx = px - rippleX;
          const rDy = py - rippleY;
          const rDist = Math.sqrt(rDx * rDx + rDy * rDy);
          
          const waveFront = Math.abs(rDist - ripple.radius);
          if (waveFront < 180) {
            const intensity = (1 - waveFront / 180) * ripple.opacity;
            rippleForceX += (rDx / rDist) * intensity * 70;
            rippleForceY += (rDy / rDist) * intensity * 70;
            rippleScaleBoost += intensity * 0.6;
            rippleColorAlpha = Math.max(rippleColorAlpha, intensity);
          }
        });
      }

      let mx = 0, my = 0;
      if (mouse.active && dist < 350) {
        const force = (1 - dist / 350) * 35;
        mx = -(dx / dist) * force;
        my = -(dy / dist) * force;

        // Neural Probe (Visual Lines)
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([4, 8]);
        ctx.lineDashOffset = -performance.now() * 0.05;
        ctx.moveTo(relMouseX, relMouseY);
        ctx.lineTo(px + mx + rippleForceX, py + my + rippleForceY);
        ctx.strokeStyle = `rgba(14, 165, 233, ${(1 - dist / 350) * 0.3})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
      }

      shard.rotation += shard.rotSpeed;

      // Rendering Shard [V3.14.1 HP Rendering]
      ctx.save();
      ctx.translate(px + mx + rippleForceX, py + my + rippleForceY);
      ctx.rotate(shard.rotation);
      ctx.scale(scale * rippleScaleBoost, scale * rippleScaleBoost);
      
      ctx.beginPath();
      shard.points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();

      const depthAlpha = (1 - z / 2000) * shard.opacity;
      
      // Data Pulse logic
      const pulseY = (now % 15000) / 15000 * 4000 - 2000;
      const isPulseActive = qualityTier !== 'LOW' && Math.abs(shard.y - pulseY) < 100;

      // PERFORMANCE_AUDIT: Removed shadowBlur in favor of Luminance Injection
      if (rippleColorAlpha > 0.1) {
        ctx.strokeStyle = `rgba(14, 165, 233, ${Math.max(depthAlpha, rippleColorAlpha)})`;
        ctx.lineWidth = rippleColorAlpha > 0.5 ? 2.5 : 1.5;
      } else {
        ctx.strokeStyle = isPulseActive 
          ? `rgba(14, 165, 233, ${depthAlpha * 2})` 
          : `rgba(${shardColor}, ${depthAlpha})`;
        ctx.lineWidth = isPulseActive ? 2 : 1;
      }
      
      ctx.stroke();

      if (isPulseActive || (shard.baseZ % 100 < 5 && isDark) || rippleColorAlpha > 0.4) {
        const fillAlpha = Math.max(depthAlpha * 0.4, rippleColorAlpha * 0.3);
        ctx.fillStyle = isPulseActive || rippleColorAlpha > 0.4 
          ? `rgba(14, 165, 233, ${fillAlpha * 1.5})` 
          : `rgba(14, 165, 233, ${fillAlpha})`;
        ctx.fill();
        
        // Luminance Inversion for "Fake Glow" effect (Ultra HP Cost)
        if (rippleColorAlpha > 0.7) {
          ctx.strokeStyle = "#FFF";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      ctx.restore();
    });

    ctx.restore();
    requestRef.current = requestAnimationFrame(animate);
  };

  // 3. Lifecycle
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleMouseDown = (e) => {
      // V3.14 Ripple Trigger
      // Filter out clicks on interactive UI elements (Buttons, Controls)
      if (e.target.closest('button, .interactive, input, a')) return;

      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.max(window.innerWidth, window.innerHeight) * 1.5,
        opacity: 1,
        startTime: performance.now()
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    handleResize();

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(requestRef.current);
    };
  }, [isDark]);

  const pulseTrigger = useSystemStore((state) => state.pulseTrigger);

  // V3.17 Kinetic Pulse Listener
  useEffect(() => {
    if (pulseTrigger > 0 && ripplesRef.current) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const dpr = dprRef.current || 1;
      // Trigger a systemic pulse from the geometric center of the cortex
      ripplesRef.current.push({
        x: (window.innerWidth / 2),
        y: (window.innerHeight / 2),
        radius: 0,
        maxRadius: Math.max(window.innerWidth, window.innerHeight) * 1.2,
        opacity: 1.5, // High-intensity pulse for transmission
        startTime: performance.now()
      });
    }
  }, [pulseTrigger]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <canvas 
        ref={canvasRef}
        className="w-full h-full block opacity-60"
        style={{ filter: isDark ? 'none' : 'contrast(1.1)' }}
      />
      {/* Simulation Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark 
            ? 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.4) 100%)'
            : 'radial-gradient(circle at center, transparent 40%, rgba(255,255,255,0.2) 100%)'
        }}
      />
    </div>
  );
};

export default AnimusVoid;
