import React from 'react';
import { Award, ExternalLink, CheckCircle, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useInView } from '../hooks/useInView';

export default function Certifications() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="certifications" ref={ref} className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Knowledge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Certifications & <span className="text-gradient-cyan">Credentials</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Official skill assessments and technical certifications validating core competencies.
          </p>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioData.certifications.map((cert, index) => (
            <div
              key={cert.id}
              className={`glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6 transition-all duration-500 transform ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="space-y-4">
                {/* Header Icon & Issuer */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
                    {cert.year}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    {cert.issuer}
                  </span>
                  <h3 className="text-lg font-bold text-slate-100 mt-1 leading-snug">
                    {cert.title}
                  </h3>
                </div>

                {/* Skills verified */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cert.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="px-2.5 py-0.5 text-[11px] font-mono rounded-md bg-slate-900 text-slate-300 border border-slate-800 flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3 text-cyan-400" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* View Certificate CTA */}
              <div className="pt-4 border-t border-slate-800/80">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 hover:border-cyan-500/40 flex items-center justify-center space-x-2 transition-all group"
                >
                  <span>View Certificate</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
