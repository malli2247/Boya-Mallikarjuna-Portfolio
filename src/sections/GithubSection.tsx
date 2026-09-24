import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';
import { Badge } from '../components/Badge';
import { useGithubData } from '../hooks/useGithubData';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  ExternalLink,
  GitBranch,
  Star,
  RefreshCw,
  FolderGit2,
} from 'lucide-react';
import {
  GithubIcon,
  LinkedinIcon,
  LeetCodeIcon,
  HackerRankIcon,
} from '../components/SocialIcons';

export const GithubSection: React.FC = () => {
  const { profile, repos, loading, error } = useGithubData('malli2247');

  const platforms = [
    {
      name: 'GitHub',
      handle: '@malli2247',
      url: PERSONAL_INFO.socials.github,
      desc: 'Open-source repositories, ML pipelines, and full-stack software architectures.',
      icon: <GithubIcon className="w-5 h-5 text-white" />,
      accentColor: 'border-purple-500/30 hover:border-purple-400',
      badge: 'Code Repository',
    },
    {
      name: 'LeetCode',
      handle: 'Mallikarjuna_Boya',
      url: PERSONAL_INFO.socials.leetcode,
      desc: '200+ solved algorithmic problems with verified submissions in Python.',
      icon: <LeetCodeIcon className="w-5 h-5 text-amber-400" />,
      accentColor: 'border-amber-500/30 hover:border-amber-400',
      badge: '200+ Solved',
    },
    {
      name: 'HackerRank',
      handle: 'boyamallikarjun4',
      url: PERSONAL_INFO.socials.hackerrank,
      desc: 'Certified Software Engineer Intern & Problem Solving (Intermediate).',
      icon: <HackerRankIcon className="w-5 h-5 text-emerald-400" />,
      accentColor: 'border-emerald-500/30 hover:border-emerald-400',
      badge: 'Certified',
    },
    {
      name: 'LinkedIn',
      handle: 'mallikarjuna-boya',
      url: PERSONAL_INFO.socials.linkedin,
      desc: 'Professional engineering network, project demonstrations, and collegiate updates.',
      icon: <LinkedinIcon className="w-5 h-5 text-cyan-400" />,
      accentColor: 'border-cyan-500/30 hover:border-cyan-400',
      badge: 'Network',
    },
  ];

  return (
    <section id="developer-activity" className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <SectionHeader
        badge="Developer Ecosystem"
        title="Code. Build. Learn. Repeat."
        subtitle="Connected across coding platforms and open source repositories with transparent, real-time activity."
      />

      {/* 4 Interactive Glass Platform Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {platforms.map((plat) => (
          <GlassCard
            key={plat.name}
            variant="hover"
            className={`p-5 sm:p-6 flex flex-col justify-between border ${plat.accentColor} transition-all duration-300 group`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 group-hover:scale-110 transition-transform">
                  {plat.icon}
                </div>
                <Badge variant="neutral" size="sm">
                  {plat.badge}
                </Badge>
              </div>

              <h3 className="text-lg font-bold text-white mb-0.5 tracking-tight group-hover:text-cyan-200 transition-colors">
                {plat.name}
              </h3>
              <p className="text-xs font-mono text-cyan-400 mb-3 truncate">
                {plat.handle}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {plat.desc}
              </p>
            </div>

            <GlassButton
              variant="outline"
              size="sm"
              href={plat.url}
              target="_blank"
              className="w-full justify-between"
              iconRight={<ExternalLink className="w-3.5 h-3.5" />}
            >
              Visit Profile
            </GlassButton>
          </GlassCard>
        ))}
      </div>

      {/* Dynamic Real GitHub Repositories Container */}
      <GlassCard className="p-6 sm:p-8 border border-white/10 relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
              <FolderGit2 className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Public Repositories
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  Live GitHub API
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Target: github.com/{profile?.login || 'malli2247'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <GlassButton
              variant="secondary"
              size="sm"
              href={`https://github.com/${profile?.login || 'malli2247'}`}
              target="_blank"
              icon={<GithubIcon className="w-3.5 h-3.5" />}
              iconRight={<ExternalLink className="w-3 h-3" />}
            >
              View on GitHub
            </GlassButton>
          </div>
        </div>

        {/* Live Repositories List */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400 text-sm font-mono">
            <RefreshCw className="w-5 h-5 animate-spin text-purple-400" />
            <span>Fetching live repository telemetry from GitHub...</span>
          </div>
        ) : repos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-white/[0.025] hover:bg-white/[0.06] border border-white/10 hover:border-purple-400/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 truncate">
                      <GitBranch className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="truncate">{repo.name}</span>
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-cyan-300 shrink-0 transition-colors" />
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                    {repo.description || 'Public engineering repository and algorithmic implementations.'}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/5">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    {repo.language || 'Code'}
                  </span>
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1 text-amber-300">
                      <Star className="w-3 h-3 fill-amber-300" />
                      {repo.stargazers_count}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-slate-400 font-mono">
            {error ? 'Displaying verified repository archive.' : 'No public repositories found.'}
          </div>
        )}
      </GlassCard>
    </section>
  );
};
