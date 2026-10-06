# Decision log

One entry per decision that shaped the site. Each names the alternative it beat and why.
Newest at the bottom. Add an entry whenever a choice is made that a future reader would
question; never rewrite history, add a new entry that supersedes the old one.

## 2026-10-06: Planning and Phase 0

### D1. Renderer: hand-drawn SVG, not PixiJS

- Over: PixiJS (the spec's choice), and a Three.js or React Three Fiber room.
- Why: the prototype already renders the room in SVG and it works. The scene has six
  furniture pieces and one character, far below the point where WebGL pays for itself.
  SVG groups are focusable and labelled for free; a canvas needs a separate accessibility
  layer. Pixi adds roughly 100 KB of gzipped JavaScript before anything draws, which
  fights the load-time goal. The iso maths, collision grid and pathfinding are written
  renderer-independent so a Pixi or 3D upgrade only replaces the drawing module.
- Revisit if: many animated sprites are on screen at once (P1 idle animations are still
  fine in SVG; a crowd of ghost visitors would not be).

### D2. Framework: stay on SvelteKit, not Astro

- Over: Astro with content collections (the spec's choice).
- Why: the repo, deploy pipeline, data tests and the author's expertise are already
  SvelteKit and Svelte 5. The prototype's scenes port almost line for line into Svelte
  components. Astro's real advantage is zero JavaScript on content pages; SvelteKit's
  prerendering gets close enough for the Lighthouse targets, and lazy-loading the room
  component only on the home route gives the same "island" effect. Two frameworks is a
  cost with no second user.

### D3. Repo: build on a branch here, Grounded becomes the simple view

- Over: a fresh repository for the room.
- Why: the commit history is recruiter-facing and already tells a coherent story. The
  Grounded page, with its evidence tiers and revision history, is the strongest piece of
  differentiation the site has and maps directly onto the required "simple view". Starting
  fresh would throw away tested data invariants and the deploy setup.

### D4. Hosting: Cloudflare Workers with static assets

- Over: Cloudflare Pages (the spec's choice) and GitHub Pages (current).
- Why: Cloudflare now points new projects at Workers and has stopped investing in Pages.
  Static asset requests are free either way. The P1 "Ask my portfolio" backend needs a
  server route, and a Worker hosts it beside the site in one deployment. GitHub Pages
  cannot run server code and forces the site onto a repo subpath.

### D5. Adapter: @sveltejs/adapter-cloudflare pinned to the 7 line

- Over: keeping adapter-static and uploading a folder; adapter-cloudflare 8.
- Why: the static adapter works today but cannot grow a server route later, so it would
  mean a second hosting change in Phase 5. Adapter 8 requires SvelteKit 3; this repo is on
  Kit 2 and upgrading the framework is a separate concern that gets its own change, not a
  side effect of a hosting change.

### D6. Fonts: self-hosted Fontsource variable packages

- Over: Google Fonts (the prototype) and Fontsource's per-weight static packages.
- Why: self-hosting removes a third-party request on every visit, which is both a
  privacy point and a first-load point. The variable packages ship one file per family
  across all weights; the site uses several weights of Syne and Figtree, so variable is
  smaller than three static files. All five families were verified to exist on Fontsource
  before this was decided.

### D7. Content: one Markdown file per project with typed frontmatter

- Over: the current single TypeScript file; the prototype's inline JavaScript objects.
- Why: the room, the simple view, the per-project pages, and later the RAG index must all
  read one source, and the RAG index needs plain prose it can chunk. Markdown gives prose
  a home and frontmatter gives the typed fields (title, role, tags, image, evidence tier)
  that the existing tests and components already expect. The TypeScript file stays the
  right shape for non-project data (skills, now, contact) until there is a reason to move it.

### D8. Keep the Audit evidence layer inside the room scenes

- Over: dropping Grounded's provenance idea in favour of plain project windows.
- Why: nobody else's isometric room cites its sources, and the audience is AI and data
  hiring managers who care about grounding. The data model and components already exist,
  so the cost is near zero and it is the single biggest differentiator the site has.

### D9. Prototype committed under prototype/ until Phase 3 ends

- Over: leaving it outside the repo.
- Why: every phase diffs against it, so it should be versioned next to the port. It is
  reference material, not shipped code, and is deleted when the scenes are ported.

### D10. Token names: kebab-case, fonts prefixed with font-

- Over: the prototype's camelCase names such as wallL and bare font names such as mono.
- Why: kebab-case is the CSS convention and the house style. A font- prefix makes a
  token's purpose readable without opening the definition.

### D11. Real depth sorting and pathfinding, not the walkable-rectangle shortcut

- Over: the prototype's approach of clamping the character to the area in front of all
  furniture so it is always drawn last.
- Why: the shortcut makes the room feel like a backdrop rather than a space. Depth sorting
  in SVG is a DOM insertion keyed on the front-corner depth of each piece, and A* over a
  small blocked-cell grid is a well-known, testable algorithm. Both are cheap given the
  scene size, and both were in the spec's P0 list.

### D12. Feature prioritisation: proof of skill over spectacle

- Chosen for P1: audience-aware character picker, guided tour, a terminal in ely-os that
  reads the Markdown, trace replay of a sample agent run in the agent project window,
  "Ask my portfolio" with visible retrieved chunks and their evidence tiers, a Ctrl+K
  command palette, and print-to-PDF from the existing print stylesheet.
- Cut or kept at P2: multiplayer presence, guestbook, seasonal decorations, 3D upgrade.
- Why: the two audiences are Upwork clients and AI hiring managers. Each chosen feature
  demonstrates the skill being sold or shortens a busy reader's path to the work. Each cut
  feature is a moderation or maintenance tax with no hiring payoff.

### D13. Remove the GitHub Pages workflow rather than keep both deploys

- Over: leaving the GitHub Actions workflow in place as a backup.
- Why: two pipelines racing on every push is confusion, not redundancy. Cloudflare builds
  from the repo on push, and the branch preview URLs cover the "is it live yet" need.

### D14. Wrangler config as wrangler.jsonc

- Over: wrangler.toml.
- Why: both are supported. JSONC allows comments, is what the adapter docs show, and keeps
  one config syntax across the project since there is no other TOML in the repo.

### D15. Room tokens in src/styles/tokens.css, not merged into app.css yet

- Over: replacing the editorial palette in app.css outright (the original Phase 0 plan).
- Why: four names collide (paper, ink, mute, line) and the Grounded page still renders from
  the editorial values. Overwriting them would break the page the Phase 0 check depends on.
  The room-only tokens and the four new font stacks go in their own file now; the collision is
  resolved in Phase 1 when the simple view adopts the room identity. Font files are installed
  but not imported until a component uses them, so the current page does not download
  fonts it never draws.

### D16. npm run preview runs wrangler dev

- Over: leaving it as vite preview.
- Why: vite preview serves files but does not emulate the Worker, so it could pass locally
  and fail on Cloudflare. wrangler dev runs the exact generated Worker against the built
  assets, which is the thing being deployed.

### D17. Worker name is personal-website, matching what Cloudflare created on import

- Over: keeping ebstractly in the config, or deleting and recreating the Worker under that name.
- Why: Workers Builds refuses to deploy when the config name differs from the Worker it is
  bound to, and Workers cannot be renamed. The name only affects the workers.dev URL, which
  nobody will see once ebstract.ly is attached. Recreating the Worker would cost dashboard
  steps for no user-visible gain.

## 2026-10-06: Phase 1, content model

### D18. Frontmatter via zod and gray-matter, body via marked, not mdsvex

- Over: mdsvex, the Svelte-native Markdown route.
- Why: mdsvex compiles Markdown into Svelte components, which suits prose with embedded
  components but not this site. The app window needs typed fields (problem, built, result,
  evidence), and the later "Ask my portfolio" index needs the raw text in chunkable
  sections. Parsing the files directly gives both. Zod over valibot because Astro's content
  collections use the same zod pattern, so the skill transfers.

### D19. The content loader lives under src/lib/server

- Over: a loader in src/lib that any component could import.
- Why: SvelteKit refuses to bundle anything under $lib/server into the browser, so the
  parsers can never leak into the client by accident. Pages receive the parsed data through
  a server load function, which prerendering turns into static JSON at build time.

### D20. The zod evidence schema is pinned to the existing Evidence type with satisfies

- Over: inferring a new Evidence type from the schema and migrating the Audit components,
  or keeping two unrelated definitions.
- Why: resume.ts is imported by client components, so making it depend on zod would ship
  the library to the browser. `satisfies z.ZodType<Evidence>` keeps one runtime type and
  turns any drift between schema and type into a compile error.

### D21. Room copy may not claim more than its evidence tier supports

- Over: using the prototype's copy as written.
- Why: the prototype called the author "AI Engineer, lead developer" and said the pipeline
  was "shipped to commercial building clients"; the audited resume says part-time intern to
  engineer and attests production only. A room that outclaims the audited page under it
  defeats the site's premise. Unconfirmed lines carry a TODO comment in the frontmatter and
  the pipeline stays attested until it is matched to the artifact-tier resume claim.
