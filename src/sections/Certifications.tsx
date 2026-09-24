import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';
import { Badge } from '../components/Badge';
import { CERTIFICATIONS, type Certification } from '../data/portfolioData';
import { Award, ExternalLink, CheckCircle, ShieldCheck } from 'lucide-react';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="relative py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <SectionHeader
        badge="Credentials"
        title="Technical Certifications"
        subtitle="Standardized skill evaluations assessing algorithmic accuracy and computer science fundamentals."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CERTIFICATIONS.map((cert: Certification, idx: number) => (
          <GlassCard
            key={idx}
            variant="hover"
            className="p-6 sm:p-7 flex flex-col justify-between border border-white/10 group relative overflow-hidden"
          >
            {/* Top row */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center">
                    <Award className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                      {cert.issuer}
                    </span>
                    <div className="text-xs text-slate-400 font-mono">
                      {cert.date}
                    </div>
                  </div>
                </div>

                <Badge variant="emerald" size="sm" icon={<ShieldCheck className="w-3 h-3 text-emerald-400" />}>
                  Verified
                </Badge>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 tracking-tight group-hover:text-cyan-200 transition-colors">
                {cert.title}
              </h3>

              {/* Skills tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {cert.skillsCovered.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.03] text-slate-300 border border-white/5 flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-3 h-3 text-cyan-400" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                HackerRank Profile
              </span>
              <GlassButton
                variant="outline"
                size="sm"
                href={cert.verifiedUrl}
                target="_blank"
                iconRight={<ExternalLink className="w-3.5 h-3.5 text-cyan-400" />}
              >
                View Profile
              </GlassButton>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};
