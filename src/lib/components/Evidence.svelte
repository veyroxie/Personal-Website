<script lang="ts">
	import type { Evidence } from '$lib/resume';

	let { evidence }: { evidence: Evidence } = $props();
</script>

<div class="evidence">
	{#if evidence.stack.length}
		<div class="row">
			<span class="key mono">stack</span>
			<span class="vals">
				{#each evidence.stack as item (item)}
					<span class="tag">{item}</span>
				{/each}
			</span>
		</div>
	{/if}

	{#if evidence.metrics.length}
		<div class="row">
			<span class="key mono">proof</span>
			<span class="vals">
				{#each evidence.metrics as metric (metric)}
					<span class="metric mono">{metric}</span>
				{/each}
			</span>
		</div>
	{/if}

	{#if evidence.tier === 'live'}
		<a class="link mono" href={evidence.href} target="_blank" rel="noopener noreferrer">
			{evidence.linkLabel}
			<svg class="arrow" viewBox="0 0 12 12" aria-hidden="true">
				<path d="M3 9L9 3M9 3H4M9 3V8" fill="none" stroke="currentColor" stroke-width="1.4" />
			</svg>
		</a>
	{:else if evidence.tier === 'attested'}
		<span class="reason mono">
			<svg class="lock" viewBox="0 0 12 12" aria-hidden="true">
				<rect x="2.5" y="5.5" width="7" height="5" rx="1" fill="currentColor" />
				<path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" fill="none" stroke="currentColor" stroke-width="1.2" />
			</svg>
			{evidence.reason}
		</span>
	{/if}
</div>

<style>
	.evidence {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 0.7rem;
		padding-left: 0.95rem;
		border-left: 1px solid var(--hairline-bright);
	}

	.row {
		display: flex;
		gap: 0.75rem;
		align-items: baseline;
	}

	.key {
		flex: none;
		width: 3.2rem;
		color: var(--text-faint);
		font-size: 0.6rem;
	}

	.vals {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.tag {
		padding: 0.1rem 0.5rem;
		border: 1px solid var(--hairline-bright);
		border-radius: 999px;
		color: var(--text-dim);
		font-size: 0.78rem;
	}

	.metric {
		color: var(--artifact);
		font-size: 0.7rem;
	}

	.link {
		display: inline-flex;
		align-items: center;
		gap: 0.35em;
		width: fit-content;
		color: var(--live);
		font-size: 0.68rem;
	}

	.link:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.arrow {
		width: 0.8em;
		height: 0.8em;
	}

	.reason {
		display: inline-flex;
		align-items: center;
		gap: 0.5em;
		width: fit-content;
		color: var(--attested);
		font-size: 0.66rem;
	}

	.lock {
		width: 0.85em;
		height: 0.85em;
	}
</style>
