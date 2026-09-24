import React from 'react';
import { cn } from '../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'cyan' | 'blue' | 'neutral' | 'emerald';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className,
}) => {
  const variantStyles = {
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/25',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
    blue: 'bg-blue-500/10 text-blue-300 border-blue-500/25',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    neutral: 'bg-white/[0.05] text-slate-300 border-white/10',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 font-mono gap-1',
    md: 'text-xs px-3 py-1 font-mono gap-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border backdrop-blur-md font-medium tracking-wide transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
