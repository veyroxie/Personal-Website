<script lang="ts">
	import { PUBLIC_SITE_URL } from '$env/static/public';

	type OpenGraphType = 'website' | 'profile' | 'article';

	let {
		title,
		description,
		path,
		image,
		type = 'website'
	}: { title: string; description: string; path: string; image: string; type?: OpenGraphType } =
		$props();

	// Crawlers need absolute URLs; relative ones are silently dropped by most share previews.
	const url = $derived(`${PUBLIC_SITE_URL}${path}`);
	const imageUrl = $derived(`${PUBLIC_SITE_URL}${image}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={imageUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
</svelte:head>
