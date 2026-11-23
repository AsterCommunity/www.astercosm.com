/**
 * English copy. The shape of this object defines Messages; zh.ts must match it.
 * Content rules from the repo AGENTS.md hold: first screen speaks user language,
 * engineering depth unfolds as you scroll. Protocol names (Yggdrasil,
 * authlib-injector) are the audience's vocabulary — Minecraft server owners —
 * not engineering jargon, so they are allowed up front.
 */
export const en = {
	meta: {
		title:
			"AsterYggdrasil — Self-hosted Minecraft skin site and Yggdrasil auth server",
		description:
			"AsterYggdrasil is a self-hosted Minecraft skin site and Yggdrasil/authlib-injector authentication server in Rust: site accounts, player profiles, launcher login, join/hasJoined verification, skin and cape hosting, and a public texture library — one single binary.",
	},
	nav: {
		protocol: "Protocol",
		status: "Status",
		start: "Get started",
		github: "GitHub",
	},
	a11y: {
		toggleTheme: "Toggle color theme",
		toggleLang: "切换到中文",
		skipToContent: "Skip to content",
	},
	hero: {
		title: "Your world deserves its own login.",
		subtitle:
			"AsterYggdrasil is a self-hosted Minecraft skin site and Yggdrasil/authlib-injector authentication server. Site accounts, player profiles, launcher login, join verification, skin and cape hosting, and a public texture library — one single Rust binary.",
		primaryCta: "Get started",
		secondaryCta: "Star on GitHub",
		note: "authlib-injector compatible · MIT OR Apache-2.0",
	},
	code: {
		label: "Run it from source",
		caption:
			"Boots with SQLite and local storage, seeds its defaults, and prints the listen address. No external services required.",
	},
	protocol: {
		kicker: "Protocol surface",
		title: "The endpoints your launcher already speaks.",
		body: "Point an authlib-injector launcher at /api/yggdrasil and it just works — the full Yggdrasil protocol surface, implemented against the spec.",
	},
	status: {
		kicker: "Status",
		title: "In beta, already serving worlds.",
		body: "The core is stable and in active operation: the full Yggdrasil protocol, the skin site, multiple login methods, the texture library review workflow, and scoped operator management shipped through six alpha releases into beta.",
		available: "Available",
		inDevelopment: "In development",
		items: [
			{
				label:
					"Yggdrasil auth server — authenticate, refresh, validate, invalidate, signout",
				state: "available",
			},
			{
				label:
					"Session server — join / hasJoined, profile lookup, blockedservers",
				state: "available",
			},
			{
				label: "Signed textures properties with a rotatable signing key",
				state: "available",
			},
			{
				label:
					"Upstream session forwarding — mix local and remote (including Mojang) Yggdrasil sources by priority and weight",
				state: "available",
			},
			{
				label:
					"Site accounts — passkeys, external auth (GitHub, Google, QQ, OIDC), invitations, captcha",
				state: "available",
			},
			{
				label:
					"Player profiles — several per account, controlled renames that keep the UUID and invalidate launcher tokens",
				state: "available",
			},
			{
				label:
					"Skin & cape hosting — PNG re-encoding, dimension checks, hash-addressed public reads, local / S3 / MinIO storage",
				state: "available",
			},
			{
				label:
					"Public texture library — submissions, review workflow, tags, reports",
				state: "available",
			},
			{
				label:
					"Capability bans — block one ability (auth, join, upload, library) without disabling the account",
				state: "available",
			},
			{
				label:
					"Operable — scoped operators, append-only audit, runtime config hot reload, background tasks with health, Prometheus metrics",
				state: "available",
			},
			{
				label:
					"Configurable Argon2 concurrency cap (merged, ships in the next release)",
				state: "inDevelopment",
			},
		] as { label: string; state: "available" | "inDevelopment" }[],
		cta: "Read the changelog",
	},
	start: {
		kicker: "Start here",
		title: "Grow your server a login.",
		body: "One binary serves the skin site and the Yggdrasil API on the same port. Start from SQLite and local storage, move to PostgreSQL/MySQL and S3/MinIO when you need to.",
		step1: "Run from source",
		step2: "Or run the container",
		step2Body:
			"docker-compose.yml ships with the repo; the docs cover volumes and reverse proxying.",
		step3: "Point your launcher at it",
		step3Body:
			"Add a server by URL in any authlib-injector launcher — PCL, HMCL, and friends all speak it. The API root is:",
		docsCta: "Read the docs",
		githubCta: "Browse the repository",
	},
	cta: {
		title: "Your world, your keys.",
		body: "Player identities, texture files, signing keys, and the database stay on your own infrastructure — fully open source under MIT OR Apache-2.0, growing in the open.",
		primary: "View on GitHub",
		secondary: "AsterCosmos",
	},
	footer: {
		tagline: "Self-hosted Minecraft authentication from AsterCosmos.",
		copyright: "© 2026 AsterCosmos",
		license:
			"Code: MIT OR Apache-2.0 · Content: CC-BY 4.0 · Brand: all rights reserved",
	},
};

export type Messages = typeof en;
