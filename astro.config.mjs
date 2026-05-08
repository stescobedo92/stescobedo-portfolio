import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

const repository = 'stescobedo-portfolio';
const isGitHubPages = process.env.DEPLOY_TARGET === 'github-pages';

export default defineConfig({
  site: isGitHubPages
    ? `https://stescobedo92.github.io/${repository}`
    : 'http://localhost:4321',
  base: isGitHubPages ? `/${repository}` : '/',
  trailingSlash: 'ignore',
  integrations: [tailwind(), mdx()],
});