import React, { useState } from 'react';
import { ExternalLink, Award, Cpu, Info, ArrowUpRight, FolderGit2 } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import { useInView } from '../hooks/useInView';

export default function Projects() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" ref={ref} className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>AI & Machine Learning Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Featured <span className="text-gradient-cyan">Projects</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Real-world data science solutions, computer vision models, and telemetry analytics built with Python & PyTorch.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project, index) => (
            <div
              key={project.id}
              className={`group glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6 relative overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-500/40 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Subtle top ambient glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full filter blur-2xl group-hover:bg-cyan-500/20 transition-all" />

              <div className="space-y-4 relative z-10">
                
                {/* Metric Badge Header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400/90 font-medium">
                    {project.subtitle}
                  </span>

                  {project.highlightMetric && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold shadow-sm">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>{project.highlightMetric}</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-4">
                  {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 5).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-slate-900/90 text-slate-300 border border-slate-800 flex items-center space-x-1"
                    >
                      <Cpu className="w-3 h-3 text-cyan-400" />
                      <span>{tech}</span>
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-2 py-1 text-[11px] font-mono rounded-md bg-slate-900 text-slate-400">
                      +{project.technologies.length - 5} more
                    </span>
                  )}
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 border border-slate-800 transition-colors flex items-center justify-center"
                    aria-label="View Source Code on GitHub"
                    title="Source Code"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 border border-slate-800 transition-colors flex items-center justify-center"
                    aria-label="View Live Demo"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-cyan-500/10 text-xs font-semibold text-cyan-400 border border-cyan-500/30 hover:border-cyan-400/50 flex items-center space-x-1 transition-all"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Inspect Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Inspection Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
