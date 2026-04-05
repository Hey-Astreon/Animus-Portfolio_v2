import { motion } from "framer-motion";

const CorePulse = () => {
  const rings = [0, 1, 2, 3, 4];

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none overflow-hidden"
      data-testid="core-pulse"
    >
      {/* Central core glow */}
      <div className="absolute w-4 h-4 rounded-full bg-violet-500/80 blur-sm" />
      <div className="absolute w-2 h-2 rounded-full bg-cyan-400" />

      {/* Expanding pulse rings */}
      {rings.map((index) => (
        <motion.div
          key={index}
          className="absolute rounded-full border border-violet-500/30"
          style={{
            width: "100px",
            height: "100px",
          }}
          initial={{ scale: 0.5, opacity: 0.6 }}
          animate={{
            scale: [0.5, 3],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: index * 0.8,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Secondary cyan pulse rings */}
      {[0, 1, 2].map((index) => (
        <motion.div
          key={`cyan-${index}`}
          className="absolute rounded-full border border-cyan-500/20"
          style={{
            width: "60px",
            height: "60px",
          }}
          initial={{ scale: 0.3, opacity: 0.4 }}
          animate={{
            scale: [0.3, 2.5],
            opacity: [0.4, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: index * 1.5 + 0.5,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Subtle pink accent pulses */}
      <motion.div
        className="absolute rounded-full border border-pink-500/15"
        style={{
          width: "80px",
          height: "80px",
        }}
        initial={{ scale: 0.4, opacity: 0.3 }}
        animate={{
          scale: [0.4, 2.2],
          opacity: [0.3, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: 2,
          ease: "easeOut",
        }}
      />
    </div>
  );
};

export default CorePulse;
