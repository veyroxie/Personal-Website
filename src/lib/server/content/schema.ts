import { z } from 'zod';

import type { Evidence } from '$lib/resume';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const HTTPS = 'https://';
export const IMAGE_DIR = '/images/';

const revisionSchema = z.object({
	date: z.string().regex(ISO_DATE),
	note: z.string().min(1)
});

const evidenceBase = {
	stack: z.array(z.string().min(1)),
	metrics: z.array(z.string().min(1)),
	history: z.array(revisionSchema).optional()
};

// `satisfies` pins the schema to the type the Audit components already render,
// so a field added on one side without the other is a type error, not drift.
const evidenceSchema = z.discriminatedUnion('tier', [
	z.object({
		tier: z.literal('live'),
		href: z.string().startsWith(HTTPS),
		linkLabel: z.string().min(1),
		...evidenceBase
	}),
	z.object({ tier: z.literal('artifact'), ...evidenceBase }),
	z.object({ tier: z.literal('attested'), reason: z.string().min(1), ...evidenceBase })
]) satisfies z.ZodType<Evidence>;

export const caseStudySchema = z.object({
	slug: z.string().regex(SLUG),
	order: z.number().int().positive(),
	title: z.string().min(1),
	short: z.string().min(1),
	role: z.string().min(1),
	tags: z.array(z.string().min(1)).min(1),
	image: z.string().startsWith(IMAGE_DIR),
	imageAlt: z.string().min(1),
	problem: z.string().min(1),
	built: z.string().min(1),
	result: z.string().min(1).optional(),
	evidence: evidenceSchema
});

export type CaseStudyFrontmatter = z.infer<typeof caseStudySchema>;

export type CaseStudy = CaseStudyFrontmatter & { notesHtml: string };
