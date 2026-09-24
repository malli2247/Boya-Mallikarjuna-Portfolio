import React, { useState } from 'react';
import { EXPERIENCES, type ExperienceItem } from '../data/portfolioData';
import {
  Brain,
  Cpu,
  Trophy,
  Terminal,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

export const Experience: React.FC = () => {
  // Set default expanded state for first item so visitors immediately see rich content
  const [expandedId, setExpandedId] = useState<string | null>('codealpha');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getAccentDetails = (accent: ExperienceItem['accent']) => {
    switch (accent) {
      case 'purple-blue':
        return {
          nodeGradient: 'from-[#8B5CF6] to-[#3B82F6]',
          nodeGlow: 'shadow-[0_0_20px_rgba(139,92,246,0.6)] border-[#8B5CF6]',
          cardBorderHover: 'hover:border-[#8B5CF6]/50',
          cardActiveBorder: 'border-[#8B5CF6]/60 shadow-[0_12px_40px_rgba(139,92,246,0.18)]',
          badgeStyle: 'bg-[#8B5CF6]/15 border-[#8B5CF6]/30 text-purple-300',
          ambientGlow: 'from-[#8B5CF6]/15 via-[#3B82F6]/10',
          icon: <Brain className="w-4 h-4 text-purple-400" />,
        };
      case 'cyan-blue':
        return {
          nodeGradient: 'from-[#06D6FF] to-[#3B82F6]',
          nodeGlow: 'shadow-[0_0_20px_rgba(6,214,255,0.6)] border-[#06D6FF]',
          cardBorderHover: 'hover:border-[#06D6FF]/50',
          cardActiveBorder: 'border-[#06D6FF]/60 shadow-[0_12px_40px_rgba(6,214,255,0.18)]',
          badgeStyle: 'bg-[#06D6FF]/15 border-[#06D6FF]/30 text-[#06D6FF]',
          ambientGlow: 'from-[#06D6FF]/15 via-[#3B82F6]/10',
          icon: <Cpu className="w-4 h-4 text-[#06D6FF]" />,
        };
      case 'pink-purple':
        return {
          nodeGradient: 'from-[#FF1768] to-[#8B5CF6]',
          nodeGlow: 'shadow-[0_0_20px_rgba(255,23,104,0.6)] border-[#FF1768]',
          cardBorderHover: 'hover:border-[#FF1768]/50',
          cardActiveBorder: 'border-[#FF1768]/60 shadow-[0_12px_40px_rgba(255,23,104,0.18)]',
          badgeStyle: 'bg-[#FF1768]/15 border-[#FF1768]/30 text-[#FF1768]',
          ambientGlow: 'from-[#FF1768]/15 via-[#8B5CF6]/10',
          icon: <Trophy className="w-4 h-4 text-[#FF1768]" />,
        };
      case 'pink-cyan':
      default:
        return {
          nodeGradient: 'from-[#FF1768] to-[#06D6FF]',
          nodeGlow: 'shadow-[0_0_20px_rgba(6,214,255,0.6)] border-[#06D6FF]',
          cardBorderHover: 'hover:border-[#06D6FF]/50',
          cardActiveBorder: 'border-[#06D6FF]/60 shadow-[0_12px_40px_rgba(6,214,255,0.18)]',
          badgeStyle: 'bg-[#06D6FF]/15 border-[#06D6FF]/30 text-[#06D6FF]',
          ambientGlow: 'from-[#FF1768]/15 via-[#06D6FF]/10',
          icon: <Terminal className="w-4 h-4 text-emerald-400" />,
        };
    }
  };

  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[400px] bg-gradient-to-r from-[#FF1768]/10 via-[#8B5CF6]/10 to-[#06D6FF]/10 blur-[150px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-purple-300 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Professional Experience &amp; Milestones</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Experience
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300">
          "Learning, building, and solving real-world problems through AI and software."
        </p>
      </div>

      {/* Vertical Glowing Timeline */}
      <div className="relative pl-6 sm:pl-12 ml-2 sm:ml-6">
        {/* Continuous Vertical Glowing Line (Pink → Purple → Cyan Gradient) */}
        <div
          className="absolute top-3 bottom-8 left-[11px] sm:left-[19px] w-[3px] rounded-full bg-gradient-to-b from-[#FF1768] via-[#8B5CF6] via-[#3B82F6] to-[#06D6FF] shadow-[0_0_12px_rgba(139,92,246,0.6)]"
          aria-hidden="true"
        />

        {/* Experience Items List */}
        <div className="space-y-8 sm:space-y-10">
          {EXPERIENCES.map((exp: ExperienceItem) => {
            const isExpanded = expandedId === exp.id;
            const isHovered = hoveredNodeId === exp.id;
            const style = getAccentDetails(exp.accent);

            return (
              <div
                key={exp.id}
                className="relative group transition-all duration-300"
                onMouseEnter={() => setHoveredNodeId(exp.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
              >
                {/* Interactive Timeline Node (Circle on Line) */}
                <button
                  type="button"
                  onClick={() => toggleExpand(exp.id)}
                  aria-label={`Toggle details for ${exp.title}`}
                  className={`absolute -left-[30px] sm:-left-[43px] top-5 z-20 w-8 h-8 rounded-full bg-[#05060A] border-2 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isExpanded || isHovered
                      ? `${style.nodeGlow} scale-125`
                      : 'border-white/30 hover:border-white hover:scale-110'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full bg-gradient-to-tr ${style.nodeGradient} transition-all duration-300 ${
                      isExpanded || isHovered ? 'scale-110 shadow-[0_0_10px_white]' : 'scale-90'
                    }`}
                  />
                </button>

                {/* Experience Glass Card */}
                <div
                  className={`relative p-6 sm:p-8 rounded-[24px] transition-all duration-300 overflow-hidden cursor-pointer ${
                    isExpanded
                      ? `bg-white/[0.06] backdrop-blur-[20px] ${style.cardActiveBorder} -translate-y-1`
                      : `bg-white/[0.04] backdrop-blur-[20px] border border-white/[0.12] ${style.cardBorderHover} hover:-translate-y-1 hover:bg-white/[0.06]`
                  }`}
                  onClick={() => toggleExpand(exp.id)}
                >
                  {/* Subtle Accent Glow behind card */}
                  <div
                    className={`absolute -top-24 -right-24 w-60 h-60 rounded-full bg-gradient-to-bl ${style.ambientGlow} to-transparent blur-3xl pointer-events-none transition-opacity duration-500 ${
                      isExpanded ? 'opacity-70' : 'opacity-25 group-hover:opacity-50'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Header Row: Number + Badge + Organization */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3 relative z-10">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-slate-500">
                        {exp.number}
                      </span>
                      <div className="h-4 w-px bg-white/15" />
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded-lg bg-white/[0.05] border border-white/10">
                          {style.icon}
                        </div>
                        <span className="font-mono text-xs sm:text-sm font-bold text-slate-200">
                          {exp.organization}
                        </span>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <span
                      className={`text-xs font-mono px-3 py-1 rounded-full border font-semibold ${style.badgeStyle}`}
                    >
                      {exp.badge}
                    </span>
                  </div>

                  {/* Job Title */}
                  <div className="relative z-10 mb-2">
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-200 transition-colors">
                      {exp.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-4 relative z-10">
                    "{exp.description}"
                  </p>

                  {/* Expandable Technical Details (Animated Smoothly) */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden relative z-10 ${
                      isExpanded ? 'max-h-[600px] opacity-100 mt-4 pt-4 border-t border-white/10' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {/* Projects Worked On / Focus */}
                    {exp.projects && exp.projects.length > 0 && (
                      <div className="mb-4">
                        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 font-semibold">
                          <Layers className="w-3.5 h-3.5 text-[#06D6FF]" />
                          <span>Projects &amp; Problem Statements:</span>
                        </div>
                        <div className="space-y-1.5 pl-1">
                          {exp.projects.map((proj, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{proj}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {exp.projectSingle && (
                      <div className="mb-4">
                        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5 font-semibold">
                          <Layers className="w-3.5 h-3.5 text-[#06D6FF]" />
                          <span>Key Project:</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 pl-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span><strong>{exp.projectSingle}</strong></span>
                        </div>
                      </div>
                    )}

                    {/* Technology Focus Pills */}
                    <div className="mb-4">
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                        Technology Focus:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-white/30 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Certificate status / External Link if available */}
                    <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Verified Technical Milestone</span>
                      </div>
                      {exp.certificateUrl && (
                        <a
                          href={exp.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-[#06D6FF] hover:underline"
                        >
                          <span>View Certificate</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Toggle Action */}
                  <div className="pt-3 flex items-center justify-between text-xs font-mono border-t border-white/5 relative z-10">
                    <span className="text-slate-400 group-hover:text-slate-200 transition-colors">
                      {isExpanded ? 'Click to collapse' : 'Click to inspect projects & tech'}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(exp.id);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 text-xs font-semibold border border-white/10 transition-all min-h-[36px]"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View Experience'}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Experience Section End Statement */}
      <div className="mt-16 sm:mt-20 text-center relative z-10">
        <div className="inline-block p-6 sm:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-[20px] border border-white/[0.12] shadow-2xl max-w-xl mx-auto">
          <p className="font-display text-lg sm:text-xl font-bold text-white tracking-tight mb-2">
            "Always learning. Always building."
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono font-bold">
            <span className="text-transparent bg-gradient-to-r from-[#FF1768] to-[#8B5CF6] bg-clip-text animate-pulse">
              AI / ML
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#06D6FF] bg-clip-text animate-pulse">
              Software Engineering
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-transparent bg-gradient-to-r from-[#06D6FF] to-emerald-400 bg-clip-text animate-pulse">
              Problem Solving
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
