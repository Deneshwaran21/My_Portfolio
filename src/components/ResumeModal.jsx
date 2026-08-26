import React, { useState } from 'react';
import { X, Download, FileText, Check, Copy, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Cpu, ShieldCheck } from 'lucide-react';
import { LinkedinIcon } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '/resume.pdf');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">{portfolioData.personal.name} — Curriculum Vitae</h3>
              <p className="text-xs text-slate-400">{portfolioData.personal.title}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 bg-slate-950/50">
          
          {/* Quick Contact & Action Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Mail className="w-3.5 h-3.5" />
                  <a href={`mailto:${portfolioData.personal.email}`} className="hover:underline">{portfolioData.personal.email}</a>
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{portfolioData.personal.phone}</span>
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{portfolioData.personal.location}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 text-xs font-medium rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-1.5 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Link Copied' : 'Copy Link'}</span>
              </button>

              <a
                href={portfolioData.personal.resumeUrl}
                download="Deneshwaran_M_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 flex items-center space-x-1.5 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume PDF</span>
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-cyan-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Professional Summary
            </h4>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {portfolioData.personal.fullBio}
            </div>
          </div>

          {/* Professional Experience */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-cyan-400 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" /> Professional Experience
            </h4>

            <div className="space-y-4">
              {portfolioData.experience.map((exp, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800/80 pb-2">
                    <div>
                      <h5 className="text-sm font-bold text-slate-100">{exp.role} — <span className="text-cyan-400">{exp.company}</span></h5>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{exp.duration}</span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                    {exp.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-cyan-300 border border-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Competencies & Skills */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-cyan-400 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> Key Skills & Technologies
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="font-semibold text-slate-200">Programming & Data:</span>
                <p className="text-slate-400 mt-1">Python, SQL, Pandas, NumPy, PySpark, Matplotlib, Seaborn, Plotly</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="font-semibold text-slate-200">Deep Learning & GenAI:</span>
                <p className="text-slate-400 mt-1">PyTorch, TensorFlow, CNNs, Transfer Learning, OpenCV, LLMs, RAG, LangChain, OpenAI</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="font-semibold text-slate-200">MLOps & Cloud:</span>
                <p className="text-slate-400 mt-1">FastAPI, Streamlit, Azure ML, MLflow, Docker, Git, CI/CD</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="font-semibold text-slate-200">Databases & Analytics:</span>
                <p className="text-slate-400 mt-1">Snowflake, MongoDB, PostgreSQL, SQLite, Power BI, Tableau</p>
              </div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <h5 className="text-xs font-mono uppercase tracking-wider font-semibold text-violet-400 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" /> Education
              </h5>
              <p className="text-xs font-bold text-slate-100">{portfolioData.education.degree}</p>
              <p className="text-xs text-cyan-400">{portfolioData.education.institution}</p>
              <div className="flex justify-between text-xs text-slate-400 pt-1">
                <span>{portfolioData.education.duration}</span>
                <span className="text-emerald-400 font-semibold">CGPA: {portfolioData.education.cgpa}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <h5 className="text-xs font-mono uppercase tracking-wider font-semibold text-cyan-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Certifications & Trainings
              </h5>
              <div className="space-y-1.5 text-xs">
                {portfolioData.certifications.map((c, i) => (
                  <div key={i} className="flex items-center justify-between text-slate-300">
                    <span>{c.title}</span>
                    <span className="text-slate-500 font-mono text-[10px]">{c.issuer} ({c.year})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer Bar */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
