<script lang="ts">
	import type { Claim } from '$lib/resume';
	import { audit } from '$lib/audit.svelte';
	import Evidence from './Evidence.svelte';
	import TierBadge from './TierBadge.svelte';

	let { claim, index }: { claim: Claim; index: number } = $props();
</script>

<li class="claim">
	<p class="text">
		<span>{claim.text}</span>
		{#if audit.on}
			<TierBadge tier={claim.evidence.tier} />
		{/if}
	</p>
	{#if audit.on}
		<div class="reveal" style="--i: {index}">
			<Evidence evidence={claim.evidence} />
		</div>
	{/if}
</li>

<style>
	.claim {
		list-style: none;
		padding: 0.85rem 0;
		border-top: 1px solid var(--hairline);
	}

	.text {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.5rem 0.75rem;
		color: var(--text-dim);
		font-size: 0.95rem;
	}

	.text span {
		flex: 1 1 16rem;
	}
</style>
