export interface LeetCodeBadge {
  id: string;
  name: string;
  displayName: string;
  icon: string;
  creationDate: string;
}

export interface LeetCodeStatsResponse {
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
  cached: boolean;
  stale?: boolean;
  warning?: string;
  message?: string;
}

export declare function getLeetCodeStats(
  username?: string,
  forceRefresh?: boolean
): Promise<{
  status: number;
  body: LeetCodeStatsResponse;
}>;
