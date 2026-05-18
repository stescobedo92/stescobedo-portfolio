export type GitHubRepoMetadata = {
  repo: string;
  stars: number | null;
  commits: number | null;
  defaultBranch: string | null;
  release: string | null;
  languages: string[];
};

export type GitHubOwnerRepo = {
  name: string;
  fullName: string;
  description: string;
  htmlUrl: string;
  homepage: string | null;
  metadata: GitHubRepoMetadata;
};

export type GitHubPinnedRepo = GitHubOwnerRepo;

export type GitHubUserProfile = {
  avatarUrl: string | null;
  bio: string | null;
  totalRepos: number | null;
};

const apiBase = 'https://api.github.com';
const profileCache = new Map<string, Promise<GitHubUserProfile>>();
const apiHeaders = () => {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  const token = import.meta.env.GITHUB_TOKEN || process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

const parseLastPage = (link: string | null) => {
  if (!link) return null;
  const match = link.match(/<[^>]*[?&]page=(\d+)[^>]*>;\s*rel="last"/);
  return match ? Number(match[1]) : null;
};

const fetchJson = async <T>(path: string): Promise<{ data: T | null; response: Response | null }> => {
  try {
    const response = await fetch(`${apiBase}${path}`, { headers: apiHeaders() });
    if (!response.ok) return { data: null, response };
    return { data: (await response.json()) as T, response };
  } catch {
    return { data: null, response: null };
  }
};

const fetchGraphql = async <T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<{ data: T | null; response: Response | null }> => {
  const token = import.meta.env.GITHUB_TOKEN || process.env.GITHUB_TOKEN;
  if (!token) return { data: null, response: null };

  try {
    const response = await fetch(`${apiBase}/graphql`, {
      method: 'POST',
      headers: {
        ...apiHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });
    if (!response.ok) return { data: null, response };
    const payload = (await response.json()) as { data?: T; errors?: unknown[] };
    if (payload.errors?.length) return { data: null, response };
    return { data: payload.data ?? null, response };
  } catch {
    return { data: null, response: null };
  }
};

const getCommitCount = async (repo: string, defaultBranch: string | null) => {
  if (!defaultBranch) return null;
  const sha = encodeURIComponent(defaultBranch);
  const { data, response } = await fetchJson<unknown[]>(`/repos/${repo}/commits?sha=${sha}&per_page=1`);
  if (!response) return null;
  const lastPage = parseLastPage(response.headers.get('link'));
  if (lastPage !== null) return lastPage;
  return Array.isArray(data) ? data.length : null;
};

const getLanguages = async (repo: string) => {
  const { data } = await fetchJson<Record<string, number>>(`/repos/${repo}/languages`);
  if (!data) return [];
  return Object.entries(data)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([language]) => language);
};

const getAuthenticatedOwnedRepoCount = async (username: string) => {
  const firstPage = await fetchJson<
    {
      full_name?: string;
      owner?: { login?: string };
    }[]
  >('/user/repos?per_page=100&type=owner&sort=pushed&page=1');

  if (!firstPage.response?.ok || !Array.isArray(firstPage.data)) return null;

  const lastPage = parseLastPage(firstPage.response.headers.get('link')) ?? 1;
  const pages =
    lastPage > 1
      ? await Promise.all(
          Array.from({ length: lastPage - 1 }, (_, index) =>
            fetchJson<
              {
                full_name?: string;
                owner?: { login?: string };
              }[]
            >(`/user/repos?per_page=100&type=owner&sort=pushed&page=${index + 2}`),
          ),
        )
      : [];

  return [firstPage, ...pages].reduce((total, page) => {
    if (!Array.isArray(page.data)) return total;
    return (
      total +
      page.data.filter((repo) => repo.owner?.login?.toLowerCase() === username.toLowerCase()).length
    );
  }, 0);
};

export const getRepoMetadata = async (repo: string): Promise<GitHubRepoMetadata> => {
  const fallback: GitHubRepoMetadata = {
    repo,
    stars: null,
    commits: null,
    defaultBranch: null,
    release: null,
    languages: [],
  };

  const { data } = await fetchJson<{
    stargazers_count?: number;
    default_branch?: string;
  }>(`/repos/${repo}`);

  if (!data) return fallback;

  const defaultBranch = data.default_branch ?? null;
  const [{ data: release }, commits, languages] = await Promise.all([
    fetchJson<{ tag_name?: string }>(`/repos/${repo}/releases/latest`),
    getCommitCount(repo, defaultBranch),
    getLanguages(repo),
  ]);

  return {
    repo,
    stars: typeof data.stargazers_count === 'number' ? data.stargazers_count : null,
    commits,
    defaultBranch,
    release: release?.tag_name ?? null,
    languages,
  };
};

export const getReposMetadata = async (repos: string[]) => {
  const uniqueRepos = Array.from(new Set(repos.filter(Boolean)));
  const entries = await Promise.all(uniqueRepos.map(async (repo) => [repo, await getRepoMetadata(repo)] as const));
  return Object.fromEntries(entries) as Record<string, GitHubRepoMetadata>;
};

export const getOwnerReposMetadata = async (
  owner: string,
  excludedRepos: string[],
  limit = 9,
): Promise<GitHubOwnerRepo[]> => {
  const excluded = new Set(excludedRepos.map((repo) => repo.toLowerCase()));
  const { data } = await fetchJson<
    {
      name?: string;
      full_name?: string;
      description?: string | null;
      html_url?: string;
      homepage?: string | null;
      fork?: boolean;
      private?: boolean;
      language?: string | null;
      owner?: { login?: string };
    }[]
  >(`/users/${encodeURIComponent(owner)}/repos?per_page=100&sort=pushed&type=owner`);

  if (!Array.isArray(data)) return [];

  const repos = data
    .filter((repo) => {
      const fullName = repo.full_name?.toLowerCase();
      return (
        Boolean(repo.name && repo.full_name && repo.html_url) &&
        !repo.fork &&
        !repo.private &&
        repo.owner?.login?.toLowerCase() === owner.toLowerCase() &&
        Boolean(fullName && !excluded.has(fullName))
      );
    })
    .slice(0, limit);

  return Promise.all(
    repos.map(async (repo) => {
      const fullName = repo.full_name as string;
      const metadata = await getRepoMetadata(fullName);
      const languages = metadata.languages.length > 0 ? metadata.languages : repo.language ? [repo.language] : [];
      return {
        name: repo.name as string,
        fullName,
        description: repo.description ?? 'A repository on GitHub.',
        htmlUrl: repo.html_url as string,
        homepage: repo.homepage ?? null,
        metadata: {
          ...metadata,
          languages,
        },
      };
    }),
  );
};

const repoFromFullName = async (fullName: string): Promise<GitHubPinnedRepo> => {
  const metadata = await getRepoMetadata(fullName);
  const { data } = await fetchJson<{
    name?: string;
    full_name?: string;
    description?: string | null;
    html_url?: string;
    homepage?: string | null;
    language?: string | null;
  }>(`/repos/${fullName}`);
  const name = data?.name ?? fullName.split('/')[1] ?? fullName;
  const languages = metadata.languages.length > 0 ? metadata.languages : data?.language ? [data.language] : [];

  return {
    name,
    fullName: data?.full_name ?? fullName,
    description: data?.description ?? 'A repository on GitHub.',
    htmlUrl: data?.html_url ?? `https://github.com/${fullName}`,
    homepage: data?.homepage ?? null,
    metadata: {
      ...metadata,
      languages,
    },
  };
};

export const getPinnedReposMetadata = async (
  username: string,
  fallbackRepos: string[],
): Promise<GitHubPinnedRepo[]> => {
  const { data } = await fetchGraphql<{
    user?: {
      pinnedItems?: {
        nodes?: {
          __typename?: string;
          name?: string;
          nameWithOwner?: string;
          description?: string | null;
          url?: string;
          homepageUrl?: string | null;
          stargazerCount?: number;
          primaryLanguage?: { name?: string } | null;
          languages?: { edges?: { size?: number; node?: { name?: string } }[] };
          defaultBranchRef?: { name?: string } | null;
          latestRelease?: { tagName?: string } | null;
        }[];
      };
    };
  }>(
    `query PortfolioPinnedRepos($login: String!) {
      user(login: $login) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            __typename
            ... on Repository {
              name
              nameWithOwner
              description
              url
              homepageUrl
              stargazerCount
              primaryLanguage { name }
              languages(first: 6, orderBy: { field: SIZE, direction: DESC }) {
                edges { size node { name } }
              }
              defaultBranchRef { name }
              latestRelease { tagName }
            }
          }
        }
      }
    }`,
    { login: username },
  );

  const nodes = data?.user?.pinnedItems?.nodes?.filter((node) => node.__typename === 'Repository') ?? [];
  if (nodes.length > 0) {
    return Promise.all(
      nodes.map(async (node) => {
        const fullName = node.nameWithOwner ?? `${username}/${node.name}`;
        const defaultBranch = node.defaultBranchRef?.name ?? null;
        const languages =
          node.languages?.edges
            ?.filter((edge) => edge.node?.name)
            .sort((a, b) => (b.size ?? 0) - (a.size ?? 0))
            .map((edge) => edge.node?.name as string) ?? [];
        const metadata: GitHubRepoMetadata = {
          repo: fullName,
          stars: typeof node.stargazerCount === 'number' ? node.stargazerCount : null,
          commits: await getCommitCount(fullName, defaultBranch),
          defaultBranch,
          release: node.latestRelease?.tagName ?? null,
          languages: languages.length > 0 ? languages : node.primaryLanguage?.name ? [node.primaryLanguage.name] : [],
        };
        return {
          name: node.name ?? fullName.split('/')[1] ?? fullName,
          fullName,
          description: node.description ?? 'A repository on GitHub.',
          htmlUrl: node.url ?? `https://github.com/${fullName}`,
          homepage: node.homepageUrl ?? null,
          metadata,
        };
      }),
    );
  }

  return Promise.all(fallbackRepos.map(repoFromFullName));
};

export const getUserProfile = (
  username: string,
  options: { knownPrivateRepos?: number; totalReposFallback?: number } = {},
): Promise<GitHubUserProfile> => {
  const cached = profileCache.get(
    `${username}:${options.knownPrivateRepos ?? 0}:${options.totalReposFallback ?? 0}`,
  );
  if (cached) return cached;

  const profile = (async () => {
    const { data: publicData } = await fetchJson<{
      avatar_url?: string;
      bio?: string | null;
      public_repos?: number;
    }>(`/users/${encodeURIComponent(username)}`);

    const { data: authenticatedData } = await fetchJson<{
      login?: string;
      public_repos?: number;
      owned_private_repos?: number;
      total_private_repos?: number;
    }>('/user');

    const authenticatedRepoCount =
      authenticatedData?.login?.toLowerCase() === username.toLowerCase()
        ? await getAuthenticatedOwnedRepoCount(username)
        : null;
    const privateRepos =
      authenticatedData?.login?.toLowerCase() === username.toLowerCase()
        ? authenticatedData.owned_private_repos ?? authenticatedData.total_private_repos ?? 0
        : 0;
    const publicRepos =
      authenticatedData?.login?.toLowerCase() === username.toLowerCase()
        ? authenticatedData.public_repos
        : publicData?.public_repos;

    return {
      avatarUrl: publicData?.avatar_url ?? null,
      bio: publicData?.bio ?? null,
      totalRepos:
        typeof authenticatedRepoCount === 'number'
          ? authenticatedRepoCount
          : typeof publicRepos === 'number'
            ? publicRepos + Math.max(privateRepos, options.knownPrivateRepos ?? 0)
            : options.totalReposFallback ?? null,
    };
  })();

  profileCache.set(`${username}:${options.knownPrivateRepos ?? 0}:${options.totalReposFallback ?? 0}`, profile);
  return profile;
};
