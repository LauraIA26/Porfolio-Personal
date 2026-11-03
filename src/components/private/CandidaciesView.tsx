import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CandidacyItem, CandidacyStatus } from '../../types';
import {
  FileSpreadsheet,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Save,
  X
} from 'lucide-react';

const ALL_STATUSES: CandidacyStatus[] = [
  'Guardada',
  'Pendiente de revisar',
  'Documentos preparados',
  'Candidatura enviada manualmente',
  'En proceso',
  'Entrevista',
  'Finalizada'
];

export const CandidaciesView: React.FC = () => {
  const { candidacies, updateCandidacy, deleteCandidacy, navigateTo, showToast } = useApp();
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [editingItem, setEditingItem] = useState<CandidacyItem | null>(null);

  const filteredCandidacies = candidacies.filter((item) => {
    if (selectedStatusFilter === 'all') return true;
    return item.status === selectedStatusFilter;
  });

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateCandidacy({
        ...editingItem,
        lastUpdated: `Modificado hoy (${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })})`
      });
      setEditingItem(null);
    }
  };

  const getStatusBadge = (status: CandidacyStatus) => {
    switch (status) {
      case 'Guardada':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'Pendiente de revisar':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Documentos preparados':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Candidatura enviada manualmente':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'En proceso':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Entrevista':
        return 'bg-teal-50 text-teal-800 border-teal-300 font-bold';
      case 'Finalizada':
        return 'bg-slate-200 text-slate-800 border-slate-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-150">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Mis candidaturas (Seguimiento DEMO)
          </h1>
          <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded">
            ANOTACIONES MANUALES
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Registra tus postulaciones manuales, notas de contacto y fases del proceso. Esta maqueta no envía candidaturas automáticamente.
        </p>
      </div>

      {/* Filter Tabs by Status */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setSelectedStatusFilter('all')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
            selectedStatusFilter === 'all'
              ? 'bg-[#1E3A4B] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Todas ({candidacies.length})
        </button>
        {ALL_STATUSES.map((status) => {
          const count = candidacies.filter((c) => c.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setSelectedStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedStatusFilter === status
                  ? 'bg-[#1E3A4B] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {status} {count > 0 && `(${count})`}
            </button>
          );
        })}
      </div>

      {/* Candidacies List */}
      {filteredCandidacies.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-[#E2DFD8] shadow-xs">
          <FileSpreadsheet className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">
            No hay candidaturas con el estado «{selectedStatusFilter}»
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            Puedes cambiar el filtro o guardar nuevas ofertas desde el buscador.
          </p>
          <button
            onClick={() => setSelectedStatusFilter('all')}
            className="px-4 py-2 text-xs font-semibold text-[#1E3A4B] bg-[#FAF9F5] border border-slate-300 rounded-lg hover:bg-slate-100"
          >
            Ver todas las candidaturas
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCandidacies.map((cand) => (
            <div
              key={cand.id}
              className="bg-white rounded-xl border border-[#E2DFD8] p-5 shadow-xs hover:border-[#1E3A4B]/40 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getStatusBadge(
                      cand.status
                    )}`}
                  >
                    {cand.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-700">
                    {cand.companyName}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {cand.location}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {cand.offerTitle}
                </h3>

                {/* Notes box */}
                <div className="bg-[#FAF9F5] p-3 rounded-lg border border-[#EDE9E1] text-xs text-slate-700">
                  <span className="font-semibold text-slate-800 block mb-0.5">Notas de Laura:</span>
                  <p className="leading-relaxed">
                    {cand.notes || 'Sin anotaciones registradas todavía.'}
                  </p>
                  {cand.manualLink && (
                    <div className="mt-2 pt-2 border-t border-slate-200 flex items-center gap-1.5 text-[#1E3A4B]">
                      <ExternalLink className="w-3 h-3" />
                      <a
                        href={cand.manualLink}
                        target="_blank"
                        rel="noreferrer"
                        className="underline text-[11px] truncate max-w-xs"
                      >
                        {cand.manualLink}
                      </a>
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Última actualización: {cand.lastUpdated}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex sm:flex-col items-center gap-2 shrink-0 pt-2 sm:pt-0">
                <button
                  onClick={() => setEditingItem(cand)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-[#FAF9F5] hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Editar</span>
                </button>

                <button
                  onClick={() => deleteCandidacy(cand.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                  title="Eliminar candidatura DEMO"
                  aria-label={`Eliminar candidatura ${cand.offerTitle}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Editar seguimiento: {editingItem.offerTitle}
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Estado de la candidatura
                </label>
                <select
                  value={editingItem.status}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      status: e.target.value as CandidacyStatus
                    })
                  }
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-slate-300 rounded-lg font-medium"
                >
                  {ALL_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Nota: «Candidatura enviada manualmente» solo refleja tu anotación personal tras realizar el envío fuera de la plataforma.
                </p>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Notas personales y seguimiento
                </label>
                <textarea
                  rows={4}
                  value={editingItem.notes}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, notes: e.target.value })
                  }
                  placeholder="Ej. Entregado CV en mano, llamada pendiente para el viernes..."
                  className="w-full p-3 bg-[#FAF9F5] border border-slate-300 rounded-lg leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Enlace manual de referencia (opcional)
                </label>
                <input
                  type="url"
                  value={editingItem.manualLink}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, manualLink: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#1E3A4B] hover:bg-[#152B38] rounded-lg"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar cambios</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
