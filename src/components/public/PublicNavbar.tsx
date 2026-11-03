import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Menu, X, Lock, ArrowRight, Sparkles } from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  const { navigateTo } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const navLinks = [
    { label: 'Inicio', href: '#inicio', id: 'inicio' },
    { label: 'Sobre mí', href: '#sobre-mi', id: 'sobre-mi' },
    { label: 'Experiencia', href: '#experiencia', id: 'experiencia' },
    { label: 'Formación', href: '#formacion', id: 'formacion' },
    { label: 'Competencias', href: '#competencias', id: 'competencias' },
    { label: 'Disponibilidad', href: '#disponibilidad', id: 'disponibilidad' },
    { label: 'Contacto', href: '#contacto', id: 'contacto' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section spy
      const sections = navLinks.map((l) => document.querySelector(l.href));
      const scrollPos = window.scrollY + 200;

      sections.forEach((sec, idx) => {
        if (sec instanceof HTMLElement) {
          const top = sec.offsetTop;
          const height = sec.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(navLinks[idx].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToApp = () => {
    setMobileMenuOpen(false);
    navigateTo('/app');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-6">
      <div
        className={`max-w-6xl mx-auto rounded-2xl transition-all duration-300 flex items-center justify-between gap-4 px-4 sm:px-6 ${
          scrolled
            ? 'h-14 sm:h-16 bg-[#0E1B2C]/90 backdrop-blur-2xl border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(0,245,160,0.15)]'
            : 'h-16 sm:h-18 bg-[#15283A]/60 backdrop-blur-md border border-white/10'
        }`}
      >
        {/* Brand Wordmark */}
        <a
          href="#inicio"
          onClick={(e) => handleLinkClick(e, '#inicio')}
          className="group flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00F5A0] via-[#47D7C5] to-[#FF2A55] p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(0,245,160,0.4)] group-hover:shadow-[0_0_20px_rgba(255,42,85,0.5)] transition-all">
            <div className="w-full h-full bg-[#070B18] rounded-[6px] flex items-center justify-center font-display font-black text-xs text-white">
              LJ
            </div>
          </div>
          <span className="font-display font-bold text-white group-hover:text-[#00F5A0] transition-colors">
            Laura Jiménez López
          </span>
        </a>

        {/* Desktop Nav Links with Active Spy Indicator */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-[#A9B8C8]"
          aria-label="Navegación principal del portfolio"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 relative ${
                  isActive
                    ? 'text-white bg-white/10 shadow-[0_0_12px_rgba(0,245,160,0.2)]'
                    : 'hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[#00F5A0] shadow-[0_0_8px_#00F5A0]"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={goToApp}
            className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white rounded-xl transition-all duration-300 overflow-hidden shadow-[0_0_18px_rgba(0,245,160,0.3)] hover:shadow-[0_0_28px_rgba(255,42,85,0.5)] transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            {/* Luminous vivid animated border & background */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#00F5A0] via-[#FF2A55] to-[#00F5A0] animate-gradient-text opacity-90 transition-opacity" />
            <span className="absolute inset-[1.5px] bg-[#0E1E2E] rounded-[10px] transition-colors group-hover:bg-[#15283A]" />
            <span className="relative flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#00F5A0] group-hover:text-[#FF2A55] transition-colors" aria-hidden="true" />
              <span>Área privada</span>
            </span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#A9B8C8] hover:text-white rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5A0]"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF2A55]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Fullscreen-style Animated Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 bg-[#0E1B2C]/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 z-50">
          <nav className="flex flex-col gap-2" aria-label="Navegación móvil">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-white/12 text-white border-l-2 border-[#00F5A0] shadow-[0_0_15px_rgba(0,245,160,0.2)]'
                      : 'text-[#A9B8C8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#00F5A0] shadow-[0_0_8px_#00F5A0]" />}
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-white/10">
              <button
                onClick={goToApp}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-white bg-gradient-to-r from-[#00F5A0]/20 via-[#FF2A55]/20 to-[#00F5A0]/20 border border-[#00F5A0]/60 rounded-xl hover:border-[#00F5A0] transition-all shadow-[0_0_20px_rgba(0,245,160,0.3)]"
              >
                <Lock className="w-4 h-4 text-[#00F5A0]" />
                <span>Acceder al Área privada de demostración</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF2A55]" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
