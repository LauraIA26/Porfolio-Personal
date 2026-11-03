import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Download, Printer, AlertCircle, Check } from 'lucide-react';

export const CVModal: React.FC = () => {
  const { cvModalOpen, setCvModalOpen, profile, showToast } = useApp();
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  if (!cvModalOpen) return null;

  const handleDownload = () => {
    setDownloadNotice('Demostración: exportación pendiente de conexión');
    showToast('Demostración: exportación pendiente de conexión', 'info');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative bg-white w-full max-w-3xl rounded-xl shadow-2xl border border-slate-300 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Top modal header bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 bg-[#FAF9F5]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A4B]">
              Vista limpia de currículum
            </span>
            <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
              Estructura ATS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-200 rounded-md transition-colors"
              title="Imprimir vista de CV"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#1E3A4B] hover:bg-[#152B38] rounded-md transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar CV</span>
            </button>
            <button
              onClick={() => setCvModalOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md transition-colors ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A4B]"
              aria-label="Cerrar vista de CV"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {downloadNotice && (
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-2 text-xs text-amber-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{downloadNotice}</span>
            </div>
            <button
              onClick={() => setDownloadNotice(null)}
              className="text-amber-800 hover:text-amber-950 font-semibold"
            >
              Entendido
            </button>
          </div>
        )}

        {/* ATS Document Canvas */}
        <div className="p-8 sm:p-12 overflow-y-auto bg-white font-sans text-slate-900 selection:bg-slate-200">
          {/* Header */}
          <div className="border-b-2 border-slate-800 pb-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 uppercase mb-1">
              {profile.fullName}
            </h1>
            <p className="text-sm font-semibold text-slate-700 mb-2">
              {profile.provisionalTitle} <span className="text-xs font-normal text-slate-500">(titular provisional a confirmar)</span>
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
              <span>{profile.publicLocation}</span>
              <span>·</span>
              <span>{profile.currentStatus}</span>
              <span>·</span>
              <span className="italic text-slate-500">[Teléfono: añadir información en área privada]</span>
              <span>·</span>
              <span className="italic text-slate-500">[Correo: añadir información en área privada]</span>
            </div>
          </div>

          {/* Extracto / Perfil Profesional */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-2">
              Perfil Profesional
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {profile.aboutText}
            </p>
          </div>

          {/* Experiencia Laboral */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-2">
              Experiencia Laboral
            </h2>
            <div className="mb-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                <span className="text-sm font-bold text-slate-900">
                  {profile.experience.company}
                </span>
                <span className="text-xs text-slate-500 italic">
                  [Fechas: información pendiente de completar]
                </span>
              </div>
              <p className="text-xs text-slate-600 italic mb-2">
                Puesto: [Denominación exacta pendiente de completar] — {profile.experience.provisionalRoleNote}
              </p>
              <p className="text-xs font-semibold text-slate-700 mb-1">Funciones contrastadas desempeñadas:</p>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 pl-1">
                {profile.experience.confirmedDuties.map((duty, i) => (
                  <li key={i}>{duty}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Formación Académica */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-2">
              Formación Académica
            </h2>
            <div className="space-y-2">
              {profile.education.map((edu) => (
                <div key={edu.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{edu.title}</span>
                    <span className="text-slate-500 block sm:inline sm:ml-2">({edu.level})</span>
                  </div>
                  <span className="text-slate-400 italic">
                    [Centro y año pendientes de confirmar]
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Competencias y Datos Adicionales */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-2">
              Competencias y Recursos Adicionales
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 text-xs text-slate-700">
              {profile.competencies.map((comp, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
