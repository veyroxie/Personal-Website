<script lang="ts">
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
	import '@fontsource/jetbrains-mono/400.css';
	import '@fontsource/jetbrains-mono/500.css';

	import favicon from '$lib/assets/favicon.svg';
	import { resume } from '$lib/resume';

	import '../app.css';

	let { children } = $props();

	// schema.org Person derived from the same data the page renders — one source of truth.
	const personLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: resume.name,
		jobTitle: resume.role,
		email: `mailto:${resume.email}`,
		telephone: resume.phone,
		address: resume.location,
		url: resume.siteHref,
		sameAs: resume.links.map((link) => link.href)
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	{@html `<script type="application/ld+json">${personLd}</script>`}
</svelte:head>

{@render children()}
