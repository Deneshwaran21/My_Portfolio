import React from 'react';
import { Briefcase, Calendar, CheckCircle2, Building2, Layers } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useInView } from '../hooks/useInView';

export default function Experience() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="experience" ref={ref} className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Professional <span className="text-gradient-cyan">Experience</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Hands-on software engineering background building scalable web microservices, REST APIs, and responsive architectures.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="max-w-4xl mx-auto relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-12">
          
          {portfolioData.experience.map((item, index) => (
            <div
              key={index}
              className={`relative transition-all duration-700 transform ${
                isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/20">
                <Briefcase className="w-4 h-4" />
              </div>

              {/* Card Container */}
              <div className="glass-card p-6 sm:p-8 rounded-2xl space-y-6">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">{item.role}</h3>
                    <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mt-1">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-semibold text-slate-200">{item.company}</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 text-slate-300 text-xs font-mono border border-slate-700 self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2.5">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 font-mono">
                    Key Deliverables & Engineering Accomplishments
                  </h4>
                  <div className="space-y-2">
                    {item.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono mr-1">Technologies:</span>
                  {item.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-1 text-xs font-mono rounded-md bg-slate-900 text-cyan-300 border border-cyan-500/20">
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
