import React, { useState } from 'react';
import { ArrowUp, Mail, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useToast } from '../components/Toast';
import {
  GithubIcon,
  LinkedinIcon,
  LeetCodeIcon,
  HackerRankIcon,
} from '../components/SocialIcons';

export const Footer: React.FC = () => {
  const { showToast } = useToast();
  const [showLogoTooltip, setShowLogoTooltip] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    showToast('Email copied ✓');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-[#040508]/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between pb-8 border-b border-white/10">
          {/* Col 1: Logo & Tooltip + Brand */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-2 relative">
              {/* Interactive BM Logo with hover tooltip */}
              <div
                className="relative cursor-pointer group"
                onMouseEnter={() => setShowLogoTooltip(true)}
                onMouseLeave={() => setShowLogoTooltip(false)}
                onClick={() => setShowLogoTooltip((prev) => !prev)}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF1768] via-[#8B5CF6] to-[#06D6FF] p-[1.5px] flex items-center justify-center shadow-lg shadow-[#FF1768]/30 group-hover:scale-110 transition-transform">
                  <div className="w-full h-full bg-[#08090D] rounded-full flex items-center justify-center">
                    <span className="font-display font-extrabold text-xs text-transparent bg-gradient-to-r from-[#FF1768] via-[#8B5CF6] to-[#06D6FF] bg-clip-text">
                      BM
                    </span>
                  </div>
                </div>

                {/* Animated Logo Hover Tooltip */}
                {showLogoTooltip && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 rounded-xl bg-black/90 border border-white/20 text-xs font-medium text-white shadow-xl whitespace-nowrap animate-in fade-in zoom-in-95 duration-150 z-20">
                    Boya Mallikarjuna
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-black/90" />
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-display font-bold text-white tracking-tight text-base">
                  Boya Mallikarjuna
                </h4>
                <p className="text-xs text-slate-400 font-mono">
                  AI &amp; ML Engineer • B.Tech CSE
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed font-sans">
              "Building systems that solve real-world problems through intelligent code and machine learning."
            </p>
          </div>

          {/* Col 2: Exact Contact Details */}
          <div className="md:col-span-5 flex items-center justify-center md:justify-start text-xs font-mono">

            {/* Clickable Email with Copy Icon */}
            <div className="flex items-center rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FF1768]/40 transition-colors">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                data-cursor="link"
                className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#FF1768]" />
                <span className="truncate">{PERSONAL_INFO.email}</span>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                data-cursor="button"
                className="p-2 border-l border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-colors rounded-r-xl"
                title="Copy email"
                aria-label="Copy email"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Col 3: Social Icons & Back to Top */}
          <div className="md:col-span-3 flex items-center justify-center md:justify-end gap-2.5">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/10 hover:border-[#FF1768]/50 transition-all hover:scale-110"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/10 hover:border-[#06D6FF]/50 transition-all hover:scale-110"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/10 hover:border-[#8B5CF6]/50 transition-all hover:scale-110"
              aria-label="LeetCode Profile"
            >
              <LeetCodeIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.hackerrank}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/10 hover:border-emerald-400/50 transition-all hover:scale-110"
              aria-label="HackerRank Profile"
            >
              <HackerRankIcon className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              data-cursor="button"
              className="ml-2 p-2.5 rounded-full bg-gradient-to-r from-[#FF1768]/20 to-[#8B5CF6]/20 text-[#06D6FF] hover:text-white border border-white/15 hover:border-[#06D6FF]/50 transition-all hover:scale-110"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Sub-row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 text-center sm:text-left">
          <div>
            © 2026 Boya Mallikarjuna • Uttaranchal University • CGPA 9.30 / 10
          </div>
          <div>
            Designed with Dark Futuristic HUD &amp; Glassmorphism
          </div>
        </div>
      </div>
    </footer>
  );
};
