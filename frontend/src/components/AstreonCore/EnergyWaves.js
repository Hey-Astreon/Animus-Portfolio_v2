import { motion } from "framer-motion";

const EnergyWaves = () => {
  return (
    <div
      className="fixed inset-0 z-[5] pointer-events-none overflow-hidden opacity-30"
      data-testid="energy-waves"
    >
      {/* Horizontal wave lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute h-px w-full"
          style={{
            top: `${20 + i * 15}%`,
            background: `linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2) ${
              30 + i * 5
            }%, rgba(6, 182, 212, 0.15) ${60 - i * 3}%, transparent)`,
          }}
          animate={{
            x: ["-100%", "100%"],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        />
      ))}

      {/* Vertical energy streams */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute w-px h-full"
          style={{
            left: `${25 + i * 25}%`,
            background: `linear-gradient(180deg, transparent, rgba(6, 182, 212, 0.15) 40%, rgba(139, 92, 246, 0.1) 60%, transparent)`,
          }}
          animate={{
            y: ["-50%", "50%"],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 3,
          }}
        />
      ))}

      {/* Diagonal energy beam */}
      <motion.div
        className="absolute w-[200%] h-px origin-left"
        style={{
          top: "30%",
          left: "-50%",
          transform: "rotate(25deg)",
          background:
            "linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.1), transparent)",
        }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default EnergyWaves;
