# Personal-Website

A resume that cites its sources. The page reads as a clean editorial resume; flip the **Audit**
toggle and a provenance layer overlays every claim — its evidence, a trust tier, and either a
verifiable link or a stated reason the source is confidential.

Live: TODO (ebstract.ly, pointed at the Worker in Phase 4)

## Stack

SvelteKit + Svelte 5 (runes), TypeScript, prerendered and served by a Cloudflare Worker with
static assets. The isometric room build is in progress on this branch; its decisions are logged in
`docs/decisions.md` and the visual reference lives in `prototype/` until the scenes are ported.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run check    # type-check
npm run build    # build into .svelte-kit/cloudflare
npm run preview  # serve the production build through a local Worker (wrangler dev)
```

## Content

Resume claims, skills and links live in `src/lib/resume.ts`. The room's case studies live in
`src/content/projects/*.md`, one file each, validated at build time by the schema in
`src/lib/server/content/schema.ts`. Edit those files, not the components. A case study's
evidence tier must not be exceeded by its copy; see `docs/decisions.md` (D21).

## Deploy

Cloudflare Workers Builds watches this repository. Pushing `main` deploys production; pushing any
other branch deploys a preview URL. Build command `npm run build`, deploy command
`npx wrangler deploy`, config in `wrangler.jsonc`. One-time setup: Cloudflare dashboard, Workers
and Pages, import the repository.

See `AI_DOCS/grounded-resume.md` for the concept and architecture.
