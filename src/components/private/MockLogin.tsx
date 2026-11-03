import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, ArrowLeft, ShieldAlert, KeyRound, Sparkles } from 'lucide-react';

export const MockLogin: React.FC = () => {
  const { loginDemo, navigateTo, showToast } = useApp();
  const [email, setEmail] = useState('laura.demo@ejemplo.es');
  const [password, setPassword] = useState('demostracion123');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginDemo();
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setForgotPasswordOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col justify-center py-12 px-6 sm:px-8">
      <div className="max-w-md w-full mx-auto">
        {/* Back to public portfolio button */}
        <button
          onClick={() => navigateTo('/')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1E3A4B] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al portfolio público</span>
        </button>

        {/* Demo Mode Notice Box */}
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs shadow-2xs">
          <div className="flex items-center gap-2 font-bold mb-1 text-amber-800">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>ACCESO SIMULADO PARA LA MAQUETA</span>
          </div>
          <p className="leading-relaxed font-medium">
            Modo demostración: la autenticación real se añadirá en una fase posterior.
          </p>
          <p className="text-[11px] text-amber-800/80 mt-1">
            Esta pantalla es una simulación visual sin validación de contraseñas reales ni almacenamiento de credenciales.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl border border-[#E2DFD8] p-8 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-[#1E3A4B]/10 text-[#1E3A4B] rounded-xl flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Laura · Asistente de empleo
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Zona privada de organización y búsqueda laboral
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@demo.es"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border border-[#CBD5E1] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A4B]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Contraseña
                </label>
                <a
                  href="#olvido"
                  onClick={handleForgotPassword}
                  className="text-xs text-[#1E3A4B] hover:underline"
                >
                  He olvidado mi contraseña
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F5] border border-[#CBD5E1] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A4B]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#1E3A4B] hover:bg-[#152B38] active:scale-[0.99] rounded-lg transition-all shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A4B] mt-2 flex items-center justify-center gap-2"
            >
              <span>Entrar en la demostración</span>
            </button>
          </form>

          {/* Quick Demo Credentials Autofill */}
          <div className="mt-6 pt-5 border-t border-[#F0EEE8]">
            <p className="text-xs text-slate-500 text-center mb-2.5">
              Credenciales de demostración preconfiguradas:
            </p>
            <div className="bg-[#FAF9F5] p-2.5 rounded-lg border border-[#EDE9E1] text-[11px] text-slate-600 flex items-center justify-between">
              <div>
                <span className="font-mono text-slate-800">laura.demo@ejemplo.es</span> / <span className="font-mono text-slate-800">demostracion123</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEmail('laura.demo@ejemplo.es');
                  setPassword('demostracion123');
                  showToast('Credenciales de demostración cargadas', 'info');
                }}
                className="text-xs font-semibold text-[#1E3A4B] hover:underline ml-2"
              >
                Cargar
              </button>
            </div>
          </div>
        </div>

        {/* Forgot password simulated modal */}
        {forgotPasswordOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          >
            <div className="bg-white rounded-xl max-w-sm w-full p-6 border border-slate-200 shadow-xl">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Restablecer contraseña (DEMO)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                En esta maqueta de demostración no hay servidor de correo conectado. Puedes acceder directamente pulsando el botón «Entrar en la demostración» con cualquier valor.
              </p>
              <button
                onClick={() => setForgotPasswordOpen(false)}
                className="w-full py-2 px-4 text-xs font-semibold text-white bg-[#1E3A4B] rounded-lg hover:bg-[#152B38]"
              >
                Cerrar y continuar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
