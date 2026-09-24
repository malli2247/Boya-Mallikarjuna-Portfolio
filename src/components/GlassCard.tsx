import React from 'react';
import { cn } from '../lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'hover' | 'glow-purple' | 'glow-cyan' | 'solid';
  className?: string;
  glowBorder?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'default',
  className,
  glowBorder = false,
  ...props
}) => {
  const variantStyles = {
    default: 'glass-card',
    hover: 'glass-card glass-card-hover cursor-pointer',
    'glow-purple': 'glass-card border-purple-500/25 shadow-violet-glow/30',
    'glow-cyan': 'glass-card border-cyan-500/25 shadow-cyan-glow/30',
    solid: 'bg-[#090B14]/80 backdrop-blur-xl border border-white/10',
  };

  return (
    <div
      className={cn(
        'relative rounded-2xl p-6 transition-all duration-300',
        variantStyles[variant],
        glowBorder && 'hover:border-purple-400/40 hover:shadow-violet-glow/40',
        className
      )}
      {...props}
    >
      {/* Subtle top edge specular highlight line */}
      <div 
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-t-2xl pointer-events-none"
        aria-hidden="true" 
      />
      {children}
    </div>
  );
};
