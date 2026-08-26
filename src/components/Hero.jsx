import React from 'react';
import { ArrowRight, Download, Sparkles, Brain, Database, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';
import Hero3DVisual from './Hero3DVisual';
import { useInView } from '../hooks/useInView';

export default function Hero({ onOpenResume }) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden"
    >
      {/* Background Radial Glow & Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-radial-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Hero Left Content */}
          <div
            className={`lg:col-span-7 space-y-6 transition-all duration-700 transform ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Status Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span> Data Science & AI/ML Focused • Full-Stack Background</span>
            </div>

            {/* Main Greeting & Title */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-100 leading-tight">
                Hi, I'm <span className="text-gradient-cyan">{portfolioData.personal.name}</span>
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gradient-purple">
                {portfolioData.personal.title}
              </h2>
            </div>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base font-semibold text-slate-300 tracking-wide">
              {portfolioData.personal.subtitle}
            </p>

            {/* Career Transition Narrative */}
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              Equipped with a solid B.Tech Information Technology degree and ~1 year of hands-on Full-Stack engineering experience, I am dedicated to constructing intelligent data systems, deep learning computer vision architectures, and practical machine learning applications.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 border border-cyan-400/30 flex items-center space-x-2 transition-all hover:scale-105 group"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenResume}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 shadow-lg flex items-center space-x-2 transition-all hover:border-cyan-500/40"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Social Icons & Quick Stats */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <span className="text-xs text-slate-400 font-mono">Connect:</span>
                <a
                  href={portfolioData.personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={portfolioData.personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>

              {/* Quick Tech Badges */}
              <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800">
                  <Code2 className="w-3 h-3 text-violet-400" /> Python
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800">
                  <Database className="w-3 h-3 text-blue-400" /> SQL
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800">
                  <Brain className="w-3 h-3 text-cyan-400" /> PyTorch
                </span>
              </div>
            </div>
          </div>

          {/* Hero Right 3D Visual */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 delay-200 transform ${
              isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <Hero3DVisual />
          </div>

        </div>
      </div>
    </section>
  );
}
