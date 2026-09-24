# AGENTS.md

Landing/marketing site for the **Пленка** Android app (the actual app is a separate
project at `github.com/Erzkanzler2k/plenka` — this repo only contains the web page).

## Stack
- Vite + React, plain **JSX**. Single entry `src/main.jsx` (referenced from `index.html`);
  all markup lives there, all CSS in `src/styles.css`. There is **no `vite.config.*`** —
  Vite runs on defaults, `index.html` at the repo root is the entry.
- Although `typescript` is in devDependencies, there is **no `tsconfig.json`** and the
  code is JS/JSX — do not convert to TS or assume typechecking exists.
- Language of all UI copy is **Russian** (`<html lang="ru">`).

## Commands
- `npm run dev` — local dev server (Vite)
- `npm run build` — produce `dist/` (gitignored build output)
- `npm run preview` — serve the built `dist/`
- There is **no test, lint, or typecheck command, no CI (`.github/` absent), no
  pre-commit config**. Do not invent or run them; the only verification is a
  clean `npm run build`.

## Conventions / gotchas
- **App version is hardcoded in ~7 places, all in `src/main.jsx`**: the APK filename
  in `APK_DOWNLOAD_URL`, nav/hero/devices button labels, the `hero-topline`, the
  `kicker`, and the toast text. Find them with `grep -n 'v2\.' src/main.jsx`.
  Change them all together when bumping the release, or the page will show
  inconsistent versions.
- **Static screenshots** (`poster-card.png`, `filters.png`, `typography.png`) live in
  `public/app-screens/` and are referenced by absolute path `/app-screens/...`.
  Keep them in `public/` — Vite serves `public/` at the site root. Do not move them
  into `src/`.
- Download links point to external GitHub release URLs (`APK_DOWNLOAD_URL`,
  `LATEST_RELEASE_URL`); verify they still match the current release when editing.
- **All deps (including `react`, `react-dom`) use `"latest"` and sit in
  `devDependencies`**, so `package-lock.json` is the only pin — always commit it
  alongside `package.json` changes. `dist/` and `node_modules/` are gitignored.
