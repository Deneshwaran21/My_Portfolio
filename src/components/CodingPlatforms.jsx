import React from 'react';
import { Award, ExternalLink, Code2, Terminal, CheckCircle2 } from 'lucide-react';
import { LeetcodeIcon, CodechefIcon, HackerrankIcon } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';
import { useInView } from '../hooks/useInView';

export default function CodingPlatforms() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const renderIcon = (type) => {
    switch (type) {
      case 'Codechef':
        return <CodechefIcon className="w-6 h-6 text-amber-400" />;
      case 'Leetcode':
        return <LeetcodeIcon className="w-6 h-6 text-yellow-400" />;
      case 'Hackerrank':
        return <HackerrankIcon className="w-6 h-6 text-emerald-400" />;
      default:
        return <Code2 className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="coding-platforms" ref={ref} className="py-20 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Problem Solving & Algorithms</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Coding <span className="text-gradient-cyan">Platforms</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Active competitive programmer with 200+ total problems solved across top algorithmic platforms.
          </p>
        </div>

        {/* Platform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioData.codingPlatforms.map((platform, index) => (
            <div
              key={platform.id}
              className={`glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6 transition-all duration-500 transform hover:-translate-y-2.5 hover:border-cyan-500/40 shadow-xl ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
                    {renderIcon(platform.iconType)}
                  </div>
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>{platform.solvedMetric}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-100">{platform.name}</h3>
                  <p className="text-xs font-mono text-cyan-400 mt-0.5">@{platform.handle}</p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {platform.description}
                </p>
              </div>

              {/* View Profile Action Button */}
              <div className="pt-4 border-t border-slate-800/80">
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 hover:border-cyan-500/40 flex items-center justify-center space-x-2 transition-all group"
                >
                  <span>View {platform.name} Profile</span>
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
