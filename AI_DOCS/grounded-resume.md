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

Any evidence may also carry `history`: dated `Revision` entries recording how the claim's
provenance changed (e.g. an attested-to-artifact promotion). Rendered newest-first as a
collapsible log; `Evidence.svelte` sorts defensively. A legend in the hero explains the tiers
whenever Audit is on.

Attested is not a redaction. It states, honestly, that production code is private — which is
the mature signal. Nothing on the page exceeds what the resume already states publicly; the
site attests to the work, it does not narrate confidential internals.

## Architecture

```
src/lib/resume.ts        single source of truth — all content + types
src/lib/resume.test.ts   data invariants (dates, https links, reasons); gates the deploy
src/lib/audit.svelte.ts  shared reactive state: audit.on
src/lib/components/
  AuditToggle.svelte     the one switch; mutates audit.on
  Claim.svelte           experience bullet: text + (audit) badge + evidence
  ProjectCard.svelte     project: name/tagline/desc + (audit) badge + evidence
  TierBadge.svelte       tier label + CSS diamond, keyed exhaustively by tier
  Evidence.svelte        the revealed block: stack, proof, link or reason, history
src/routes/+page.svelte  arrangement: header, hero, legend, numbered sections, footer
src/routes/+layout.*     fonts (self-hosted via Fontsource), title, JSON-LD, prerender flag
src/routes/resume.json/  prerendered endpoint serving the resume object as JSON
src/app.css              Obsidian console design tokens, .reveal animation, print styles
```

Data drives both views. The evidence layer is always in the DOM and toggled with the global
`.audit-only` display class (not `{#if}`), so `@media print` can force it visible — the printed
page is the full audited resume on a light palette, with link URLs written out. On screen,
toggling `audit.on` animates the layer in via `.reveal` and `@starting-style` (no JS animation
lib), staggered by `--i` to populate like a trace, and disabled under `prefers-reduced-motion`.
Opening the page with `?audit` in the query string turns the layer on at load, so shared links
can lead with the proof.

## Aesthetic

Obsidian console: near-black surfaces, hairline structure, Inter for prose, JetBrains Mono for
data labels, one emerald accent reserved for trust signals (amber for artifact metrics, slate
for attested). Restraint over effects.

## Deploy

Cloudflare Worker with static assets, built by Cloudflare Workers Builds on push.

- `@sveltejs/adapter-cloudflare` + `export const prerender = true` (`src/routes/+layout.ts`),
  so the Worker only serves prerendered files until a server route is added.
- `wrangler.jsonc` names the generated Worker and the assets directory
  (`.svelte-kit/cloudflare`). `npm run preview` runs it locally through `wrangler dev`.
- The site lives at the domain root; there is no base path.
- `main` deploys production, every other branch gets a preview URL.

**One manual step, web UI only:** Cloudflare dashboard → Workers and Pages → import the repo.
Why Workers rather than Pages or GitHub Pages: see `../docs/decisions.md` (D4, D5).

## Updating content

Edit `src/lib/resume.ts` only — never the components — for new claims, projects, or links.
To promote a project from `artifact` to `live`, change its `evidence` to `tier: 'live'` and add
`href` + `linkLabel`. TypeScript enforces the shape.
