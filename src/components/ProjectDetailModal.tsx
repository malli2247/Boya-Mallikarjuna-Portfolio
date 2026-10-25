import React, { useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { GlassButton } from './GlassButton';
import { GithubIcon, LeetCodeIcon } from './SocialIcons';
import type { Project } from '../data/portfolioData';
import { useLeetCodeStats, formatTimeAgo } from '../hooks/useLeetCodeStats';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const { 
    stats: leetCodeStats, 
    isLoading: leetCodeLoading, 
    isUpdating: leetCodeUpdating, 
    error: leetCodeError 
  } = useLeetCodeStats();

  // Prevent background scrolling while modal is open, restore previous scroll when closed
  useEffect(() => {
    if (!project) return;

    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  // Unconditional hook check before render
  if (!project) return null;

  const isLeetCode = project.id === 'leetcode-solutions';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/80 backdrop-blur-md animate-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
    >
      <div
        className="relative w-full max-w-4xl h-auto max-h-[85vh] overflow-y-auto rounded-3xl bg-[#08090E]/95 border border-white/12 shadow-2xl shadow-purple-950/20 text-slate-100 flex flex-col animate-modal-scale"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= MODAL HEADER ================= */}
        <div className="sticky top-0 z-30 flex items-start justify-between px-6 py-4 sm:px-8 sm:py-5 bg-[#08090E]/95 backdrop-blur-xl border-b border-white/10 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FF1768]/15 border border-[#FF1768]/30 text-[#FF1768]">
                PROJECT {project.number}
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#06D6FF] font-semibold">
                {project.category}
              </span>
            </div>
            <h3
              id="project-detail-title"
              className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight"
            >
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-transparent bg-gradient-to-r from-[#FF1768] via-[#8B5CF6] to-[#06D6FF] bg-clip-text">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-colors shrink-0 ml-4"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ================= MODAL BODY ================= */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* 1. SHORT PROJECT DESCRIPTION */}
          <div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* 2. PROBLEM */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FF1768]" />
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#FF1768] font-bold">
                Problem
              </h4>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.problem}
            </p>

            {project.problemBullets && project.problemBullets.length > 0 && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {project.problemBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <AlertCircle className="w-3.5 h-3.5 text-[#FF1768] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 3. PROPOSED SOLUTION */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#06D6FF]" />
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#06D6FF] font-bold">
                Proposed Solution
              </h4>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.solution}
            </p>

            {project.solutionCapabilities && project.solutionCapabilities.length > 0 && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {project.solutionCapabilities.map((cap, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#06D6FF] shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 4. LEETCODE PROGRESS (Live Auto-Sync from LeetCode Profile) */}
          {isLeetCode && (
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#06D6FF]" />
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold">
                    LeetCode Progress
                  </h4>
                  {leetCodeUpdating && (
                    <span className="text-[10px] font-mono text-[#06D6FF] animate-pulse flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Updating LeetCode stats...
                    </span>
                  )}
                </div>

                {leetCodeStats?.lastUpdated && (
                  <div className="text-[11px] font-mono text-slate-400">
                    Last updated: <span className="text-slate-300 font-medium">{formatTimeAgo(leetCodeStats.lastUpdated)}</span>
                  </div>
                )}
              </div>

              {leetCodeLoading && !leetCodeStats && (
                <div className="py-6 text-center text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#06D6FF]" />
                  <span>Updating LeetCode stats...</span>
                </div>
              )}

              {leetCodeError && !leetCodeStats && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>LeetCode statistics temporarily unavailable.</span>
                </div>
              )}

              {leetCodeStats && (
                <>
                  {/* Primary 4 Problem Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center font-mono">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="text-2xl font-bold text-white tracking-tight">{leetCodeStats.totalSolved}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Problems Solved</div>
                      {leetCodeStats.totalQuestions > 0 && (
                        <div className="text-[10px] text-slate-500 mt-0.5 font-sans">of {leetCodeStats.totalQuestions}</div>
                      )}
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-cyan-500/20">
                      <div className="text-2xl font-bold text-[#06D6FF] tracking-tight">{leetCodeStats.easySolved}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Easy</div>
                      {leetCodeStats.easyTotal > 0 && (
                        <div className="text-[10px] text-slate-500 mt-0.5 font-sans">of {leetCodeStats.easyTotal}</div>
                      )}
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-purple-500/20">
                      <div className="text-2xl font-bold text-[#8B5CF6] tracking-tight">{leetCodeStats.mediumSolved}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Medium</div>
                      {leetCodeStats.mediumTotal > 0 && (
                        <div className="text-[10px] text-slate-500 mt-0.5 font-sans">of {leetCodeStats.mediumTotal}</div>
                      )}
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-rose-500/20">
                      <div className="text-2xl font-bold text-[#FF1768] tracking-tight">{leetCodeStats.hardSolved}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Hard</div>
                      {leetCodeStats.hardTotal > 0 && (
                        <div className="text-[10px] text-slate-500 mt-0.5 font-sans">of {leetCodeStats.hardTotal}</div>
                      )}
                    </div>
                  </div>

                  {/* Secondary Telemetry Grid: Global Ranking, Streak, Active Days, Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex flex-col justify-between">
                      <span className="text-[10px] uppercase text-slate-400">Global Ranking</span>
                      <span className="text-sm font-bold text-white mt-1">
                        {leetCodeStats.ranking ? `#${leetCodeStats.ranking.toLocaleString()}` : 'Top Tier'}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex flex-col justify-between">
                      <span className="text-[10px] uppercase text-slate-400">Current Streak</span>
                      <span className="text-sm font-bold text-emerald-400 mt-1">
                        {leetCodeStats.streak ? `${leetCodeStats.streak} Days 🔥` : 'Active'}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex flex-col justify-between">
                      <span className="text-[10px] uppercase text-slate-400">Active Days</span>
                      <span className="text-sm font-bold text-cyan-300 mt-1">
                        {leetCodeStats.activeDays ? `${leetCodeStats.activeDays} Days` : 'Consistent'}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex flex-col justify-between">
                      <span className="text-[10px] uppercase text-slate-400">Badges</span>
                      <span className="text-sm font-bold text-amber-400 mt-1">
                        {leetCodeStats.badgesCount ? `${leetCodeStats.badgesCount} Badges 🏆` : 'Earned'}
                      </span>
                    </div>
                  </div>

                  {/* Additional Live Metrics: Contest Rating, Contests Attended, Total Submissions, Latest Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] font-mono text-slate-400">
                    <div className="flex flex-wrap items-center gap-3">
                      <span>Rating: <strong className="text-slate-200">{leetCodeStats.contestRating ?? 'Active Competitor'}</strong></span>
                      <span>•</span>
                      <span>Contests: <strong className="text-slate-200">{leetCodeStats.contestsAttended}</strong></span>
                      <span>•</span>
                      <span>Total Submissions: <strong className="text-slate-200">{leetCodeStats.totalSubmissions.toLocaleString()}</strong></span>
                      {leetCodeStats.acceptanceRate && (
                        <>
                          <span>•</span>
                          <span>Acceptance: <strong className="text-emerald-400">{leetCodeStats.acceptanceRate}</strong></span>
                        </>
                      )}
                    </div>
                    {leetCodeStats.latestBadge && (
                      <div className="flex items-center gap-1.5 text-amber-300/90">
                        <span>Latest:</span>
                        <span className="font-semibold">{leetCodeStats.latestBadge.displayName}</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* 5. IMPORTANT FEATURES */}
          {project.importantFeatures && project.importantFeatures.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                  Important Features
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.importantFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="text-xs font-bold text-white mb-1 flex items-center gap-1.5 font-display">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#06D6FF]" />
                      {feat.title}
                    </div>
                    {feat.description && (
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {feat.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. TECHNOLOGY STACK */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Technology Stack:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ================= MODAL FOOTER & LINKS ================= */}
        <div className="px-6 py-4 sm:px-8 sm:py-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#08090E]/95 backdrop-blur-xl shrink-0">
          <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Built by Boya Mallikarjuna</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <GlassButton variant="ghost" size="sm" onClick={onClose}>
              Close
            </GlassButton>

            {/* LeetCode Links */}
            {isLeetCode && (
              <>
                <GlassButton
                  variant="primary"
                  size="sm"
                  href="https://leetcode.com/u/Mallikarjuna_Boya/"
                  target="_blank"
                  icon={<LeetCodeIcon className="w-3.5 h-3.5" />}
                  iconRight={<ExternalLink className="w-3.5 h-3.5" />}
                >
                  View LeetCode
                </GlassButton>
                {project.githubUrl && (
                  <GlassButton
                    variant="secondary"
                    size="sm"
                    href={project.githubUrl}
                    target="_blank"
                    icon={<GithubIcon className="w-3.5 h-3.5" />}
                    iconRight={<ExternalLink className="w-3.5 h-3.5" />}
                  >
                    GitHub
                  </GlassButton>
                )}
              </>
            )}

            {/* Other Projects Links */}
            {!isLeetCode && (
              <>
                {(project.projectUrl || project.demoUrl) && (
                  <GlassButton
                    variant="primary"
                    size="sm"
                    href={project.projectUrl || project.demoUrl}
                    target="_blank"
                    iconRight={<ExternalLink className="w-3.5 h-3.5" />}
                  >
                    View Project
                  </GlassButton>
                )}
                {project.githubUrl && (
                  <GlassButton
                    variant="secondary"
                    size="sm"
                    href={project.githubUrl}
                    target="_blank"
                    icon={<GithubIcon className="w-3.5 h-3.5" />}
                    iconRight={<ExternalLink className="w-3.5 h-3.5" />}
                  >
                    GitHub
                  </GlassButton>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
