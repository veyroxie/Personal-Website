// The site's premise is that every claim is auditable, so the claims data itself
// is under test and a malformed claim fails the deploy.
import { describe, expect, it } from 'vitest';

import { resume } from './resume';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const evidences = [
	...resume.experience.flatMap((role) => role.claims.map((claim) => claim.evidence)),
	...resume.projects.map((project) => project.evidence)
];

describe('resume data invariants', () => {
	it('lastVerified is an ISO date and not in the future', () => {
		expect(resume.lastVerified).toMatch(ISO_DATE);
		expect(new Date(resume.lastVerified).getTime()).toBeLessThanOrEqual(Date.now());
	});

	it('every revision date is an ISO date no newer than lastVerified', () => {
		for (const revision of evidences.flatMap((evidence) => evidence.history ?? [])) {
			expect(revision.date).toMatch(ISO_DATE);
			expect(revision.date <= resume.lastVerified).toBe(true);
			expect(revision.note.trim()).not.toBe('');
		}
	});

	it('every live claim links to a public https URL', () => {
		for (const evidence of evidences) {
			if (evidence.tier === 'live') expect(evidence.href).toMatch(/^https:\/\//);
		}
	});

	it('every attested claim states a non-empty reason', () => {
		for (const evidence of evidences) {
			if (evidence.tier === 'attested') expect(evidence.reason.trim()).not.toBe('');
		}
	});

	it('every external link uses https', () => {
		for (const link of [...resume.links.map((l) => l.href), resume.siteHref, resume.sourceHref]) {
			expect(link).toMatch(/^https:\/\//);
		}
	});
});
