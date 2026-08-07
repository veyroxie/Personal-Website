import { json } from '@sveltejs/kit';

import { resume } from '$lib/resume';

export const prerender = true;

export const GET = () => json(resume);
