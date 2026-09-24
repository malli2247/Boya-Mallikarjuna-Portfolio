import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * CustomCursor maintains internal mouse coordinate and hover state tracking
 * for interactive elements, 3D tilt, and parallax calculations, while keeping
 * the visual cursor indicator completely hidden in favor of the clean native cursor.
 */
export const CustomCursor: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [_hoverType, setHoverType] = useState<'default' | 'button' | 'project' | 'link'>('default');
  const prefersReduced = useReducedMotion();

  // Primary dot coords
  const dotCoords = useRef({ x: -100, y: -100 });
  // Trailing ring coords
  const ringCoords = useRef({ x: -100, y: -100 });

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReduced) return;

    // Detect touch / coarse devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId: number;

    const handlePointerMove = (e: PointerEvent) => {
      dotCoords.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Check target element to track interactive hover states
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveProject = target.closest('.glass-panel-project, [data-cursor="project"]');
      const interactiveButton = target.closest('button, .btn-interactive, [data-cursor="button"]');
      const interactiveLink = target.closest('a, [data-cursor="link"]');

      if (interactiveProject) {
        setHoverType('project');
      } else if (interactiveButton) {
        setHoverType('button');
      } else if (interactiveLink) {
        setHoverType('link');
      } else {
        setHoverType('default');
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const renderLoop = () => {
      // Smooth interpolation for the coordinates
      const ease = 0.18;
      ringCoords.current.x += (dotCoords.current.x - ringCoords.current.x) * ease;
      ringCoords.current.y += (dotCoords.current.y - ringCoords.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotCoords.current.x}px, ${dotCoords.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible, prefersReduced]);

  if (prefersReduced || !visible) return null;

  // Visual appearance: Hidden completely.
  // The native browser cursor remains visible and all mouse tracking logic stays active.
  return (
    <div
      className="hidden pointer-events-none fixed inset-0 z-[9998] overflow-hidden select-none opacity-0"
      style={{ display: 'none', visibility: 'hidden' }}
      aria-hidden="true"
    >
      <div ref={dotRef} className="hidden" style={{ display: 'none' }} />
      <div ref={ringRef} className="hidden" style={{ display: 'none' }} />
    </div>
  );
};
