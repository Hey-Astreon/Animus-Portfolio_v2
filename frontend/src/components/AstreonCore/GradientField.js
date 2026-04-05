import { motion } from "framer-motion";

const GradientField = () => {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden"
      data-testid="gradient-field"
    >
      {/* Deep base */}
      <div className="absolute inset-0 bg-[#030014]" />

      {/* Primary violet orb */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary cyan orb */}
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Pink accent orb */}
      <motion.div
        className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
};

export default GradientField;
