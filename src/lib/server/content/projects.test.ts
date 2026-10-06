// The case studies feed the room, the simple view and the project pages, so the
// content itself is under test: a broken file fails the build, not a visitor.
import { existsSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { projects } from './projects';

describe('case study content', () => {
	it('loads every case study from its markdown file', () => {
		expect(projects.map((project) => project.slug)).toEqual(['agent', 'pipeline', 'studyhub']);
	});

	it('points every case study image at a file that exists in static', () => {
		for (const project of projects) {
			expect(existsSync(`static${project.image}`), project.image).toBe(true);
		}
	});

	it('renders the notes body to HTML headings when notes are present', () => {
		const agent = projects.find((project) => project.slug === 'agent');
		expect(agent?.notesHtml).toContain('<h2>');
	});
});
