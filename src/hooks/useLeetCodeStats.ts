import { useState, useEffect, useCallback, useRef } from 'react';

export interface LeetCodeBadge {
  id: string;
  name: string;
  displayName: string;
  icon: string;
  creationDate?: string;
}

export interface LeetCodeStats {
  success: boolean;
  username: string;
  realName: string;
  profileUrl: string;
  avatar: string | null;
  ranking: number | null;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalQuestions: number;
  easyTotal: number;
  mediumTotal: number;
  hardTotal: number;
  totalSubmissions: number;
  totalAcSubmissions: number;
  acceptanceRate: string | null;
  streak: number;
  activeDays: number;
  badgesCount: number;
  latestBadge: LeetCodeBadge | null;
  badges: LeetCodeBadge[];
  contestRating: number | null;
  contestsAttended: number;
  contestGlobalRanking: number | null;
  lastUpdated: string;
  cached?: boolean;
  stale?: boolean;
}

const STORAGE_KEY = 'bm_leetcode_stats_cache';

export function formatTimeAgo(isoString: string): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSec < 45) return 'Just now';
  if (diffSec < 3600) {
    const mins = Math.floor(diffSec / 60);
    return `${mins}m ago`;
  }
  if (diffSec < 86400) {
    const hours = Math.floor(diffSec / 3600);
    return `${hours}h ago`;
  }
  
  // Return readable date
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function useLeetCodeStats() {
  const [stats, setStats] = useState<LeetCodeStats | null>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed.totalSolved === 'number') {
          return parsed;
        }
      }
    } catch {
      // ignore storage parsing errors
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(!stats);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isFetchingRef = useRef(false);

  const fetchStats = useCallback(async (force = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setIsUpdating(true);

    try {
      const url = `/api/leetcode${force ? '?force=true' : ''}`;
      let res = await fetch(url, {
        headers: { Accept: 'application/json' },
      }).catch(() => null);

      // Fallback to static JSON endpoint on static platforms like GitHub Pages
      if (!res || !res.ok) {
        res = await fetch('./api/leetcode.json', {
          headers: { Accept: 'application/json' },
        }).catch(() => null);
      }

      if (!res || !res.ok) {
        throw new Error(`HTTP ${res?.status || 'unavailable'}`);
      }

      const data: LeetCodeStats = await res.json();
      if (data && data.success && typeof data.totalSolved === 'number') {
        setStats(data);
        setError(null);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch {
          // ignore storage quota errors
        }
      } else {
        throw new Error('Invalid statistics payload');
      }
    } catch (err: any) {
      console.warn('[useLeetCodeStats] Could not refresh LeetCode stats:', err?.message || err);
      // If we don't even have cached stats, show the unavailable message
      if (!stats) {
        setError('LeetCode statistics temporarily unavailable.');
      }
    } finally {
      setIsLoading(false);
      setIsUpdating(false);
      isFetchingRef.current = false;
    }
  }, [stats]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    isLoading,
    isUpdating,
    error,
    refresh: () => fetchStats(true),
  };
}
