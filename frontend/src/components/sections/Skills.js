import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    color: "violet",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Python", "FastAPI", "GraphQL", "PostgreSQL"],
    color: "cyan",
  },
  {
    title: "AI / ML",
    skills: ["OpenAI", "TensorFlow", "LangChain", "Vector DBs", "NLP"],
    color: "pink",
  },
  {
    title: "Tools",
    skills: ["Git", "Docker", "AWS", "Vercel", "Figma"],
    color: "violet",
  },
];

const colorClasses = {
  violet: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    text: "text-violet-300",
    hover: "hover:border-violet-500/40 hover:bg-violet-500/20",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    text: "text-cyan-300",
    hover: "hover:border-cyan-500/40 hover:bg-cyan-500/20",
  },
  pink: {
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    text: "text-pink-300",
    hover: "hover:border-pink-500/40 hover:bg-pink-500/20",
  },
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-32 z-40 overflow-hidden"
      data-testid="skills-section"
    >
      {/* Background marquee text */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none opacity-[0.03]">
        <motion.div
          className="whitespace-nowrap font-heading text-[15vw] font-black uppercase"
          animate={{ x: [0, "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          SYSTEM_PROTOCOLS // NEURAL_NODES // SYSTEM_PROTOCOLS // NEURAL_NODES //&nbsp;
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Label */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="h-px w-12 bg-gradient-to-r from-pink-500 to-transparent" />
          <span className="font-mono text-xs tracking-[0.2em] text-cyan-400 uppercase">
            Skills
          </span>
        </motion.div>

        {/* Section Title */}
        <motion.h2
          className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Tech <span className="gradient-text">Stack</span>
        </motion.h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              data-testid={`skill-category-${category.title.toLowerCase()}`}
            >
              <h3 className="font-heading text-lg font-semibold text-white mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => {
                  const colors = colorClasses[category.color];
                  return (
                    <motion.span
                      key={skill}
                      className={`px-3 py-1.5 text-sm font-mono rounded-full border transition-all duration-300 cursor-default ${colors.bg} ${colors.border} ${colors.text} ${colors.hover}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3,
                      }}
                      whileHover={{ scale: 1.05 }}
                      data-testid={`skill-${skill.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                    >
                      {skill}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experience Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { value: "5+", label: "Years Experience" },
            { value: "50+", label: "Projects Completed" },
            { value: "30+", label: "Happy Clients" },
            { value: "99%", label: "Code Quality" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center"
              data-testid={`stat-${index}`}
            >
              <div className="font-heading text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
