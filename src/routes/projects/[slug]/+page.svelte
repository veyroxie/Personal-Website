<script lang="ts">
	import Evidence from '$lib/components/Evidence.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import TierBadge from '$lib/components/TierBadge.svelte';

	let { data } = $props();
	const project = $derived(data.project);
</script>

<Seo
	title="{project.title} | Ely Tee"
	description={project.problem}
	path="/projects/{project.slug}"
	image={project.image}
	type="article"
/>

<main>
	<nav class="crumbs mono" aria-label="Breadcrumb">
		<a href="/">Home</a>
		<span aria-hidden="true">/</span>
		<a href="/projects">Case studies</a>
	</nav>

	<article>
		<header>
			<h1>{project.title} <TierBadge tier={project.evidence.tier} /></h1>
			<p class="role">{project.role}</p>
			<ul class="tags" aria-label="Technologies">
				{#each project.tags as tag (tag)}
					<li class="tag">{tag}</li>
				{/each}
			</ul>
		</header>

		<img src={project.image} alt={project.imageAlt} width="2400" height="1800" />

		<section class="story">
			<h2 class="mono">The problem</h2>
			<p>{project.problem}</p>
			<h2 class="mono">What I built</h2>
			<p>{project.built}</p>
			{#if project.result}
				<h2 class="mono">Result</h2>
				<p>{project.result}</p>
			{/if}
		</section>

		{#if project.notesHtml}
			<section class="notes">
				<h2 class="mono">How I think about it</h2>
				<!-- Our own Markdown, rendered at build time; nothing user-supplied reaches this. -->
				{@html project.notesHtml}
			</section>
		{/if}

		<section class="evidence">
			<h2 class="mono">Evidence</h2>
			<Evidence evidence={project.evidence} />
		</section>
	</article>
</main>

<style>
	main {
		max-width: var(--measure);
		margin: 0 auto;
		padding: 2rem 1.5rem 4rem;
	}

	.crumbs {
		display: flex;
		gap: 0.6rem;
		color: var(--text-faint);
		margin-bottom: 2rem;
	}

	h1 {
		font-size: 1.7rem;
		line-height: 1.2;
		font-weight: 600;
		text-wrap: balance;
	}

	.role {
		margin-top: 0.5rem;
		color: var(--text-dim);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		list-style: none;
		padding: 0;
		margin-top: 0.9rem;
	}

	.tag {
		font-family: var(--font-mono);
		font-size: var(--meta-s);
		padding: 0.15rem 0.5rem;
		border: 1px solid var(--hairline-bright);
		border-radius: 4px;
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		margin-top: 2rem;
		border: 1px solid var(--hairline);
		border-radius: 8px;
	}

	section {
		margin-top: 2.5rem;
	}

	h2 {
		color: var(--text-faint);
		margin-bottom: 0.5rem;
	}

	.story p + h2,
	.notes :global(h2) {
		margin-top: 1.5rem;
	}

	.notes :global(p) {
		margin-top: 0.4rem;
	}
</style>
