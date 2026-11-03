import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  CheckCircle2,
  HelpCircle,
  XCircle,
  AlertTriangle,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';

export const AffinityAnalysisModal: React.FC = () => {
  const { analyzingOffer, setAnalyzingOffer, setPreparingOffer } = useApp();

  if (!analyzingOffer) return null;

  const { affinity, detailedRequirements } = analyzingOffer;

  const matchedReqs = detailedRequirements.filter((r) => r.status === 'matched');
  const unknownReqs = detailedRequirements.filter((r) => r.status === 'unknown');
  const unmatchedReqs = detailedRequirements.filter((r) => r.status === 'unmatched');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="affinity-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-slate-300 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#FAF9F5]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                DEMOSTRACIÓN EXPLICABLE
              </span>
              <span className="text-xs text-slate-500">
                Oferta #{analyzingOffer.id}
              </span>
            </div>
            <h2 id="affinity-modal-title" className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              Desglose de afinidad: {analyzingOffer.title}
            </h2>
          </div>

          <button
            onClick={() => setAnalyzingOffer(null)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A4B]"
            aria-label="Cerrar análisis de afinidad"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Main Score & Mandated Disclaimer */}
          <div className="bg-[#FAF9F5] p-5 rounded-xl border border-[#EDE9E1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#1E3A4B] tabular-nums">
                  {affinity.totalScore}%
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Índice de afinidad
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-1 font-medium">
                {affinity.explanation}
              </p>
              {affinity.cappedDueToMandatory && (
                <div className="mt-2 text-xs font-semibold text-amber-800 bg-amber-100 p-2 rounded flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-700" />
                  <span>
                    Regla de seguridad: Puntuación limitada al 60% por falta de acreditación en un requisito obligatorio.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Mandated Explicit Disclaimer Note */}
          <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-200 text-blue-950 text-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Aviso metodológico:</strong> Esta puntuación indica el grado de coincidencia entre la información disponible de tu perfil y los datos de esta oferta DEMO. No representa una probabilidad de contratación.
            </p>
          </div>

          {/* Transparent Formula Breakdown */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#1E3A4B]" />
              <span>Fórmula de ponderación visible (Base 100%)</span>
            </h3>

            <div className="space-y-2.5 bg-white p-4 rounded-xl border border-slate-200">
              {/* Factor 1: Exp */}
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>1. Experiencia y funciones relacionadas (Máx. 30%)</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {affinity.experienceScore} / 30
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1E3A4B] h-full rounded-full transition-all duration-300"
                    style={{ width: `${(affinity.experienceScore / 30) * 100}%` }}
                  />
                </div>
              </div>

              {/* Factor 2: Edu */}
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>2. Formación oficial acreditada (Máx. 20%)</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {affinity.educationScore} / 20
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1E3A4B] h-full rounded-full transition-all duration-300"
                    style={{ width: `${(affinity.educationScore / 20) * 100}%` }}
                  />
                </div>
              </div>

              {/* Factor 3: Location */}
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>3. Distancia y ubicación geográfica (Máx. 20%)</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {affinity.locationScore} / 20
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1E3A4B] h-full rounded-full transition-all duration-300"
                    style={{ width: `${(affinity.locationScore / 20) * 100}%` }}
                  />
                </div>
              </div>

              {/* Factor 4: Modality/Schedule */}
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>4. Modalidad y adecuación de jornada (Máx. 15%)</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {affinity.modalityScheduleScore} / 15
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1E3A4B] h-full rounded-full transition-all duration-300"
                    style={{ width: `${(affinity.modalityScheduleScore / 15) * 100}%` }}
                  />
                </div>
              </div>

              {/* Factor 5: Mandatory */}
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>5. Requisitos obligatorios confirmados (Máx. 15%)</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {affinity.mandatoryReqScore} / 15
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1E3A4B] h-full rounded-full transition-all duration-300"
                    style={{ width: `${(affinity.mandatoryReqScore / 15) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Categorized Requirements Detail */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Análisis individual de requisitos
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
                  <span>Requisitos no confirmados / Desconocidos ({unknownReqs.length})</span>
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
                  <span>Requisitos que no coinciden ({unmatchedReqs.length})</span>
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
        </div>

        {/* Footer Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-200 bg-[#FAF9F5]">
          <button
            onClick={() => setAnalyzingOffer(null)}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900"
          >
            Cerrar análisis
          </button>

          <button
            onClick={() => {
              const current = analyzingOffer;
              setAnalyzingOffer(null);
              setPreparingOffer(current);
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1E3A4B] hover:bg-[#152B38] rounded-lg transition-colors"
          >
            Preparar candidatura con esta oferta
          </button>
        </div>
      </div>
    </div>
  );
};
