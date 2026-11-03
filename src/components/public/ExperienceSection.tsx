import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Briefcase, CheckCircle2, ChevronDown, ChevronUp, Info, Sparkles, Building, Layers } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { profile } = useApp();
  const { company, confirmedDuties, provisionalRoleNote } = profile.experience;
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'orders' | 'relations' | 'warehouse'>('all');

  const getFilteredDuties = () => {
    if (selectedFilter === 'orders') {
      return confirmedDuties.filter(d => d.toLowerCase().includes('órdenes') || d.toLowerCase().includes('ordenes'));
    }
    if (selectedFilter === 'relations') {
      return confirmedDuties.filter(d => d.toLowerCase().includes('clientes') || d.toLowerCase().includes('proveedores'));
    }
    if (selectedFilter === 'warehouse') {
      return confirmedDuties.filter(d => d.toLowerCase().includes('stock') || d.toLowerCase().includes('almacén') || d.toLowerCase().includes('almacen'));
    }
    return confirmedDuties;
  };

  const filteredDuties = getFilteredDuties();

  return (
    <section id="experiencia" className="py-20 sm:py-28 border-b border-white/10 relative overflow-hidden">
      {/* Background kinetic ambient halos */}
      <div
        className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-[#00F5A0]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-[#FF2A55]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F5A0]/10 border border-[#00F5A0]/30 text-[11px] font-mono font-bold tracking-widest text-[#00F5A0] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00F5A0] shadow-[0_0_8px_#00F5A0] animate-ping" />
            <span className="text-[13px]">02 · TRAYECTORIA PROFESIONAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-1">
            Experiencia laboral
          </h2>
          <p className="text-xs sm:text-sm text-[#A9B8C8] mt-2">
            Trayectoria contrastada en entorno productivo, seguimiento de órdenes y gestión documental.
          </p>
        </div>

        {/* Luminous Kinetic Timeline Container */}
        <div className="relative pl-6 sm:pl-10 ml-2 sm:ml-4">
          {/* Luminous vertical line with intense neon emerald-to-red gradient */}
          <div
            className="absolute left-0 top-3 bottom-0 w-[3px] bg-gradient-to-b from-[#00F5A0] via-[#00F5A0]/60 to-[#FF2A55]/40 shadow-[0_0_15px_rgba(0,245,160,0.6)]"
            aria-hidden="true"
          />

          {/* Glowing Animated Timeline Node with Dual Radar Waves */}
          <div
            className="absolute -left-[11px] top-1.5 w-6 h-6 rounded-full bg-[#0B1020] border-2 border-[#00F5A0] shadow-[0_0_20px_rgba(0,245,160,0.9)] flex items-center justify-center cursor-pointer group"
            aria-hidden="true"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#00F5A0] animate-ping" />
          </div>

          {/* Timeline Experience Card */}
          <div className="bg-[#122234]/85 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.6)] hover:border-[#00F5A0]/60 hover:shadow-[0_0_35px_rgba(0,245,160,0.25)] transition-all duration-300">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#00F5A0]/20 to-[#00F5A0]/5 border border-[#00F5A0]/40 text-[#00F5A0] shadow-[0_0_15px_rgba(0,245,160,0.3)] transform group-hover:scale-105 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white flex items-center gap-2">
                    <span>{company}</span>
                    <span className="text-[10px] font-mono font-bold text-[#00F5A0] bg-[#00F5A0]/15 border border-[#00F5A0]/40 px-2 py-0.5 rounded-full">
                      EMPRESA CONFIRMADA
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A9B8C8] italic mt-0.5">
                    {provisionalRoleNote}
                  </p>
                </div>
              </div>

              {/* Discreet notice: dates and exact title pending */}
              <div className="inline-flex items-center gap-2 text-xs text-[#FF2A55] bg-[#FF2A55]/10 border border-[#FF2A55]/30 px-3.5 py-1.5 rounded-xl shadow-[0_0_15px_rgba(255,42,85,0.15)]">
                <Info className="w-4 h-4 shrink-0 text-[#FF2A55]" />
                <span className="font-medium">Fechas y denominación exacta pendientes de completar</span>
              </div>
            </div>

            {/* Interactive Filter Pills for Duties */}
            <div className="my-5 p-3 rounded-2xl bg-white/4 border border-white/8 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-mono text-[#A9B8C8] uppercase tracking-wider mr-1">
                  Filtrar área:
                </span>
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    selectedFilter === 'all'
                      ? 'bg-[#00F5A0] text-slate-950 shadow-[0_0_15px_rgba(0,245,160,0.5)] font-bold'
                      : 'text-[#A9B8C8] hover:text-white hover:bg-white/10'
                  }`}
                >
                  Todas ({confirmedDuties.length})
                </button>
                <button
                  onClick={() => setSelectedFilter('orders')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    selectedFilter === 'orders'
                      ? 'bg-[#00F5A0] text-slate-950 shadow-[0_0_15px_rgba(0,245,160,0.5)] font-bold'
                      : 'text-[#A9B8C8] hover:text-white hover:bg-white/10'
                  }`}
                >
                  Órdenes
                </button>
                <button
                  onClick={() => setSelectedFilter('relations')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    selectedFilter === 'relations'
                      ? 'bg-[#FF2A55] text-white shadow-[0_0_15px_rgba(255,42,85,0.5)] font-bold'
                      : 'text-[#A9B8C8] hover:text-white hover:bg-white/10'
                  }`}
                >
                  Clientes & Proveedores
                </button>
                <button
                  onClick={() => setSelectedFilter('warehouse')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    selectedFilter === 'warehouse'
                      ? 'bg-[#00F5A0] text-slate-950 shadow-[0_0_15px_rgba(0,245,160,0.5)] font-bold'
                      : 'text-[#A9B8C8] hover:text-white hover:bg-white/10'
                  }`}
                >
                  Stock & Almacén
                </button>
              </div>

              {/* Toggle expand */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1.5 text-xs font-bold text-[#00F5A0] hover:text-white transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-white/5"
              >
                <span>{isExpanded ? 'Contraer' : 'Expandir'}</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {/* Confirmed duties list with responsive kinetic hover cards */}
            {isExpanded && (
              <div className="space-y-3 pt-1 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-xs text-[#A9B8C8] mb-2 font-mono">
                  <span>FUNCIONES CONFIRMADAS ({filteredDuties.length})</span>
                  <span className="text-[#00F5A0] font-bold">100% VALIDADAS</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {filteredDuties.map((duty, idx) => {
                    const isClientOrProv = duty.toLowerCase().includes('clientes') || duty.toLowerCase().includes('proveedores');
                    const badgeColor = isClientOrProv
                      ? 'text-[#FF2A55] bg-[#FF2A55]/15 border-[#FF2A55]/30'
                      : 'text-[#00F5A0] bg-[#00F5A0]/15 border-[#00F5A0]/30';
                    const hoverShadow = isClientOrProv
                      ? 'hover:border-[#FF2A55]/70 hover:shadow-[0_0_25px_rgba(255,42,85,0.3)]'
                      : 'hover:border-[#00F5A0]/70 hover:shadow-[0_0_25px_rgba(0,245,160,0.3)]';

                    return (
                      <div
                        key={idx}
                        className={`group flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 ${hoverShadow} hover:bg-white/8 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01]`}
                      >
                        <div className={`w-6 h-6 rounded-lg ${badgeColor} border flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform`}>
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs sm:text-sm font-semibold text-white/95 group-hover:text-white transition-colors">
                            {duty}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
