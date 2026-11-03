import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  LauraProfile,
  WorkPreferences,
  DemoJobOffer,
  ApplicationDraft,
  CandidacyItem
} from '../types';
import {
  INITIAL_LAURA_PROFILE,
  INITIAL_PREFERENCES,
  DEMO_JOB_OFFERS,
  INITIAL_APPLICATION_DRAFT,
  INITIAL_CANDIDACIES
} from '../data/mockData';

interface AppContextType {
  // Navigation & Routing
  currentPath: string; // '/', '/app', '/app/perfil', '/app/preferencias', '/app/ofertas', '/app/ofertas/:id', '/app/documentos', '/app/candidaturas', '/app/configuracion'
  navigateTo: (path: string) => void;
  selectedOfferId: string | null;
  setSelectedOfferId: (id: string | null) => void;

  // Demo Auth
  isDemoLoggedIn: boolean;
  loginDemo: () => void;
  logoutDemo: () => void;

  // Profile
  profile: LauraProfile;
  updateProfile: (profile: LauraProfile) => void;
  restoreDemoProfile: () => void;

  // Preferences
  preferences: WorkPreferences;
  updatePreferences: (prefs: WorkPreferences) => void;

  // Demo Offers & Filtering
  offers: DemoJobOffer[];
  savedOfferIds: string[];
  toggleSaveOffer: (offerId: string) => void;

  // Candidacies Tracking
  candidacies: CandidacyItem[];
  updateCandidacy: (item: CandidacyItem) => void;
  addCandidacy: (item: CandidacyItem) => void;
  deleteCandidacy: (id: string) => void;

  // Modals & Application Flow
  cvModalOpen: boolean;
  setCvModalOpen: (open: boolean) => void;
  analyzingOffer: DemoJobOffer | null;
  setAnalyzingOffer: (offer: DemoJobOffer | null) => void;
  preparingOffer: DemoJobOffer | null;
  setPreparingOffer: (offer: DemoJobOffer | null) => void;

  // Application drafts
  drafts: Record<string, ApplicationDraft>;
  saveDraft: (draft: ApplicationDraft) => void;

  // Toast / System feedback
  toast: { message: string; type?: 'info' | 'success' | 'warn' } | null;
  showToast: (message: string, type?: 'info' | 'success' | 'warn') => void;
  clearToast: () => void;

  // Reset
  resetAllDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read initial path from location
  const getInitialPath = () => {
    if (typeof window === 'undefined') return '/';
    const path = window.location.pathname;
    const hash = window.location.hash;

    if (hash.startsWith('#/app') || hash.startsWith('#app')) {
      const cleanHash = hash.replace(/^#/, '');
      return cleanHash.startsWith('/app') ? cleanHash : '/app';
    }

    if (path.startsWith('/app')) {
      return path;
    }

    return '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const path = window.location.pathname;
    if (path.startsWith('/app/ofertas/')) {
      return path.replace('/app/ofertas/', '');
    }
    return null;
  });

  const [isDemoLoggedIn, setIsDemoLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('laura_demo_auth') === 'true';
  });

  // Handle browser popstate (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      if (p.startsWith('/app/ofertas/')) {
        setSelectedOfferId(p.replace('/app/ofertas/', ''));
        setCurrentPath('/app/ofertas/:id');
      } else {
        setCurrentPath(p);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Profile persistence
  const [profile, setProfile] = useState<LauraProfile>(() => {
    try {
      const saved = localStorage.getItem('laura_profile_demo');
      return saved ? JSON.parse(saved) : INITIAL_LAURA_PROFILE;
    } catch {
      return INITIAL_LAURA_PROFILE;
    }
  });

  // Preferences persistence
  const [preferences, setPreferences] = useState<WorkPreferences>(() => {
    try {
      const saved = localStorage.getItem('laura_preferences_demo');
      return saved ? JSON.parse(saved) : INITIAL_PREFERENCES;
    } catch {
      return INITIAL_PREFERENCES;
    }
  });

  // Saved offers
  const [savedOfferIds, setSavedOfferIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('laura_saved_offers_demo');
      return saved ? JSON.parse(saved) : ['demo-offer-1', 'demo-offer-2'];
    } catch {
      return ['demo-offer-1', 'demo-offer-2'];
    }
  });

  // Candidacies
  const [candidacies, setCandidacies] = useState<CandidacyItem[]>(() => {
    try {
      const saved = localStorage.getItem('laura_candidacies_demo');
      return saved ? JSON.parse(saved) : INITIAL_CANDIDACIES;
    } catch {
      return INITIAL_CANDIDACIES;
    }
  });

  // Drafts
  const [drafts, setDrafts] = useState<Record<string, ApplicationDraft>>(() => {
    try {
      const saved = localStorage.getItem('laura_drafts_demo');
      return saved ? JSON.parse(saved) : { 'demo-offer-1': INITIAL_APPLICATION_DRAFT };
    } catch {
      return { 'demo-offer-1': INITIAL_APPLICATION_DRAFT };
    }
  });

  // Modals
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [analyzingOffer, setAnalyzingOffer] = useState<DemoJobOffer | null>(null);
  const [preparingOffer, setPreparingOffer] = useState<DemoJobOffer | null>(null);

  // Toast
  const [toast, setToast] = useState<{ message: string; type?: 'info' | 'success' | 'warn' } | null>(null);

  const showToast = (message: string, type: 'info' | 'success' | 'warn' = 'info') => {
    setToast({ message, type });
  };

  const clearToast = () => {
    setToast(null);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Navigate handler that pushes state and synchronizes path
  const navigateTo = (path: string) => {
    setCurrentPath(path);

    // If navigating to /app/ofertas/:id
    if (path.startsWith('/app/ofertas/') && path !== '/app/ofertas') {
      const id = path.replace('/app/ofertas/', '');
      setSelectedOfferId(id);
      window.history.pushState(null, '', path);
      return;
    }

    if (path === '/') {
      window.history.pushState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState(null, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const loginDemo = () => {
    setIsDemoLoggedIn(true);
    localStorage.setItem('laura_demo_auth', 'true');
    setCurrentPath('/app');
    window.history.pushState(null, '', '/app');
    showToast('Acceso simulado concedido — Modo demostración activado', 'success');
  };

  const logoutDemo = () => {
    setIsDemoLoggedIn(false);
    localStorage.removeItem('laura_demo_auth');
    setCurrentPath('/');
    window.history.pushState(null, '', '/');
    showToast('Has salido de la zona privada de demostración', 'info');
  };

  const updateProfile = (newProfile: LauraProfile) => {
    setProfile(newProfile);
    localStorage.setItem('laura_profile_demo', JSON.stringify(newProfile));
    showToast('Perfil guardado en localStorage (zona privada de demostración)', 'success');
  };

  const restoreDemoProfile = () => {
    setProfile(INITIAL_LAURA_PROFILE);
    localStorage.setItem('laura_profile_demo', JSON.stringify(INITIAL_LAURA_PROFILE));
    showToast('Datos de perfil restaurados a los valores confirmados originales', 'info');
  };

  const updatePreferences = (newPrefs: WorkPreferences) => {
    setPreferences(newPrefs);
    localStorage.setItem('laura_preferences_demo', JSON.stringify(newPrefs));
    showToast('Preferencias laborales guardadas en la demostración', 'success');
  };

  const toggleSaveOffer = (offerId: string) => {
    setSavedOfferIds((prev) => {
      const exists = prev.includes(offerId);
      const updated = exists ? prev.filter((id) => id !== offerId) : [...prev, offerId];
      localStorage.setItem('laura_saved_offers_demo', JSON.stringify(updated));

      // Also sync candidacies: if saving, add to candidacies if not present
      if (!exists) {
        const found = DEMO_JOB_OFFERS.find((o) => o.id === offerId);
        if (found) {
          setCandidacies((prevCand) => {
            if (prevCand.some((c) => c.offerId === offerId)) return prevCand;
            const newCand: CandidacyItem = {
              id: `cand-${Date.now()}`,
              offerId: found.id,
              offerTitle: found.title,
              companyName: found.company,
              location: found.location,
              status: 'Guardada',
              notes: 'Oferta guardada desde el buscador DEMO.',
              manualLink: '',
              lastUpdated: 'Recientemente (Anotación DEMO)'
            };
            const updatedCand = [newCand, ...prevCand];
            localStorage.setItem('laura_candidacies_demo', JSON.stringify(updatedCand));
            return updatedCand;
          });
        }
      }

      showToast(
        exists ? 'Oferta eliminada de guardadas' : 'Oferta guardada en tus candidaturas de demostración',
        'info'
      );
      return updated;
    });
  };

  const updateCandidacy = (item: CandidacyItem) => {
    setCandidacies((prev) => {
      const updated = prev.map((c) => (c.id === item.id ? item : c));
      localStorage.setItem('laura_candidacies_demo', JSON.stringify(updated));
      showToast('Candidatura actualizada correctamente en la maqueta', 'success');
      return updated;
    });
  };

  const addCandidacy = (item: CandidacyItem) => {
    setCandidacies((prev) => {
      const updated = [item, ...prev];
      localStorage.setItem('laura_candidacies_demo', JSON.stringify(updated));
      showToast('Nueva candidatura DEMO registrada en tu seguimiento', 'success');
      return updated;
    });
  };

  const deleteCandidacy = (id: string) => {
    setCandidacies((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      localStorage.setItem('laura_candidacies_demo', JSON.stringify(updated));
      showToast('Candidatura DEMO eliminada del seguimiento', 'info');
      return updated;
    });
  };

  const saveDraft = (draft: ApplicationDraft) => {
    setDrafts((prev) => {
      const updated = { ...prev, [draft.offerId]: draft };
      localStorage.setItem('laura_drafts_demo', JSON.stringify(updated));
      showToast('Borrador de candidatura guardado correctamente en la maqueta', 'success');
      return updated;
    });
  };

  const resetAllDemoData = () => {
    localStorage.removeItem('laura_profile_demo');
    localStorage.removeItem('laura_preferences_demo');
    localStorage.removeItem('laura_saved_offers_demo');
    localStorage.removeItem('laura_candidacies_demo');
    localStorage.removeItem('laura_drafts_demo');
    localStorage.removeItem('laura_demo_auth');
    setProfile(INITIAL_LAURA_PROFILE);
    setPreferences(INITIAL_PREFERENCES);
    setSavedOfferIds(['demo-offer-1', 'demo-offer-2']);
    setCandidacies(INITIAL_CANDIDACIES);
    setDrafts({ 'demo-offer-1': INITIAL_APPLICATION_DRAFT });
    setIsDemoLoggedIn(false);
    setCurrentPath('/');
    window.history.pushState(null, '', '/');
    showToast('Datos de demostración restablecidos a los valores originales', 'warn');
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigateTo,
        selectedOfferId,
        setSelectedOfferId,
        isDemoLoggedIn,
        loginDemo,
        logoutDemo,
        profile,
        updateProfile,
        restoreDemoProfile,
        preferences,
        updatePreferences,
        offers: DEMO_JOB_OFFERS,
        savedOfferIds,
        toggleSaveOffer,
        candidacies,
        updateCandidacy,
        addCandidacy,
        deleteCandidacy,
        cvModalOpen,
        setCvModalOpen,
        analyzingOffer,
        setAnalyzingOffer,
        preparingOffer,
        setPreparingOffer,
        drafts,
        saveDraft,
        toast,
        showToast,
        clearToast,
        resetAllDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
