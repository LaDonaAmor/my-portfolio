export type GitHubRepo = {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  fork: boolean;
};

function getLiveScreenshot(repo: GitHubRepo): string {
  const target = repo.homepage || repo.html_url;
  return `https://api.microlink.io/?url=${encodeURIComponent(target)}&screenshot=true&meta=false&embed=screenshot.url`;
}

export async function getGitHubProjects() {
  const res = await fetch('https://api.github.com/users/LaDonaAmor/repos');
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }
  const data: GitHubRepo[] = await res.json();
  return data
    .filter((repo) => !repo.fork)
    .map((repo) => ({
      slug: repo.name,
      title: repo.name,
      desc: repo.description ?? 'No description provided',
      impact: repo.language ?? 'Mixed stack',
      category: 'GitHub Project',
      tech: repo.topics?.length ? repo.topics : ['code'],
      screenshot: getLiveScreenshot(repo),
      demo: repo.homepage ?? repo.html_url,
      repo: repo.html_url
    }));
}