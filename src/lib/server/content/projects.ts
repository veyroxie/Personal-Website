import matter from 'gray-matter';
import { marked } from 'marked';

import { caseStudySchema, type CaseStudy } from './schema';

// Read at build time only: this module lives under $lib/server, so SvelteKit
// refuses to bundle it, and the parsers, into the browser.
const files = import.meta.glob<string>('/src/content/projects/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

function parseCaseStudy(text: string): CaseStudy {
	const { data, content } = matter(text);
	// A malformed file must fail the build, the same way a malformed resume claim fails the deploy.
	const frontmatter = caseStudySchema.parse(data);
	return { ...frontmatter, notesHtml: marked.parse(content, { async: false }) };
}

export const projects: CaseStudy[] = Object.values(files)
	.map(parseCaseStudy)
	.sort((a, b) => a.order - b.order);
