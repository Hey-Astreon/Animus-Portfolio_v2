import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Neural Analytics Dashboard",
    description:
      "Real-time data visualization platform with AI-powered insights and predictive analytics for enterprise decision making.",
    tags: ["React", "Python", "TensorFlow", "D3.js"],
    image:
      "https://images.unsplash.com/photo-1754738381783-f9a2847bfef2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYWJzdHJhY3QlMjB0ZWNofGVufDB8fHx8MTc3NDkxMDc5NXww&ixlib=rb-4.1.0&q=85",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Quantum Commerce",
    description:
      "Next-generation e-commerce platform with AI recommendations, real-time inventory, and seamless payment integration.",
    tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1762279389042-9439bfb6c155?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwyfHxkYXJrJTIwYWJzdHJhY3QlMjB0ZWNofGVufDB8fHx8MTc3NDkxMDc5NXww&ixlib=rb-4.1.0&q=85",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Synth Voice Assistant",
    description:
      "AI-powered voice assistant with natural language processing, multi-language support, and smart home integration.",
    tags: ["Python", "FastAPI", "OpenAI", "WebSocket"],
    image:
      "https://images.unsplash.com/photo-1761319659795-543075eaeaad?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwzfHxkYXJrJTIwYWJzdHJhY3QlMjB0ZWNofGVufDB8fHx8MTc3NDkxMDc5NXww&ixlib=rb-4.1.0&q=85",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 4,
    title: "CodeFlow IDE",
    description:
      "Browser-based collaborative code editor with real-time sync, AI code completion, and integrated terminal.",
    tags: ["React", "TypeScript", "WebRTC", "Monaco"],
    image:
      "https://images.pexels.com/photos/16023919/pexels-photo-16023919.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
];

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={ref}
      className={`group relative ${
        project.featured ? "md:col-span-2" : "md:col-span-1"
      }`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      data-testid={`project-card-${project.id}`}
    >
      <div className="relative h-full glass rounded-2xl overflow-hidden transition-all duration-500 hover:border-cyan-500/30">
        {/* Image */}
        <div className="relative overflow-hidden aspect-video">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/50 to-transparent" />

          {/* Overlay links */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href={project.githubUrl}
              className="p-2 rounded-full glass hover:bg-white/10 transition-colors"
              aria-label="View on GitHub"
              data-testid={`project-${project.id}-github`}
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={project.liveUrl}
              className="p-2 rounded-full glass hover:bg-white/10 transition-colors"
              aria-label="View live project"
              data-testid={`project-${project.id}-live`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono text-violet-300 bg-violet-500/10 rounded-full border border-violet-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-32 z-40"
      data-testid="projects-section"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Label */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent" />
          <span className="font-mono text-xs tracking-[0.2em] text-cyan-400 uppercase">
            Projects
          </span>
        </motion.div>

        {/* Section Title */}
        <motion.h2
          className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Featured <span className="gradient-text">Work</span>
        </motion.h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <a
            href="#"
            className="group px-8 py-4 rounded-full border border-white/10 text-slate-300 hover:text-white hover:border-violet-500/50 transition-all duration-300 flex items-center gap-2"
            data-testid="view-all-projects"
          >
            View All Projects
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
