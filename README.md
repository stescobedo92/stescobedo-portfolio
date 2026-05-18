# Welcome to my personal portfolio made with [Astro](https://astro.build)

[![Deploy to GitHub Pages](https://github.com/stescobedo92/stescobedo-portfolio/actions/workflows/deploy.yml/badge.svg?branch=master)](https://github.com/stescobedo92/stescobedo-portfolio/actions/workflows/deploy.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/f1843007-682e-4ff0-8e47-766e7bd1bf68/deploy-status)](https://app.netlify.com/projects/stescobedo/deploys)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fstescobedo.com&label=stescobedo.com)](https://stescobedo.com)
[![Astro](https://img.shields.io/github/package-json/dependency-version/stescobedo92/stescobedo-portfolio/astro?label=astro)](https://astro.build)
[![Repo size](https://img.shields.io/github/repo-size/stescobedo92/stescobedo-portfolio)](https://github.com/stescobedo92/stescobedo-portfolio)
[![Last commit](https://img.shields.io/github/last-commit/stescobedo92/stescobedo-portfolio)](https://github.com/stescobedo92/stescobedo-portfolio/commits/master)

<p>
  <a href="https://stescobedo.com">
    <img alt="Portfolio" src="https://img.shields.io/badge/Portfolio-stescobedo.com-16f2c2?style=for-the-badge">
  </a>
  <a href="https://github.com/stescobedo92">
    <img alt="GitHub" src="https://img.shields.io/badge/GitHub-stescobedo92-181717?style=for-the-badge&logo=github">
  </a>
  <a href="https://www.linkedin.com/in/sergio-triana-escobedo-81a452b9/">
    <img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-Sergio%20Triana-0A66C2?style=for-the-badge&logo=linkedin">
  </a>
  <a href="https://stackoverflow.com/users/stescobedo92">
    <img alt="Stack Overflow" src="https://img.shields.io/badge/Stack%20Overflow-stescobedo92-F58025?style=for-the-badge&logo=stackoverflow&logoColor=white">
  </a>
</p>

<img align="right" width="260" src="./public/ste-avatar.jpeg" alt="Sergio Triana Escobedo" />

Welcome to my corner of the internet. This repository contains the source code for my personal portfolio and blog: a small, fast Astro site that presents my work, professional experience, technical writing, and selected open source projects.

The site is intentionally built as a developer-oriented portfolio. It uses an editor-inspired interface, bilingual content support, GitHub metadata, and deployment targets for both Netlify and GitHub Pages.

Feel free to explore the code, read the articles, or reach out if you want to collaborate on a product, platform, automation, or developer tooling project.

## My Social Links

- [Portfolio](https://stescobedo.com)
- [GitHub](https://github.com/stescobedo92)
- [LinkedIn](https://www.linkedin.com/in/sergio-triana-escobedo-81a452b9/)
- [Stack Overflow](https://stackoverflow.com/users/stescobedo92)

## Project Structure

This is a single Astro application using npm, Tailwind CSS, MDX content, and static assets served from `public/`.

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Pages workflow
├── public/                   # Images, logos, avatars, and static assets
├── src/
│   ├── components/           # Portfolio UI and shared Astro components
│   ├── content/
│   │   └── blog/             # MDX blog posts
│   ├── data/
│   │   └── portfolio.ts      # Profile, skills, experience, and project data
│   ├── layouts/              # Site shell and shared layout
│   ├── lib/                  # GitHub metadata and content helpers
│   ├── pages/                # Astro routes
│   └── styles/               # Global styles
├── astro.config.mjs          # Astro configuration
├── package.json              # npm scripts and dependencies
└── README.md
```

## Commands

All commands are run from the root of the project using npm:

| Command | Action |
| :-- | :-- |
| `npm install` | Installs dependencies |
| `npm run dev` | Starts the local development server at `localhost:4321` |
| `npm run build` | Builds the production site into `./dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run astro -- --help` | Shows Astro CLI help |

## Featured Work

The portfolio highlights the repositories pinned on my GitHub profile and enriches them with live metadata when available.

| Repository | Focus |
| :-- | :-- |
| [vscode-binary-coffee](https://github.com/stescobedo92/vscode-binary-coffee) | Binary Coffee snippets for writing articles |
| [ScheduleYourTask](https://github.com/stescobedo92/ScheduleYourTask) | Task scheduling package |
| [apppass](https://github.com/stescobedo92/apppass) | Rust command-line password utility |
| [OpenWeatherPlace](https://github.com/stescobedo92/OpenWeatherPlace) | Weather application using OpenWeatherMap API |
| [unique_ptr](https://github.com/stescobedo92/unique_ptr) | Rust library inspired by C++ ownership semantics |
| [wallpaper](https://github.com/stescobedo92/wallpaper) | C++ desktop wallpaper utility |

## Deployment

The project is deployed to two targets:

| Target | URL | Notes |
| :-- | :-- | :-- |
| Netlify | [stescobedo.com](https://stescobedo.com) | Primary custom domain |
| GitHub Pages | [stescobedo92.github.io/stescobedo-portfolio](https://stescobedo92.github.io/stescobedo-portfolio/) | Automated from `master` |

GitHub Pages builds use `DEPLOY_TARGET=github-pages` so Astro can generate the correct base path. Netlify builds use the standard Astro output in `dist`.

## Built With

- [Astro](https://astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [MDX](https://mdxjs.com)
- [GitHub Actions](https://github.com/features/actions)
- [Netlify](https://www.netlify.com)

## About

This portfolio belongs to [Sergio Triana Escobedo](https://github.com/stescobedo92), a Full Stack Developer based in Cuernavaca, Mexico, focused on reliable software, backend platforms, automation, developer experience, and systems-oriented tooling.
