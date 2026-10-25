/**
 * Server-side LeetCode Statistics Fetcher & Cache
 * Fetches real-time public profile data from LeetCode GraphQL API.
 * Includes in-memory caching to avoid rate-limiting.
 */

let memoryCache = {
  data: null,
  timestamp: 0,
};

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

const LEETCODE_GRAPHQL_URL = 'https://leetcode.com/graphql';

const USER_PROFILE_QUERY = `
  query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      username
      profile {
        ranking
        userAvatar
        realName
        reputation
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      badges {
        id
        name
        displayName
        icon
        creationDate
        category
      }
      userCalendar {
        streak
        totalActiveDays
      }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
      badge {
        name
      }
    }
  }
`;

/**
 * Normalizes LeetCode GraphQL payload into a clean, structured object.
 */
function normalizeLeetCodeData(raw, username) {
  const matchedUser = raw?.data?.matchedUser;
  if (!matchedUser) {
    throw new Error(`LeetCode user '${username}' not found or profile is private.`);
  }

  const allQuestions = raw?.data?.allQuestionsCount || [];
  const totalQuestions = allQuestions.find((q) => q.difficulty === 'All')?.count || 0;
  const easyTotal = allQuestions.find((q) => q.difficulty === 'Easy')?.count || 0;
  const mediumTotal = allQuestions.find((q) => q.difficulty === 'Medium')?.count || 0;
  const hardTotal = allQuestions.find((q) => q.difficulty === 'Hard')?.count || 0;

  const acList = matchedUser.submitStatsGlobal?.acSubmissionNum || [];
  const totalSolved = acList.find((s) => s.difficulty === 'All')?.count || 0;
  const easySolved = acList.find((s) => s.difficulty === 'Easy')?.count || 0;
  const mediumSolved = acList.find((s) => s.difficulty === 'Medium')?.count || 0;
  const hardSolved = acList.find((s) => s.difficulty === 'Hard')?.count || 0;

  const totalSubsList = matchedUser.submitStatsGlobal?.totalSubmissionNum || [];
  const totalSubmissions = totalSubsList.find((s) => s.difficulty === 'All')?.submissions || 0;
  const totalAcSubmissions = acList.find((s) => s.difficulty === 'All')?.submissions || 0;

  const acceptanceRate =
    totalSubmissions > 0
      ? ((totalAcSubmissions / totalSubmissions) * 100).toFixed(1) + '%'
      : null;

  const badges = matchedUser.badges || [];
  const latestBadge = badges.length > 0 ? badges[0] : null;

  const contestRanking = raw?.data?.userContestRanking;

  return {
    success: true,
    username: matchedUser.username || username,
    realName: matchedUser.profile?.realName || 'BOYA MALLIKARJUNA',
    profileUrl: `https://leetcode.com/u/${matchedUser.username || username}/`,
    avatar: matchedUser.profile?.userAvatar || null,
    ranking: matchedUser.profile?.ranking || null,
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    totalQuestions,
    easyTotal,
    mediumTotal,
    hardTotal,
    totalSubmissions,
    totalAcSubmissions,
    acceptanceRate,
    streak: matchedUser.userCalendar?.streak || 0,
    activeDays: matchedUser.userCalendar?.totalActiveDays || 0,
    badgesCount: badges.length,
    latestBadge: latestBadge
      ? {
          id: latestBadge.id,
          name: latestBadge.name,
          displayName: latestBadge.displayName || latestBadge.name,
          icon: latestBadge.icon?.startsWith('http')
            ? latestBadge.icon
            : `https://leetcode.com${latestBadge.icon}`,
          creationDate: latestBadge.creationDate,
        }
      : null,
    badges: badges.map((b) => ({
      id: b.id,
      name: b.name,
      displayName: b.displayName || b.name,
      icon: b.icon?.startsWith('http') ? b.icon : `https://leetcode.com${b.icon}`,
      creationDate: b.creationDate,
    })),
    contestRating: contestRanking ? Math.round(contestRanking.rating) : null,
    contestsAttended: contestRanking?.attendedContestsCount || 0,
    contestGlobalRanking: contestRanking?.globalRanking || null,
    lastUpdated: new Date().toISOString(),
    cached: false,
  };
}

/**
 * Fetch from LeetCode GraphQL directly with a timeout
 */
async function fetchFromLeetCode(username) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000);

  try {
    const res = await fetch(LEETCODE_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': `https://leetcode.com/${username}/`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({
        query: USER_PROFILE_QUERY,
        variables: { username },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`LeetCode GraphQL responded with HTTP ${res.status}`);
    }

    const json = await res.json();
    if (json.errors && json.errors.length > 0) {
      throw new Error(`LeetCode GraphQL errors: ${json.errors[0]?.message || 'Unknown error'}`);
    }

    return normalizeLeetCodeData(json, username);
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Public handler function for LeetCode stats retrieval
 * @param {string} [username='Mallikarjuna_Boya']
 * @param {boolean} [forceRefresh=false]
 */
export async function getLeetCodeStats(username = 'Mallikarjuna_Boya', forceRefresh = false) {
  const now = Date.now();

  // Return fresh in-memory cache if valid
  if (!forceRefresh && memoryCache.data && now - memoryCache.timestamp < CACHE_TTL_MS) {
    return {
      status: 200,
      body: {
        ...memoryCache.data,
        cached: true,
      },
    };
  }

  try {
    const freshData = await fetchFromLeetCode(username);

    // Save in memory cache
    memoryCache = {
      data: freshData,
      timestamp: now,
    };

    return {
      status: 200,
      body: freshData,
    };
  } catch (error) {
    console.error(`[LeetCode Service] Error fetching profile for ${username}:`, error.message);

    // If cache is available (even if expired), return stale cache gracefully
    if (memoryCache.data) {
      return {
        status: 200,
        body: {
          ...memoryCache.data,
          cached: true,
          stale: true,
          warning: 'Serving cached statistics due to upstream network issue',
        },
      };
    }

    // Return structured graceful error
    return {
      status: 503,
      body: {
        success: false,
        message: 'LeetCode statistics temporarily unavailable.',
        username,
        error: error.message,
      },
    };
  }
}
