import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, FileText, ArrowDown, Lock, Check, Edit3, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { profile, updateProfile, setCvModalOpen, navigateTo } = useApp();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(profile.provisionalTitle);

  const handleSaveTitle = () => {
    updateProfile({ ...profile, provisionalTitle: tempTitle });
    setIsEditingTitle(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[95vh] flex flex-col justify-center pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Main Typographic Column (Editorial Asymmetric Layout) */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            {/* Small Top Kicker & Active Search Badge with Kinetic Pulse */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/6 border border-white/15 text-[11px] font-mono tracking-wider uppercase text-[#A9B8C8] backdrop-blur-md">
                <MapPin className="w-3.5 h-3.5 text-[#00F5A0] animate-bounce" aria-hidden="true" />
                <span>PORTFOLIO PROFESIONAL · ILLESCAS, TOLEDO</span>
              </div>

              {/* Floating Pill: Búsqueda activa de empleo with vivid Emerald Glow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F5A0]/15 border border-[#00F5A0]/50 text-xs font-bold text-[#00F5A0] shadow-[0_0_20px_rgba(0,245,160,0.35)] animate-float-gentle">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5A0] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F5A0]" />
                </span>
                <span>Búsqueda activa de empleo</span>
              </div>
            </div>

            {/* Candidate Name in Vibrant Shifting Gradient */}
            <div className="mb-4">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[1.05]">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5F7FA] to-[#A9B8C8]">
                  LAURA
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00F5A0] via-white to-[#FF2A55] animate-gradient-text drop-shadow-[0_0_35px_rgba(0,245,160,0.3)]">
                  JIMÉNEZ LÓPEZ
                </span>
              </h1>
            </div>

            {/* Dynamic Title with Emerald Accent */}
            <div className="mb-5 w-full max-w-2xl">
              <p className="text-xl sm:text-2xl font-display font-semibold text-white/95 leading-snug">
                Gestión administrativa con <span className="text-[#00F5A0] font-bold underline decoration-[#00F5A0]/40 underline-offset-4">orden</span>, <span className="text-[#FF2A55] font-bold underline decoration-[#FF2A55]/40 underline-offset-4">atención</span> y seguimiento.
              </p>

              {/* Provisional title hint/editor */}
              <div className="mt-2.5 flex items-center gap-2 flex-wrap text-xs">
                {isEditingTitle ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      value={tempTitle}
                      onChange={(e) => setTempTitle(e.target.value)}
                      className="px-3 py-1.5 text-xs bg-[#15283A] text-white border border-[#00F5A0] rounded-lg focus-visible:outline-none shadow-[0_0_12px_rgba(0,245,160,0.3)]"
                    />
                    <button
                      onClick={handleSaveTitle}
                      className="p-1.5 bg-[#00F5A0] text-slate-900 font-bold rounded-lg hover:bg-[#00d88d]"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-[#A9B8C8]">
                    <span>Titular provisional: <strong className="text-[#00F5A0]">{profile.provisionalTitle}</strong></span>
                    <button
                      onClick={() => setIsEditingTitle(true)}
                      className="p-1 hover:text-[#00F5A0] transition-colors"
                      title="Editar titular provisional"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Subtitle with unboxed typographic separators */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm sm:text-base font-semibold text-white/90 mb-6">
              <span className="hover:text-[#00F5A0] transition-colors cursor-default">Órdenes de trabajo</span>
              <span className="text-[#00F5A0] font-bold" aria-hidden="true">·</span>
              <span className="hover:text-[#FF2A55] transition-colors cursor-default">Clientes y proveedores</span>
              <span className="text-[#FF2A55] font-bold" aria-hidden="true">·</span>
              <span className="hover:text-[#00F5A0] transition-colors cursor-default">Stock y almacén</span>
            </div>

            {/* Brief Narrative Intro */}
            <p className="text-sm sm:text-base text-[#A9B8C8] leading-relaxed mb-8 max-w-xl">
              Perfil organizado y responsable, con experiencia contrastada en el seguimiento riguroso de órdenes, la atención directa a clientes y proveedores y la gestión física y documental de almacén.
            </p>

            {/* CTAs Row with High Kinetic Energy */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {/* Button: Conocer mi perfil (Neon Emerald Glow) */}
              <button
                onClick={() => scrollToSection('sobre-mi')}
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-xs text-slate-950 bg-[#00F5A0] hover:bg-[#2EE59D] transition-all duration-300 shadow-[0_0_25px_rgba(0,245,160,0.5)] hover:shadow-[0_0_35px_rgba(0,245,160,0.8)] transform hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Conocer mi perfil</span>
                <ArrowDown className="w-4 h-4 text-slate-950 group-hover:translate-y-1 transition-transform" />
              </button>

              {/* Button: Ver CV (Neon Red Glow) */}
              <button
                onClick={() => setCvModalOpen(true)}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#FF2A55]/20 to-[#FF2A55]/10 hover:bg-[#FF2A55]/30 border border-[#FF2A55]/60 hover:border-[#FF2A55] transition-all duration-300 shadow-[0_0_20px_rgba(255,42,85,0.25)] hover:shadow-[0_0_30px_rgba(255,42,85,0.6)] transform hover:-translate-y-1 active:scale-95 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#FF2A55] group-hover:scale-110 transition-transform" />
                <span>Ver CV</span>
              </button>

              {/* Button: Área privada */}
              <button
                onClick={() => navigateTo('/app')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs text-[#A9B8C8] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <Lock className="w-3.5 h-3.5 text-[#F5C96A]" />
                <span>Área privada</span>
              </button>
            </div>
          </div>

          {/* Monogram / Kinetic Sculpture Column */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center">
              {/* Luminous Pulsing Halos */}
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00F5A0]/25 via-[#FF2A55]/25 to-transparent blur-3xl animate-pulse-glow pointer-events-none"
                aria-hidden="true"
              />

              {/* Multi-layered Vivid Orbital Rings */}
              <div
                className="absolute inset-2 rounded-full border-2 border-[#00F5A0]/30 shadow-[0_0_20px_rgba(0,245,160,0.3)] animate-orbital pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute inset-8 rounded-full border-2 border-dashed border-[#FF2A55]/40 shadow-[0_0_20px_rgba(255,42,85,0.3)] pointer-events-none"
                style={{ animation: 'slow-orbital 18s reverse infinite' }}
                aria-hidden="true"
              />

              {/* Levitation Monogram Box with Hover Tilt */}
              <div className="relative z-10 w-52 h-52 sm:w-60 sm:h-60 rounded-3xl bg-[#102436]/80 backdrop-blur-2xl border-2 border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(0,245,160,0.3)] flex flex-col justify-between p-6 overflow-hidden group hover:border-[#00F5A0] hover:shadow-[0_0_45px_rgba(0,245,160,0.5)] transition-all duration-500 animate-float-gentle">
                {/* Luminous corner light reflection */}
                <div
                  className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-gradient-to-br from-[#00F5A0]/30 via-[#FF2A55]/20 to-transparent blur-xl pointer-events-none"
                  aria-hidden="true"
                />

                <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-[#A9B8C8]">
                  <span className="group-hover:text-[#00F5A0] transition-colors">MONOGRAMA</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00F5A0] shadow-[0_0_10px_#00F5A0] animate-ping" />
                </div>

                {/* Monogram Initials with Radiant Gradient */}
                <div className="my-auto text-center transform group-hover:scale-105 transition-transform">
                  <span className="font-display text-6xl sm:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-[#00F5A0] via-white to-[#FF2A55] drop-shadow-[0_0_20px_rgba(0,245,160,0.4)]">
                    LJ
                  </span>
                </div>

                <div className="text-[11px] font-semibold text-[#A9B8C8] border-t border-white/15 pt-2 flex items-center justify-between">
                  <span className="text-white">Illescas, Toledo</span>
                  <span className="text-[10px] text-[#00F5A0] font-mono font-bold bg-[#00F5A0]/10 px-1.5 py-0.5 rounded border border-[#00F5A0]/30">
                    &le; 20 km
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator: Explorar perfil with bouncing cursor */}
        <div className="mt-14 sm:mt-18 pt-6 border-t border-white/10 flex justify-center">
          <button
            onClick={() => scrollToSection('sobre-mi')}
            className="group flex flex-col items-center gap-2 text-xs font-semibold text-[#A9B8C8] hover:text-[#00F5A0] transition-colors cursor-pointer"
          >
            <span className="group-hover:tracking-wider transition-all">Explorar perfil</span>
            <div className="w-5 h-9 rounded-full border-2 border-white/20 flex justify-center p-1 group-hover:border-[#00F5A0] group-hover:shadow-[0_0_15px_rgba(0,245,160,0.5)] transition-all">
              <div className="w-1.5 h-2.5 rounded-full bg-[#00F5A0] shadow-[0_0_8px_#00F5A0] animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
