import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, ArrowUpRight, Check, ShieldCheck, ShieldAlert, Cpu, Github, Linkedin, Instagram } from 'lucide-react';
import { useThemeStore, useSystemStore } from '../../store/useStore';

const DiscordIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
  </svg>
);

const uplinkNodes = [
  { id: '1', name: 'Neural Mail', system: 'SMTP_OVER_TLS', Icon: Mail, color: '#0ea5e9', link: 'mailto:roushan@astreon.me' },
  { id: '2', name: 'GitHub Stack', system: 'GIT_CORE_V3', Icon: Github, color: '#f8fafc', link: 'https://github.com/Hey-Astreon' },
  { id: '3', name: 'LinkedIn Link', system: 'AUTH_TOKEN_ACTIVE', Icon: Linkedin, color: '#0ea5e9', link: 'https://www.linkedin.com/in/roushan-kumar-ab4b19250/' },
  { id: '4', name: 'Insta_Signal', system: 'MEDIA_STREAM', Icon: Instagram, color: '#ec4899', link: '#' },
  { id: '5', name: 'Discord Node', system: 'VOICE_RELAY_ON', isDiscord: true, color: '#5865F2', link: '#' }
];

const RadialNode = ({ node }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = node.Icon;

  return (
    <motion.a 
      href={node.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-4 relative cursor-pointer outline-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      {/* Radial Hover Pulse */}
      <motion.div 
        className="absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full pointer-events-none mix-blend-screen"
        style={{ background: `radial-gradient(circle, ${node.color}20 0%, transparent 60%)` }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.2 : 0.8 }}
        transition={{ duration: 0.5 }}
      />

      {/* Crosshair Lock-On Container */}
      <div className="relative w-16 h-16 flex items-center justify-center border border-astreon-border/10 group-hover:border-transparent transition-colors duration-300 bg-astreon-bg-alt/30 backdrop-blur-sm z-10">
        
        {/* Animated Brackets (Inward Contracting Tactical Lock-On) */}
        <div className="absolute inset-0 pointer-events-none mix-blend-screen">
          <motion.div 
            className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2"
            style={{ borderColor: node.color }}
            initial={{ opacity: 0.3, x: -8, y: -8 }}
            animate={{ opacity: isHovered ? 1 : 0.3, x: isHovered ? 0 : -8, y: isHovered ? 0 : -8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
          <motion.div 
            className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2"
            style={{ borderColor: node.color }}
            initial={{ opacity: 0.3, x: 8, y: -8 }}
            animate={{ opacity: isHovered ? 1 : 0.3, x: isHovered ? 0 : 8, y: isHovered ? 0 : -8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2"
            style={{ borderColor: node.color }}
            initial={{ opacity: 0.3, x: -8, y: 8 }}
            animate={{ opacity: isHovered ? 1 : 0.3, x: isHovered ? 0 : -8, y: isHovered ? 0 : 8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2"
            style={{ borderColor: node.color }}
            initial={{ opacity: 0.3, x: 8, y: 8 }}
            animate={{ opacity: isHovered ? 1 : 0.3, x: isHovered ? 0 : 8, y: isHovered ? 0 : 8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
        </div>

        {/* Icon Container */}
        <motion.div
           animate={{ scale: isHovered ? 1.1 : 1 }}
           transition={{ type: "spring", stiffness: 300, damping: 15 }}
           style={{ color: isHovered ? node.color : '#94a3b8' }}
           className="transition-colors duration-300"
        >
          {node.isDiscord ? <DiscordIcon className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
        </motion.div>
      </div>

      {/* Metadata Labels */}
      <div className="flex flex-col items-center gap-1.5 z-10">
        <span className="font-mono text-[8px] tracking-[0.4em] font-bold transition-colors duration-300 uppercase" style={{ color: isHovered ? node.color : '#94a3b8' }}>
          {node.system}
        </span>
        <span className="font-display text-sm font-bold text-astreon-text group-hover:text-white transition-colors duration-300">
          {node.name}
        </span>
      </div>
    </motion.a>
  );
};

const TransmissionInterface = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const theme = useThemeStore((state) => state.theme);
  const triggerPulse = useSystemStore((state) => state.triggerPulse);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState('IDLE'); // IDLE, CALCULATING_UPLINK, ENCRYPTING_SIGNAL, SENDING

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const handleMessageChange = (e) => {
    const newVal = e.target.value;
    setForm({ ...form, message: newVal });
    
    // Trigger a pulse every X characters typed for kinetic feedback
    if (newVal.length > 0 && newVal.length % 8 === 0) {
      triggerPulse();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Encryption Simulation Protocol with Kinetic Payoff
    setStatus('CALCULATING_UPLINK');
    triggerPulse();
    await new Promise(r => setTimeout(r, 800));
    
    setStatus('ENCRYPTING_SIGNAL');
    triggerPulse();
    await new Promise(r => setTimeout(r, 1000));
    
    setStatus('SENDING');
    triggerPulse();
    await new Promise(r => setTimeout(r, 800));
    
    setSubmitting(false);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  const isDark = theme === 'dark';

  return (
    <section id="transmission" ref={ref} className="relative py-40 z-10" data-testid="transmission-section">
      <motion.div className="max-w-6xl mx-auto px-6" style={{ y }}>
        
        {/* Section Header */}
        <motion.div className="flex items-center gap-6 mb-8" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}>
          <ShieldCheck size={14} className="text-astreon-accent" />
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-astreon-text-primary font-bold">Transmission_Sovereign</span>
          <div className="flex-1 h-px bg-gradient-to-r from-astreon-accent/30 to-transparent" />
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-astreon-text-muted opacity-40">UPLINK_STABLE</span>
        </motion.div>

        <motion.h2 
          className="font-display text-6xl font-black tracking-tight mb-16 text-astreon-text-primary"
          initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}
        >
          Initiate <span className="text-astreon-accent">Uplink</span>
        </motion.h2>

        {/* V3.30 Radial Uplink Protocol: Full Width Node Matrix */}
        <motion.div 
          className="flex flex-wrap justify-center md:justify-between items-center gap-10 mb-28 border-b border-astreon-border/10 relative pb-16"
          initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-astreon-border/10 -translate-y-1/2 pointer-events-none hidden md:block" />
          {uplinkNodes.map((node) => (
            <motion.div key={node.id} variants={fadeUp}>
              <RadialNode node={node} />
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Left Column - Diagnostic Info */}
          <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>
            <motion.p className="font-mono text-xs leading-relaxed mb-12 opacity-70" variants={fadeUp}>
              {'>'} Establishing secure connection to Animus Cloud...
              <br/>
              {'>'} Protocol: AES-256 Symmetric Transmission
              <br/>
              {'>'} Status: Ready for synchronization.
            </motion.p>

            <motion.div className="space-y-6 mb-16" variants={fadeUp}>
              {[
                { icon: Mail, label: 'SIGNAL_ADDRESS', value: 'roushan@astreon.me' },
                { icon: MapPin, label: 'LOCAL_COORDS', value: 'Global (Remote Uplink)' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="group flex flex-col gap-2">
                  <span className="font-mono text-[8px] tracking-[0.4em] opacity-40 uppercase">{label}</span>
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 border border-astreon-border/30 group-hover:border-astreon-accent/60 transition-colors duration-500 bg-astreon-bg-alt/20">
                      <Icon className="w-5 h-5 text-astreon-accent" />
                    </div>
                    <span className="font-display text-lg font-semibold text-astreon-text-primary tracking-tight">{value}</span>
                  </div>
                </div>
              ))}
            </motion.div>


          </motion.div>

          {/* Right Column - Transmission Form */}
          <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}>
            <form
              onSubmit={handleSubmit}
              className="relative p-12 border border-astreon-border/30 bg-astreon-bg-alt/30 group hover:border-astreon-accent/40 transition-colors duration-700"
              data-testid="contact-form"
            >
              {/* Corner L-Brackets */}
              <div className="absolute -top-[1px] -left-[1px] w-6 h-6 border-t-2 border-l-2 border-astreon-accent opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute -bottom-[1px] -right-[1px] w-6 h-6 border-b-2 border-r-2 border-astreon-accent opacity-30 group-hover:opacity-100 transition-opacity duration-700" />

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div 
                    className="text-center py-16" 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="relative w-20 h-20 mx-auto mb-8 flex items-center justify-center">
                      <div className="absolute inset-0 border border-astreon-accent/30 rounded-full animate-ping" />
                      <div className="w-full h-full border-2 border-astreon-accent flex items-center justify-center">
                        <Check className="w-10 h-10 text-astreon-accent" />
                      </div>
                    </div>
                    <h3 className="font-display text-2xl font-black mb-4 text-astreon-text-primary tracking-tight">TRANSMISSION_SECURED</h3>
                    <p className="font-mono text-[10px] tracking-widest text-astreon-accent opacity-70">UPLINK_SUCCESS // DEST_VOID:INF</p>
                  </motion.div>
                ) : (
                  <motion.div className="space-y-8" exit={{ opacity: 0 }}>
                    {/* Form Fields */}
                    <div className="space-y-6">
                        <div className="group/field relative">
                            <label className="font-mono text-[9px] tracking-[0.4em] uppercase text-astreon-text-muted opacity-40 block mb-3">#IDENTIFIER</label>
                            <input
                              type="text" required placeholder="INPUT_NAME"
                              className="w-full px-6 py-4 text-sm font-mono bg-astreon-surface/20 border border-astreon-border/20 text-astreon-text-primary focus:outline-none focus:border-astreon-accent focus:bg-astreon-accent/5 transition-all duration-300"
                              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                        </div>
                        <div className="group/field relative">
                            <label className="font-mono text-[9px] tracking-[0.4em] uppercase text-astreon-text-muted opacity-40 block mb-3">#SIGNAL_ADDR</label>
                            <input
                              type="email" required placeholder="INPUT_EMAIL"
                              className="w-full px-6 py-4 text-sm font-mono bg-astreon-surface/20 border border-astreon-border/20 text-astreon-text-primary focus:outline-none focus:border-astreon-accent focus:bg-astreon-accent/5 transition-all duration-300"
                              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>
                        <div className="group/field relative">
                            <label className="font-mono text-[9px] tracking-[0.4em] uppercase text-astreon-text-muted opacity-40 block mb-3">#PAYLOAD_DATA</label>
                            <textarea
                              rows={5} required placeholder="INPUT_TRANSMISSION..."
                              className="w-full px-6 py-4 text-sm font-mono bg-astreon-surface/20 border border-astreon-border/20 text-astreon-text-primary focus:outline-none focus:border-astreon-accent focus:bg-astreon-accent/5 transition-all duration-300 resize-none"
                              value={form.message} onChange={handleMessageChange}
                            />
                        </div>
                    </div>

                    {/* Transmission Monitor (Visible when submitting) */}
                    {submitting && (
                      <div className="space-y-3 py-4">
                        <div className="flex justify-between font-mono text-[8px] tracking-widest text-astreon-accent">
                          <span>{status}</span>
                          <span>99%_SYNC</span>
                        </div>
                        <div className="h-[2px] bg-astreon-border/20 overflow-hidden">
                          <motion.div 
                            className="h-full bg-astreon-accent"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2.6, ease: "linear" }}
                          />
                        </div>
                      </div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      className="relative w-full py-5 bg-astreon-text-primary text-astreon-bg font-mono text-[11px] tracking-[0.4em] font-black uppercase overflow-hidden hover:bg-astreon-accent hover:text-white transition-all duration-500"
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center justify-center gap-3">
                        <Cpu size={14} className={submitting ? 'animate-spin' : ''} />
                        {submitting ? 'UPLINK_IN_PROGRESS...' : 'INITIATE_TRANSMISSION'}
                      </span>
                    </motion.button>

                    <div className="text-center opacity-10 font-mono text-[7px] tracking-[0.5em]">
                      LAT: 40.7128 / LNG: -74.0060 // SEQ_ARCHIVE_TRANSMIT
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default TransmissionInterface;
