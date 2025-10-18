# Tastify — Digital Menu

This repository contains a small frontend for a digital restaurant menu built with Vite + React + TypeScript. It is configured to build as a static site that can be hosted on GitHub Pages.

Requirements
- Node.js (16+ recommended)
- npm (or yarn)

Quick start (development)

PowerShell / Windows:

```powershell
npm install
npm run dev
# open http://localhost:3000
```

Build for production

```powershell
npm run build
# output is in the `dist` folder
```

Deploy to GitHub Pages

This repo includes a deploy script that uses the `gh-pages` package to publish the `dist` folder to GitHub Pages.

```powershell
npm install --save-dev gh-pages
npm run deploy
```

Notes for GitHub Pages compatibility
- Vite `base` is set to `./` so the site works when served from a subpath.
- `homepage` in `package.json` is set to `./` to help some tools.
- If your repository uses a custom domain or GitHub organization/user pages, adjust the `homepage` field accordingly.

Missing assets / runtime data
- The UI expects some assets in `assets/` (images, CSS, JS) and a dynamic menu loader (`assets/js/menu.js`). If those are missing the page may show a loading message or be unstyled. Add the required assets to the `assets/` folder in the project root.

Troubleshooting
- If `npm run dev` fails, make sure Node.js is installed and your PATH is set.
- If `npm run deploy` fails, ensure you have rights to push to the repository and that `gh-pages` is installed.

What I set up
- Vite config updated to use `base: './'` for relative paths.
- `package.json` updated with `predeploy`/`deploy` scripts.

If you want, I can:
- create a minimal `assets/js/menu.js` and `assets/css/style.css` so the page renders fully locally,
- produce a screenshot of the running site,
- or run the dev server here and capture console output.
