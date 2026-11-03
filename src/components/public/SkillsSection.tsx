import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ClipboardList,
  Users,
  Building2,
  Boxes,
  Warehouse,
  FileCheck2,
  Monitor,
  IdCard,
  Car,
  ShieldCheck,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'gestion' | 'relacion' | 'recursos'>('all');

  const bentoSkills = [
    {
      id: 'skill-1',
      title: 'Gestión y seguimiento de órdenes de trabajo',
      desc: 'Supervisión rigurosa de cada encargo desde su recepción técnica hasta la entrega conforme, evitando incidencias.',
      category: 'gestion',
      icon: ClipboardList,
      accent: 'text-[#00F5A0]',
      badgeBg: 'bg-[#00F5A0]/15 text-[#00F5A0] border-[#00F5A0]/40',
      border: 'hover:border-[#00F5A0] hover:shadow-[0_0_35px_rgba(0,245,160,0.35)]',
      span: 'md:col-span-2'
    },
    {
      id: 'skill-2',
      title: 'Atención a clientes',
      desc: 'Trato directo y cercano, resolución de dudas operativas y comunicación continua del estado de sus pedidos.',
      category: 'relacion',
      icon: Users,
      accent: 'text-[#FF2A55]',
      badgeBg: 'bg-[#FF2A55]/15 text-[#FF2A55] border-[#FF2A55]/40',
      border: 'hover:border-[#FF2A55] hover:shadow-[0_0_35px_rgba(255,42,85,0.35)]',
      span: 'md:col-span-1'
    },
    {
      id: 'skill-3',
      title: 'Atención a proveedores',
      desc: 'Interlocución fluida para aprovisionamiento, seguimiento de albaranes y verificación de suministros entregados.',
      category: 'relacion',
      icon: Building2,
      accent: 'text-[#FF2A55]',
      badgeBg: 'bg-[#FF2A55]/15 text-[#FF2A55] border-[#FF2A55]/40',
      border: 'hover:border-[#FF2A55] hover:shadow-[0_0_35px_rgba(255,42,85,0.35)]',
      span: 'md:col-span-1'
    },
    {
      id: 'skill-4',
      title: 'Control de stock y existencias',
      desc: 'Cotejo continuo de inventario físico, registro minucioso de entradas y salidas y prevención de roturas de stock.',
      category: 'gestion',
      icon: Boxes,
      accent: 'text-[#00F5A0]',
      badgeBg: 'bg-[#00F5A0]/15 text-[#00F5A0] border-[#00F5A0]/40',
      border: 'hover:border-[#00F5A0] hover:shadow-[0_0_35px_rgba(0,245,160,0.35)]',
      span: 'md:col-span-1'
    },
    {
      id: 'skill-5',
      title: 'Organización de almacén',
      desc: 'Disposición física ordenada de materiales, paquetería y consumibles facilitando una rápida localización operativa.',
      category: 'gestion',
      icon: Warehouse,
      accent: 'text-[#00F5A0]',
      badgeBg: 'bg-[#00F5A0]/15 text-[#00F5A0] border-[#00F5A0]/40',
      border: 'hover:border-[#00F5A0] hover:shadow-[0_0_35px_rgba(0,245,160,0.35)]',
      span: 'md:col-span-1'
    },
    {
      id: 'skill-6',
      title: 'Gestión administrativa general',
      desc: 'Procedimientos de facturación básica, archivo documental físico e informático y cumplimiento de tareas de oficina.',
      category: 'gestion',
      icon: FileCheck2,
      accent: 'text-[#00F5A0]',
      badgeBg: 'bg-[#00F5A0]/15 text-[#00F5A0] border-[#00F5A0]/40',
      border: 'hover:border-[#00F5A0] hover:shadow-[0_0_35px_rgba(0,245,160,0.35)]',
      span: 'md:col-span-2'
    },
    {
      id: 'skill-7',
      title: 'Informática a nivel de usuario',
      desc: 'Manejo de correo electrónico, herramientas ofimáticas y plataformas digitales de gestión de oficina.',
      category: 'recursos',
      icon: Monitor,
      accent: 'text-[#00F5A0]',
      badgeBg: 'bg-[#00F5A0]/15 text-[#00F5A0] border-[#00F5A0]/40',
      border: 'hover:border-[#00F5A0] hover:shadow-[0_0_35px_rgba(0,245,160,0.35)]',
      span: 'md:col-span-1'
    },
    {
      id: 'skill-8',
      title: 'Permiso de conducir B',
      desc: 'Permiso clase B en vigor para desplazamientos autónomos e inmediatos a centros de trabajo.',
      category: 'recursos',
      icon: IdCard,
      accent: 'text-[#FF2A55]',
      badgeBg: 'bg-[#FF2A55]/15 text-[#FF2A55] border-[#FF2A55]/40',
      border: 'hover:border-[#FF2A55] hover:shadow-[0_0_35px_rgba(255,42,85,0.35)]',
      span: 'md:col-span-1'
    },
    {
      id: 'skill-9',
      title: 'Coche propio',
      desc: 'Vehículo particular disponible para incorporación inmediata y puntual en polígonos comarcales.',
      category: 'recursos',
      icon: Car,
      accent: 'text-[#FF2A55]',
      badgeBg: 'bg-[#FF2A55]/15 text-[#FF2A55] border-[#FF2A55]/40',
      border: 'hover:border-[#FF2A55] hover:shadow-[0_0_35px_rgba(255,42,85,0.35)]',
      span: 'md:col-span-1'
    }
  ];

  const filteredSkills = activeCategory === 'all'
    ? bentoSkills
    : bentoSkills.filter(s => s.category === activeCategory);

  return (
    <section id="competencias" className="py-20 sm:py-28 border-b border-white/10 relative overflow-hidden">
      {/* Background kinetic ambient halos */}
      <div
        className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-[#00F5A0]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#FF2A55]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F5A0]/10 border border-[#00F5A0]/30 text-[11px] font-mono font-bold tracking-widest text-[#00F5A0] uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#00F5A0] shadow-[0_0_8px_#00F5A0] animate-ping" />
              <span className="text-[13px]">04 · CAPACIDADES Y RECURSOS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-1">
              Competencias confirmadas
            </h2>
            <p className="text-xs sm:text-sm text-[#A9B8C8] mt-2 max-w-xl">
              Conjunto de competencias operativas validadas por su experiencia real y acreditaciones oficiales.
            </p>
          </div>

          {/* Interactive Category Selector Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-[#00F5A0] to-[#00d88d] text-slate-950 shadow-[0_0_20px_rgba(0,245,160,0.5)] scale-105'
                  : 'text-[#A9B8C8] hover:text-white hover:bg-white/5'
              }`}
            >
              Todas ({bentoSkills.length})
            </button>
            <button
              onClick={() => setActiveCategory('gestion')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeCategory === 'gestion'
                  ? 'bg-[#00F5A0] text-slate-950 shadow-[0_0_20px_rgba(0,245,160,0.5)] scale-105'
                  : 'text-[#A9B8C8] hover:text-white hover:bg-white/5'
              }`}
            >
              Gestión & Órdenes
            </button>
            <button
              onClick={() => setActiveCategory('relacion')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeCategory === 'relacion'
                  ? 'bg-[#FF2A55] text-white shadow-[0_0_20px_rgba(255,42,85,0.5)] scale-105'
                  : 'text-[#A9B8C8] hover:text-white hover:bg-white/5'
              }`}
            >
              Clientes & Proveedores
            </button>
            <button
              onClick={() => setActiveCategory('recursos')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeCategory === 'recursos'
                  ? 'bg-gradient-to-r from-[#00F5A0] to-[#FF2A55] text-slate-950 shadow-[0_0_20px_rgba(0,245,160,0.5)] scale-105'
                  : 'text-[#A9B8C8] hover:text-white hover:bg-white/5'
              }`}
            >
              Movilidad & Ofimática
            </button>
          </div>
        </div>

        {/* Dynamic Bento Grid with High-Contrast Hover & Kinetic Depth */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {filteredSkills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.id}
                className={`bg-[#122234]/85 backdrop-blur-2xl border border-white/12 rounded-3xl p-6 sm:p-7 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.01] ${skill.span} ${skill.border} flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.5)] group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl ${skill.badgeBg} border flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono tracking-wider text-[#A9B8C8] uppercase bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                      CONFIRMADO
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-white text-lg sm:text-xl mb-2.5 leading-snug group-hover:text-white transition-colors">
                    {skill.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A9B8C8] leading-relaxed">
                    {skill.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#A9B8C8]">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5A0] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F5A0]" />
                    </span>
                    <span className="group-hover:text-white transition-colors">COMPETENCIA ACREDITADA</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#00F5A0]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quality assurance notice */}
        <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/12 flex items-center gap-3.5 text-xs text-[#A9B8C8] backdrop-blur-md">
          <div className="p-2 rounded-xl bg-[#00F5A0]/15 text-[#00F5A0] border border-[#00F5A0]/30 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-white/90">
            Todas las habilidades mostradas corresponden exclusivamente a competencias contrastadas y confirmadas formalmente por Laura Jiménez López.
          </span>
        </div>
      </div>
    </section>
  );
};
