import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const MouseSpotlight: React.FC = () => {
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: -500, y: -500 });
  const [isVisible, setIsVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    // Only enable on pointer-fine devices (desktop mice)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId: number;

    const handlePointerMove = (e: PointerEvent) => {
      rafId = requestAnimationFrame(() => {
        setCoords({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);
      });
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [isVisible, prefersReduced]);

  if (prefersReduced || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[2] transition-opacity duration-500 ease-out"
      style={{
        left: `${coords.x}px`,
        top: `${coords.y}px`,
        transform: 'translate(-50%, -50%)',
        width: '650px',
        height: '650px',
        background:
          'radial-gradient(circle at center, rgba(139, 92, 246, 0.08) 0%, rgba(6, 214, 255, 0.03) 30%, transparent 65%)',
      }}
      aria-hidden="true"
    />
  );
};
