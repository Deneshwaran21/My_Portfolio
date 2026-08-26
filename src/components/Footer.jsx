import React from 'react';
import { FileText, ArrowUp, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';

export default function Footer({ onOpenResume }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          
          {/* Identity & Subtitle */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-slate-100">{portfolioData.personal.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>
            <p className="text-xs font-mono text-cyan-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> {portfolioData.personal.title}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href={portfolioData.personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 border border-slate-800 transition-colors flex items-center justify-center"
              aria-label="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>

            <a
              href={portfolioData.personal.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 border border-slate-800 transition-colors flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>

            <button
              onClick={onOpenResume}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 border border-slate-800 transition-colors flex items-center space-x-1.5 text-xs font-semibold"
              aria-label="Resume"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Resume</span>
            </button>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-slate-900 hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/30 transition-all group"
            aria-label="Scroll to top"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>

        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-xs font-mono text-slate-500">
          <p>© 2026 {portfolioData.personal.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
