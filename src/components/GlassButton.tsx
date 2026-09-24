import React from 'react';
import { cn } from '../lib/utils';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cyan';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  href,
  target,
  rel,
  icon,
  iconRight,
  children,
  className,
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 rounded-lg',
    md: 'text-sm px-5 py-2.5 gap-2 rounded-xl',
    lg: 'text-base px-6 py-3.5 gap-2.5 rounded-xl font-medium',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] border border-purple-400/30',
    cyan:
      'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-950/40 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] border border-cyan-400/30',
    secondary:
      'bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/12 hover:border-white/25 shadow-glass backdrop-blur-md active:scale-[0.98]',
    outline:
      'bg-transparent hover:bg-white/[0.05] text-slate-300 hover:text-white border border-white/15 hover:border-purple-400/40 active:scale-[0.98]',
    ghost:
      'bg-transparent hover:bg-white/[0.06] text-slate-300 hover:text-white active:scale-[0.98]',
  };

  const commonClassNames = cn(
    'inline-flex items-center justify-center font-medium transition-all duration-200 select-none outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060A]',
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        className={commonClassNames}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {iconRight && <span className="shrink-0">{iconRight}</span>}
      </a>
    );
  }

  return (
    <button className={commonClassNames} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
};
