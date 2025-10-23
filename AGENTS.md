# Repository Guidelines

## Project Structure & Module Organization
- Next.js + TypeScript app. `pages/` defines routes; keep `_app.tsx` for providers and `_document.tsx` for HTML scaffolding.
- Shared UI lives in `src/components/`, layout blueprints in `src/theme/layouts/`, and site metadata or locales in `src/config/`.
- Helpers belong in `src/utils/` or `src/lib/`; global Tailwind layers start in `src/styles/`.
- Sample MDX content sits in `template/`, and static assets (favicons, ads.txt, imagery) belong in `public/`.
- Deployment files (`wrangler.toml`, `next.config.mjs`, `next-sitemap.config.js`) stay synchronized when domain or CDN settings shift.

## Build, Test, and Development Commands
- `pnpm install` — sync dependencies after lockfile updates.
- `pnpm dev` — run the hot-reloading server at `http://localhost:3000`.
- `pnpm build` — create the production bundle; execute before deploying or submitting infra changes.
- `pnpm start` — serve the compiled bundle for smoke tests.
- `pnpm pages:build` — emulate the Cloudflare Pages bundle; pair with `pnpm postbuild` to refresh sitemap XML.

## Coding Style & Naming Conventions
- Prefer TypeScript function components and avoid default exports unless Next.js routing requires them.
- Match the two-space indentation, single quotes, and trailing semicolons used in `pages/_app.tsx`.
- Components use PascalCase, utilities camelCase, and assets or MDX files kebab-case.
- Import shared modules through the `@/` alias declared in `tsconfig.json` to keep paths short.

## Testing Guidelines
- No automated suite yet; perform manual QA in `pnpm dev`, checking locale routing, iframe loads, and theme toggles.
- For new automated coverage, adopt Vitest + React Testing Library for components and Playwright for E2E; mirror module paths under `src/__tests__/`.
- Before merging, validate `pnpm build && pnpm start` to catch production-only issues.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`feat: add leaderboard banner`) so history stays searchable.
- Keep commits scoped and explain configuration or environment changes in the body when needed.
- Pull requests should include a brief summary, test evidence, linked issues, and UI captures for visual changes.
- Call out new environment variables or secrets so deployment updates are actioned promptly.

## Security & Configuration Tips
- Replace hard-coded GA and AdSense IDs in `pages/_app.tsx` with environment variables before production use.
- Apply domain or analytics changes consistently across `next.config.mjs`, `wrangler.toml`, and `next-sitemap.config.js` to avoid drift.
