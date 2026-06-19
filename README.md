# Personal-Website

A resume that cites its sources. The page reads as a clean editorial resume; flip the **Audit**
toggle and a provenance layer overlays every claim — its evidence, a trust tier, and either a
verifiable link or a stated reason the source is confidential.

Live: https://veyroxie.github.io/Personal-Website/

## Stack

SvelteKit + Svelte 5 (runes), TypeScript, static-exported to GitHub Pages.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run check    # type-check
npm run build    # static build into ./build
npm run preview  # serve the production build
```

## Content

All content lives in `src/lib/resume.ts` (the single source of truth). Edit that file — not the
components — to update claims, projects, skills, or links.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to GitHub
Pages. One-time setup: in GitHub → Settings → Pages, set **Source** to **GitHub Actions**.

See `AI_DOCS/grounded-resume.md` for the concept and architecture.
