import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const requestRef = useRef();

  // 1:1 Zero-Latency Mouse Tracking Logic [V3.35]
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Use requestAnimationFrame for high-frequency synchronization
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      
      requestRef.current = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);
      });

      // Simple, fast hover detection logic
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.classList.contains('cursor-pointer') ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer';
        
      setIsHovering(isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  // If on mobile or touch-device, suppress custom cursor for UX integrity
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      {/* Precision Core (The Singularity) */}
      <motion.div 
        className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        animate={{ 
          x: mousePos.x, 
          y: mousePos.y,
          transition: { type: 'just' } // Zero delay
        }}
        style={{ translateX: '-50%', translateY: '-50%' }}
      />

      {/* Orbital Primary Ring (Dashed) */}
      <motion.div 
        className="absolute w-12 h-12 border border-dashed border-astreon-accent/40 rounded-full"
        animate={{ 
          x: mousePos.x, 
          y: mousePos.y,
          rotate: [0, 360],
          scale: isHovering ? 1.2 : 1,
          transition: { 
            rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
            x: { type: 'just' },
            y: { type: 'just' },
            scale: { duration: 0.2 }
          }
        }}
        style={{ translateX: '-50%', translateY: '-50%' }}
      />

      {/* Static Inner Ring (Solid) */}
      <motion.div 
        className="absolute w-8 h-8 border border-white/10 rounded-full"
        animate={{ 
          x: mousePos.x, 
          y: mousePos.y,
          scale: isHovering ? 1.1 : 1,
          transition: { x: { type: 'just' }, y: { type: 'just' } }
        }}
        style={{ translateX: '-50%', translateY: '-50%' }}
      />

      {/* Tactical Brackets [Snap-In Feedback] */}
      <motion.div
        className="absolute w-20 h-20 pointer-events-none"
        animate={{ 
          x: mousePos.x, 
          y: mousePos.y,
          transition: { x: { type: 'just' }, y: { type: 'just' } }
        }}
        style={{ translateX: '-50%', translateY: '-50%' }}
      >
        {/* Corner Brackets */}
        {[
          { pos: 'top-0 left-0', border: 'border-t border-l' },
          { pos: 'top-0 right-0', border: 'border-t border-r' },
          { pos: 'bottom-0 left-0', border: 'border-b border-l' },
          { pos: 'bottom-0 right-0', border: 'border-b border-r' }
        ].map((bracket, i) => (
          <motion.div
            key={i}
            className={`absolute ${bracket.pos} w-2 h-2 ${bracket.border} border-astreon-accent/60`}
            animate={{ 
              x: isHovering ? (bracket.pos.includes('left') ? 12 : -12) : 0,
              y: isHovering ? (bracket.pos.includes('top') ? 12 : -12) : 0,
              opacity: isHovering ? 1 : 0.3
            }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          />
        ))}
      </motion.div>

      {/* High-Speed Sync Pulse */}
      <AnimatePresence>
        {isHovering && (
          <motion.div 
            className="absolute w-24 h-24 border border-astreon-accent/20 rounded-full"
            initial={{ x: mousePos.x, y: mousePos.y, scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: [1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{ translateX: '-50%', translateY: '-50%' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursor;
