import React from 'react';
import { Code, Database, Brain, Cpu, Sparkles, BarChart3, UserCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useInView } from '../hooks/useInView';

export default function About() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const iconMap = {
    Sparkles: <Sparkles className="w-5 h-5 text-amber-400" />,
    Cpu: <Cpu className="w-5 h-5 text-purple-400" />,
    Brain: <Brain className="w-5 h-5 text-violet-400" />,
    Code: <Code className="w-5 h-5 text-cyan-400" />,
    Database: <Database className="w-5 h-5 text-blue-400" />,
    BarChart3: <BarChart3 className="w-5 h-5 text-emerald-400" />,
  };

  return (
    <section id="about" ref={ref} className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Professional Profile & Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            About <span className="text-gradient-cyan">Me</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Combining software engineering principles with data science, machine learning, and statistical analysis.
          </p>
        </div>

        {/* About Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Narrative Text */}
          <div
            className={`lg:col-span-7 space-y-6 transition-all duration-700 transform ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4 border border-slate-800">
              <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>AI/ML Engineer & Full-Stack Background</span>
              </h3>
              
              <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  I am a <strong className="text-cyan-300 font-semibold">B.Tech Information Technology graduate</strong> with around 1 year of professional Full-Stack development experience. My technical journey started with software development, but my strong interest in Python, SQL, mathematics, statistics, machine learning and AI has led me to focus my career on Data Science and AI/ML.
                </p>
                <p>
                  Experienced in supervised/unsupervised learning, deep learning, computer vision, and Generative AI including LLM integrations and RAG architectures. Proficient in Python, SQL, and statistical modeling with MLOps experience using Azure ML, Docker, and MLflow.
                </p>
              </div>

              {/* Core Attributes Pills */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-700">
                  B.Tech IT Graduate (8.86 CGPA)
                </span>
                <span className="px-3 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-700">
                  Full-Stack Experience
                </span>
                <span className="px-3 py-1 rounded-md bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                  AI/ML & Data Science
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: User Photo */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 delay-200 transform ${
              isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            {/* User Photo Frame */}
            <div className="glass-panel p-3.5 rounded-2xl border border-slate-700/60 relative overflow-hidden group shadow-2xl shadow-cyan-500/10">
              <div className="relative aspect-[4/4.8] w-full rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={portfolioData.personal.profileImage}
                  alt={portfolioData.personal.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Gradient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                {/* Name Badge */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{portfolioData.personal.name}</h4>
                    <p className="text-[11px] font-mono text-cyan-400">{portfolioData.personal.title}</p>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Strengths & Skill Matrix Cards Grid */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h3 className="text-2xl font-bold text-slate-100 flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Core Competencies & Technical Skills</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Categorized breakdown of technical proficiency, machine learning frameworks, databases, and developer tooling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData.skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`glass-card p-6 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5 flex flex-col justify-between ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner">
                      {iconMap[skill.icon] || <Brain className="w-5 h-5 text-cyan-400" />}
                    </div>
                    <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30 font-medium">
                      {skill.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h4 className="text-base font-bold text-slate-100">{skill.name}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{skill.description}</p>
                  </div>

                  {/* Granular Skill Chips for HR Scanning */}
                  {skill.items && (
                    <div className="pt-2 border-t border-slate-800/60">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                        Key Technologies:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {skill.items.map((item, iIdx) => (
                          <span
                            key={iIdx}
                            className="px-2.5 py-1 text-xs font-mono rounded-md bg-slate-900/90 text-cyan-200 border border-slate-700/80 hover:border-cyan-400 hover:bg-cyan-950/50 transition-all flex items-center space-x-1"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
