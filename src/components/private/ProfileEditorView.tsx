import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Save, RotateCcw, AlertCircle, ShieldCheck, CheckCircle2, HelpCircle } from 'lucide-react';
import { LauraProfile } from '../../types';

export const ProfileEditorView: React.FC = () => {
  const { profile, updateProfile, restoreDemoProfile } = useApp();
  const [formData, setFormData] = useState<LauraProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Calculate pending fields count
  const pendingFields = [
    { name: 'Teléfono', val: formData.phone },
    { name: 'Correo electrónico', val: formData.email },
    { name: 'Denominación exacta del puesto', val: formData.exactRoleTitle },
    { name: 'Fechas de experiencia', val: formData.experienceDates },
    { name: 'Centros de formación', val: formData.trainingCenters },
    { name: 'Herramientas informáticas concretas', val: formData.softwareTools },
    { name: 'Idiomas', val: formData.languages },
    { name: 'Formación complementaria', val: formData.additionalTraining },
    { name: 'Fecha de disponibilidad', val: formData.availabilityDate },
    { name: 'Salario deseado', val: formData.desiredSalary }
  ];

  const pendingCount = pendingFields.filter((f) => !f.val || f.val.trim() === '').length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleRestore = () => {
    restoreDemoProfile();
    // Re-sync local state with default initial profile
    const saved = localStorage.getItem('laura_profile_demo');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  };

  const updateDuty = (index: number, val: string) => {
    const newDuties = [...formData.experience.confirmedDuties];
    newDuties[index] = val;
    setFormData({
      ...formData,
      experience: { ...formData.experience, confirmedDuties: newDuties }
    });
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-150">
      {/* Title & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Mi perfil profesional
            </h1>
            <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
              ÁREA PRIVADA
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Formulario privado de datos para preparar candidaturas. Los cambios se guardan localmente en tu navegador.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleRestore}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-[#FAF9F5] hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Restaurar datos de demostración</span>
          </button>

          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#1E3A4B] hover:bg-[#152B38] rounded-lg transition-all shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Guardar perfil</span>
          </button>
        </div>
      </div>

      {/* Confirmation Alert */}
      {savedSuccess && (
        <div
          role="status"
          className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 font-medium animate-in fade-in duration-150"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Perfil guardado correctamente en localStorage para esta demostración.</span>
        </div>
      )}

      {/* Indicator of Pending Fields */}
      <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-900">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Indicador de campos pendientes:</strong> Tienes {pendingCount} campos por completar (opcionales para la demostración).
          </span>
        </div>
        <span className="text-[11px] font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded">
          {pendingCount} pendientes
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sección 1: Datos Personales y de Contacto */}
        <div className="bg-white p-6 rounded-xl border border-[#E2DFD8] shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-[#F0EEE8] pb-2 flex items-center justify-between">
            <span>Datos personales y de contacto</span>
            <span className="text-[10px] text-slate-400 font-normal">
              Solo para uso interno en candidaturas
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nombre completo (confirmado)
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A4B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Localidad de residencia (confirmada)
              </label>
              <input
                type="text"
                value={formData.publicLocation}
                onChange={(e) => setFormData({ ...formData, publicLocation: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A4B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Teléfono de contacto
                {!formData.phone && (
                  <span className="text-[10px] text-amber-700 ml-1.5 font-normal">[campo pendiente]</span>
                )}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="[añadir información]"
                className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A4B]"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                No confirmado en los datos iniciales. Pendiente de completar por Laura.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Correo electrónico privado
                {!formData.email && (
                  <span className="text-[10px] text-amber-700 ml-1.5 font-normal">[campo pendiente]</span>
                )}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="[añadir información]"
                className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A4B]"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                No confirmado en los datos iniciales. Pendiente de completar por Laura.
              </p>
            </div>
          </div>
        </div>

        {/* Sección 2: Experiencia y Puesto */}
        <div className="bg-white p-6 rounded-xl border border-[#E2DFD8] shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-[#F0EEE8] pb-2">
            Experiencia: Encuadernación Novo
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Empresa (confirmada)
              </label>
              <input
                type="text"
                value={formData.experience.company}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience: { ...formData.experience, company: e.target.value }
                  })
                }
                className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Denominación exacta del puesto oficial
                {!formData.exactRoleTitle && (
                  <span className="text-[10px] text-amber-700 ml-1.5 font-normal">[campo pendiente]</span>
                )}
              </label>
              <input
                type="text"
                value={formData.exactRoleTitle}
                onChange={(e) => setFormData({ ...formData, exactRoleTitle: e.target.value })}
                placeholder="[añadir información]"
                className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-slate-300 rounded-lg"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                No confirmado en datos iniciales. Se confirmará cuando Laura lo indique.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Fechas de experiencia (periodo en Encuadernación Novo)
                {!formData.experienceDates && (
                  <span className="text-[10px] text-amber-700 ml-1.5 font-normal">[campo pendiente]</span>
                )}
              </label>
              <input
                type="text"
                value={formData.experienceDates}
                onChange={(e) => setFormData({ ...formData, experienceDates: e.target.value })}
                placeholder="[añadir información]"
                className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Descripción provisional a confirmar
              </label>
              <input
                type="text"
                value={formData.provisionalRoleDescription}
                onChange={(e) =>
                  setFormData({ ...formData, provisionalRoleDescription: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Funciones confirmadas de Laura (editables en el borrador)
            </label>
            <div className="space-y-2">
              {formData.experience.confirmedDuties.map((duty, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={duty}
                  onChange={(e) => updateDuty(idx, e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-slate-300 rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sección 3: Formación y Centros */}
        <div className="bg-white p-6 rounded-xl border border-[#E2DFD8] shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-[#F0EEE8] pb-2">
            Formación y centros de estudio
          </h2>

          <div className="space-y-3">
            <div className="p-3 bg-[#FAF9F5] rounded-lg border border-slate-200 text-xs">
              <span className="font-bold text-slate-800">1. Título de Educación Secundaria Obligatoria, E.S.O. (Confirmado)</span>
            </div>
            <div className="p-3 bg-[#FAF9F5] rounded-lg border border-slate-200 text-xs">
              <span className="font-bold text-slate-800">2. Título de Técnico en Gestión Administrativa (Confirmado)</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Centros de formación y años de titulación
                {!formData.trainingCenters && (
                  <span className="text-[10px] text-amber-700 ml-1.5 font-normal">[campo pendiente]</span>
                )}
              </label>
              <input
                type="text"
                value={formData.trainingCenters}
                onChange={(e) => setFormData({ ...formData, trainingCenters: e.target.value })}
                placeholder="[añadir información]"
                className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-slate-300 rounded-lg"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Pendiente de completar por Laura. No inventar institutos o escuelas.
              </p>
            </div>
          </div>
        </div>

        {/* Sección 4: Herramientas, Idiomas y Salario Deseado */}
        <div className="bg-white p-6 rounded-xl border border-[#E2DFD8] shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-[#F0EEE8] pb-2">
            Herramientas informáticas, idiomas y condiciones deseadas
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Herramientas informáticas concretas
                {!formData.softwareTools && (
                  <span className="text-[10px] text-amber-700 ml-1.5 font-normal">[campo pendiente]</span>
                )}
              </label>
              <input
                type="text"
                value={formData.softwareTools}
                onChange={(e) => setFormData({ ...formData, softwareTools: e.target.value })}
                placeholder="[añadir información]"
                className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-slate-300 rounded-lg"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Confirmado: Informática nivel usuario. Puedes concretar ERP, Excel, Factusol, etc.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Idiomas acreditados
                {!formData.languages && (
                  <span className="text-[10px] text-amber-700 ml-1.5 font-normal">[campo pendiente]</span>
                )}
              </label>
              <input
                type="text"
                value={formData.languages}
                onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                placeholder="[añadir información]"
                className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-slate-300 rounded-lg"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                No constan idiomas acreditados en la información inicial confirmada.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Formación complementaria / Cursos
                {!formData.additionalTraining && (
                  <span className="text-[10px] text-amber-700 ml-1.5 font-normal">[campo pendiente]</span>
                )}
              </label>
              <input
                type="text"
                value={formData.additionalTraining}
                onChange={(e) => setFormData({ ...formData, additionalTraining: e.target.value })}
                placeholder="[añadir información]"
                className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Fecha prevista de disponibilidad
                {!formData.availabilityDate && (
                  <span className="text-[10px] text-amber-700 ml-1.5 font-normal">[campo pendiente]</span>
                )}
              </label>
              <input
                type="text"
                value={formData.availabilityDate}
                onChange={(e) => setFormData({ ...formData, availabilityDate: e.target.value })}
                placeholder="[añadir información]"
                className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-slate-300 rounded-lg"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Salario deseado orientativo
                {!formData.desiredSalary && (
                  <span className="text-[10px] text-amber-700 ml-1.5 font-normal">[campo pendiente]</span>
                )}
              </label>
              <input
                type="text"
                value={formData.desiredSalary}
                onChange={(e) => setFormData({ ...formData, desiredSalary: e.target.value })}
                placeholder="[añadir información]"
                className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleRestore}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Restaurar datos de demostración</span>
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#1E3A4B] hover:bg-[#152B38] rounded-lg transition-all shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Guardar perfil</span>
          </button>
        </div>
      </form>
    </div>
  );
};
