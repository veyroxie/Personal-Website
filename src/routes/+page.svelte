<script lang="ts">
	import { audit } from '$lib/audit.svelte';
	import AuditToggle from '$lib/components/AuditToggle.svelte';
	import Claim from '$lib/components/Claim.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { resume } from '$lib/resume';

	let copied = $state(false);

	async function copyPhone() {
		// A denied clipboard is expected and non-actionable, so we just leave the badge unshown.
		try {
			await navigator.clipboard.writeText(resume.phone);
			copied = true;
			setTimeout(() => (copied = false), 1500);
		} catch {
			copied = false;
		}
	}
</script>

{#snippet eyebrow(num: string, title: string)}
	<p class="eyebrow mono"><span class="num">{num}</span> {title}</p>
{/snippet}

<header class="bar">
	<div class="bar-inner">
		<div class="ident">
			<span class="ident-name">{resume.name}</span>
			<span class="ident-role mono">{resume.role}</span>
		</div>
		<AuditToggle />
	</div>
</header>

<main>
	<section class="hero">
		<h1>{resume.name}</h1>
		<p class="lede">{resume.role} grounding messy, real-world systems in evidence.</p>

		<ul class="contacts">
			<li><a href="mailto:{resume.email}">{resume.email}</a></li>
			<li>
				<button class="copy" onclick={copyPhone}>
					{resume.phone}
					<span class="copied mono" class:show={copied}>copied</span>
				</button>
			</li>
			{#each resume.links as link (link.href)}
				<li><a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a></li>
			{/each}
			<li class="loc">{resume.location}</li>
		</ul>

		<p class="hint mono" aria-live="polite">
			{#if audit.on}
				Audit on — every claim shows its tier and provenance.
			{:else}
				This resume cites its sources. Flip Audit to inspect the evidence behind every claim.
			{/if}
		</p>
	</section>

	<section>
		{@render eyebrow('01', 'Experience')}
		{#each resume.experience as role (role.company)}
			<div class="role">
				<h2>{role.company}</h2>
				<p class="role-title">{role.title}</p>
				<p class="role-meta mono">{role.meta}</p>
				<ul class="claims">
					{#each role.claims as claim, i (claim.text)}
						<Claim {claim} index={i} />
					{/each}
				</ul>
			</div>
		{/each}
	</section>

	<section>
		{@render eyebrow('02', 'Projects')}
		<div class="projects">
			{#each resume.projects as project, i (project.name)}
				<ProjectCard {project} index={i} />
			{/each}
		</div>
	</section>

	<section>
		{@render eyebrow('03', 'Skills')}
		<div class="skills">
			{#each resume.skills as group (group.label)}
				<div class="skill-group">
					<p class="skill-label mono">{group.label}</p>
					<div class="skill-tags">
						{#each group.items as item (item)}
							<span class="tag">{item}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section>
		{@render eyebrow('04', 'Education')}
		<ul class="credentials">
			{#each resume.education as item (item.title)}
				<li>
					<span class="cred-title">{item.title}</span>
					<span class="cred-detail">{item.detail}</span>
				</li>
			{/each}
		</ul>
	</section>

	<section>
		{@render eyebrow('05', 'Leadership')}
		<ul class="credentials">
			{#each resume.leadership as item (item.title)}
				<li>
					<span class="cred-title">{item.title}</span>
					<span class="cred-detail">{item.detail}</span>
				</li>
			{/each}
		</ul>
	</section>

	<footer>
		<p class="mono">
			Built in Svelte 5 and prerendered static. The source is public, so this page is itself a
			Live claim —
			<a href={resume.sourceHref} target="_blank" rel="noopener noreferrer">inspect it</a>.
		</p>
	</footer>
</main>

<style>
	.bar {
		position: sticky;
		top: 0;
		z-index: 10;
		background: color-mix(in srgb, var(--bg) 82%, transparent);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--hairline);
	}

	.bar-inner,
	main {
		max-width: var(--measure);
		margin: 0 auto;
		padding-inline: 1.5rem;
	}

	.bar-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		height: 56px;
	}

	.ident {
		display: flex;
		align-items: baseline;
		gap: 0.7rem;
		min-width: 0;
	}

	.ident-name {
		font-weight: 600;
		font-size: 0.9rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.ident-role {
		color: var(--text-faint);
		font-size: 0.6rem;
		white-space: nowrap;
	}

	main {
		padding-block: clamp(3rem, 9vw, 6rem) 4rem;
	}

	section {
		margin-bottom: clamp(3rem, 8vw, 5.5rem);
	}

	.hero h1 {
		font-size: clamp(2.4rem, 8vw, 4rem);
		font-weight: 700;
		line-height: 1.05;
		letter-spacing: -0.02em;
	}

	.lede {
		max-width: 30ch;
		margin-top: 1rem;
		color: var(--text-dim);
		font-size: 1.1rem;
	}

	.contacts {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.5rem;
		margin-top: 1.75rem;
		padding: 0;
		list-style: none;
		font-size: 0.85rem;
	}

	.contacts a {
		color: var(--text-dim);
		border-bottom: 1px solid transparent;
		transition: border-color 0.2s var(--ease);
	}

	.contacts a:hover {
		border-color: var(--live);
	}

	.loc {
		color: var(--text-faint);
	}

	.copy {
		position: relative;
		padding: 0;
		border: none;
		background: none;
		color: var(--text-dim);
		font: inherit;
		cursor: pointer;
	}

	.copy:hover {
		color: var(--live);
	}

	.copied {
		position: absolute;
		top: -1.4rem;
		left: 0;
		color: var(--live);
		font-size: 0.55rem;
		opacity: 0;
		transition: opacity 0.2s var(--ease);
	}

	.copied.show {
		opacity: 1;
	}

	.hint {
		margin-top: 2.5rem;
		max-width: 46ch;
		color: var(--text-faint);
		font-size: 0.66rem;
		line-height: 1.7;
		text-transform: none;
		letter-spacing: 0.02em;
	}

	.eyebrow {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 1.75rem;
		color: var(--text-dim);
	}

	.num {
		color: var(--live);
	}

	h2 {
		font-size: 1.4rem;
		font-weight: 600;
	}

	.role-title {
		margin-top: 0.3rem;
		color: var(--text-dim);
	}

	.role-meta {
		margin-top: 0.5rem;
		color: var(--text-faint);
		font-size: 0.62rem;
		text-transform: none;
		letter-spacing: 0.02em;
	}

	.claims {
		margin-top: 1.25rem;
		padding: 0;
	}

	.projects {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
		gap: 1rem;
	}

	.skills {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.skill-label {
		margin-bottom: 0.75rem;
		color: var(--text-faint);
		font-size: 0.62rem;
	}

	.skill-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		padding: 0.25rem 0.7rem;
		border: 1px solid var(--hairline);
		border-radius: 999px;
		color: var(--text-dim);
		font-size: 0.82rem;
		transition: border-color 0.2s var(--ease);
	}

	.tag:hover {
		border-color: var(--hairline-bright);
	}

	.credentials {
		padding: 0;
		list-style: none;
	}

	.credentials li {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 1rem 0;
		border-top: 1px solid var(--hairline);
	}

	.cred-title {
		font-weight: 500;
	}

	.cred-detail {
		color: var(--text-faint);
		font-size: 0.88rem;
	}

	footer {
		padding-top: 2rem;
		border-top: 1px solid var(--hairline);
	}

	footer p {
		color: var(--text-faint);
		font-size: 0.62rem;
		line-height: 1.8;
		text-transform: none;
		letter-spacing: 0.02em;
	}

	footer a {
		color: var(--live);
	}

	footer a:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
