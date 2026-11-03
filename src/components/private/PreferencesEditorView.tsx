import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WorkPreferences } from '../../types';
import { Save, Plus, X, MapPin, Check, Info, ShieldCheck, RotateCcw } from 'lucide-react';
import { INITIAL_PREFERENCES } from '../../data/mockData';

export const PreferencesEditorView: React.FC = () => {
  const { preferences, updatePreferences, showToast } = useApp();
  const [prefs, setPrefs] = useState<WorkPreferences>(preferences);
  const [newRoleInput, setNewRoleInput] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleAddRole = () => {
    if (newRoleInput.trim() && !prefs.targetRoles.includes(newRoleInput.trim())) {
      setPrefs({
        ...prefs,
        targetRoles: [...prefs.targetRoles, newRoleInput.trim()]
      });
      setNewRoleInput('');
    }
  };

  const handleRemoveRole = (roleToRemove: string) => {
    setPrefs({
      ...prefs,
      targetRoles: prefs.targetRoles.filter((r) => r !== roleToRemove)
    });
  };

  const handleResetDefaults = () => {
    setPrefs(INITIAL_PREFERENCES);
    updatePreferences(INITIAL_PREFERENCES);
    showToast('Preferencias restablecidas a los valores de demostración iniciales', 'info');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences(prefs);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3500);
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Preferencias laborales
            </h1>
            <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
              ÁREA PRIVADA
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Configura los puestos objetivos, radio comarcal de demostración y tipos de jornada.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-[#FAF9F5] hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Valores por defecto</span>
          </button>

          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#1E3A4B] hover:bg-[#152B38] rounded-lg transition-all shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Guardar preferencias</span>
          </button>
        </div>
      </div>

      {savedNotice && (
        <div
          role="status"
          className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 font-medium animate-in fade-in duration-150"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Preferencias actualizadas y guardadas en localStorage para la demostración.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Puestos de interés */}
        <div className="bg-white p-6 rounded-xl border border-[#E2DFD8] shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-[#F0EEE8] pb-2">
            Puestos de interés
          </h2>
          <p className="text-xs text-slate-500">
            Añade o elimina puestos de interés para calcular la afinidad en las ofertas de demostración.
          </p>

          {/* Tag list */}
          <div className="flex flex-wrap gap-2 pt-1">
            {prefs.targetRoles.map((role) => (
              <span
                key={role}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FAF9F5] text-slate-800 border border-slate-300 shadow-2xs"
              >
                <span>{role}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveRole(role)}
                  className="p-0.5 text-slate-400 hover:text-red-600 rounded transition-colors"
                  aria-label={`Eliminar puesto ${role}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>

          {/* Add role input */}
          <div className="flex items-center gap-2 pt-2 max-w-md">
            <input
              type="text"
              value={newRoleInput}
              onChange={(e) => setNewRoleInput(e.target.value)}
              placeholder="Ej. Facturación y cobros..."
              className="px-3 py-2 text-xs bg-[#FAF9F5] border border-slate-300 rounded-lg flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A4B]"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddRole();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddRole}
              className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-[#1E3A4B] bg-[#FAF9F5] hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir</span>
            </button>
          </div>
        </div>

        {/* Ubicación y Radio */}
        <div className="bg-white p-6 rounded-xl border border-[#E2DFD8] shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-[#F0EEE8] pb-2">
            Ubicación y radio comarcal de demostración
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Localidad de referencia
              </label>
              <input
                type="text"
                disabled
                value={prefs.referenceLocation}
                className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-300 rounded-lg text-slate-600 cursor-not-allowed"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Illescas (Toledo) es el punto de partida confirmado de Laura.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Radio máximo preferente: {prefs.maxRadiusKm} km
              </label>
              <input
                type="range"
                min="5"
                max="30"
                step="5"
                value={prefs.maxRadiusKm}
                onChange={(e) =>
                  setPrefs({ ...prefs, maxRadiusKm: parseInt(e.target.value, 10) })
                }
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A4B] mt-2"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>5 km</span>
                <span className="font-bold text-[#1E3A4B]">20 km (Preferente)</span>
                <span>30 km</span>
              </div>
            </div>
          </div>

          {/* Clarification about locations outside <=20km */}
          <div className="bg-amber-50/80 border border-amber-200/80 p-3.5 rounded-lg text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">
                Criterio comarcal de demostración:
              </p>
              <p className="text-amber-800 text-[11px] leading-relaxed">
                El radio se presenta como preferencia orientativa de demostración (no como cálculo geográfico real de tráfico).
                <br />
                Municipios como <strong>Madrid, Toledo capital, Getafe, Parla o Fuenlabrada</strong> superan los 20 km y no forman parte del radio preferente de búsqueda.
              </p>
            </div>
          </div>
        </div>

        {/* Modalidad y Tipo de Jornada */}
        <div className="bg-white p-6 rounded-xl border border-[#E2DFD8] shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-slate-900 border-b border-[#F0EEE8] pb-2">
            Modalidad y jornadas de trabajo
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
                Modalidad de trabajo
              </span>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.modalities.presencial}
                    onChange={(e) =>
                      setPrefs({
                        ...prefs,
                        modalities: { ...prefs.modalities, presencial: e.target.checked }
                      })
                    }
                    className="w-4 h-4 text-[#1E3A4B] rounded accent-[#1E3A4B]"
                  />
                  <span className="font-medium text-slate-800">Presencial (seleccionada por defecto)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.modalities.hibrida}
                    onChange={(e) =>
                      setPrefs({
                        ...prefs,
                        modalities: { ...prefs.modalities, hibrida: e.target.checked }
                      })
                    }
                    className="w-4 h-4 text-[#1E3A4B] rounded accent-[#1E3A4B]"
                  />
                  <span className="font-medium text-slate-800">Híbrida (seleccionada por defecto)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.modalities.remota}
                    onChange={(e) =>
                      setPrefs({
                        ...prefs,
                        modalities: { ...prefs.modalities, remota: e.target.checked }
                      })
                    }
                    className="w-4 h-4 text-[#1E3A4B] rounded accent-[#1E3A4B]"
                  />
                  <span className="text-slate-600">Remota (no seleccionada por defecto)</span>
                </label>
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
                Tipo de jornada
              </span>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.schedules.continua}
                    onChange={(e) =>
                      setPrefs({
                        ...prefs,
                        schedules: { ...prefs.schedules, continua: e.target.checked }
                      })
                    }
                    className="w-4 h-4 text-[#1E3A4B] rounded accent-[#1E3A4B]"
                  />
                  <span className="font-medium text-slate-800">Jornada continua (seleccionada)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.schedules.parcial}
                    onChange={(e) =>
                      setPrefs({
                        ...prefs,
                        schedules: { ...prefs.schedules, parcial: e.target.checked }
                      })
                    }
                    className="w-4 h-4 text-[#1E3A4B] rounded accent-[#1E3A4B]"
                  />
                  <span className="font-medium text-slate-800">Jornada parcial (seleccionada)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.schedules.completa}
                    onChange={(e) =>
                      setPrefs({
                        ...prefs,
                        schedules: { ...prefs.schedules, completa: e.target.checked }
                      })
                    }
                    className="w-4 h-4 text-[#1E3A4B] rounded accent-[#1E3A4B]"
                  />
                  <span className="text-slate-600">Jornada completa (opcional)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.schedules.partida}
                    onChange={(e) =>
                      setPrefs({
                        ...prefs,
                        schedules: { ...prefs.schedules, partida: e.target.checked }
                      })
                    }
                    className="w-4 h-4 text-[#1E3A4B] rounded accent-[#1E3A4B]"
                  />
                  <span className="text-slate-500">Jornada partida (no seleccionada por defecto)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Campos opcionales y vacíos */}
        <div className="bg-white p-6 rounded-xl border border-[#E2DFD8] shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-[#F0EEE8] pb-2">
            Condiciones opcionales (vacías por defecto)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Salario mínimo bruto anual
              </label>
              <input
                type="text"
                value={prefs.minSalary || ''}
                onChange={(e) => setPrefs({ ...prefs, minSalary: e.target.value })}
                placeholder="Opcional (vacío por defecto)"
                className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Fecha de incorporación
              </label>
              <input
                type="text"
                value={prefs.startDate || ''}
                onChange={(e) => setPrefs({ ...prefs, startDate: e.target.value })}
                placeholder="Opcional (ej. Inmediata)"
                className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tipo de contrato preferido
              </label>
              <input
                type="text"
                value={prefs.preferredContractType || ''}
                onChange={(e) => setPrefs({ ...prefs, preferredContractType: e.target.value })}
                placeholder="Opcional (ej. Indefinido)"
                className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#1E3A4B] hover:bg-[#152B38] rounded-lg transition-all shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Guardar preferencias</span>
          </button>
        </div>
      </form>
    </div>
  );
};
