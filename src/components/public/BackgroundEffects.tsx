import React, { useEffect, useState } from 'react';

export const BackgroundEffects: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 768) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep night canvas base */}
      <div className="absolute inset-0 bg-[#070B18]" />

      {/* Radiant Floating Energy Halos (Vivid Emerald #00F5A0 & Neon Coral #FF2A55) */}
      <div
        className="absolute top-[-5%] left-[10%] w-[650px] h-[650px] rounded-full bg-[#00F5A0]/16 blur-[140px] animate-float-gentle"
      />
      <div
        className="absolute top-[20%] right-[-8%] w-[600px] h-[600px] rounded-full bg-[#FF2A55]/18 blur-[150px] animate-float-reverse"
      />
      <div
        className="absolute top-[55%] left-[-8%] w-[550px] h-[550px] rounded-full bg-[#00F5A0]/14 blur-[140px] animate-float-reverse"
      />
      <div
        className="absolute bottom-[-10%] right-[15%] w-[700px] h-[700px] rounded-full bg-[#FF2A55]/15 blur-[160px] animate-float-gentle"
      />

      {/* Interactive cursor spotlight with high-vibrancy dual aura for desktop */}
      {isDesktop && (
        <div
          className="absolute inset-0 transition-opacity duration-150"
          style={{
            background: `radial-gradient(750px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 245, 160, 0.11), rgba(255, 42, 85, 0.08) 40%, transparent 75%)`
          }}
        />
      )}

      {/* Floating luminous particle dots */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[18%] left-[22%] w-1.5 h-1.5 rounded-full bg-[#00F5A0] shadow-[0_0_12px_#00F5A0] animate-float-gentle" />
        <div className="absolute top-[32%] right-[18%] w-2 h-2 rounded-full bg-[#FF2A55] shadow-[0_0_14px_#FF2A55] animate-float-reverse" />
        <div className="absolute top-[58%] left-[12%] w-1.5 h-1.5 rounded-full bg-[#00F5A0] shadow-[0_0_10px_#00F5A0] animate-float-reverse" />
        <div className="absolute top-[75%] right-[28%] w-2 h-2 rounded-full bg-[#FF2A55] shadow-[0_0_12px_#FF2A55] animate-float-gentle" />
        <div className="absolute top-[88%] left-[45%] w-1.5 h-1.5 rounded-full bg-[#00F5A0] shadow-[0_0_12px_#00F5A0] animate-float-gentle" />
      </div>

      {/* Subtle fine geometric dot grid */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.85) 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />
    </div>
  );
};
