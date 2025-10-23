# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a game website template built with Next.js, Nextra (custom theme), and TypeScript. The site showcases games via iframe embeds, supports multiple languages, and is optimized for deployment on Cloudflare Pages. Content is managed through MDX files with frontmatter configuration.

**Key Technologies:** Next.js 14, Nextra 3, TypeScript, Tailwind CSS, next-themes, Supabase (comments), react-share

## Development Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Run development server at http://localhost:3000
pnpm dev

# Build production bundle (Next.js static export)
pnpm build

# Build for Cloudflare Pages deployment
pnpm pages:build

# Generate sitemap (runs automatically after build via postbuild hook)
pnpm postbuild

# Serve production build locally
pnpm start
```

## Environment Variables

Required environment variables (set in `.env.local` for development):
- `NEXT_PUBLIC_SITE_URL` - Full site URL (e.g., "https://genshinwishsimulator.com")
- Supabase credentials (if using comments feature):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Important:** GA and AdSense IDs are currently hard-coded in `pages/_app.tsx:6-7` - should be moved to environment variables for production.

## Architecture & Key Concepts

### Nextra Custom Theme
- This project uses a **custom Nextra theme** located in `src/theme/` rather than the standard Nextra themes
- Theme configuration is in `theme.config.jsx` (controls logo, i18n, dark mode, primary colors, navbar height)
- The custom theme implementation is at `src/theme/index.tsx`
- Layout templates are in `src/theme/layouts/` - each provides a different page structure

### Layout System
The project uses a frontmatter-driven layout system defined in `src/theme/layouts/index.ts`:
- Available layouts: `default`, `featured`, `landing`, `games`, `blog`
- Specify layout in MDX frontmatter: `layout: featured`
- Layout components automatically receive `frontMatter`, `themeConfig`, and `pageMap` props
- Each layout provides different features:
  - `default` (`src/theme/layouts/default.tsx`): Standard game page with iframe embed, breadcrumbs, game carousels, collapsible article, and comments
  - `featured` (`src/theme/layouts/featured.tsx`): Highlighted game showcase with enhanced visuals
  - `landing` (`src/theme/layouts/landing.tsx`): Custom landing page design for home/marketing pages
  - `games` (`src/theme/layouts/games.tsx`): Multi-game category/collection grid page
  - `blog` (`src/theme/layouts/blog.tsx`): Blog-style content layout with article formatting

**Adding a new layout:**
1. Create layout component in `src/theme/layouts/your-layout.tsx`
2. Export it in `src/theme/layouts/index.ts` by adding to the `layouts` object
3. Use in MDX with `layout: your-layout` frontmatter

### Content Structure
- Pages are MDX files in `pages/{locale}/` directories (e.g., `pages/en/`, `pages/zh/`)
- Each MDX file supports frontmatter configuration:
  ```yaml
  ---
  title: Page Title
  layout: default           # Layout template to use
  game: https://game.url    # iframe URL for game embed
  cover: /image.png         # Cover image
  categories: [popular]     # Category tags (used by getGames/getGamesByCategory utils)
  description: SEO text     # Meta description
  keywords: keyword, list   # SEO keywords
  videos: [{...}]           # Video carousel data (optional)
  comments: true            # Enable/disable Supabase comments (default: true)
  ---
  ```

### Navigation System
Navigation is controlled by `_meta.js` files in each locale directory:
- `pages/{locale}/_meta.js` defines navigation structure for that locale
- Each entry specifies: `title`, `type` (page/separator/menu), `icon` (Iconify icon), `href`
- Example structure in `pages/en/_meta.js:1-26`:
  ```js
  export default {
    index: { title: "Home", type: "page", icon: "material-symbols:robot", href: "/en" },
    popular: { title: "Popular Games", type: "page", icon: "material-symbols:trending-up" },
    // ...
  }
  ```
- Icons use Iconify (@iconify/react) - search icons at iconify.design

### Multi-language Support
- Locales configured in `next.config.mjs` i18n section (currently: `["en"]`)
- Locale configuration in `src/config/site.ts` SUPPORTED_LOCALES object (defines htmlLang, ogLocale, titleSuffix)
- UI messages in `src/config/locales/{locale}.ts`
- Import pattern: `import { getLocaleMessages } from '@/config/locales'`
- To add a language:
  1. Add locale to `next.config.mjs` i18n.locales array
  2. Update `theme.config.jsx` i18n array with locale name
  3. Create `src/config/locales/{locale}.ts` with UI strings (copy from `en.ts` and translate)
  4. Export it in `src/config/locales/index.ts`
  5. Add locale config to `src/config/site.ts` SUPPORTED_LOCALES
  6. Create `pages/{locale}/` directory with `_meta.js` and content files
  7. Run build to regenerate sitemap with new locale

### Routing & Special Pages
- `pages/index.tsx:33-35`: Auto-redirects to default locale (`/en`) on mount
- `pages/_app.tsx:1-51`: Global app setup with ThemeProvider, Google Analytics, AdSense scripts
- `pages/_document.tsx`: HTML document structure, sets lang attribute dynamically
- Static pages (no locale prefix): `terms.tsx`, `privacy.tsx`, `change-log.tsx`
- Main theme layout: `src/theme/index.tsx:20-205` handles SEO meta tags, structured data, canonical URLs, and layout selection

### SEO & Structured Data
The site implements comprehensive SEO via `src/theme/index.tsx` and `src/components/StructuredData.tsx`:
- **Meta tags:** Open Graph, Twitter Cards, robots directives, canonical URLs
- **Structured data schemas:**
  - `WebSite` schema for homepage
  - `VideoGame` schema for game pages (when `frontMatter.game` exists)
  - `WebPage` schema for other pages
  - `BreadcrumbList` schema for navigation breadcrumbs
- **Sitemap:** Auto-generated via `next-sitemap.config.js:1-88` with URL priorities from `src/config/site.ts:27-53`
- **Multi-language SEO:** Handled via hreflang tags (currently disabled as only "en" is active)

### Styling
- Uses Tailwind CSS (config in `tailwind.config.js`)
- Global styles in `src/styles/globals.css`
- Theme colors configured in `theme.config.jsx:55-66`:
  - `primaryColor`: Main theme color (default: "#81c869")
  - `backgroundColor.light` / `.dark`: Background colors (both "#1a1a1a" for dark theme)
  - `style.navbarHeight`: Navbar height (default: "5rem" / 80px)
- Dark mode: Forced via `theme.config.jsx:20-23` and `pages/_app.tsx:20-22` (forcedTheme: "dark")
- Component styling: Uses Tailwind utility classes with dark: variants

### Key Utilities
- `src/utils/getGames.ts`: Fetches games from pageMap by category/locale with pagination
- `src/utils/getGamesByCategory.ts`: Filter games by specific category
- `src/utils/pageConfig.ts`: Page configuration utilities
- Breadcrumb hook: `src/hooks/useBreadcrumb.ts` (referenced in layouts)

### Component Organization
- **Shared components** (`src/components/`):
  - `GameFrame`: iframe wrapper for game embeds with responsive sizing
  - `GameCard`, `GameCarousel`: Game display components
  - `GameComments`: Supabase-powered comment system (dynamically imported)
  - `ShareButtons`: Social media sharing (uses react-share)
  - `Header`, `Footer`: Site layout components
  - `Breadcrumb`: Navigation breadcrumb trail
  - `CollapsibleArticle`: Expandable content sections
  - `StructuredData`: JSON-LD schema injection
  - `VideoCarousel`: Video gallery component
- **Layout templates:** `src/theme/layouts/` (see Layout System section)
- **Utilities:** `src/utils/`
- **Type definitions:** `src/types/` (includes FrontMatter, Supabase types)
- **Configuration:** `src/config/` (locales, site config)

## Creating New Pages

1. Create an MDX file in `pages/{locale}/filename.mdx`
2. Add frontmatter with required fields (title, layout, etc.) - see Content Structure section
3. Write content in Markdown/MDX below frontmatter
4. For game pages: set `game: "https://game-url"` to embed via iframe
5. For category pages: set `categories: [category-name]` to enable game filtering
6. Use template examples in `template/` directory as reference (featured.mdx, landing.mdx, categories.mdx)
7. Update `pages/{locale}/_meta.js` to add the page to navigation (if needed)

## Site Configuration

All site-specific settings are centralized in `src/config/site.ts`:
- **SITE_CONFIG:** URL, title, Twitter handle, site name
- **SUPPORTED_LOCALES:** Language configurations (name, htmlLang, ogLocale, titleSuffix)
- **URL_PRIORITIES:** Sitemap priority and changefreq rules (pattern-based matching)
- **DEFAULT_LOCALE:** Primary language (currently "en")

When deploying to a new domain, update `SITE_CONFIG.url` and redeploy to regenerate sitemap.

## Analytics & Tracking

- **Google Analytics:** ID in `pages/_app.tsx:6` (GA_MEASUREMENT_ID), loaded with "afterInteractive" strategy
- **Google AdSense:** ID in `pages/_app.tsx:7` (ADSENSE_ID), loaded with "lazyOnload" strategy
- **Sitemap:** Auto-generated via `next-sitemap.config.js`, runs on postbuild hook
- **Important:** Move GA_MEASUREMENT_ID and ADSENSE_ID to environment variables before production

## Deployment

### Cloudflare Pages (Primary)
- Build command: `pnpm pages:build` (uses `@cloudflare/next-on-pages`)
- Output directory: `.vercel/output/static` (configured in `wrangler.toml:4`)
- Static export mode enabled (`output: "export"` in `next.config.mjs:31`)
- Images are unoptimized for static export compatibility (`next.config.mjs:32-34`)
- Compatibility settings in `wrangler.toml:2-3` (nodejs_compat enabled)

### Environment Setup
- Development: Create `.env.local` with required variables
- Production (Cloudflare): Set environment variables in Pages dashboard
- Required: `NEXT_PUBLIC_SITE_URL`, optional Supabase vars if using comments

## Path Aliases

- `@/` maps to `src/` directory (configured in `tsconfig.json` and `next.config.mjs:40`)
- Always use `@/` imports for cleaner paths (e.g., `import { getLocaleMessages } from '@/config/locales'`)
- Webpack alias configured in `next.config.mjs:39-41`

## Important Configuration Files

- `next.config.mjs`: Next.js config, Nextra setup, i18n, static export, path aliases, rewrites for static pages
- `theme.config.jsx`: Nextra theme customization - logo, colors, i18n menu, UI text functions, dark mode settings
- `next-sitemap.config.js`: Sitemap generation with multi-language support, URL priority rules, robots.txt generation
- `wrangler.toml`: Cloudflare Pages deployment config (project name, compatibility, output dir)
- `package.json`: Scripts and dependencies (note: uses pnpm, not npm/yarn)
- `src/config/site.ts`: Centralized site configuration (URL, locales, SEO priorities)
- `tailwind.config.js`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript compiler options and path aliases

## Common Workflows

### Adding a New Game
1. Create `pages/en/category/game-name.mdx` with frontmatter:
   ```yaml
   ---
   title: Game Name
   layout: default
   game: "https://game-embed-url"
   cover: /images/game-cover.png
   categories: [popular, recommend]  # Choose relevant categories
   description: "Game description for SEO"
   keywords: "game, keyword, list"
   ---
   ```
2. Add game content below frontmatter (gameplay description, tips, etc.)
3. Place cover image in `public/images/`
4. Game will auto-appear in category carousels on other pages (via getGames utility)
5. Optionally add to `_meta.js` for direct navigation link

### Changing Site Branding
1. Update `theme.config.jsx:5` logo component
2. Update `theme.config.jsx:52` siteName
3. Update `theme.config.jsx:55` primaryColor (hex color)
4. Update `src/config/site.ts:83-88` SITE_CONFIG (url, title, siteName)
5. Replace favicon files in `public/` (favicon.ico, favicon-16x16.png, favicon-32x32.png)
6. Rebuild and redeploy

## Testing & Quality Assurance

- No automated test suite currently configured
- Manual testing workflow:
  1. Run `pnpm dev` and verify:
     - Game iframes load correctly
     - Navigation works across locales (if multi-language enabled)
     - Dark mode forced correctly
     - Game carousels populate with correct category filtering
     - Comments load (if Supabase configured)
  2. Run `pnpm build` to check for build errors
  3. Run `pnpm start` and verify production build locally:
     - Static export works correctly
     - Images load (unoptimized mode)
     - All routes are accessible
     - Check `out/` directory structure
- When adding tests, recommended stack: Vitest + React Testing Library for components, Playwright for E2E

## Code Style

- TypeScript with strict mode enabled
- Indentation: 2 spaces (not tabs)
- Quotes: Single quotes for strings, double quotes in JSX
- Semicolons: Required (trailing semicolons)
- Naming conventions:
  - Components: PascalCase (e.g., `GameFrame`, `DefaultLayout`)
  - Utilities/functions: camelCase (e.g., `getGames`, `getLocaleMessages`)
  - Files: kebab-case for assets, PascalCase for components, camelCase for utilities
  - Types/Interfaces: PascalCase (e.g., `FrontMatter`, `LayoutProps`)
- Prefer function components over class components
- Avoid default exports except for Next.js pages and `_meta.js` files
- Use `type` for type aliases, `interface` for object shapes that may be extended

## Architecture Notes

**Data Flow:**
1. MDX files with frontmatter → Nextra pageMap
2. pageMap passed to layouts via props
3. Layouts query pageMap using utilities (`getGames`, `getGamesByCategory`)
4. Main theme (`src/theme/index.tsx`) selects layout based on frontMatter.layout
5. SEO metadata generated from frontMatter + site config
6. Comments loaded from Supabase (if enabled and configured)

**Styling Approach:**
- Forced dark mode (`forcedTheme: "dark"`)
- Background: #1a1a1a globally
- Component-level Tailwind classes with dark: variants (though not needed due to forced mode)
- No light mode currently (to enable: remove `forcedTheme` from theme.config.jsx and _app.tsx)

**Performance:**
- Scripts use optimized loading strategies (lazyOnload for AdSense, afterInteractive for GA)
- GameComments dynamically imported to reduce initial bundle
- Static export for fast CDN delivery
- No image optimization (trade-off for static export compatibility)
