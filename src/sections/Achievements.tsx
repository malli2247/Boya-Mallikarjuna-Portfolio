import React from 'react';
import { ACHIEVEMENTS, type Achievement } from '../data/portfolioData';
import {
  GraduationCap,
  Code,
  Award,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const Achievements: React.FC = () => {
  const icons: Record<string, React.ReactNode> = {
    GraduationCap: <GraduationCap className="w-6 h-6 text-[#FF1768]" />,
    Code: <Code className="w-6 h-6 text-[#06D6FF]" />,
    Award: <Award className="w-6 h-6 text-[#8B5CF6]" />,
    CheckCircle2: <CheckCircle2 className="w-6 h-6 text-[#3B82F6]" />,
  };

  const accentBorders: Record<string, string> = {
    pink: 'hover:border-[#FF1768]/50 hover:shadow-[0_0_25px_rgba(255,23,104,0.3)]',
    cyan: 'hover:border-[#06D6FF]/50 hover:shadow-[0_0_25px_rgba(6,214,255,0.3)]',
    purple: 'hover:border-[#8B5CF6]/50 hover:shadow-[0_0_25px_rgba(139,92,246,0.3)]',
    blue: 'hover:border-[#3B82F6]/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]',
  };

  return (
    <section id="achievements" className="relative py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-[#06D6FF]/10 blur-[130px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold border border-[#06D6FF]/30 bg-[#06D6FF]/10 text-[#06D6FF] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Proven Metrics</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Verified <span className="text-transparent bg-gradient-to-r from-[#FF1768] via-[#8B5CF6] to-[#06D6FF] bg-clip-text">Milestones</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-400">
          Current, verifiable academic standings and problem-solving certifications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
        {ACHIEVEMENTS.map((item: Achievement, idx: number) => (
          <div
            key={idx}
            className={`p-7 sm:p-8 rounded-3xl glass-card border border-white/10 ${accentBorders[item.accent]} transition-all duration-300 flex flex-col justify-between group`}
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:scale-105 transition-transform">
                  {icons[item.icon] || <Award className="w-6 h-6 text-[#FF1768]" />}
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-[#06D6FF]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#06D6FF]" />
                  <span>{item.verifiedLabel}</span>
                </div>
              </div>

              <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">
                {item.category}
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3 tracking-tight group-hover:text-[#06D6FF] transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-transparent bg-gradient-to-r from-[#FF1768] to-[#8B5CF6] bg-clip-text font-bold">
                Authentic Validation
              </span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Current &amp; Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
