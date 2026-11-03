import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Compass, Calendar, Navigation, CheckCircle2, Radio, Sparkles, Clock, Car } from 'lucide-react';

export const AvailabilitySection: React.FC = () => {
  const { preferences } = useApp();
  const [selectedTown, setSelectedTown] = useState<string>('Illescas');

  const nearbyTowns = [
    { name: 'Illescas', km: 0, time: '0 min', inRange: true, type: 'Punto de partida' },
    { name: 'Yuncos', km: 4, time: '6 min', inRange: true, type: 'Polígono Villa de Yuncos' },
    { name: 'Ugena', km: 5, time: '7 min', inRange: true, type: 'Zona industrial' },
    { name: 'Numancia', km: 6, time: '8 min', inRange: true, type: 'Acceso directo A-42' },
    { name: 'Cedillo', km: 9, time: '11 min', inRange: true, type: 'Polígono La Sagra' },
    { name: 'Esquivias / Seseña', km: 14, time: '16 min', inRange: true, type: 'Eje logístico' },
    { name: 'Parla (Sur Madrid)', km: 16, time: '18 min', inRange: true, type: 'Límite comarcal' }
  ];

  const currentTown = nearbyTowns.find(t => t.name === selectedTown) || nearbyTowns[0];

  return (
    <section id="disponibilidad" className="py-20 sm:py-28 border-b border-white/10 relative overflow-hidden">
      {/* Background kinetic ambient halos */}
      <div
        className="absolute top-1/4 right-1/4 w-88 h-88 rounded-full bg-[#00F5A0]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#FF2A55]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F5A0]/10 border border-[#00F5A0]/30 text-[11px] font-mono font-bold tracking-widest text-[#00F5A0] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00F5A0] shadow-[0_0_8px_#00F5A0] animate-ping" />
            <span className="text-[13px]">05 · CONDICIONES Y PREFERENCIAS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-1">
            Disponibilidad laboral
          </h2>
          <p className="text-xs sm:text-sm text-[#A9B8C8] mt-2">
            Condiciones de búsqueda acordadas, radio de acción en La Sagra y vehículo propio para traslados.
          </p>
        </div>

        {/* Featured Card: Disponible para nuevas oportunidades */}
        <div className="bg-[#122234]/85 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] overflow-hidden relative group hover:border-[#00F5A0]/60 transition-all duration-300">
          {/* Subtle top ambient glow */}
          <div
            className="absolute -top-24 right-0 w-80 h-80 rounded-full bg-gradient-to-bl from-[#00F5A0]/20 via-[#FF2A55]/15 to-transparent blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            {/* Title with glowing beacon */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3.5">
                <div className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5A0] opacity-80" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#00F5A0] shadow-[0_0_12px_#00F5A0]" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  Disponible para nuevas oportunidades
                </h3>
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F5A0] bg-[#00F5A0]/15 border border-[#00F5A0]/50 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,245,160,0.3)] animate-pulse">
                INCORPORACIÓN INMEDIATA
              </span>
            </div>

            {/* 4 Cards Grid with vivid colors and micro-animations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* Location */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00F5A0]/70 hover:shadow-[0_0_25px_rgba(0,245,160,0.25)] transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-2 text-[#00F5A0] font-bold text-xs uppercase tracking-wider mb-2">
                  <MapPin className="w-4 h-4 text-[#00F5A0]" />
                  <span>Ubicación y radio preferente</span>
                </div>
                <p className="text-base font-extrabold text-white">
                  {preferences.referenceLocation}, Toledo
                </p>
                <p className="text-xs text-[#A9B8C8] mt-1">
                  Radio máximo aproximado de <strong className="text-[#00F5A0]">{preferences.maxRadiusKm} km</strong> (Comarca de La Sagra)
                </p>
              </div>

              {/* Modality */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF2A55]/70 hover:shadow-[0_0_25px_rgba(255,42,85,0.25)] transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-2 text-[#FF2A55] font-bold text-xs uppercase tracking-wider mb-2">
                  <Compass className="w-4 h-4 text-[#FF2A55]" />
                  <span>Modalidad de trabajo</span>
                </div>
                <p className="text-base font-extrabold text-white">
                  Presencial o Híbrida
                </p>
                <p className="text-xs text-[#A9B8C8] mt-1">
                  Flexibilidad para centro de trabajo físico o fórmula combinada
                </p>
              </div>

              {/* Schedule */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00F5A0]/70 hover:shadow-[0_0_25px_rgba(0,245,160,0.25)] transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-2 text-[#00F5A0] font-bold text-xs uppercase tracking-wider mb-2">
                  <Calendar className="w-4 h-4 text-[#00F5A0]" />
                  <span>Preferencia horaria</span>
                </div>
                <p className="text-base font-extrabold text-white">
                  Jornada continua o Jornada parcial
                </p>
                <p className="text-xs text-[#A9B8C8] mt-1">
                  Interés en turnos intensivos de mañana o media jornada
                </p>
              </div>

              {/* Status */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF2A55]/70 hover:shadow-[0_0_25px_rgba(255,42,85,0.25)] transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-2 text-[#FF2A55] font-bold text-xs uppercase tracking-wider mb-2">
                  <Navigation className="w-4 h-4 text-[#FF2A55]" />
                  <span>Situación y movilidad</span>
                </div>
                <p className="text-base font-extrabold text-white">
                  Búsqueda activa de empleo
                </p>
                <p className="text-xs text-[#A9B8C8] mt-1">
                  Desempleada · <strong className="text-white">Permiso B y coche propio</strong>
                </p>
              </div>
            </div>

            {/* Interactive Kinetic Radar & Commute Explorer */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0B1522] border border-white/15 text-xs text-[#A9B8C8] shadow-inner">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2 text-[#00F5A0] font-mono font-bold text-xs">
                  <Car className="w-4 h-4" />
                  <span>EXPLORADOR INTERACTIVO DE MOVILIDAD (RADIO &le; 20 KM)</span>
                </div>
                <span className="text-[11px] text-white/70">
                  Haz clic en un municipio para comprobar cobertura
                </span>
              </div>

              {/* Interactive Town Chips with Movement */}
              <div className="flex flex-wrap gap-2 mb-5">
                {nearbyTowns.map((town) => {
                  const isSelected = selectedTown === town.name;
                  return (
                    <button
                      key={town.name}
                      onClick={() => setSelectedTown(town.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#00F5A0] text-slate-950 shadow-[0_0_20px_rgba(0,245,160,0.6)] scale-105'
                          : 'bg-white/6 text-white hover:bg-white/10 hover:border-[#00F5A0]/40 border border-white/10'
                      }`}
                    >
                      <span>{town.name}</span>
                      <span className={`text-[10px] font-mono ${isSelected ? 'text-slate-900' : 'text-[#A9B8C8]'}`}>
                        ({town.km} km)
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Town Dynamic Card with Electric Neon Bar */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white text-sm">{currentTown.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00F5A0]/15 text-[#00F5A0] border border-[#00F5A0]/30 font-bold">
                      DENTRO DEL RADIO DE 20 KM
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A9B8C8]">
                    {currentTown.type} · Desplazamiento estimado en coche propio: <strong className="text-white">{currentTown.time}</strong>
                  </p>
                </div>

                <div className="w-full sm:w-48">
                  <div className="flex justify-between text-[10px] font-mono mb-1 text-white/80">
                    <span>{currentTown.km} km</span>
                    <span>Máx 20 km</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-[#00F5A0] to-[#FF2A55] rounded-full shadow-[0_0_10px_rgba(0,245,160,0.8)] transition-all duration-500"
                      style={{ width: `${Math.max(10, Math.min(100, (currentTown.km / 20) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
