import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, clearToast } = useApp();

  if (!toast) return null;

  const bgStyles = {
    success: 'bg-[#1E3A4B] text-white border-[#2A4E63]',
    info: 'bg-[#1E293B] text-white border-slate-700',
    warn: 'bg-[#854D0E] text-white border-amber-800'
  }[toast.type || 'info'];

  const IconComponent = {
    success: CheckCircle2,
    info: Info,
    warn: AlertCircle
  }[toast.type || 'info'];

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <div
        className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg text-sm font-medium ${bgStyles}`}
      >
        <IconComponent className="w-5 h-5 shrink-0 mt-0.5 opacity-90" aria-hidden="true" />
        <div className="flex-1 leading-snug">
          {toast.message}
        </div>
        <button
          onClick={clearToast}
          className="text-white/70 hover:text-white transition-colors p-0.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Cerrar notificación"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
