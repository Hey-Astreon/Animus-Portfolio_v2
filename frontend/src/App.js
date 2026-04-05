import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import "@/App.css";

// Store
import { useThemeStore, useSystemStore } from './store/useStore';

// Hooks
import { usePerformanceAuditor } from './hooks/usePerformanceAuditor';

// Core Components
import BootSequence from './components/AnimusCore/BootSequence';
import AnimusVoid from './components/AnimusCore/AnimusVoid';
import CircuitBackground from './components/AnimusCore/CircuitBackground';
import SystemHUD from './components/AnimusCore/SystemHUD';
import CommandPalette from './components/AnimusCore/CommandPalette';
import ThemeToggle from './components/AnimusCore/ThemeToggle';
import EnergyWaves from './components/AstreonCore/EnergyWaves';

// UI Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProjectModal from './components/Archive/ProjectModal';

// Sections
import Hero from './components/sections/Hero';
import CoreIdentity from './components/sections/CoreIdentity';
import NeuralReconstruction from './components/sections/NeuralReconstruction';
import SystemModules from './components/sections/SystemModules';
import NeuralLedger from './components/sections/NeuralLedger';
import CapabilitiesMatrix from './components/sections/CapabilitiesMatrix';
import TransmissionInterface from './components/sections/TransmissionInterface';

function App() {
  const theme = useThemeStore((state) => state.theme);
  const qualityTier = useSystemStore((state) => state.qualityTier);
  const [isBooting, setIsBooting] = useState(true);
  const { scrollYProgress } = useScroll();
  const isFirstMount = useRef(true);
  
  // Initialize System Performance Auditor
  usePerformanceAuditor();
  
  // Scroll progress transform
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Apply theme and handle View Transitions (Safe Implementation V3.12)
  useEffect(() => {
    if (isFirstMount.current) {
      document.documentElement.setAttribute('data-theme', theme);
      isFirstMount.current = false;
      return;
    }

    if (!document.startViewTransition) {
      document.documentElement.setAttribute('data-theme', theme);
      return;
    }

    document.startViewTransition(() => {
      document.documentElement.setAttribute('data-theme', theme);
    });
  }, [theme]);

  // System Core Initialization [V3.13 Handshake Stabilization]
  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
  }, []);

  return (
    <div className="App relative overflow-x-hidden min-h-screen bg-astreon-bg" data-testid="app-container">
      <AnimatePresence mode="wait">
        {isBooting ? (
          <BootSequence key="boot" onComplete={handleBootComplete} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
      {/* Scroll Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--astreon-accent)] z-[60] origin-left"
          style={{ scaleX }}
          data-testid="scroll-progress"
        />

      {/* Atmospheric noise overlay */}
      <div className="noise-bg" />

      {/* Vertical Identity Ribbon */}
      <div className="vertical-ribbon hidden lg:block">
        ANIMUS_STABLE_CORRIDOR_V3.04
      </div>

      {/* Background System */}
      {qualityTier === 'ULTRA' && <EnergyWaves />}
      <CircuitBackground />
      <AnimusVoid />

      {/* System HUD */}
      <SystemHUD />

      {/* Control Center (CTRL+K) */}
      <CommandPalette />

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Genetic Archive Modal [V3.15] */}
      <ProjectModal />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <Navbar />

        {/* Main Sections */}
        <main>
          <Hero />
          <div className="section-mask">
            <CoreIdentity />
            <NeuralReconstruction />
            <SystemModules />
            <NeuralLedger />
            <CapabilitiesMatrix />
            <TransmissionInterface />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
