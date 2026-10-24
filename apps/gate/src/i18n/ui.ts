export const languages = {
	en: "English",
	zh: "中文",
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

export const GITHUB_URL = "https://github.com/AsterCommunity/AsterGate";
export const WWW_URL = "https://www.astercosm.com";

/** 站内语言切换目标路径 */
export function localizedPath(lang: Lang): string {
	return lang === defaultLang ? "/" : `/${lang}/`;
}

const en = {
	meta: {
		title: "AsterGate — Self-hosted identity, built in the open",
		description:
			"AsterGate is a self-hosted identity and authorization platform for the services you run. In active development — the first public release ships when it is complete.",
	},
	nav: {
		plan: "Plan",
		status: "Status",
		github: "GitHub",
	},
	a11y: {
		toggleTheme: "Toggle color theme",
		toggleLang: "切换到中文",
		skipToContent: "Skip to content",
	},
	hero: {
		status: "In active development",
		title: "One identity for everything you self-host.",
		subtitle:
			"AsterGate is a self-hosted identity platform: one place where accounts, sign-in, and access decisions live for the services you run. It is being built in the open — the first public release ships when it is done, not before.",
		primaryCta: "Follow on GitHub",
		secondaryCta: "AsterCosmos",
	},
	pillars: {
		title: "What AsterGate is becoming",
		items: [
			{
				title: "One account, every service",
				body: "A single account signs in to the services you run — profile, sessions, recovery, and deletion managed in one place, instead of one user table per app.",
			},
			{
				title: "Teams with real boundaries",
				body: "Organizations hold memberships; groups decide who gets into an application; roles and permissions decide what they can do once inside.",
			},
			{
				title: "Standards, not lock-in",
				body: "Applications connect through OAuth and OpenID Connect. AsterGate is built to be the identity provider for anything you self-host — not a feature of one product.",
			},
		],
	},
	status: {
		kicker: "Status",
		title: "Built first, released once.",
		body: "There is no beta, no waiting list, and no partial release. The first public version — 0.1.0-alpha — ships when everything AsterGate sets out to be is complete and verified, not a slice of it.",
		inDevelopment: "In development",
		planned: "Planned",
		items: [
			{
				label: "Account lifecycle — registration, sign-in, sessions, recovery",
				state: "inDevelopment",
			},
			{
				label: "Instance setup, settings & operator permissions",
				state: "inDevelopment",
			},
			{ label: "Organizations, groups & roles", state: "planned" },
			{ label: "OAuth 2.1 & OpenID Connect", state: "planned" },
			{ label: "MFA & passkeys", state: "planned" },
		] as { label: string; state: "inDevelopment" | "planned" }[],
	},
	cta: {
		title: "Follow the build.",
		subtitle:
			"Development happens in the open. Watch the repository for progress, design RFCs, and the first release.",
		primary: "AsterGate on GitHub",
		secondary: "AsterCosmos home",
	},
	footer: {
		tagline: "Self-hosted identity for the services you run.",
		copyright: "© 2026 AsterCosmos",
		license:
			"Code: Apache 2.0 · Content: CC-BY 4.0 · Brand: all rights reserved",
	},
};

export type Messages = typeof en;

const zh: Messages = {
	meta: {
		title: "AsterGate —— 公开构建中的自托管身份平台",
		description:
			"AsterGate 是面向自托管服务的身份与授权平台。正在积极构建中——第一个公开版本会在完成时发布",
	},
	nav: {
		plan: "规划",
		status: "进展",
		github: "GitHub",
	},
	a11y: {
		toggleTheme: "切换颜色主题",
		toggleLang: "Switch to English",
		skipToContent: "跳到正文",
	},
	hero: {
		status: "正在构建中",
		title: "自托管的一切，共用一个身份",
		subtitle:
			"AsterGate 是一个自托管身份平台：你运行的各项服务，账号、登录与访问判定都收在这一处。它正在公开构建——第一个公开版本会在完成时发布，而不是之前",
		primaryCta: "GitHub 上跟进",
		secondaryCta: "AsterCosmos",
	},
	pillars: {
		title: "AsterGate 会成为什么",
		items: [
			{
				title: "一个账号，通行所有服务",
				body: "一个账号登录你运行的各项服务——资料、会话、找回与注销都在一处管理，而不是每个应用各存一份用户表",
			},
			{
				title: "有真实边界的团队",
				body: "组织承载成员关系；组决定谁能进入应用，角色与权限决定进入之后能做什么",
			},
			{
				title: "标准协议，不做绑定",
				body: "应用通过 OAuth 与 OpenID Connect 接入。AsterGate 的定位是你自托管一切的身份提供方，而不是某个产品的附属功能",
			},
		],
	},
	status: {
		kicker: "进展",
		title: "先做完，再发布",
		body: "没有 beta，没有等待名单，也不会半成品发布。第一个公开版本——0.1.0-alpha——要等 AsterGate 规划的全部能力完整并通过验证后才会发布，而不是其中一块",
		inDevelopment: "构建中",
		planned: "规划中",
		items: [
			{
				label: "账户生命周期——注册、登录、会话、找回",
				state: "inDevelopment",
			},
			{
				label: "实例设置与操作员权限",
				state: "inDevelopment",
			},
			{ label: "组织、组与角色", state: "planned" },
			{ label: "OAuth 2.1 与 OpenID Connect", state: "planned" },
			{ label: "MFA 与通行密钥", state: "planned" },
		] as { label: string; state: "inDevelopment" | "planned" }[],
	},
	cta: {
		title: "跟着构建走",
		subtitle: "开发全程公开。进展、设计 RFC 与第一个版本，都在仓库里",
		primary: "GitHub 仓库",
		secondary: "AsterCosmos 主页",
	},
	footer: {
		tagline: "为你运行的服务提供的自托管身份",
		copyright: "© 2026 AsterCosmos",
		license: "代码：Apache 2.0 · 内容：CC-BY 4.0 · 品牌：保留所有权利",
	},
};

const messages: Record<Lang, Messages> = { en, zh };

export function t(lang: Lang): Messages {
	return messages[lang];
}
