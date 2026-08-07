<script lang="ts">
	import type { Evidence } from '$lib/resume';

	let { tier }: { tier: Evidence['tier'] } = $props();

	// Keyed by the union so the mapping is exhaustive and adding a tier is a compile error until handled.
	const meta = {
		live: { label: 'Live', color: 'var(--live)' },
		artifact: { label: 'Artifact', color: 'var(--artifact)' },
		attested: { label: 'Attested', color: 'var(--attested)' }
	} as const;
</script>

<span class="badge mono" style="--c: {meta[tier].color}">
	<span class="diamond"></span>
	{meta[tier].label}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		gap: 0.45em;
		color: var(--c);
		font-size: 0.66rem;
		vertical-align: middle;
		white-space: nowrap;
	}

	.diamond {
		width: 6px;
		height: 6px;
		background: var(--c);
		transform: rotate(45deg);
	}
</style>
