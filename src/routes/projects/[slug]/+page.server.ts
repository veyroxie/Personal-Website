import { error } from '@sveltejs/kit';

import { projects } from '$lib/server/content/projects';

import type { EntryGenerator, PageServerLoad } from './$types';

// Nothing links to these pages yet, so the prerender crawler needs the list spelled out.
export const entries: EntryGenerator = () => projects.map((project) => ({ slug: project.slug }));

export const load: PageServerLoad = ({ params }) => {
	const project = projects.find((candidate) => candidate.slug === params.slug);
	if (!project) error(404, `No case study named "${params.slug}"`);
	return { project };
};
