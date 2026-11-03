import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileSearch,
  CheckCircle2,
  FileText,
  Bookmark,
  Sparkles,
  MapPin,
  Clock,
  Briefcase,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  History,
  FileCheck
} from 'lucide-react';
import { RECENT_ACTIVITIES_DEMO } from '../../data/mockData';

export const DashboardView: React.FC = () => {
  const {
    offers,
    savedOfferIds,
    toggleSaveOffer,
    setAnalyzingOffer,
    setPreparingOffer,
    navigateTo,
    candidacies,
    drafts
  } = useApp();

  const bestMatch = offers[0]; // 82% affinity
  const compatibleOffersCount = offers.filter((o) => o.affinity.totalScore >= 65).length;
  const preparedDocsCount = Object.keys(drafts).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Welcome Header */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Buenos días, Laura.
          </h1>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded">
            DATOS DE DEMOSTRACIÓN
          </span>
        </div>
        <p className="text-sm sm:text-base text-slate-600">
          Organiza tu búsqueda de empleo y prepara tus candidaturas.
        </p>
      </div>

      {/* KPI Cards Row with DEMO tags */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E2DFD8] shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Ofertas analizadas</span>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
              DEMO
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#1E3A4B] tabular-nums">
            {offers.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            En entorno La Sagra y comarca
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E2DFD8] shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Ofertas compatibles</span>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
              DEMO
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#2F524A] tabular-nums">
            {compatibleOffersCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Afinidad orientativa &ge; 65%
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E2DFD8] shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Documentos preparados</span>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
              DEMO
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 tabular-nums">
            {preparedDocsCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Borrador de carta y CV adaptado
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E2DFD8] shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Candidaturas guardadas</span>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
              DEMO
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 tabular-nums">
            {savedOfferIds.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            En seguimiento de demostración
          </p>
        </div>
      </div>

      {/* Sección: Recomendación de demostración */}
      <div className="bg-white rounded-xl border border-[#E2DFD8] shadow-xs overflow-hidden">
        {/* Banner header */}
        <div className="bg-gradient-to-r from-[#1E3A4B] to-[#2A4E63] text-white px-6 py-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
              Recomendación de demostración
            </h2>
          </div>
          <span className="bg-white/20 text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
            OFERTA DEMO · NO ES UNA OFERTA REAL
          </span>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                <span className="font-semibold text-slate-800">{bestMatch.company}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {bestMatch.location} ({bestMatch.distanceKm} km aprox.)
                </span>
                <span>·</span>
                <span>{bestMatch.publishedDate}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {bestMatch.title}
              </h3>
            </div>

            {/* Affinity Score Box */}
            <div className="flex items-center gap-3 bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EDE9E1] shrink-0">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-[#1E3A4B] tabular-nums">
                  {bestMatch.affinity.totalScore}%
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Afinidad
                </div>
              </div>
              <div className="border-l border-slate-300 pl-3 text-xs text-slate-600 max-w-[210px]">
                <p className="font-medium text-slate-800">Coincidencia orientativa alta</p>
                <p className="text-[11px] text-slate-500">
                  Basada en tus funciones en Encuadernación Novo y titulación
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed mb-6">
            {bestMatch.description}
          </p>

          {/* Quick unboxed attributes */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600 pb-6 border-b border-[#F0EEE8]">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#1E3A4B]" />
              <span className="font-medium">{bestMatch.schedule}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#1E3A4B]" />
              <span className="font-medium">Modalidad {bestMatch.modality}</span>
            </div>
            <div>
              <span>Contrato: <strong className="font-medium text-slate-800">{bestMatch.contractType}</strong></span>
            </div>
            <div>
              <span>Salario: <strong className="font-medium text-slate-700">{bestMatch.salary}</strong></span>
            </div>
            <div>
              <span>Fuente: <strong className="font-medium text-slate-500">{bestMatch.source}</strong></span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => navigateTo(`/app/ofertas/${bestMatch.id}`)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-[#FAF9F5] hover:bg-[#F0EEE8] border border-slate-300 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A4B]"
              >
                Ver análisis
              </button>
              <button
                onClick={() => setPreparingOffer(bestMatch)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1E3A4B] hover:bg-[#152B38] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A4B]"
              >
                Preparar candidatura
              </button>
            </div>

            <button
              onClick={() => toggleSaveOffer(bestMatch.id)}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-[#1E3A4B] p-2"
            >
              <Bookmark
                className={`w-4 h-4 ${
                  savedOfferIds.includes(bestMatch.id) ? 'fill-[#1E3A4B] text-[#1E3A4B]' : ''
                }`}
              />
              <span>
                {savedOfferIds.includes(bestMatch.id) ? 'Guardada' : 'Guardar oferta'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Sección: Actividad reciente (datos ficticios claramente marcados) */}
      <div className="bg-white p-6 rounded-xl border border-[#E2DFD8] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#F0EEE8] pb-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-[#1E3A4B]" />
            <h2 className="text-sm font-bold text-slate-900">
              Actividad reciente (Simulación DEMO)
            </h2>
          </div>
          <span className="text-[10px] text-slate-400">
            Registro cronológico simulado
          </span>
        </div>

        <div className="space-y-3">
          {RECENT_ACTIVITIES_DEMO.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF9F5] border border-[#EDE9E1] text-xs"
            >
              <div className="w-2 h-2 rounded-full bg-[#1E3A4B] mt-1.5 shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-slate-800">{activity.title}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-xl border border-[#E2DFD8] shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Explora las {offers.length} ofertas DEMO con filtros de distancia
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Compara requisitos, revisa por qué algunas quedan fuera de los 20 km y prepara tus documentos.
          </p>
        </div>
        <button
          onClick={() => navigateTo('/app/ofertas')}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#1E3A4B] hover:bg-[#FAF9F5] border border-slate-300 rounded-lg transition-colors shrink-0"
        >
          <span>Ir a Buscar ofertas</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
