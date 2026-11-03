import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const CVSection: React.FC = () => {
  const { setCvModalOpen } = useApp();

  return (
    <section className="py-20 sm:py-28 border-b border-white/10 relative overflow-hidden">
      {/* Background kinetic ambient halos */}
      <div
        className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-[#00F5A0]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#FF2A55]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-r from-[#0C1B2A] via-[#122438] to-[#0C1B2A] border-2 border-[#00F5A0]/40 rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,245,160,0.2)] group hover:border-[#00F5A0] hover:shadow-[0_0_50px_rgba(0,245,160,0.4)] transition-all duration-500">
          {/* Luminous energy reflections */}
          <div
            className="absolute top-0 right-1/3 w-80 h-80 rounded-full bg-[#00F5A0]/15 blur-3xl pointer-events-none animate-pulse-glow"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-[#FF2A55]/15 blur-3xl pointer-events-none animate-pulse-glow"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00F5A0]/15 border border-[#00F5A0]/50 text-xs font-mono font-bold uppercase tracking-widest text-[#00F5A0] shadow-[0_0_15px_rgba(0,245,160,0.3)]">
              <span className="w-2 h-2 rounded-full bg-[#00F5A0] animate-ping" />
              <span>DOCUMENTO PROFESIONAL ATS</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Un perfil preparado para <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5A0] to-[#FF2A55]">avanzar</span>.
            </h2>

            <p className="text-sm sm:text-base text-[#A9B8C8] leading-relaxed">
              Consulta el currículum estandarizado con la trayectoria contrastada en Encuadernación Novo, formación reglada oficial y disponibilidad inmediata.
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setCvModalOpen(true)}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs text-slate-950 bg-[#00F5A0] hover:bg-[#2EE59D] transition-all duration-300 shadow-[0_0_35px_rgba(0,245,160,0.6)] hover:shadow-[0_0_50px_rgba(0,245,160,0.9)] transform hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-slate-950" />
                <span>Ver currículum</span>
                <ArrowUpRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>

            <p className="text-[11px] text-[#A9B8C8] pt-1">
              Formato optimizado para lectura y previsualización sin datos inventados
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
