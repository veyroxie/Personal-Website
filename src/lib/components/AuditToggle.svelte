<script lang="ts">
	import { audit } from '$lib/audit.svelte';
</script>

<button
	class="toggle"
	role="switch"
	aria-checked={audit.on}
	aria-label="Audit mode: reveal the evidence behind every claim"
	onclick={() => (audit.on = !audit.on)}
>
	<span class="track" class:on={audit.on}>
		<span class="thumb"></span>
	</span>
	<span class="label mono">Audit</span>
</button>

<style>
	.toggle {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0;
		border: none;
		background: none;
		color: var(--text-dim);
		cursor: pointer;
	}

	.track {
		position: relative;
		width: 38px;
		height: 20px;
		border-radius: 999px;
		background: var(--surface);
		border: 1px solid var(--hairline-bright);
		transition:
			background 0.3s var(--ease),
			border-color 0.3s var(--ease);
	}

	.track.on {
		background: color-mix(in srgb, var(--live) 22%, transparent);
		border-color: var(--live);
	}

	.thumb {
		position: absolute;
		top: 50%;
		left: 2px;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: var(--text-faint);
		translate: 0 -50%;
		transition:
			left 0.3s var(--ease),
			background 0.3s var(--ease);
	}

	.track.on .thumb {
		left: 20px;
		background: var(--live);
	}

	.toggle:hover .label,
	.toggle:focus-visible .label {
		color: var(--text);
	}

	.toggle:focus-visible {
		outline: 2px solid var(--live);
		outline-offset: 4px;
		border-radius: 4px;
	}

	@media (prefers-reduced-motion: reduce) {
		.track,
		.thumb {
			transition: none;
		}
	}
</style>
