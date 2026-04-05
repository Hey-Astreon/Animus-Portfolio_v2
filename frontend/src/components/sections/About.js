import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Sparkles, Zap } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 z-40"
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Label */}
        <motion.div
          className="flex items-center gap-3 mb-16"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="h-px w-12 bg-gradient-to-r from-violet-500 to-transparent" />
          <span className="font-mono text-xs tracking-[0.2em] text-cyan-400 uppercase">
            About
          </span>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Image Column */}
          <motion.div
            className="lg:col-span-5"
            variants={itemVariants}
          >
            <div className="relative group">
              {/* Image container with glass effect */}
              <div className="relative overflow-hidden rounded-2xl glass p-1">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src="https://images.pexels.com/photos/10040316/pexels-photo-10040316.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Developer portrait"
                    className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                    data-testid="about-image"
                  />
                  {/* Violet overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-violet-900/20 to-transparent opacity-60" />
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 glass px-4 py-2 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="font-mono text-xs text-cyan-400">
                  {"<developer />"}
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            variants={itemVariants}
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Building the{" "}
              <span className="gradient-text">digital future</span>,
              <br />
              one line at a time.
            </h2>

            <p className="text-slate-300 text-lg leading-relaxed">
              I'm a passionate full-stack developer with a deep love for creating
              seamless digital experiences. With expertise spanning modern web
              technologies, AI integration, and system architecture, I transform
              complex ideas into elegant, functional realities.
            </p>

            <p className="text-slate-400 leading-relaxed">
              The Astreon Core represents my philosophy — technology should feel
              alive, intelligent, and purposeful. Every project I build aims to
              push boundaries while maintaining the clarity and precision that
              great software demands.
            </p>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <motion.div
                className="glass-light rounded-xl p-4 group hover:bg-white/[0.05] transition-colors"
                whileHover={{ y: -4 }}
                data-testid="about-card-architecture"
              >
                <Code2 className="w-8 h-8 text-violet-400 mb-3" />
                <h3 className="font-semibold text-white mb-1">Architecture</h3>
                <p className="text-sm text-slate-400">
                  Scalable, maintainable systems
                </p>
              </motion.div>

              <motion.div
                className="glass-light rounded-xl p-4 group hover:bg-white/[0.05] transition-colors"
                whileHover={{ y: -4 }}
                data-testid="about-card-intelligence"
              >
                <Sparkles className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="font-semibold text-white mb-1">Intelligence</h3>
                <p className="text-sm text-slate-400">AI-driven solutions</p>
              </motion.div>

              <motion.div
                className="glass-light rounded-xl p-4 group hover:bg-white/[0.05] transition-colors"
                whileHover={{ y: -4 }}
                data-testid="about-card-performance"
              >
                <Zap className="w-8 h-8 text-pink-400 mb-3" />
                <h3 className="font-semibold text-white mb-1">Performance</h3>
                <p className="text-sm text-slate-400">Optimized experiences</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
