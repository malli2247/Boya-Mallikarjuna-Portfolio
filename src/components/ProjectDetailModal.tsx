import React, { useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { GlassButton } from './GlassButton';
import { GithubIcon, LeetCodeIcon } from './SocialIcons';
import type { Project } from '../data/portfolioData';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
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

          {/* 4. CURRENT VERIFIED STATISTICS (LeetCode specific) */}
          {isLeetCode && project.compactStats && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#06D6FF]" />
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                  Current Verified Statistics
                </h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center font-mono">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-xl sm:text-2xl font-bold text-white">{project.compactStats.solved}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Problems Solved</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-cyan-500/20">
                  <div className="text-xl sm:text-2xl font-bold text-[#06D6FF]">{project.compactStats.easy}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Easy</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-purple-500/20">
                  <div className="text-xl sm:text-2xl font-bold text-[#8B5CF6]">{project.compactStats.medium}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Medium</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-rose-500/20">
                  <div className="text-xl sm:text-2xl font-bold text-[#FF1768]">{project.compactStats.hard}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Hard</div>
                </div>
                <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-white/[0.03] border border-amber-500/20">
                  <div className="text-xl sm:text-2xl font-bold text-amber-400">{project.compactStats.attempting ?? 2}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Attempting</div>
                </div>
              </div>
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
                {project.githubUrl && (
                  <GlassButton
                    variant="primary"
                    size="sm"
                    href={project.githubUrl}
                    target="_blank"
                    icon={<GithubIcon className="w-3.5 h-3.5" />}
                    iconRight={<ExternalLink className="w-3.5 h-3.5" />}
                  >
                    GitHub
                  </GlassButton>
                )}
                {project.demoUrl && (
                  <GlassButton
                    variant="secondary"
                    size="sm"
                    href={project.demoUrl}
                    target="_blank"
                    iconRight={<ExternalLink className="w-3.5 h-3.5" />}
                  >
                    Live Demo
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
