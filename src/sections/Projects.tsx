import React, { useState } from 'react';
import { PROJECTS, type Project } from '../data/portfolioData';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import { ModalErrorBoundary } from '../components/ModalErrorBoundary';
import { GithubIcon, LeetCodeIcon } from '../components/SocialIcons';
import { ExternalLink, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import { useLeetCodeStats, formatTimeAgo } from '../hooks/useLeetCodeStats';

type FilterType = 'All' | 'AI / ML' | 'Full Stack' | 'Healthcare' | 'DSA';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('All');
  const { stats: leetCodeStats, isLoading: leetCodeLoading, isUpdating: leetCodeUpdating } = useLeetCodeStats();

  const filterOptions: FilterType[] = ['All', 'AI / ML', 'Full Stack', 'Healthcare', 'DSA'];

  const filteredProjects = currentFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.filterTags.includes(currentFilter as any));

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full bg-[#FF1768]/10 blur-[150px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] rounded-full bg-[#06D6FF]/10 blur-[150px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold border border-[#FF1768]/30 bg-[#FF1768]/10 text-[#FF1768] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Engineering In Production</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Featured <span className="text-transparent bg-gradient-to-r from-[#FF1768] via-[#8B5CF6] to-[#06D6FF] bg-clip-text">Projects</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-400">
          "Building systems that solve real-world problems."
        </p>

        {/* Filter Controls Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 rounded-full bg-white/[0.03] border border-white/10 max-w-xl mx-auto backdrop-blur-md">
          {filterOptions.map((filter) => {
            const isSelected = currentFilter === filter;
            const count = filter === 'All'
              ? PROJECTS.length
              : PROJECTS.filter((p) => p.filterTags.includes(filter as any)).length;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setCurrentFilter(filter)}
                data-cursor="button"
                className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#FF1768] to-[#8B5CF6] text-white shadow-[0_0_15px_rgba(255,23,104,0.4)] font-bold scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{filter}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-black/30 text-white' : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects List - Interactive Clickable Cards Without "View Project" Button */}
      <div className="space-y-12 sm:space-y-16">
        {filteredProjects.map((project: Project) => {
          const isRaktha = project.id === 'rakthasethu';
          const isCardio = project.id === 'cardiovision-ai';
          const isLeetCode = project.id === 'leetcode-solutions';

          return (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
              data-cursor="project"
              className={`glass-panel-project p-7 sm:p-10 lg:p-12 relative overflow-hidden group transition-all duration-300 cursor-pointer hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-[#06D6FF]/50 ${
                isRaktha
                  ? 'border-[#FF1768]/30 hover:border-[#FF1768]/70 shadow-[0_15px_40px_rgba(255,23,104,0.12)] hover:shadow-[0_25px_60px_rgba(255,23,104,0.22)] hover:bg-[#FF1768]/[0.02]'
                  : isCardio
                  ? 'border-[#8B5CF6]/30 hover:border-[#8B5CF6]/70 shadow-[0_15px_40px_rgba(139,92,246,0.12)] hover:shadow-[0_25px_60px_rgba(139,92,246,0.22)] hover:bg-[#8B5CF6]/[0.02]'
                  : 'border-[#06D6FF]/30 hover:border-[#06D6FF]/70 shadow-[0_15px_40px_rgba(6,214,255,0.12)] hover:shadow-[0_25px_60px_rgba(6,214,255,0.22)] hover:bg-[#06D6FF]/[0.02]'
              }`}
            >
              {/* Corner ambient glow */}
              <div
                className={`absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-50 ${
                  isRaktha
                    ? 'bg-[#FF1768]'
                    : isCardio
                    ? 'bg-[#8B5CF6]'
                    : 'bg-[#06D6FF]'
                }`}
              />

              {/* Card Content */}
              <div className="relative z-10 space-y-6">
                {/* 1. Project Number & Category */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-transparent bg-gradient-to-r from-[#FF1768] to-[#06D6FF] bg-clip-text">
                    {project.number}
                  </span>
                  <div className="h-6 w-px bg-white/15" />
                  <span className="text-xs font-mono uppercase tracking-widest text-[#06D6FF] font-semibold">
                    {project.category}
                  </span>
                </div>

                {/* 2. Main Title & Subtitle */}
                <div>
                  <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF1768] group-hover:to-[#06D6FF] transition-all">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base font-medium text-transparent bg-gradient-to-r from-[#FF1768] to-[#8B5CF6] bg-clip-text">
                    {project.subtitle}
                  </p>
                </div>

                {/* 3. Description */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl font-normal">
                  {project.description}
                </p>

                {/* 4. LeetCode Live Verified Statistics (Automatically updated from real profile) */}
                {isLeetCode && (
                  <div className="space-y-2 pt-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          LeetCode Statistics
                        </span>
                        {leetCodeUpdating && (
                          <span className="text-[10px] font-mono text-[#06D6FF] animate-pulse flex items-center gap-1">
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            Updating stats...
                          </span>
                        )}
                      </div>
                      {leetCodeStats?.lastUpdated && (
                        <span className="text-[11px] font-mono text-slate-400">
                          Last updated: <span className="text-slate-300 font-medium">{formatTimeAgo(leetCodeStats.lastUpdated)}</span>
                        </span>
                      )}
                    </div>

                    {leetCodeStats ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                          <div className="text-2xl sm:text-3xl font-bold text-white">{leetCodeStats.totalSolved}</div>
                          <div className="text-xs text-slate-400 mt-0.5">Problems Solved</div>
                          {leetCodeStats.totalQuestions > 0 && (
                            <div className="text-[10px] text-slate-500 mt-0.5 font-sans">of {leetCodeStats.totalQuestions}</div>
                          )}
                        </div>
                        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-cyan-500/20 text-center">
                          <div className="text-2xl sm:text-3xl font-bold text-[#06D6FF]">{leetCodeStats.easySolved}</div>
                          <div className="text-xs text-slate-400 mt-0.5">Easy</div>
                          {leetCodeStats.easyTotal > 0 && (
                            <div className="text-[10px] text-slate-500 mt-0.5 font-sans">of {leetCodeStats.easyTotal}</div>
                          )}
                        </div>
                        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-purple-500/20 text-center">
                          <div className="text-2xl sm:text-3xl font-bold text-[#8B5CF6]">{leetCodeStats.mediumSolved}</div>
                          <div className="text-xs text-slate-400 mt-0.5">Medium</div>
                          {leetCodeStats.mediumTotal > 0 && (
                            <div className="text-[10px] text-slate-500 mt-0.5 font-sans">of {leetCodeStats.mediumTotal}</div>
                          )}
                        </div>
                        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-rose-500/20 text-center">
                          <div className="text-2xl sm:text-3xl font-bold text-[#FF1768]">{leetCodeStats.hardSolved}</div>
                          <div className="text-xs text-slate-400 mt-0.5">Hard</div>
                          {leetCodeStats.hardTotal > 0 && (
                            <div className="text-[10px] text-slate-500 mt-0.5 font-sans">of {leetCodeStats.hardTotal}</div>
                          )}
                        </div>
                      </div>
                    ) : leetCodeLoading ? (
                      <div className="py-6 text-center text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#06D6FF]" />
                        <span>Updating LeetCode stats...</span>
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-xs font-mono text-slate-400">
                        LeetCode statistics temporarily unavailable.
                      </div>
                    )}
                  </div>
                )}

                {/* 5. Important Features List */}
                {project.importantFeatures && project.importantFeatures.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {project.importantFeatures.slice(0, 6).map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs sm:text-sm text-slate-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="font-medium text-slate-200">{feat.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. Technology Stack Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-3 py-1 rounded-xl bg-white/[0.04] text-slate-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* 7. Action Button / External Link Only */}
                {isRaktha && (
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        data-cursor="link"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-[#FF1768] hover:text-white bg-[#FF1768]/10 hover:bg-[#FF1768]/20 border border-[#FF1768]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>Project Website</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        data-cursor="link"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-slate-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>GitHub</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>
                    )}
                  </div>
                )}

                {isCardio && (
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        data-cursor="link"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-[#06D6FF] hover:text-white bg-[#06D6FF]/10 hover:bg-[#06D6FF]/20 border border-[#06D6FF]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>Project Website</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        data-cursor="link"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-slate-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>GitHub</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>
                    )}
                  </div>
                )}

                {isLeetCode && (
                  <div className="pt-4 border-t border-white/10 flex items-center">
                    <a
                      href="https://leetcode.com/u/Mallikarjuna_Boya/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      data-cursor="link"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#06D6FF] to-[#3B82F6] shadow-[0_0_20px_rgba(6,214,255,0.35)] hover:shadow-[0_0_25px_rgba(6,214,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <LeetCodeIcon className="w-4 h-4" />
                      <span>View LeetCode</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ModalErrorBoundary 
        onClose={() => setSelectedProject(null)} 
        title={selectedProject?.title || 'Project Details'}
      >
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </ModalErrorBoundary>
    </section>
  );
};
