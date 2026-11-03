import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Mail, Download, Edit3, Clock, AlertCircle } from 'lucide-react';

export const DocumentsView: React.FC = () => {
  const { drafts, offers, setPreparingOffer, setCvModalOpen, showToast } = useApp();

  const draftList = Object.values(drafts);

  const handleExportPlaceholder = () => {
    showToast('Demostración: exportación pendiente de conexión', 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Documentos y borradores preparados
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Modelos de CV y cartas de presentación guardadas para postulaciones de demostración.
        </p>
      </div>

      {/* Main Base Documents */}
      <div className="bg-white p-6 rounded-xl border border-[#E2DFD8] shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-[#F0EEE8] pb-2">
          Currículum base (Formato ATS estándar)
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#FAF9F5] rounded-xl border border-[#EDE9E1]">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-[#1E3A4B]/10 text-[#1E3A4B] rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                CV Oficial — Laura Jiménez López
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Estructura compatible ATS con formación y experiencia exclusiva en Encuadernación Novo.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCvModalOpen(true)}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#1E3A4B] bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Ver documento
            </button>
            <button
              onClick={handleExportPlaceholder}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1E3A4B] rounded-lg hover:bg-[#152B38]"
            >
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Application Drafts */}
      <div className="bg-white p-6 rounded-xl border border-[#E2DFD8] shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-[#F0EEE8] pb-2 flex items-center justify-between">
          <span>Borradores de cartas y candidaturas adaptadas ({draftList.length})</span>
          <span className="text-[10px] text-slate-400 font-normal">
            Guardados en localStorage
          </span>
        </h2>

        {draftList.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center">
            Aún no has guardado borradores de cartas. Puedes preparar una candidatura desde el buscador o el dashboard.
          </p>
        ) : (
          <div className="space-y-3">
            {draftList.map((draft) => {
              const matchedOffer = offers.find((o) => o.id === draft.offerId);

              return (
                <div
                  key={draft.offerId}
                  className="p-4 rounded-xl border border-[#EDE9E1] bg-[#FAF9F5] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-amber-100 text-amber-800 rounded-lg shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          {draft.offerTitle}
                        </span>
                        <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-mono">
                          Tono: {draft.tone}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Empresa: {draft.companyName} · Destinatario: {draft.recipient}
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{draft.lastUpdated}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {matchedOffer && (
                      <button
                        onClick={() => setPreparingOffer(matchedOffer)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#1E3A4B] rounded-lg hover:bg-[#152B38]"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Editar borrador</span>
                      </button>
                    )}
                    <button
                      onClick={handleExportPlaceholder}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                    >
                      Exportar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
