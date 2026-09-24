import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  duration = 2000,
}) => {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'hidden'>('visible');
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // If user prefers reduced motion, shorten loading sequence
    const holdDuration = prefersReduced ? 1000 : duration;

    const timer = setTimeout(() => {
      setPhase('fading');
      const cleanupTimer = setTimeout(() => {
        setPhase('hidden');
        if (onComplete) onComplete();
      }, 650);

      return () => clearTimeout(cleanupTimer);
    }, holdDuration);

    return () => clearTimeout(timer);
  }, [duration, onComplete, prefersReduced]);

  if (phase === 'hidden') return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#000000] flex items-center justify-center select-none pointer-events-auto transition-all duration-700 ease-out ${
        phase === 'fading' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="System Initializing"
      role="status"
    >
      {/* Center container */}
      <div className="relative flex items-center justify-center w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]">
        {/* SVG Animated Incomplete Circular Ring */}
        <svg
          viewBox="0 0 160 160"
          className={`absolute inset-0 w-full h-full ${
            prefersReduced ? 'animate-pulse' : 'animate-spin'
          }`}
          style={{
            animationDuration: prefersReduced ? '2s' : '2.8s',
            animationTimingFunction: 'linear',
          }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ringGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF1768" />
              <stop offset="40%" stopColor="#8B5CF6" />
              <stop offset="75%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#06D6FF" />
            </linearGradient>

            <linearGradient id="ringGradSecondary" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06D6FF" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#FF1768" />
            </linearGradient>

            <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Primary Incomplete Arc Segments (approx 3 separated arcs) */}
          <circle
            cx="80"
            cy="80"
            r="68"
            fill="none"
            stroke="url(#ringGradPrimary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="135 45 75 40"
            filter="url(#glowFilter)"
            opacity="0.95"
          />

          {/* Secondary Faint Outer Accent Arc (Counter-rotating feel) */}
          <circle
            cx="80"
            cy="80"
            r="75"
            fill="none"
            stroke="url(#ringGradSecondary)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeDasharray="40 110 30 115"
            opacity="0.45"
          />
        </svg>

        {/* Ambient Subtle Radial Glow behind BM */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF1768]/15 via-[#8B5CF6]/15 to-[#06D6FF]/15 blur-xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Center BM Initials (No circular background) */}
        <div className="relative z-10 flex items-center justify-center tracking-tight">
          <span
            className="font-display font-extrabold text-[30px] sm:text-[36px] tracking-tight bg-gradient-to-r from-[#FF1768] via-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,23,104,0.45)] select-none"
          >
            BM
          </span>
        </div>
      </div>
    </div>
  );
};
