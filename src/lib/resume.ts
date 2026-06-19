// Single source of truth for the whole site. Every rendered claim traces back here,
// which is the point: a resume about grounded, auditable work should itself be grounded.

// Trust level behind a claim, discriminated on `tier` so each level carries only its valid data:
// - live: publicly verifiable right now (a URL anyone can open)
// - artifact: backed by showable proof (metrics, counts) but not a public link
// - attested: real work whose source is confidential, with the reason stated
export type Evidence =
	| { tier: 'live'; href: string; linkLabel: string; stack: string[]; metrics: string[] }
	| { tier: 'artifact'; stack: string[]; metrics: string[] }
	| { tier: 'attested'; reason: string; stack: string[]; metrics: string[] };

export type Claim = { text: string; evidence: Evidence };

export type Role = {
	company: string;
	title: string;
	meta: string;
	claims: Claim[];
};

export type Project = {
	name: string;
	tagline: string;
	description: string;
	evidence: Evidence;
};

export type SkillGroup = { label: string; items: string[] };

export type Credential = { title: string; detail: string };

export type ContactLink = { label: string; href: string };

export type Resume = {
	name: string;
	role: string;
	location: string;
	email: string;
	phone: string;
	links: ContactLink[];
	sourceHref: string;
	experience: Role[];
	projects: Project[];
	skills: SkillGroup[];
	education: Credential[];
	leadership: Credential[];
};

export const resume: Resume = {
	name: 'Elyesa Tee Way Yien',
	role: 'Software & Data Engineer',
	location: 'Puchong, Selangor, Malaysia',
	email: 'etee3001@gmail.com',
	phone: '+6012-921 3001',
	links: [
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/elyesa-tee-865536320' },
		{ label: 'GitHub', href: 'https://github.com/veyroxie' }
	],
	sourceHref: 'https://github.com/veyroxie/Personal-Website',

	experience: [
		{
			company: 'Cobler',
			title: 'Digital Projects Intern to Engineer (Part-Time)',
			meta: 'software & data · offered full-time conversion · Dec 2025 – Present',
			claims: [
				{
					text: "Built the agentic backend for the company's AI energy-analytics chatbot: a LangGraph pipeline with a fetch-then-analyze flow on the Claude SDK and Model Context Protocol tools over FastAPI, so it handled messy real-world queries instead of breaking on anything not explicitly coded for.",
					evidence: {
						tier: 'attested',
						reason: 'Production codebase at Cobler — confidential',
						stack: ['LangGraph', 'Claude SDK', 'MCP', 'FastAPI'],
						metrics: []
					}
				},
				{
					text: 'Shipped an anti-hallucination suite to production: provenance tracking (EvidencePack/StepResult), a numerical-claim validator that flagged ungrounded numbers, a 5-tier reliability scale, and a citations parser/resolver, so analytics answers could be traced back to the source sensor data.',
					evidence: {
						tier: 'attested',
						reason: 'Production codebase at Cobler — confidential',
						stack: ['provenance tracking', 'claim validation'],
						metrics: ['28 tests']
					}
				},
				{
					text: 'Wrote the data-cleaning pipeline for IoT meter data in ClickHouse: deduplication, threshold filtering with re-aggregation, and offset correction to fix erroneous and anomalous sensor readings, plus history duplication for spinning up virtual sensors from existing ones.',
					evidence: {
						tier: 'attested',
						reason: 'Production codebase at Cobler — confidential',
						stack: ['ClickHouse', 'SQL'],
						metrics: []
					}
				},
				{
					text: 'Prototyped and tested a statistical anomaly detector (GESD, MAD/robust-z, IQR fences, per-sensor delta floor, spike-cap safeguard) covering degenerate cases, kept as an option for active threshold filtering, alongside confirmation-phrase and pre-delete backup guards on destructive data paths.',
					evidence: {
						tier: 'attested',
						reason: 'Production codebase at Cobler — confidential',
						stack: ['GESD', 'MAD / robust-z', 'IQR'],
						metrics: ['16 unit tests']
					}
				},
				{
					text: 'Authored the EECA compliance-report engine (chat-driven editing, browser-editable output, soft delete with auto-expiry) and built its frontend in SvelteKit and Svelte 5: streaming responses, inline artifact cards, and ECharts visualizations.',
					evidence: {
						tier: 'attested',
						reason: 'Production codebase at Cobler — confidential',
						stack: ['SvelteKit', 'Svelte 5', 'ECharts'],
						metrics: ['~2,000 lines']
					}
				}
			]
		}
	],

	projects: [
		{
			name: 'StudyHub',
			tagline: 'Tuition-Centre Management Platform · Go · vanilla JS · PostgreSQL',
			description:
				'Solo-built and deployed to production: role-based dashboards, billing/payroll, attendance, analytics, notifications, and JWT auth with email verification.',
			evidence: {
				tier: 'live',
				href: 'https://studyhub.fit',
				linkLabel: 'studyhub.fit',
				stack: ['Go (chi, pgx)', 'PostgreSQL', 'WebSocket', 'JWT'],
				metrics: ['143 REST routes', '25-table schema', '81 backend tests', '~22k LOC']
			}
		},
		{
			name: 'ollama-chatbot',
			tagline: 'Agentic learning sandbox · Python',
			description:
				'A personal sandbox for agent patterns: a ReAct loop with tool execution, retries, and streaming across both Ollama and Gemini. Where I prototype the ideas the Cobler work productionises.',
			evidence: {
				tier: 'live',
				href: 'https://github.com/veyroxie/ollama-chatbot',
				linkLabel: 'source on GitHub',
				stack: ['Python', 'ReAct', 'tool execution'],
				metrics: []
			}
		},
		{
			name: 'Crime in Malaysia',
			tagline: 'Interactive Data Stories · Vega-Lite · JavaScript',
			description:
				'Two single-page visual narratives built from raw public CSVs: a choropleth world map, parallel-coordinates crime trends, a state homicide stream graph, radial prisoner-index charts, and case heatmaps.',
			evidence: {
				tier: 'live',
				href: 'https://veyroxie.github.io/dv2/',
				linkLabel: 'live visualisation',
				stack: ['Vega-Lite', 'JavaScript'],
				metrics: []
			}
		},
		{
			name: 'Multiplayer Horror Game',
			tagline: 'Co-op terminal game · Java · OOP',
			description:
				'A terminal-controlled co-op game (Lethal Company clone) built with three teammates. Wrote the enemy AI behaviour and loot mechanics.',
			evidence: {
				tier: 'live',
				href: 'https://github.com/veyroxie/lethal-company-knockoff',
				linkLabel: 'source on GitHub',
				stack: ['Java', 'OOP'],
				metrics: []
			}
		},
		{
			name: 'Deep Learning for NLP',
			tagline: 'Sequence models · PyTorch',
			description:
				'Trained RNN, LSTM, and Transformer models with attention for text generation and sequence classification, then compared how each performed.',
			// TODO: flip to tier 'live' with the repo href once the public link is provided.
			evidence: {
				tier: 'artifact',
				stack: ['PyTorch', 'RNN', 'LSTM', 'Transformer'],
				metrics: []
			}
		}
	],

	skills: [
		{ label: 'Languages', items: ['Python', 'Go', 'TypeScript', 'JavaScript', 'Java', 'SQL', 'HTML/CSS'] },
		{
			label: 'AI / ML',
			items: ['Claude SDK', 'LangGraph', 'Model Context Protocol', 'PyTorch', 'Anomaly Detection (GESD/MAD)']
		},
		{
			label: 'Backend',
			items: ['Go (chi, pgx)', 'FastAPI', 'PostgreSQL/pgvector', 'ClickHouse', 'GraphQL', 'MongoDB', 'WebSocket', 'JWT']
		},
		{ label: 'Frontend', items: ['SvelteKit', 'Svelte 5', 'Tailwind', 'ECharts', 'Vega-Lite', 'Tableau'] }
	],

	education: [
		{ title: 'Monash University Malaysia', detail: 'B.Sc. Computer Science (Data Science) · 2022 – Present' },
		{ title: 'INTI International College Subang', detail: 'Cambridge A Levels · Merit Scholarship · 2020 – 2021' },
		{ title: 'Nobel International School', detail: 'Cambridge IGCSE · ICE (Distinction) · 2019' }
	],

	leadership: [
		{
			title: 'Monash E-Sports Club',
			detail:
				'Secretary (current) and former Social Media Manager. Sorted out leadership friction, kept official paperwork on track, and ran promo content and inter-club relationships.'
		}
	]
};
