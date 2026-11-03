import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  User,
  SlidersHorizontal,
  Search,
  Bookmark,
  FileCheck,
  FileSpreadsheet,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const { currentPath, navigateTo, logoutDemo, savedOfferIds, candidacies } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact 8 menu items specified in prompt
  const navItems = [
    { path: '/app', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/app/perfil', label: 'Mi perfil', icon: User },
    { path: '/app/preferencias', label: 'Preferencias', icon: SlidersHorizontal },
    { path: '/app/ofertas', label: 'Buscar ofertas', icon: Search },
    {
      path: '/app/guardadas',
      label: 'Ofertas guardadas',
      icon: Bookmark,
      badge: savedOfferIds.length > 0 ? savedOfferIds.length : undefined
    },
    { path: '/app/documentos', label: 'Documentos', icon: FileCheck },
    {
      path: '/app/candidaturas',
      label: 'Mis candidaturas',
      icon: FileSpreadsheet,
      badge: candidacies.length > 0 ? candidacies.length : undefined
    },
    { path: '/app/configuracion', label: 'Configuración', icon: Settings }
  ];

  const isCurrentActive = (itemPath: string) => {
    if (itemPath === '/app') {
      return currentPath === '/app';
    }
    return currentPath.startsWith(itemPath);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col font-sans">
      {/* Top Demo Banner Bar */}
      <div className="bg-[#1E3A4B] text-white px-4 py-2 text-xs font-medium border-b border-[#2A4E63]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="bg-amber-400 text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
              DEMO
            </span>
            <span className="font-semibold text-white text-xs sm:text-sm">
              Laura Jiménez López · Asistente de empleo
            </span>
            <span className="hidden md:inline text-white/70 text-xs">
              — Zona privada de organización de candidaturas
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('/')}
              className="flex items-center gap-1.5 text-white/90 hover:text-white text-xs font-semibold underline underline-offset-4 transition-colors"
            >
              <span>Volver al portfolio público</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <span className="text-white/40 hidden sm:inline">|</span>
            <button
              onClick={logoutDemo}
              className="hidden sm:flex items-center gap-1 text-red-200 hover:text-white text-xs transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar sesión DEMO</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main App Container */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto">
        {/* Mobile Navigation Header */}
        <div className="md:hidden bg-white border-b border-[#E2DFD8] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#1E3A4B] text-white flex items-center justify-center font-bold text-xs">
              LJ
            </div>
            <span className="font-bold text-slate-800 text-sm">Espacio Laboral (DEMO)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Sidebar for Desktop & Mobile drawer */}
        <aside
          className={`${
            mobileMenuOpen ? 'block' : 'hidden'
          } md:block w-full md:w-64 bg-white md:bg-transparent border-r border-[#E2DFD8] p-4 sm:p-5 flex flex-col justify-between shrink-0`}
        >
          <div>
            {/* User identification badge */}
            <div className="hidden md:flex items-center gap-3 p-3 bg-white rounded-xl border border-[#E2DFD8] shadow-xs mb-6">
              <div className="w-9 h-9 rounded-lg bg-[#1E3A4B] text-white flex items-center justify-center font-bold text-sm shrink-0">
                LJ
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    Laura Jiménez López
                  </p>
                  <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1 rounded">
                    DEMO
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 truncate">
                  Illescas, Toledo
                </p>
              </div>
            </div>

            {/* Navigation links (8 requested items) */}
            <nav className="space-y-1" aria-label="Menú principal de la zona privada">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isCurrentActive(item.path);
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigateTo(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#1E3A4B] text-white shadow-xs'
                        : 'text-slate-700 hover:bg-[#FAF9F5] hover:text-[#1E3A4B]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Footer actions inside sidebar */}
          <div className="pt-6 mt-6 border-t border-[#E2DFD8] space-y-2">
            <button
              onClick={() => {
                navigateTo('/');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-[#FAF9F5] rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Volver al portfolio público</span>
            </button>

            <button
              onClick={() => {
                logoutDemo();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar sesión DEMO</span>
            </button>
          </div>
        </aside>

        {/* Dynamic View Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
