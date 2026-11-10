export const languages = {
	en: "English",
	zh: "中文",
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

export const GITHUB_URL = "https://github.com/AsterCommunity/AsterACME";
export const WWW_URL = "https://www.astercosm.com";
export const TEST_NOTES_URL = `${GITHUB_URL}/blob/main/docs/account-testing.md`;
export const CRATES_TREE_URL = `${GITHUB_URL}/tree/main/crates`;

/** 站内语言切换目标路径 */
export function localizedPath(lang: Lang): string {
	return lang === defaultLang ? "/" : `/${lang}/`;
}

/**
 * crate 目录。事实源：AsterACME 仓库 Cargo.toml workspace members（6 个，
 * 2026-11 快照），与 crates/<name>/README.md 一一对应；顺序按依赖方向，
 * 内核在底、CLI 在边缘。
 */
export const crates = [
	{
		name: "aster_acme_core",
		body: {
			en: "Pure state machine. Protocol states and next-action decisions with no network, no I/O — unknown wire values kept for diagnosis.",
			zh: "纯状态机。协议状态与下一步决策，不碰网络、不做 I/O，未知线上值保留用于诊断",
		},
	},
	{
		name: "aster_acme_protocol",
		body: {
			en: "Typed wire contracts. Named request/response structures, directory discovery, problem documents, and JWS headers — no HTTP, no signing.",
			zh: "具名线上契约。结构化的请求/响应、directory 发现、problem 文档与 JWS header——没有 HTTP，不做签名",
		},
	},
	{
		name: "aster_acme",
		body: {
			en: "The client layer. Account orchestration, ES256 JWS, a nonce pool with bounded retries, and injectable solver and storage contracts.",
			zh: "客户端层。账户编排、ES256 JWS、带限次重试的 nonce 池，以及可注入的 solver 与存储契约",
		},
	},
	{
		name: "aster_acme_dns",
		body: {
			en: "DNS-01 solver layer. Zone routing, delegation-aware lookups, and provider adapters on the client's solver contract.",
			zh: "DNS-01 solver 层。zone 路由、感知委托的查询，以及架在客户端 solver 契约上的 provider 适配",
		},
	},
	{
		name: "aster_acme_cli_storage",
		body: {
			en: "Local file storage. PKCS#8 keys, versioned TOML metadata, atomic writes, and bounded locking — Unix today.",
			zh: "本地文件存储。PKCS#8 密钥、带版本的 TOML 元数据、原子写入与有界锁定——当前支持 Unix",
		},
	},
	{
		name: "aster_acme_cli",
		body: {
			en: "The command line. Interactive or scripted account management with colored diagnostics and structured JSON output.",
			zh: "命令行。交互式或脚本化的账户管理，彩色诊断与结构化 JSON 输出",
		},
	},
] as const;

const en = {
	meta: {
		title: "AsterACME — The Rust ACME client built from the protocol up",
		description:
			"AsterACME is an open-source Rust ACME client and CLI: a pure protocol state machine, typed wire contracts, and account management that works against real CAs today — with certificate issuance on its way.",
	},
	nav: {
		crates: "Crates",
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
		status: "In active development",
		title: "The ACME client built from the protocol up.",
		subtitle:
			"AsterACME is an open-source Rust ACME client and CLI: a pure protocol state machine, typed wire contracts, and account management that works against real CAs today. Certificate issuance is being built on top.",
		primaryCta: "View on GitHub",
		secondaryCta: "Browse crates",
		note: "RFC 8555-compatible · MIT OR Apache-2.0",
	},
	code: {
		label: "Register an account",
		caption:
			"A real command against a real CA. The CLI keeps the key local, finds or creates the account, and reports structured JSON.",
	},
	cratesSection: {
		kicker: "What is in the box",
		title: "Six crates, layered by ownership.",
		docsCta: "Browse the repository",
	},
	status: {
		kicker: "Status",
		title: "From accounts to issuance.",
		body: "The account layer already works against real CAs. Certificate issuance, DNS-01, and renewal are being built on top of it, in the open.",
		available: "Available",
		inDevelopment: "In development",
		planned: "Planned",
		items: [
			{
				label:
					"ACME account lifecycle — register, recover, inspect, verify, deactivate",
				state: "available",
			},
			{
				label:
					"Protocol layer — typed wire contracts, pure state machine, ES256 JWS",
				state: "available",
			},
			{
				label:
					"Command-line account management — colored diagnostics, JSON output",
				state: "available",
			},
			{
				label: "Certificate issuance, renewal & revocation",
				state: "inDevelopment",
			},
			{
				label: "DNS-01 with reusable DNS provider integrations",
				state: "planned",
			},
			{
				label: "HTTP-01 and ACME Renewal Information (RFC 9773)",
				state: "planned",
			},
		] as { label: string; state: "available" | "inDevelopment" | "planned" }[],
		cta: "Read the account testing notes",
	},
	start: {
		kicker: "Start here",
		title: "Meet the CLI.",
		body: "One binary manages accounts against public CAs. Library crates arrive as Git dependencies — nothing is published to crates.io yet.",
		step1: "Register and verify an account",
		step2: "Or embed the library",
		step2Body: "Depend on the crates you need directly from the repository.",
		docsCta: "Read the README",
		apiCta: "Browse the crates",
	},
	cta: {
		title: "Put the protocol layer to work.",
		body: "Everything is open source, MIT or Apache-2.0 licensed, and growing in the open.",
		primary: "View on GitHub",
		secondary: "AsterCosmos",
	},
	footer: {
		tagline: "Rust ACME client and CLI from AsterCosmos.",
		copyright: "© 2026 AsterCosmos",
		license:
			"Code: MIT OR Apache-2.0 · Content: CC-BY 4.0 · Brand: all rights reserved",
	},
};

const zh: Messages = {
	meta: {
		title: "AsterACME —— 协议优先的 Rust ACME 客户端",
		description:
			"AsterACME 是开源的 Rust ACME 客户端与 CLI：纯协议状态机、具名线上契约，账户管理今天就能对接真实 CA——证书签发正在路上",
	},
	nav: {
		crates: "模块",
		status: "现状",
		start: "开始使用",
		github: "GitHub",
	},
	a11y: {
		toggleTheme: "切换颜色主题",
		toggleLang: "Switch to English",
		skipToContent: "跳到正文",
	},
	hero: {
		status: "正在构建中",
		title: "协议优先的 ACME 客户端",
		subtitle:
			"AsterACME 是开源的 Rust ACME 客户端与 CLI：纯协议状态机、具名线上契约，账户管理今天就能对接真实 CA。证书签发正在这一层之上构建",
		primaryCta: "在 GitHub 查看",
		secondaryCta: "浏览模块",
		note: "兼容 RFC 8555 协议 · MIT OR Apache-2.0",
	},
	code: {
		label: "注册一个账户",
		caption:
			"对着真实 CA 跑的真实命令。密钥保存在本地，查找或创建账户，返回结构化 JSON",
	},
	cratesSection: {
		kicker: "里面有什么",
		title: "六个 crate，按所有权分层",
		docsCta: "浏览仓库",
	},
	status: {
		kicker: "进展",
		title: "从账户到签发，逐层做实",
		body: "账户层今天就能对接真实 CA。证书签发、DNS-01 与续期正在这一层之上公开构建",
		available: "已可用",
		inDevelopment: "构建中",
		planned: "规划中",
		items: [
			{
				label: "ACME 账户生命周期——注册、找回、查看、验证、停用",
				state: "available",
			},
			{
				label: "协议层——具名线上契约、纯状态机、ES256 JWS",
				state: "available",
			},
			{
				label: "命令行账户管理——彩色诊断、JSON 输出",
				state: "available",
			},
			{
				label: "证书签发、续期与吊销",
				state: "inDevelopment",
			},
			{
				label: "DNS-01 与可复用的 DNS provider 集成",
				state: "planned",
			},
			{
				label: "HTTP-01 与 ACME 续期信息（RFC 9773）",
				state: "planned",
			},
		] as { label: string; state: "available" | "inDevelopment" | "planned" }[],
		cta: "阅读账户测试记录",
	},
	start: {
		kicker: "从这里开始",
		title: "先认识 CLI",
		body: "一个二进制，对接公开 CA 管理账户。库 crate 目前以 Git 依赖引入——还没有发布到 crates.io",
		step1: "注册并验证账户",
		step2: "或者嵌入库",
		step2Body: "直接从仓库依赖你需要的 crate",
		docsCta: "阅读 README",
		apiCta: "浏览各 crate",
	},
	cta: {
		title: "把协议层先用起来",
		body: "全部开源，MIT OR Apache-2.0 授权，在公开开发中成长",
		primary: "在 GitHub 查看",
		secondary: "AsterCosmos",
	},
	footer: {
		tagline: "来自 AsterCosmos 的 Rust ACME 客户端与 CLI",
		copyright: "© 2026 AsterCosmos",
		license: "代码：MIT OR Apache-2.0 · 内容：CC-BY 4.0 · 品牌：保留所有权利",
	},
};

export type Messages = typeof en;

const messages: Record<Lang, Messages> = { en, zh };

export function t(lang: Lang): Messages {
	return messages[lang];
}
