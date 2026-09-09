# Anidaku

Anidaku is an original, dark-first anime discovery and watching experience powered by the public **AniList GraphQL API**. It is designed as a fast responsive frontend with local browser persistence for watchlists and watch progress.

## Included

- AniList-powered trending, popular, seasonal, search, detail, relation, and recommendation views.
- Adult-content filtering: AniList adult titles and the Hentai genre are excluded from UI results.
- Responsive navigation with mobile bottom navigation and desktop header.
- Anime detail pages with metadata, studio, genres, recommendations, and episode guide.
- Watch page with episode navigation, progress persistence, player shell, and server status panel.
- Local watchlist and resume progress using namespaced `localStorage` keys.
- Isolated streaming-provider interface for ZokoAnime, MegaPlay, and Vidnest AnimePahe.
- Provider fallback orchestration that only calls explicitly enabled adapter endpoints.
- Accessible focus states, reduced-motion support, loading and error messaging.

## Run locally

```bash
pnpm install
pnpm dev
```

Then open the generated preview URL. Production validation:

```bash
pnpm check
pnpm test
pnpm build
```

## Provider configuration

Provider definitions live in `client/src/lib/providers.ts`. The three requested providers are represented as isolated adapters:

- `zokoanime.video`
- `megaplay.buzz/api`
- `vidnest.fun` with the AnimePahe provider identity

All three provider entries are enabled in the configuration as requested. They still require a documented, permitted `getStream` implementation before playback can resolve a stream; the app deliberately does not invent undocumented endpoints or bypass authentication, DRM, geo-restrictions, access controls, or CAPTCHAs. Provider fallback is ready to use as soon as the approved adapter contracts are supplied.

## Notes

AniList is queried directly from the browser because it does not require a secret API key. Results are cached in-memory for five minutes and filtered before presentation. Watchlist and progress are intentionally local-only in this version, so no database or custom authentication setup is required.

## Deploy to Vercel

This repository includes `vercel.json` configured for the Vite frontend. From the project root:

```bash
pnpm install
pnpm build
npx vercel
```

For a production deployment:

```bash
npx vercel --prod
```

Use the following Vercel settings if configuring the project through the dashboard:

- **Framework preset:** Vite
- **Build command:** `pnpm build`
- **Output directory:** `dist/public`
- **Install command:** `pnpm install`

The rewrite in `vercel.json` sends client-side routes such as `/anime/20958` and `/watch/20958/1` to `index.html`, allowing wouter to handle navigation correctly.
