import React from 'react';
import { BackgroundEffects } from './BackgroundEffects';
import { PublicNavbar } from './PublicNavbar';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { SkillsSection } from './SkillsSection';
import { AvailabilitySection } from './AvailabilitySection';
import { CVSection } from './CVSection';
import { ContactSection } from './ContactSection';
import { PublicFooter } from './PublicFooter';
import { CVModal } from './CVModal';

export const PublicPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#0B1020] text-[#F5F7FA] font-sans selection:bg-[#00F5A0]/25 selection:text-[#00F5A0]">
      {/* Interactive Background Effects (Spotlight, Halos, Fine Grid) */}
      <BackgroundEffects />

      {/* Floating Glassmorphism Navbar */}
      <PublicNavbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <AvailabilitySection />
        <CVSection />
        <ContactSection />
      </main>

      {/* Modern Midnight Footer */}
      <PublicFooter />

      {/* Clean ATS Document Modal */}
      <CVModal />
    </div>
  );
};
