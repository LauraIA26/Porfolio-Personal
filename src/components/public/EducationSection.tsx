import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Award, HelpCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { profile } = useApp();

  const educationDetails = [
    {
      id: 'edu-1',
      title: 'Título de Educación Secundaria Obligatoria, E.S.O.',
      level: 'Educación Secundaria Obligatoria',
      icon: GraduationCap,
      badge: 'TITULACIÓN BASE',
      accentColor: 'text-[#00F5A0]',
      bgGlow: 'from-[#00F5A0]/20 to-transparent',
      borderColor: 'border-[#00F5A0]/40',
      borderHover: 'hover:border-[#00F5A0] hover:shadow-[0_0_40px_rgba(0,245,160,0.35)]',
      iconBg: 'bg-[#00F5A0]/15 text-[#00F5A0] border-[#00F5A0]/40',
      desc: 'Formación de base acreditada con competencias de aprendizaje, cálculo numérico, expresión escrita y resolución de problemas.'
    },
    {
      id: 'edu-2',
      title: 'Título de Técnico en Gestión Administrativa',
      level: 'Formación Profesional (Grado Medio)',
      icon: Award,
      badge: 'ESPECIALIZACIÓN TÉCNICA',
      accentColor: 'text-[#FF2A55]',
      bgGlow: 'from-[#FF2A55]/20 to-transparent',
      borderColor: 'border-[#FF2A55]/40',
      borderHover: 'hover:border-[#FF2A55] hover:shadow-[0_0_40px_rgba(255,42,85,0.35)]',
      iconBg: 'bg-[#FF2A55]/15 text-[#FF2A55] border-[#FF2A55]/40',
      desc: 'Cualificación oficial para operaciones administrativas comerciales, apoyo contable, aprovisionamiento, facturación básica y archivo.'
    }
  ];

  return (
    <section id="formacion" className="py-20 sm:py-28 border-b border-white/10 relative overflow-hidden">
      {/* Background kinetic ambient halos */}
      <div
        className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-[#00F5A0]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#FF2A55]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F5A0]/10 border border-[#00F5A0]/30 text-[11px] font-mono font-bold tracking-widest text-[#00F5A0] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00F5A0] shadow-[0_0_8px_#00F5A0] animate-ping" />
            <span className="text-[13px]">03 · ESTUDIOS Y TITULACIONES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-1">
            Formación académica
          </h2>
          <p className="text-xs sm:text-sm text-[#A9B8C8] mt-2">
            Titulaciones oficiales regladas confirmadas formalmente por Laura.
          </p>
        </div>

        {/* Bento Cards Grid with High Kinetic Hover State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {educationDetails.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`group relative bg-[#122234]/85 backdrop-blur-2xl border ${item.borderColor} rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.01] ${item.borderHover} shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden`}
              >
                {/* Subtle top decorative corner gradient glow */}
                <div
                  className={`absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br ${item.bgGlow} blur-2xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity`}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3.5 rounded-2xl border ${item.iconBg} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${item.iconBg}`}>
                      {item.badge}
                    </span>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-[#A9B8C8] block mb-1.5">
                    {item.level}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/90 transition-all">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#A9B8C8] mt-3.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Footer disclaimer: Center and dates pending */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#A9B8C8] relative z-10">
                  <span className="italic text-[11px] text-white/70">
                    Centro y año pendientes de completar
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-[#00F5A0]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00F5A0]" />
                    <span>OFICIAL</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
