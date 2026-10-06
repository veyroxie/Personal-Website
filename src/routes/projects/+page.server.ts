import { projects } from '$lib/server/content/projects';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => ({ projects });
