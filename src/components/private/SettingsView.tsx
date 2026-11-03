import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, RotateCcw, ShieldCheck, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { resetAllDemoData } = useApp();
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-150">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Configuración y estado de la demostración
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Parámetros de la maqueta navegable y hoja de ruta de implementación.
        </p>
      </div>

      {/* Fase actual vs Fase futura */}
      <div className="bg-white p-6 rounded-xl border border-[#E2DFD8] shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-[#F0EEE8] pb-2 flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#1E3A4B]" />
          <span>Estado del proyecto y arquitectura modular</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
            <h3 className="font-bold text-emerald-950 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Fase 1: Entregada en esta maqueta</span>
            </h3>
            <ul className="space-y-1.5 text-emerald-900">
              <li>· Portfolio público responsive y accesible en /</li>
              <li>· Zona privada con acceso simulado en /app</li>
              <li>· Datos contrastados de Laura sin inventar información</li>
              <li>· Formulario de perfil y preferencias persistentes en localStorage</li>
              <li>· Buscador de ofertas DEMO con filtro comarcal estricto (&lt;= 20 km)</li>
              <li>· Sistema de afinidad transparente y explicable (30-20-20-15-15)</li>
              <li>· Adaptador de CV y generador de cartas en 3 tonos</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span>Fase 2: Prevista para integración técnica real</span>
            </h3>
            <ul className="space-y-1.5 text-slate-600">
              <li>· Autenticación real de usuaria (Firebase / OAuth)</li>
              <li>· Conexión real con APIs de portales de empleo (InfoJobs, Indeed)</li>
              <li>· Búsqueda viva de ofertas en tiempo real</li>
              <li>· Conexión server-side con Gemini API para redacción asistida</li>
              <li>· Generación de ficheros binarios reales en PDF y DOCX</li>
              <li>· Aplicación nativa Android o PWA instalable con notificaciones</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Restablecimiento de demostración */}
      <div className="bg-white p-6 rounded-xl border border-[#E2DFD8] shadow-xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900 border-b border-[#F0EEE8] pb-2">
          Restablecer datos de la demostración
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Si has editado el perfil, añadido o eliminado puestos o modificado cartas y deseas volver al estado inicial exacto de Laura Jiménez López, pulsa el botón siguiente.
        </p>

        {resetConfirmOpen ? (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-3">
            <p className="text-xs text-amber-900 font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              ¿Confirmas el restablecimiento de los datos de localStorage?
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  resetAllDemoData();
                  setResetConfirmOpen(false);
                }}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Sí, restablecer todo
              </button>
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setResetConfirmOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer valores originales de Laura</span>
          </button>
        )}
      </div>
    </div>
  );
};
