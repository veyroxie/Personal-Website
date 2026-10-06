<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import TierBadge from '$lib/components/TierBadge.svelte';

	let { data } = $props();
</script>

<Seo
	title="Case studies | Ely Tee"
	description="AI agents, data pipelines and custom web apps, each with its evidence tier stated."
	path="/projects"
	image="/og.png"
/>

<main>
	<nav class="crumbs mono" aria-label="Breadcrumb">
		<a href="/">Home</a>
		<span aria-hidden="true">/</span>
		<span>Case studies</span>
	</nav>

	<h1>Case studies</h1>
	<p class="lede">Every piece of work in one list, each with the tier of evidence behind it.</p>

	<ul class="list">
		{#each data.projects as project (project.slug)}
			<li>
				<a class="card" href="/projects/{project.slug}">
					<img src={project.image} alt="" width="2400" height="1800" loading="lazy" />
					<span class="body">
						<span class="title">{project.title} <TierBadge tier={project.evidence.tier} /></span>
						<span class="role">{project.role}</span>
						<span class="problem">{project.problem}</span>
					</span>
				</a>
			</li>
		{/each}
	</ul>
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
		font-weight: 600;
	}

	.lede {
		margin-top: 0.5rem;
		color: var(--text-dim);
	}

	.list {
		list-style: none;
		padding: 0;
		margin-top: 2rem;
		display: grid;
		gap: 1rem;
	}

	.card {
		display: grid;
		grid-template-columns: 160px 1fr;
		gap: 1.1rem;
		padding: 1rem;
		border: 1px solid var(--hairline);
		border-radius: 10px;
		background: var(--surface);
		text-decoration: none;
		transition: border-color 0.3s var(--ease);
	}

	.card:hover,
	.card:focus-visible {
		border-color: var(--hairline-bright);
	}

	img {
		width: 100%;
		height: auto;
		border-radius: 6px;
		border: 1px solid var(--hairline);
	}

	.body {
		display: grid;
		gap: 0.35rem;
		align-content: start;
	}

	.title {
		font-weight: 600;
	}

	.role {
		font-family: var(--font-mono);
		font-size: var(--meta-s);
		color: var(--text-faint);
	}

	.problem {
		font-size: 0.9rem;
		color: var(--text-dim);
	}

	@media (max-width: 520px) {
		.card {
			grid-template-columns: 1fr;
		}
	}
</style>
