import GradientField from "./GradientField";
import ParticleField from "./ParticleField";
import EnergyWaves from "./EnergyWaves";

const AstreonBackground = () => {
  return (
    <div
      className="fixed inset-0 overflow-hidden"
      data-testid="astreon-background"
      aria-hidden="true"
    >
      {/* Layer 1: Gradient Field (z-0) */}
      <GradientField />

      {/* Layer 2: Energy Waves (z-5) */}
      <EnergyWaves />

      {/* Layer 3: Neural Grid Particles (z-10) */}
      <ParticleField />

      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 z-[25] pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default AstreonBackground;
