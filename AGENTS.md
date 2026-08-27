# AGENTS.md

Landing/marketing site for the **Пленка** Android app (the actual app is a separate
project at `github.com/Erzkanzler2k/plenka` — this repo only contains the web page).

## Stack
- Vite + React, plain **JSX** (`src/main.jsx` is the single entry). Although
  `typescript` is in devDependencies, there is **no `tsconfig.json`** and the
  code is JS/JSX — do not convert to TS or assume typechecking exists.
- Language of all UI copy is **Russian**.

## Commands
- `npm run dev` — local dev server (Vite)
- `npm run build` — produce `dist/` (gitignored build output)
- `npm run preview` — serve the built `dist/`
- There is **no test, lint, or typecheck** command. Do not invent or run them.

## Conventions / gotchas
- **App version is hardcoded in many places.** The APK version `v2.2.1` appears in
  `src/main.jsx` (download URL, button labels, toast text). Change them all
  together when bumping the release, or the page will show inconsistent versions.
- **Static images** (`app-screens/*.png`) live in `public/app-screens/` and are
  referenced by absolute path `/app-screens/...`. Keep them in `public/` — Vite
  serves `public/` at the site root. Do not move them into `src/`.
- Download links point to external GitHub release URLs (`APK_DOWNLOAD_URL`,
  `LATEST_RELEASE_URL`); verify they still match the current release when editing.
- `dist/` and `node_modules/` are gitignored; `dependencies` use `"latest"`, so the
  lockfile is the only pin. Commit `package-lock.json` for reproducibility.
