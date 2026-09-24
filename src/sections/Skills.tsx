import React, { useState } from 'react';
import { SKILL_CATEGORIES, type SkillItem } from '../data/portfolioData';
import { Code2, BrainCircuit, Globe, Terminal, Sparkles, Layers, X } from 'lucide-react';

export const Skills: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  const categoryMeta: Record<string, { icon: React.ReactNode; color: string; borderHover: string; glow: string; textAccent: string }> = {
    PROGRAMMING: {
      icon: <Code2 className="w-5 h-5 text-[#FF1768]" />,
      color: 'from-[#FF1768] to-[#8B5CF6]',
      borderHover: 'hover:border-[#FF1768]/50',
      glow: 'group-hover:shadow-[0_0_20px_rgba(255,23,104,0.35)]',
      textAccent: 'text-[#FF1768]',
    },
    'AI / ML': {
      icon: <BrainCircuit className="w-5 h-5 text-[#06D6FF]" />,
      color: 'from-[#06D6FF] to-[#3B82F6]',
      borderHover: 'hover:border-[#06D6FF]/50',
      glow: 'group-hover:shadow-[0_0_20px_rgba(6,214,255,0.35)]',
      textAccent: 'text-[#06D6FF]',
    },
    DEVELOPMENT: {
      icon: <Globe className="w-5 h-5 text-[#8B5CF6]" />,
      color: 'from-[#8B5CF6] to-[#06D6FF]',
      borderHover: 'hover:border-[#8B5CF6]/50',
      glow: 'group-hover:shadow-[0_0_20px_rgba(139,92,246,0.35)]',
      textAccent: 'text-[#8B5CF6]',
    },
    TOOLS: {
      icon: <Terminal className="w-5 h-5 text-emerald-400" />,
      color: 'from-emerald-400 to-[#06D6FF]',
      borderHover: 'hover:border-emerald-400/50',
      glow: 'group-hover:shadow-[0_0_20px_rgba(52,211,153,0.35)]',
      textAccent: 'text-emerald-400',
    },
  };

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#FF1768]/10 via-[#8B5CF6]/10 to-[#06D6FF]/10 blur-[130px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold border border-[#06D6FF]/30 bg-[#06D6FF]/10 text-[#06D6FF] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Skills Matrix</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Technical <span className="text-transparent bg-gradient-to-r from-[#FF1768] via-[#8B5CF6] to-[#06D6FF] bg-clip-text">Arsenal</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-400">
          A targeted stack built for machine learning intelligence, algorithmic speed, and robust full-stack applications.
        </p>
        <p className="mt-2 text-xs font-mono text-slate-500">
          Hover or tap any skill pill to inspect practical application context
        </p>
      </div>

      {/* Grid of Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {SKILL_CATEGORIES.map((category) => {
          const meta = categoryMeta[category.categoryKey] || categoryMeta.PROGRAMMING;

          return (
            <div
              key={category.title}
              className="p-7 sm:p-8 rounded-3xl glass-card border border-white/10 hover:border-white/20 transition-all duration-300 relative group"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className={`p-3 rounded-2xl bg-white/[0.04] border border-white/10 ${meta.glow} transition-shadow`}>
                    {meta.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white tracking-wider uppercase">
                      {category.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-400">
                      {category.skills.length} core technologies
                    </span>
                  </div>
                </div>
              </div>

              {/* Skills as Floating Glass Pills with Interactive Context Tooltip */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {category.skills.map((skill) => {
                  const isActive = activeSkill?.name === skill.name;
                  return (
                    <div
                      key={skill.name}
                      className="relative"
                      onMouseEnter={() => setActiveSkill(skill)}
                      onMouseLeave={() => setActiveSkill((prev) => (prev?.name === skill.name ? null : prev))}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveSkill(isActive ? null : skill)}
                        className={`px-4 py-2.5 rounded-2xl border transition-all duration-200 flex items-center gap-2.5 cursor-pointer text-left select-none ${
                          isActive
                            ? 'bg-white/[0.12] border-white/40 shadow-[0_0_16px_rgba(6,214,255,0.35)] -translate-y-1'
                            : `bg-white/[0.03] hover:bg-white/[0.08] border-white/10 ${meta.borderHover} hover:-translate-y-0.5`
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            isActive ? 'bg-[#06D6FF] shadow-[0_0_6px_#06D6FF]' : 'bg-slate-400 group-hover:bg-[#06D6FF]'
                          }`}
                        />
                        <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-slate-200'}`}>
                          {skill.name}
                        </span>
                        {skill.badge && (
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-md transition-colors ${
                              isActive
                                ? 'bg-[#06D6FF]/20 text-[#06D6FF] border border-[#06D6FF]/40 font-bold'
                                : 'bg-white/[0.04] text-slate-400 border border-white/5'
                            }`}
                          >
                            {skill.badge}
                          </span>
                        )}
                      </button>

                      {/* Floating Glass Tooltip Popup */}
                      {isActive && (
                        <div
                          className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 sm:w-72 p-3.5 rounded-2xl bg-[#090C16]/95 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/80 animate-in fade-in zoom-in-95 duration-150 pointer-events-auto"
                          style={{
                            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.8), 0 0 15px rgba(6, 214, 255, 0.25)',
                          }}
                        >
                          {/* Close button for touch */}
                          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-white tracking-wide">
                                {skill.name}
                              </span>
                              {skill.badge && (
                                <span className="text-[9px] font-mono text-[#06D6FF] bg-[#06D6FF]/10 px-1.5 py-0.5 rounded border border-[#06D6FF]/25">
                                  {skill.badge}
                                </span>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveSkill(null);
                              }}
                              className="text-slate-400 hover:text-white p-0.5"
                              aria-label="Close tooltip"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
                            {skill.description}
                          </p>

                          {skill.projectRelation && (
                            <div className="pt-2 border-t border-white/5 flex items-start gap-1.5 text-[11px] font-mono text-slate-400">
                              <Layers className="w-3 h-3 text-[#FF1768] shrink-0 mt-0.5" />
                              <span className="text-slate-300">
                                Applied in: <strong className="text-white">{skill.projectRelation}</strong>
                              </span>
                            </div>
                          )}

                          {/* Downward pointing triangle arrow */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-8 border-transparent border-t-[#090C16]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
