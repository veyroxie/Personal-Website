# Grounded — a resume that cites its sources

Reference for the concept and architecture of this site. Read before changing structure.

## Concept

A personal resume site whose organising idea is the author's own engineering thesis:
grounded, auditable, anti-hallucination work. The page reads as a clean editorial resume
by default. A single **Audit** toggle overlays a provenance layer onto every claim —
evidence, a trust tier, and either a verifiable link or a stated reason it can't be shown.

The concept is selective by design: provenance is applied to Experience and Projects, where
it earns attention, and deliberately not to Education or Leadership, which would dilute it.

## Trust tiers

Every auditable claim carries exactly one tier (`Evidence` in `src/lib/resume.ts`, a
discriminated union so each tier only holds the data valid for it):

- **Live** — publicly verifiable now; carries `href` + `linkLabel`.
- **Artifact** — backed by showable proof (metrics, counts) but no public link.
- **Attested** — real work whose source is confidential; carries the `reason` it's withheld.

Attested is not a redaction. It states, honestly, that production code is private — which is
the mature signal. Nothing on the page exceeds what the resume already states publicly; the
site attests to the work, it does not narrate confidential internals.

## Architecture

```
src/lib/resume.ts        single source of truth — all content + types
src/lib/audit.svelte.ts  shared reactive state: audit.on
src/lib/components/
  AuditToggle.svelte     the one switch; mutates audit.on
  Claim.svelte           experience bullet: text + (audit) badge + evidence
  ProjectCard.svelte     project: name/tagline/desc + (audit) badge + evidence
  TierBadge.svelte       tier label + CSS diamond, keyed exhaustively by tier
  Evidence.svelte        the revealed block: stack, proof, link or reason
src/routes/+page.svelte  arrangement: header, hero, numbered sections, footer
src/routes/+layout.*     global styles, title, prerender flag
src/app.css              Obsidian console design tokens + .reveal animation
```

Data drives both views. Toggling `audit.on` mounts the evidence under each claim; the
`.reveal` class animates it in via `@starting-style` (no JS animation lib), staggered by `--i`
to populate like a trace, and disabled under `prefers-reduced-motion`.

## Aesthetic

Obsidian console: near-black surfaces, hairline structure, Inter for prose, JetBrains Mono for
data labels, one emerald accent reserved for trust signals (amber for artifact metrics, slate
for attested). Restraint over effects.

## Deploy

Static export to GitHub Pages.

- `@sveltejs/adapter-static` + `export const prerender = true` (`src/routes/+layout.ts`).
- `paths.base = '/Personal-Website'` in `vite.config.ts` (project-page subpath). Asset paths
  emit relative, so they stay portable under the subpath.
- `static/.nojekyll` keeps Pages from stripping `_app/`.
- `.github/workflows/deploy.yml` builds on push to `main` and publishes.

**One manual step, web UI only:** GitHub → Settings → Pages → Source → "GitHub Actions".

## Updating content

Edit `src/lib/resume.ts` only — never the components — for new claims, projects, or links.
To promote a project from `artifact` to `live`, change its `evidence` to `tier: 'live'` and add
`href` + `linkLabel`. TypeScript enforces the shape.
