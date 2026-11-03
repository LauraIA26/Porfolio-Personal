/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { PublicPage } from './components/public/PublicPage';
import { MockLogin } from './components/private/MockLogin';
import { PrivateLayout } from './components/private/PrivateLayout';
import { DashboardView } from './components/private/DashboardView';
import { ProfileEditorView } from './components/private/ProfileEditorView';
import { PreferencesEditorView } from './components/private/PreferencesEditorView';
import { JobSearchView } from './components/private/JobSearchView';
import { OfferDetailView } from './components/private/OfferDetailView';
import { SavedOffersView } from './components/private/SavedOffersView';
import { DocumentsView } from './components/private/DocumentsView';
import { CandidaciesView } from './components/private/CandidaciesView';
import { SettingsView } from './components/private/SettingsView';
import { AffinityAnalysisModal } from './components/private/AffinityAnalysisModal';
import { PrepareApplicationModal } from './components/private/PrepareApplicationModal';
import { CVModal } from './components/public/CVModal';
import { Toast } from './components/common/Toast';

const MainAppContent: React.FC = () => {
  const { currentPath, isDemoLoggedIn } = useApp();

  // Route 1: Public Portfolio at / (exact, untouched, completely preserved)
  if (currentPath === '/') {
    return (
      <>
        <PublicPage />
        <Toast />
      </>
    );
  }

  // Route 2: Mock Login Screen at /app when not authenticated in demo mode
  if (!isDemoLoggedIn) {
    return (
      <>
        <MockLogin />
        <Toast />
      </>
    );
  }

  // Route 3: Private Demonstration Workspace at /app/*
  const renderPrivateView = () => {
    if (currentPath === '/app/perfil') {
      return <ProfileEditorView />;
    }
    if (currentPath === '/app/preferencias') {
      return <PreferencesEditorView />;
    }
    if (currentPath === '/app/ofertas') {
      return <JobSearchView />;
    }
    if (currentPath.startsWith('/app/ofertas/')) {
      return <OfferDetailView />;
    }
    if (currentPath === '/app/guardadas') {
      return <SavedOffersView />;
    }
    if (currentPath === '/app/documentos') {
      return <DocumentsView />;
    }
    if (currentPath === '/app/candidaturas') {
      return <CandidaciesView />;
    }
    if (currentPath === '/app/configuracion') {
      return <SettingsView />;
    }

    // Default to /app (Dashboard)
    return <DashboardView />;
  };

  return (
    <>
      <PrivateLayout>
        {renderPrivateView()}
      </PrivateLayout>
      <AffinityAnalysisModal />
      <PrepareApplicationModal />
      <CVModal />
      <Toast />
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
