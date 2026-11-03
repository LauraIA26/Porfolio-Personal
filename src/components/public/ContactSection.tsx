import React, { useState } from 'react';
import { Send, AlertCircle, ShieldAlert, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  const quickSubjects = [
    'Puesto administrativo en Illescas',
    'Gestión de almacén y pedidos',
    'Atención a clientes y proveedores',
    'Oferta jornada continua / parcial'
  ];

  const handleApplyPreset = (preset: string) => {
    setFormData(prev => ({
      ...prev,
      mensaje: prev.mensaje ? `${prev.mensaje} · Interés en: ${preset}` : `Hola Laura, te escribimos en relación a: ${preset}.`
    }));
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.nombre.trim()) {
      errs.nombre = 'Por favor, introduce tu nombre o empresa.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Por favor, introduce un correo electrónico de contacto.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Introduce un formato de correo electrónico válido (ejemplo@empresa.es).';
    }
    if (!formData.mensaje.trim()) {
      errs.mensaje = 'Por favor, escribe un breve mensaje.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setDemoNotice('Demostración: el formulario todavía no está conectado.');
      setFormData({ nombre: '', email: '', mensaje: '' });
      setErrors({});
    }
  };

  return (
    <section id="contacto" className="py-20 sm:py-28 border-b border-white/10 relative overflow-hidden">
      {/* Background kinetic ambient halos */}
      <div
        className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-[#00F5A0]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-[#FF2A55]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Section Header with Strong Visual Contrast */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F5A0]/10 border border-[#00F5A0]/30 text-[11px] font-mono font-bold tracking-widest text-[#00F5A0] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00F5A0] shadow-[0_0_8px_#00F5A0] animate-ping" />
            <span>06 · COMUNICACIÓN DIRECTA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white mt-2 tracking-tight">
            ¿Hablamos de una <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5A0] via-white to-[#FF2A55]">oportunidad</span>?
          </h2>
          <p className="text-sm text-[#A9B8C8] mt-3 max-w-lg mx-auto">
            Abierta a propuestas presenciales o híbridas en Illescas y comarca de La Sagra.
          </p>
        </div>

        {/* Demo feedback banner */}
        {demoNotice && (
          <div
            role="status"
            className="mb-8 p-4 rounded-2xl bg-[#122234] border-2 border-[#FF2A55] text-white text-xs flex items-start gap-3 shadow-[0_0_30px_rgba(255,42,85,0.3)] animate-in fade-in duration-150"
          >
            <ShieldAlert className="w-5 h-5 text-[#FF2A55] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-extrabold text-white text-sm">{demoNotice}</p>
              <p className="text-[#A9B8C8] text-xs mt-1 leading-relaxed">
                Los datos introducidos no han sido enviados por correo. Para una contratación real se utilizarán los canales profesionales directos.
              </p>
            </div>
          </div>
        )}

        {/* Translucent Dark Form with Luminous Focus Borders and Interactive Movement */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-[#122234]/85 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] relative overflow-hidden group hover:border-[#00F5A0]/50 transition-all duration-300"
        >
          {/* Subtle decorative glow */}
          <div
            className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-[#00F5A0]/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="space-y-6 relative z-10">
            {/* Quick Presets for fast typing */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#A9B8C8] mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#00F5A0]" />
                <span>Asuntos habituales (clic para añadir al mensaje):</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {quickSubjects.map((sub, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleApplyPreset(sub)}
                    className="px-3 py-1 rounded-xl text-xs bg-white/6 hover:bg-[#00F5A0]/20 text-[#A9B8C8] hover:text-[#00F5A0] border border-white/10 hover:border-[#00F5A0]/40 transition-all duration-200 cursor-pointer transform hover:scale-105 active:scale-95"
                  >
                    + {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Nombre */}
            <div>
              <label
                htmlFor="nombre"
                className="block text-xs font-bold uppercase tracking-wider text-[#A9B8C8] mb-2"
              >
                Tu nombre o empresa <span className="text-[#FF2A55] font-black">*</span>
              </label>
              <input
                id="nombre"
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Ej. Departamento de Selección..."
                className={`w-full px-4 py-3.5 text-sm bg-[#0B1522]/90 border rounded-2xl text-white placeholder-[#A9B8C8]/40 transition-all duration-200 focus-visible:outline-none ${
                  errors.nombre
                    ? 'border-[#FF2A55] shadow-[0_0_15px_rgba(255,42,85,0.4)] focus-visible:ring-2 focus-visible:ring-[#FF2A55]'
                    : 'border-white/15 focus-visible:border-[#00F5A0] focus-visible:shadow-[0_0_20px_rgba(0,245,160,0.3)] focus-visible:ring-2 focus-visible:ring-[#00F5A0]/40'
                }`}
              />
              {errors.nombre && (
                <p className="text-xs text-[#FF2A55] mt-1.5 flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.nombre}</span>
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-[#A9B8C8] mb-2"
              >
                Correo electrónico de contacto <span className="text-[#FF2A55] font-black">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contacto@empresa.es"
                className={`w-full px-4 py-3.5 text-sm bg-[#0B1522]/90 border rounded-2xl text-white placeholder-[#A9B8C8]/40 transition-all duration-200 focus-visible:outline-none ${
                  errors.email
                    ? 'border-[#FF2A55] shadow-[0_0_15px_rgba(255,42,85,0.4)] focus-visible:ring-2 focus-visible:ring-[#FF2A55]'
                    : 'border-white/15 focus-visible:border-[#00F5A0] focus-visible:shadow-[0_0_20px_rgba(0,245,160,0.3)] focus-visible:ring-2 focus-visible:ring-[#00F5A0]/40'
                }`}
              />
              {errors.email && (
                <p className="text-xs text-[#FF2A55] mt-1.5 flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Mensaje */}
            <div>
              <label
                htmlFor="mensaje"
                className="block text-xs font-bold uppercase tracking-wider text-[#A9B8C8] mb-2"
              >
                Mensaje o consulta laboral <span className="text-[#FF2A55] font-black">*</span>
              </label>
              <textarea
                id="mensaje"
                rows={4}
                value={formData.mensaje}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                placeholder="Indica el puesto, jornada o detalle de la vacante..."
                className={`w-full px-4 py-3.5 text-sm bg-[#0B1522]/90 border rounded-2xl text-white placeholder-[#A9B8C8]/40 transition-all duration-200 focus-visible:outline-none ${
                  errors.mensaje
                    ? 'border-[#FF2A55] shadow-[0_0_15px_rgba(255,42,85,0.4)] focus-visible:ring-2 focus-visible:ring-[#FF2A55]'
                    : 'border-white/15 focus-visible:border-[#00F5A0] focus-visible:shadow-[0_0_20px_rgba(0,245,160,0.3)] focus-visible:ring-2 focus-visible:ring-[#00F5A0]/40'
                }`}
              />
              {errors.mensaje && (
                <p className="text-xs text-[#FF2A55] mt-1.5 flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.mensaje}</span>
                </p>
              )}
            </div>

            {/* Submit button with intense vivid neon emerald aura and hover movement */}
            <div className="pt-2">
              <button
                type="submit"
                className="group relative w-full py-4 px-6 rounded-2xl font-black text-xs text-slate-950 bg-gradient-to-r from-[#00F5A0] via-[#00F5A0] to-[#2EE59D] hover:shadow-[0_0_35px_rgba(0,245,160,0.6)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-1 hover:scale-[1.01] active:scale-95"
              >
                <Send className="w-4 h-4 text-slate-950 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <span>Enviar mensaje de contacto</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
