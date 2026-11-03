import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Briefcase,
  Bookmark,
  CheckCircle2,
  HelpCircle,
  XCircle,
  AlertTriangle,
  Info,
  Layers,
  Sparkles,
  Send
} from 'lucide-react';

export const OfferDetailView: React.FC = () => {
  const {
    offers,
    selectedOfferId,
    navigateTo,
    savedOfferIds,
    toggleSaveOffer,
    setPreparingOffer
  } = useApp();

  const offer = offers.find((o) => o.id === selectedOfferId) || offers[0];
  const isSaved = savedOfferIds.includes(offer.id);

  const matchedReqs = offer.detailedRequirements.filter((r) => r.status === 'matched');
  const unknownReqs = offer.detailedRequirements.filter((r) => r.status === 'unknown');
  const unmatchedReqs = offer.detailedRequirements.filter((r) => r.status === 'unmatched');

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-150">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigateTo('/app/ofertas')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1E3A4B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al buscador de ofertas</span>
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl border border-[#E2DFD8] shadow-xs overflow-hidden">
        {/* Top Tag Bar */}
        <div className="bg-[#FAF9F5] border-b border-[#E2DFD8] px-6 py-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
            OFERTA DEMO · DATOS FICTICIOS · FUENTE NO CONECTADA
          </span>
          <span className="text-xs text-slate-500 font-mono">
            ID: {offer.id}
          </span>
        </div>

        {/* Offer Summary Header */}
        <div className="p-6 sm:p-8 border-b border-[#F0EEE8]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span className="font-bold text-slate-800">{offer.company}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {offer.location} ({offer.distanceKm} km aprox.)
                </span>
                <span>·</span>
                <span>{offer.publishedDate}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {offer.title}
              </h1>
            </div>

            {/* Affinity Gauge */}
            <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#EDE9E1] flex items-center gap-3 shrink-0">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-[#1E3A4B] tabular-nums">
                  {offer.affinity.totalScore}%
                </div>
                <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">
                  Afinidad orientativa
                </div>
              </div>
              <div className="border-l border-slate-300 pl-3 max-w-[200px] text-xs">
                <span className="font-semibold text-slate-800 block">Estimación DEMO</span>
                <span className="text-[11px] text-slate-500">
                  {offer.affinity.cappedDueToMandatory
                    ? 'Limitada al 60% por requisito obligatorio no verificado'
                    : 'Basada en funciones contrastadas de Laura'}
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed mb-6">
            {offer.description}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#1E3A4B]" />
              <span>{offer.schedule}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#1E3A4B]" />
              <span>Modalidad {offer.modality}</span>
            </div>
            <span>·</span>
            <span>Contrato: <strong className="font-medium text-slate-800">{offer.contractType}</strong></span>
            <span>·</span>
            <span>Salario: <strong className="font-medium text-slate-600">{offer.salary}</strong></span>
          </div>
        </div>

        {/* Explainable Affinity Section */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#1E3A4B]" />
            <h2 className="text-base font-bold text-slate-900">
              Análisis de afinidad explicable
            </h2>
          </div>

          {/* Mandatory Disclaimer */}
          <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-200 text-blue-950 text-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Aviso metodológico:</strong> La afinidad es una estimación basada en los datos disponibles en esta maqueta. No representa una probabilidad de contratación ni garantiza una entrevista.
            </p>
          </div>

          {/* 5-Factor Formula breakdown */}
          <div className="space-y-3 bg-[#FAF9F5] p-5 rounded-xl border border-[#EDE9E1] text-xs">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Fórmula de ponderación de demostración (Puntuación máxima: 100 puntos)
            </h3>

            <div>
              <div className="flex justify-between font-medium mb-1 text-slate-700">
                <span>1. Experiencia y funciones relacionadas (Máx. 30 puntos)</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {offer.affinity.experienceScore} / 30
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#1E3A4B] h-full rounded-full transition-all duration-300"
                  style={{ width: `${(offer.affinity.experienceScore / 30) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium mb-1 text-slate-700">
                <span>2. Formación oficial acreditada (Máx. 20 puntos)</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {offer.affinity.educationScore} / 20
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#1E3A4B] h-full rounded-full transition-all duration-300"
                  style={{ width: `${(offer.affinity.educationScore / 20) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium mb-1 text-slate-700">
                <span>3. Ubicación y distancia geográfica (Máx. 20 puntos)</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {offer.affinity.locationScore} / 20
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#1E3A4B] h-full rounded-full transition-all duration-300"
                  style={{ width: `${(offer.affinity.locationScore / 20) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium mb-1 text-slate-700">
                <span>4. Modalidad y jornada preferente (Máx. 15 puntos)</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {offer.affinity.modalityScheduleScore} / 15
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#1E3A4B] h-full rounded-full transition-all duration-300"
                  style={{ width: `${(offer.affinity.modalityScheduleScore / 15) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium mb-1 text-slate-700">
                <span>5. Requisitos obligatorios confirmados (Máx. 15 puntos)</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {offer.affinity.mandatoryReqScore} / 15
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#1E3A4B] h-full rounded-full transition-all duration-300"
                  style={{ width: `${(offer.affinity.mandatoryReqScore / 15) * 100}%` }}
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-600 pt-2 border-t border-slate-200">
              {offer.affinity.explanation}
            </p>
          </div>

          {/* Categorized Requirements Detail */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Detalle individual de requisitos
            </h3>

            {/* Matched */}
            {matchedReqs.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Requisitos coincidentes ({matchedReqs.length})</span>
                </span>
                <div className="space-y-1.5">
                  {matchedReqs.map((req, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-emerald-950">{req.text}</strong>
                        <span className="text-[10px] text-emerald-800 font-medium">
                          {req.isMandatory ? 'Obligatorio' : 'Deseable'}
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-900 mt-0.5">{req.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Unknown */}
            {unknownReqs.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                  <span>Requisitos desconocidos / no confirmados ({unknownReqs.length})</span>
                </span>
                <div className="space-y-1.5">
                  {unknownReqs.map((req, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-amber-950">{req.text}</strong>
                        <span className="text-[10px] text-amber-800 font-medium">
                          {req.isMandatory ? 'Obligatorio' : 'Deseable'} · Estado: Desconocido
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-900 mt-0.5">{req.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Unmatched */}
            {unmatchedReqs.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-red-800 uppercase tracking-wider flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5 text-red-600" />
                  <span>Requisitos no coincidentes ({unmatchedReqs.length})</span>
                </span>
                <div className="space-y-1.5">
                  {unmatchedReqs.map((req, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-red-50/60 border border-red-200 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-red-950">{req.text}</strong>
                        <span className="text-[10px] text-red-800 font-medium">
                          {req.isMandatory ? 'Obligatorio' : 'Deseable'}
                        </span>
                      </div>
                      <p className="text-[11px] text-red-900 mt-0.5">{req.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-[#F0EEE8] flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => toggleSaveOffer(offer.id)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#1E3A4B] px-3 py-2 rounded-lg border border-slate-300"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#1E3A4B] text-[#1E3A4B]' : ''}`} />
              <span>{isSaved ? 'Oferta guardada' : 'Guardar oferta'}</span>
            </button>

            <button
              onClick={() => setPreparingOffer(offer)}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#1E3A4B] hover:bg-[#152B38] rounded-lg transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Preparar candidatura con esta oferta</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
