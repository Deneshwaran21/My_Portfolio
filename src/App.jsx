import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CodingPlatforms from './components/CodingPlatforms';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#05070d] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Fixed Sticky Header */}
      <Navbar onOpenResume={() => setIsResumeModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero onOpenResume={() => setIsResumeModalOpen(true)} />
        
        {/* Subtle Section Divider */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </div>

        <About />

        <div className="max-w-7xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </div>

        <CodingPlatforms />

        <div className="max-w-7xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </div>

        <Experience />

        <div className="max-w-7xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </div>

        <Education />

        <div className="max-w-7xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </div>

        <Certifications />

        <div className="max-w-7xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </div>

        <Projects />
      </main>

      {/* Minimal Professional Footer */}
      <Footer onOpenResume={() => setIsResumeModalOpen(true)} />

      {/* Resume Viewer / Download Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}
