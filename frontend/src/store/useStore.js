import { create } from 'zustand';

// Theme store for managing light/dark mode
const useThemeStore = create((set) => ({
  theme: 'light', // 'light' | 'dark'
  isTransitioning: false,
  
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light',
    isTransitioning: true,
  })),
  
  setTheme: (theme) => set({ theme, isTransitioning: true }),
  
  finishTransition: () => set({ isTransitioning: false }),
}));

// System stats store
const useSystemStore = create((set) => ({
  fps: 60,
  performance: 100,
  qualityTier: 'HIGH', // 'ULTRA' | 'HIGH' | 'MEDIUM' | 'LOW'
  loadTime: 0,
  systemStatus: 'initializing',
  currentSection: 'hero',
  target: 'SYSTEM_IDLE',
  focusStatus: 'SCANNING',
  isCommandOpen: false, // Global access for Navbar/Mobile triggers
  pulseTrigger: 0,     // Kinetic broadcast counter for physics events
  
  // Github Protocol Logic [V3.26]
  commitData: Array.from({ length: 42 }, () => Math.floor(Math.random() * 100)),
  uplinkStatus: 'STABLE',
  isHandshaking: false,

  setFps: (fps) => set({ fps }),
  setPerformance: (performance) => set({ performance }),
  setQualityTier: (qualityTier) => set({ qualityTier }),
  setLoadTime: (loadTime) => set({ loadTime }),
  setSystemStatus: (systemStatus) => set({ systemStatus }),
  setCurrentSection: (currentSection) => set({ currentSection }),
  setTarget: (target) => set({ target }),
  setFocusStatus: (focusStatus) => set({ focusStatus }),
  setCommandOpen: (isCommandOpen) => set({ isCommandOpen }),
  setUplinkStatus: (uplinkStatus) => set({ uplinkStatus }),
  setHandshaking: (isHandshaking) => set({ isHandshaking }),
  refreshCommitData: () => set({ commitData: Array.from({ length: 42 }, () => Math.floor(Math.random() * 100)) }),
  triggerPulse: () => set((state) => ({ pulseTrigger: state.pulseTrigger + 1 })),
}));

// Archive store for managing project details [V3.15]
const useArchiveStore = create((set) => ({
  isModalOpen: false,
  activeProject: null,
  projects: [
    { 
      id: 'SEQ-01', 
      title: 'Dynamic Quiz Management System', 
      category: 'Logic Systems', 
      desc: 'Designed a dynamic quiz platform with optimized data handling and role-based architecture for scalable user interaction.', 
      tech: ['Python', 'Django', 'SQL'], 
      status: 'operational',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070',
      github: 'https://github.com/Hey-Astreon/Dynamic-Quiz-Management-System',
      link: '#'
    },
    { 
      id: 'SEQ-02', 
      title: 'AI CRM HCP Interaction Hub', 
      category: 'Systems Architecture', 
      desc: 'High-performance AI CRM module for pharmaceutical interactions, featuring neural link synchronization and real-time data persistence.', 
      tech: ['Next.js', 'OpenAI', 'PostgreSQL'], 
      status: 'operational',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070',
      github: 'https://github.com/Hey-Astreon/AI-CRM-HCP-Interaction-Logging-Module',
      link: '#'
    },
    { 
      id: 'SEQ-03', 
      title: 'Student Record Management System', 
      category: 'Database Systems', 
      desc: 'Architected a secure student record system with encrypted authentication and modular data streams for high-integrity institutional management.', 
      tech: ['Python', 'File Management', 'Admin Auth'], 
      status: 'operational',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2070',
      github: 'https://github.com/Hey-Astreon/Student-Record-Management-System',
      link: '#'
    },
  ],
  
  openProject: (project) => set({ activeProject: project, isModalOpen: true }),
  closeProject: () => set({ isModalOpen: false, activeProject: null }),
  ledgerData: [
    {
      id: "CERT-01",
      title: "Bachelor of Computer Applications",
      organization: "Amity University Noida",
      program: "Software Development Core",
      date: "Jul 2025 - Jul 2028",
      isVerified: false,
      metadata: "AMITY_U_NOIDA // B.C.A_SYSTEMS",
      curriculum: [
        "Computational Thinking",
        "Data Structures & Algorithms",
        "System Architecture",
        "Neural Networks Foundation"
      ]
    },
    {
      id: "CERT-02",
      title: "Gemini Certified University Student",
      organization: "Google for Education / Generative AI Mastery",
      program: "AI Infrastructure",
      date: "Feb 2026 - Feb 2029",
      isVerified: true,
      metadata: "G_CLOUD_GENAI",
      curriculum: [
        "LLM Orchestration",
        "Prompt Engineering",
        "Vector Databases",
        "Neural Link Integration"
      ]
    },
    {
      id: "CERT-03",
      title: "Python Automation & Systems Logic",
      organization: "Google Career Certificate / Computer Science",
      program: "Automated Scripting Protocols",
      date: "Sep 2022",
      isVerified: true,
      metadata: "G_CLOUD_PY_AUTO",
      curriculum: [
        "Object Oriented Programming",
        "Computational Systems Logic",
        "Neural Automation",
        "Scripting Optimization"
      ]
    },
    {
      id: "CERT-04",
      title: "Relational Database Architecture",
      organization: "Meta Certified Database Engineer",
      program: "Data Integrity & Schema Optimization",
      date: "Sep 2022",
      isVerified: true,
      metadata: "META_DB_RECON",
      curriculum: [
        "SQL Orchestration",
        "Data Integrity Protocols",
        "Schema Design",
        "Database Sharding"
      ]
    }
  ],
  setLedgerData: (data) => set({ ledgerData: data }),
}));

export { useThemeStore, useSystemStore, useArchiveStore };
