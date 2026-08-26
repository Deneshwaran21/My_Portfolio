import React from 'react';
import { GraduationCap, Award, BookOpen, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import Education3DVisual from './Education3DVisual';
import { useInView } from '../hooks/useInView';

export default function Education() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { education } = portfolioData;

  return (
    <section id="education" ref={ref} className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-mono text-violet-300">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Education & <span className="text-gradient-purple">Academic Record</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Formal technical foundation in Information Technology and computer science principles.
          </p>
        </div>

        {/* Education Card Container */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-700 transform ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="p-3 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
                  <GraduationCap className="w-8 h-8" />
                </div>

                <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-600/30 to-cyan-500/30 border border-violet-400/40 text-violet-200 font-mono text-sm font-bold shadow-md flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>CGPA: {education.cgpa}</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 leading-tight">
                  {education.degree}
                </h3>
                <p className="text-base sm:text-lg font-medium text-cyan-400 mt-1">
                  {education.institution}
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {education.details}
              </p>

              {/* Coursework highlights */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400 flex items-center space-x-1">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Core Academic Areas</span>
                </span>

                <div className="flex flex-wrap gap-2 pt-1 text-xs">
                  {['Data Structures', 'Algorithms', 'Database Management', 'Object-Oriented Programming', 'Software Engineering', 'Web Architecture'].map((item, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 3D Visual */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <Education3DVisual />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
