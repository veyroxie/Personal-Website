<script lang="ts">
	import type { Project } from '$lib/resume';
	import { audit } from '$lib/audit.svelte';
	import Evidence from './Evidence.svelte';
	import TierBadge from './TierBadge.svelte';

	let { project, index }: { project: Project; index: number } = $props();
</script>

<article class="card">
	<header>
		<h3>
			{project.name}
			{#if audit.on}
				<TierBadge tier={project.evidence.tier} />
			{/if}
		</h3>
		<p class="tagline mono">{project.tagline}</p>
	</header>
	<p class="desc">{project.description}</p>
	{#if audit.on}
		<div class="reveal" style="--i: {index}">
			<Evidence evidence={project.evidence} />
		</div>
	{/if}
</article>

<style>
	.card {
		padding: 1.25rem;
		border: 1px solid var(--hairline);
		border-radius: 10px;
		background: var(--surface);
		transition: border-color 0.3s var(--ease);
	}

	.card:hover {
		border-color: var(--hairline-bright);
	}

	h3 {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.6rem;
		font-size: 1.05rem;
		font-weight: 600;
	}

	.tagline {
		margin-top: 0.4rem;
		color: var(--text-faint);
		font-size: 0.64rem;
		text-transform: none;
		letter-spacing: 0.02em;
	}

	.desc {
		margin-top: 0.7rem;
		color: var(--text-dim);
		font-size: 0.9rem;
	}
</style>
