import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GraduationCap, Award, Cpu, Clock, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Ambient background blur */}
      <div
        className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-[#8B5CF6]/10 blur-[130px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Asymmetric layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Col: Large Heading & Narrative */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold border border-[#FF1768]/30 bg-[#FF1768]/10 text-[#FF1768]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profile &amp; Vision</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
            About <span className="text-transparent bg-gradient-to-r from-[#FF1768] via-[#8B5CF6] to-[#06D6FF] bg-clip-text">Me</span>
          </h2>

          <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-normal">
            "{PERSONAL_INFO.about}"
          </p>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Currently enrolled in the B.Tech CSE (Artificial Intelligence &amp; Machine Learning) program at Uttaranchal University, I maintain an uncompromising bar for architectural precision, mathematical rigor in model development, and shipping real-world software that delivers tangible impact.
          </p>

          <div className="pt-2 flex items-center gap-6 text-xs sm:text-sm font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#06D6FF] shadow-[0_0_6px_#06D6FF]" />
              <span>Uttaranchal University</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF1768] shadow-[0_0_6px_#FF1768]" />
              <span>AI/ML Core Track</span>
            </div>
          </div>
        </div>

        {/* Right Col: Floating Glass Information Blocks */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Card 1: Degree */}
          <div className="p-6 rounded-3xl glass-card glass-card-hover border border-white/10 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Education</span>
              <div className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:border-[#FF1768]/40 transition-colors">
                <GraduationCap className="w-5 h-5 text-[#FF1768]" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1 font-display">B.Tech CSE</div>
            <div className="text-sm font-medium text-transparent bg-gradient-to-r from-[#FF1768] to-[#8B5CF6] bg-clip-text">
              AI &amp; ML Specialization
            </div>
            <div className="mt-3 text-xs text-slate-400 font-mono">Uttaranchal University</div>
          </div>

          {/* Card 2: CGPA */}
          <div className="p-6 rounded-3xl glass-card glass-card-hover border border-white/10 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Academic Merit</span>
              <div className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:border-[#06D6FF]/40 transition-colors">
                <Award className="w-5 h-5 text-[#06D6FF]" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-[#06D6FF] mb-1 font-mono tracking-tight drop-shadow-[0_0_12px_rgba(6,214,255,0.4)]">
              9.30 / 10
            </div>
            <div className="text-sm font-medium text-slate-200">CGPA</div>
            <div className="mt-3 text-xs text-slate-400 font-mono">Verified Academic Standing</div>
          </div>

          {/* Card 3: Primary Focus */}
          <div className="p-6 rounded-3xl glass-card glass-card-hover border border-white/10 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Specialization</span>
              <div className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:border-[#8B5CF6]/40 transition-colors">
                <Cpu className="w-5 h-5 text-[#8B5CF6]" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1 font-display">AI + Software</div>
            <div className="text-sm font-medium text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#06D6FF] bg-clip-text">
              Primary Focus
            </div>
            <div className="mt-3 text-xs text-slate-400 font-mono">Real-world intelligent systems</div>
          </div>

          {/* Card 4: Experience */}
          <div className="p-6 rounded-3xl glass-card glass-card-hover border border-white/10 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Tenure</span>
              <div className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:border-emerald-400/40 transition-colors">
                <Clock className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1 font-display">2+ Years</div>
            <div className="text-sm font-medium text-emerald-300">
              Development &amp; Learning
            </div>
            <div className="mt-3 text-xs text-slate-400 font-mono">Continuous code iteration</div>
          </div>
        </div>
      </div>
    </section>
  );
};
