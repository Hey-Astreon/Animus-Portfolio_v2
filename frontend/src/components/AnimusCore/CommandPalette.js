import React, { useState, useEffect } from 'react';
import { Command } from 'cmdk';
import { Search, Monitor, Terminal, Moon, Sun, Layers, Send } from 'lucide-react';
import { useSystemStore, useThemeStore, useArchiveStore } from '../../store/useStore';

/**
 * CommandPalette: Animus Control Center
 * A global CTRL+K interface for system navigation and theme management.
 */
const CommandPalette = () => {
  const isCommandOpen = useSystemStore((state) => state.isCommandOpen);
  const setCommandOpen = useSystemStore((state) => state.setCommandOpen);
  const { projects, openProject } = useArchiveStore();
  const { theme, toggleTheme } = useThemeStore();
  const setTarget = useSystemStore((state) => state.setTarget);
  const isDark = theme === 'dark';

  // Keyboard shortcut listener
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen(!isCommandOpen);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isCommandOpen, setCommandOpen]);

  const runCommand = (command) => {
    setCommandOpen(false);
    command();
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTarget(id.toUpperCase());
    }
  };

  return (
    <Command.Dialog 
      open={isCommandOpen} 
      onOpenChange={setCommandOpen} 
      label="Control Center"
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
    >
      <div className="absolute inset-0 bg-astreon-bg/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setCommandOpen(false)} />
      
      <div className="relative w-full max-w-xl glass border border-astreon-border/30 overflow-hidden animate-in zoom-in-95 slide-in-from-top-2 duration-300">
        <div className="flex items-center border-b border-astreon-border/10 px-4">
          <Search className="w-4 h-4 opacity-50 mr-3" />
          <Command.Input 
            placeholder="Search archive nodes or tech... (JUMP, THEME, AI, REACT)"
            className="w-full bg-transparent py-4 text-sm font-mono outline-none placeholder:opacity-30 text-astreon-text" 
          />
        </div>

        <Command.List className="max-h-[350px] overflow-y-auto p-2 scrollbar-hide">
          <Command.Empty className="py-6 text-center text-xs opacity-40 font-mono">
            NO_MODULE_FOUND // TRY_ANOTHER_QUERY
          </Command.Empty>

          <Command.Group heading="Genetic Archives" className="px-2 pt-2 pb-1 text-[10px] uppercase tracking-widest opacity-40 font-mono">
            {projects.map((project) => (
              <Command.Item 
                key={project.id}
                onSelect={() => runCommand(() => openProject(project))}
                className="flex items-center justify-between p-3 rounded-sm cursor-pointer hover:bg-astreon-surface-hover aria-selected:bg-astreon-surface-hover transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-astreon-accent/10 flex items-center justify-center border border-astreon-accent/20">
                    <Layers className="w-3.5 h-3.5 text-astreon-accent" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-astreon-text group-hover:text-astreon-accent transition-colors">{project.title}</span>
                    <span className="text-[9px] font-mono opacity-50 uppercase tracking-tighter">{project.tech.join(' // ')}</span>
                  </div>
                </div>
                <div className="text-[10px] font-mono opacity-30 group-hover:opacity-100 transition-opacity text-astreon-accent">EXTRACT_NODE</div>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Navigation" className="px-2 pt-4 pb-1 text-[10px] uppercase tracking-widest opacity-40 font-mono border-t border-astreon-border/5">
            <Command.Item 
              onSelect={() => runCommand(() => scrollToSection('hero'))}
              className="flex items-center gap-3 p-3 rounded-sm cursor-pointer hover:bg-astreon-surface-hover aria-selected:bg-astreon-surface-hover transition-colors"
            >
              <Monitor className="w-4 h-4 text-astreon-accent" />
              <span className="text-sm text-astreon-text">Jump to Hero_Section</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => scrollToSection('modules'))}
              className="flex items-center gap-3 p-3 rounded-sm cursor-pointer hover:bg-astreon-surface-hover aria-selected:bg-astreon-surface-hover transition-colors"
            >
              <Layers className="w-4 h-4 text-astreon-accent" />
              <span className="text-sm">Access System_Modules</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => scrollToSection('contact'))}
              className="flex items-center gap-3 p-3 rounded-sm cursor-pointer hover:bg-astreon-surface-hover aria-selected:bg-astreon-surface-hover transition-colors"
            >
              <Send className="w-4 h-4 text-astreon-accent" />
              <span className="text-sm">Transmission_Interface</span>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="System Controls" className="px-2 pt-4 pb-1 text-[10px] uppercase tracking-widest opacity-40 font-mono border-t border-astreon-border/5">
            <Command.Item 
              onSelect={() => runCommand(() => toggleTheme())}
              className="flex items-center gap-3 p-3 rounded-sm cursor-pointer hover:bg-astreon-surface-hover aria-selected:bg-astreon-surface-hover transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-astreon-accent" /> : <Moon className="w-4 h-4 text-astreon-accent" />}
              <span className="text-sm">Toggle System_Theme</span>
              <kbd className="ml-auto text-[9px] font-mono opacity-40 bg-astreon-surface px-1.5 py-0.5 rounded">MOD + T</kbd>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => console.log('Ping...'))}
              className="flex items-center gap-3 p-3 rounded-sm cursor-pointer hover:bg-astreon-surface-hover aria-selected:bg-astreon-surface-hover transition-colors"
            >
              <Terminal className="w-4 h-4 text-astreon-accent" />
              <span className="text-sm">Ping Infrastructure</span>
            </Command.Item>
          </Command.Group>
        </Command.List>

        <div className="p-3 border-t border-astreon-border/10 bg-astreon-surface/30 flex justify-between items-center px-4">
          <span className="text-[9px] font-mono opacity-40 uppercase">Animus Control Center // Build 2.0.4</span>
          <div className="flex gap-2">
            <kbd className="text-[9px] font-mono opacity-40 bg-astreon-surface px-1.5 py-0.5 rounded">ESC to close</kbd>
          </div>
        </div>
      </div>
    </Command.Dialog>
  );
};

export default CommandPalette;
