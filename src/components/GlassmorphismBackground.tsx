import { useEffect, useRef } from 'react';

interface FloatingLightProps {
  color: string;
  size: number;
  duration: number;
  delay: number;
  blur: number;
}

const FloatingLight = ({ color, size, duration, delay, blur }: FloatingLightProps) => {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = lightRef.current;
    if (!light) return;

    const animate = () => {
      const x = Math.random() * (window.innerWidth - size);
      const y = Math.random() * (window.innerHeight - size);

      light.style.transform = `translate(${x}px, ${y}px)`;
      light.style.transition = `transform ${duration}s ease-in-out`;

      setTimeout(animate, duration * 1000 + delay * 1000);
    };

    // Initial position
    const initialX = Math.random() * (window.innerWidth - size);
    const initialY = Math.random() * (window.innerHeight - size);
    light.style.transform = `translate(${initialX}px, ${initialY}px)`;

    setTimeout(animate, delay * 1000);
  }, [size, duration, delay]);

  return (
    <div
      ref={lightRef}
      className="absolute rounded-full pointer-events-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, ${color}40 0%, ${color}20 50%, transparent 100%)`,
        filter: `blur(${blur}px)`,
        animation: `pulse-glow ${duration * 2}s ease-in-out infinite`,
      }}
    />
  );
};

interface GlassmorphismBackgroundProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
}

const GlassmorphismBackground = ({
  children,
  className = '',
  intensity = 'medium'
}: GlassmorphismBackgroundProps) => {
  const blurIntensity = {
    light: '',
    medium: '',
    heavy: ''
  };

  const opacityIntensity = {
    light: 'bg-white/10',
    medium: 'bg-white/20',
    heavy: 'bg-white/30'
  };

  const lights = [
    // Reduced set of lights for performance
    { color: 'hsl(221, 83%, 53%)', size: 180, duration: 20, delay: 0, blur: 28 },
    { color: 'hsl(174, 72%, 56%)', size: 160, duration: 22, delay: 4, blur: 26 },
    { color: 'hsl(262, 83%, 58%)', size: 140, duration: 24, delay: 8, blur: 24 },
    { color: 'hsl(186, 52%, 45%)', size: 120, duration: 26, delay: 12, blur: 22 },
  ];

  return (
    <div className={`relative min-h-screen overflow-hidden pt-20 ${className}`}>
      {/* Animated background lights (only on xl screens) */}
      <div className="fixed inset-0 pointer-events-none hidden xl:block">
        {lights.map((light, index) => (
          <FloatingLight
            key={index}
            color={light.color}
            size={light.size}
            duration={light.duration}
            delay={light.delay}
            blur={light.blur}
          />
        ))}
      </div>

      {/* Subtle overlay without backdrop blur for performance */}
      <div className={`fixed inset-0 ${opacityIntensity[intensity]}`} />

      {/* Gradient mesh overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="fixed inset-0 bg-gradient-to-tl from-transparent via-background/50 to-accent/5" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassmorphismBackground;