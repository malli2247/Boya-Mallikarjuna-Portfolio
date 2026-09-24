import { useState, useEffect } from 'react';

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export interface GithubProfile {
  login: string;
  name: string;
  bio: string | null;
  public_repos: number;
  avatar_url: string;
  html_url: string;
}

export function useGithubData(username: string = 'malli2247') {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchGithub() {
      setLoading(true);
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
        ]);

        if (!profileRes.ok) {
          throw new Error(`GitHub API status: ${profileRes.status}`);
        }

        const profileData = await profileRes.json();
        const reposData = reposRes.ok ? await reposRes.json() : [];

        if (isMounted) {
          setProfile({
            login: profileData.login,
            name: profileData.name || 'Boya Mallikarjuna',
            bio: profileData.bio,
            public_repos: profileData.public_repos,
            avatar_url: profileData.avatar_url,
            html_url: profileData.html_url,
          });

          if (Array.isArray(reposData)) {
            setRepos(reposData.map((r: any) => ({
              id: r.id,
              name: r.name,
              description: r.description,
              html_url: r.html_url,
              stargazers_count: r.stargazers_count,
              forks_count: r.forks_count,
              language: r.language,
              updated_at: r.updated_at
            })));
          }
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Unable to fetch GitHub live data');
          // Fallback minimal real data without fake stats
          setProfile({
            login: username,
            name: 'Boya Mallikarjuna',
            bio: 'AI/ML & Software Developer',
            public_repos: 6,
            avatar_url: 'https://avatars.githubusercontent.com/u/144983050?v=4',
            html_url: `https://github.com/${username}`,
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchGithub();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return { profile, repos, loading, error };
}
