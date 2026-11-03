import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, ArrowUp, Sparkles } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  const { navigateTo } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#070B16] border-t border-white/10 py-16 text-[#A9B8C8] text-xs overflow-hidden">
      {/* Background kinetic ambient halos */}
      <div
        className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-[#00F5A0]/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="font-display font-extrabold text-white text-base">
              Laura Jiménez López
            </span>
            <span className="w-2 h-2 rounded-full bg-[#00F5A0] shadow-[0_0_8px_#00F5A0] animate-ping" />
            <span className="text-xs text-[#00F5A0] font-mono font-bold">PORTFOLIO PROFESIONAL</span>
          </div>
          <p className="text-[11px] text-[#A9B8C8] mt-1">
            Illescas, Toledo (España) · Información contrastada y confirmada formalmente
          </p>
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => navigateTo('/app')}
            className="flex items-center gap-2 text-xs font-bold text-[#00F5A0] hover:text-white transition-colors bg-[#00F5A0]/10 hover:bg-[#00F5A0]/20 border border-[#00F5A0]/40 px-3.5 py-2 rounded-xl shadow-[0_0_15px_rgba(0,245,160,0.2)] transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-[#00F5A0]" />
            <span>Área privada (/app)</span>
          </button>

          <span className="text-white/20">|</span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-[#A9B8C8] hover:text-white transition-colors cursor-pointer transform hover:-translate-y-0.5 active:scale-95"
            title="Volver arriba"
          >
            <ArrowUp className="w-4 h-4 text-[#00F5A0]" />
            <span>Volver arriba</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8 pt-6 border-t border-white/6 text-[11px] text-[#A9B8C8]/70 text-center sm:text-left relative z-10">
        Diseño contemporáneo inspirado en patrones editoriales interactivos con paleta de alto impacto. Sin datos inventados ni tratamientos automatizados de terceros.
      </div>

      {/* Floating Scroll to Top Button with intense Neon Emerald Glow */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-[#122234] hover:bg-[#183046] border border-[#00F5A0]/60 text-white shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_25px_rgba(0,245,160,0.5)] transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5A0] animate-in fade-in slide-in-from-bottom-3 cursor-pointer"
          aria-label="Volver arriba"
        >
          <ArrowUp className="w-5 h-5 text-[#00F5A0]" />
        </button>
      )}
    </footer>
  );
};
