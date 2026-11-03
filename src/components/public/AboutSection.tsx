import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Car, Laptop, Clock, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { profile } = useApp();

  const highlightTags = [
    {
      label: 'Responsable',
      color: 'border-[#00F5A0]/60 text-[#00F5A0] bg-[#00F5A0]/15 shadow-[0_0_15px_rgba(0,245,160,0.25)] hover:shadow-[0_0_25px_rgba(0,245,160,0.5)]'
    },
    {
      label: 'Organizada',
      color: 'border-[#FF2A55]/60 text-[#FF2A55] bg-[#FF2A55]/15 shadow-[0_0_15px_rgba(255,42,85,0.25)] hover:shadow-[0_0_25px_rgba(255,42,85,0.5)]'
    },
    {
      label: 'Atención al detalle',
      color: 'border-[#00F5A0]/60 text-[#00F5A0] bg-[#00F5A0]/15 shadow-[0_0_15px_rgba(0,245,160,0.25)] hover:shadow-[0_0_25px_rgba(0,245,160,0.5)]'
    },
    {
      label: 'Trato con clientes y proveedores',
      color: 'border-[#FF2A55]/60 text-[#FF2A55] bg-[#FF2A55]/15 shadow-[0_0_15px_rgba(255,42,85,0.25)] hover:shadow-[0_0_25px_rgba(255,42,85,0.5)]'
    }
  ];

  return (
    <section id="sobre-mi" className="py-20 sm:py-28 border-b border-white/10 relative overflow-hidden">
      {/* Dynamic ambient energy spot */}
      <div
        className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-[#00F5A0]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Index Marker */}
        <div className="mb-10">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#00F5A0] font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F5A0] shadow-[0_0_8px_#00F5A0] animate-ping" />
            <span>01 · PRESENTACIÓN PROFESIONAL</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
            Sobre mí
          </h2>
        </div>

        {/* 2-Zone Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Zone: Large Editorial Statement */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-[#00F5A0] to-[#FF2A55] leading-[1.12] mb-6 drop-shadow-sm">
              Organización para que cada tarea avance.
            </h3>

            <p className="text-sm text-[#A9B8C8] leading-relaxed mb-8">
              Enfocada en la gestión de procesos diarios, el registro metódico de órdenes de trabajo y la comunicación continua con proveedores y clientes en la comarca de La Sagra.
            </p>

            {/* Micro-Badges Row with Hover Lift & Glow */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {highlightTags.map((t, idx) => (
                <span
                  key={idx}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-default ${t.color}`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right Zone: Translucent Card with Narrative & Confirmed Attributes */}
          <div className="lg:col-span-7">
            <div className="bg-[#122234]/80 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-[#00F5A0]/50 hover:shadow-[0_0_35px_rgba(0,245,160,0.2)] transition-all duration-500 space-y-6">
              {/* Narrative Text */}
              <div className="space-y-4 text-sm sm:text-base text-[#F5F7FA]/95 leading-relaxed">
                <p>
                  {profile.aboutText}
                </p>
                <p className="text-[#A9B8C8] text-sm">
                  En mi labor diaria priorizo el método, la puntualidad y la claridad de la información. Mi compromiso es facilitar el flujo de trabajo tanto en oficina técnica como en almacén, garantizando que cada encargo cuente con la documentación y el seguimiento adecuados.
                </p>
              </div>

              {/* Confirmed essentials row inside glass card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t border-white/10 text-xs">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00F5A0]/60 hover:shadow-[0_0_20px_rgba(0,245,160,0.2)] transition-all transform hover:-translate-y-0.5">
                  <div className="flex items-center gap-2 text-[#00F5A0] font-bold mb-1">
                    <Laptop className="w-4 h-4 text-[#00F5A0]" />
                    <span>Ofimática</span>
                  </div>
                  <p className="text-[#A9B8C8] text-[11px] leading-snug">
                    {profile.itLevel} (gestión documental, correo y ofimática)
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF2A55]/60 hover:shadow-[0_0_20px_rgba(255,42,85,0.2)] transition-all transform hover:-translate-y-0.5">
                  <div className="flex items-center gap-2 text-[#FF2A55] font-bold mb-1">
                    <Car className="w-4 h-4 text-[#FF2A55]" />
                    <span>Movilidad</span>
                  </div>
                  <p className="text-[#A9B8C8] text-[11px] leading-snug">
                    Permiso de conducir B y coche propio para desplazamientos
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00F5A0]/60 hover:shadow-[0_0_20px_rgba(0,245,160,0.2)] transition-all transform hover:-translate-y-0.5">
                  <div className="flex items-center gap-2 text-[#00F5A0] font-bold mb-1">
                    <Clock className="w-4 h-4 text-[#00F5A0]" />
                    <span>Situación</span>
                  </div>
                  <p className="text-[#A9B8C8] text-[11px] leading-snug">
                    Búsqueda activa e incorporación disponible
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
