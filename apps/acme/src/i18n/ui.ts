export const languages = {
	en: "English",
	zh: "中文",
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

export const GITHUB_URL = "https://github.com/AsterCommunity/AsterACME";
export const WWW_URL = "https://www.astercosm.com";
export const CHANGELOG_URL = `${GITHUB_URL}/blob/main/CHANGELOG.md`;
export const CRATES_TREE_URL = `${GITHUB_URL}/tree/main/crates`;

/** 站内语言切换目标路径 */
export function localizedPath(lang: Lang): string {
	return lang === defaultLang ? "/" : `/${lang}/`;
}

/**
 * crate 目录。事实源：AsterACME 仓库 Cargo.toml workspace members（10 个，
 * 0.1.0-alpha.1 快照，2026-11），与 crates/<name>/README.md 一一对应；顺序按
 * 依赖方向，内核在底、CLI 在边缘，DNS 契约层（dns/dns_adpp/dns_resolver/process）
 * 依次排在验证层之后。
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
			en: "The client layer. Account and certificate orchestration — issuance, renewal, ARI, revocation — ES256 JWS, and injectable solver and storage contracts.",
			zh: "客户端层。账户与证书编排——签发、续期、ARI 与吊销——ES256 JWS，以及可注入的 solver 与存储契约",
		},
	},
	{
		name: "aster_acme_validation",
		body: {
			en: "Validation methods and readiness checks. DNS TXT visibility and advisory CAA/TXT prechecks — no DNS provider writes.",
			zh: "验证方法与就绪检查层。DNS TXT 可见性检查与建议性 CAA/TXT 预检——不做 DNS provider 写入",
		},
	},
	{
		name: "aster_acme_dns",
		body: {
			en: "Protocol-neutral DNS publication contracts. Records, receipts, CNAME routing, and propagation policy shared by provider adapters.",
			zh: "协议无关的 DNS 发布契约。记录、回执、CNAME 路由与传播策略，供 provider adapter 共用",
		},
	},
	{
		name: "aster_acme_dns_adpp",
		body: {
			en: "External-process adapter for the AsterACME DNS Provider Protocol. One bounded JSON exchange per invocation; credentials never logged.",
			zh: "AsterACME DNS Provider Protocol 的外部进程适配器。每次调用一次有界 JSON 交换，凭据绝不进日志",
		},
	},
	{
		name: "aster_acme_dns_resolver",
		body: {
			en: "Read-only Hickory adapter for DNS observations. CNAME and TXT lookups preserve resolver stages; never mutates DNS.",
			zh: "只读 Hickory 解析适配器。保留解析器阶段的 CNAME 与 TXT 观察，不改动 DNS",
		},
	},
	{
		name: "aster_acme_process",
		body: {
			en: "Bounded child-process lifecycle. Reload commands and external DNS providers share process-tree ownership on Unix and Windows.",
			zh: "有界的子进程生命周期。reload 命令与外部 DNS provider 共用进程树所有权，覆盖 Unix 与 Windows",
		},
	},
	{
		name: "aster_acme_cli_storage",
		body: {
			en: "Local file storage. PKCS#8 keys, versioned TOML metadata, atomic writes, and bounded locking — Unix and Windows.",
			zh: "本地文件存储。PKCS#8 密钥、带版本的 TOML 元数据、原子写入与有界锁定——覆盖 Unix 与 Windows",
		},
	},
	{
		name: "aster_acme_cli",
		body: {
			en: "The command line. Accounts, certificates, deployment, daemon maintenance, and DNS provider profiles — colored diagnostics and structured JSON output.",
			zh: "命令行。账户、证书、部署、daemon 维护与 DNS provider 档案——彩色诊断与结构化 JSON 输出",
		},
	},
] as const;

const en = {
	meta: {
		title: "AsterACME — The Rust ACME client built from the protocol up",
		description:
			"AsterACME is an open-source Rust ACME client and CLI: a pure protocol state machine, typed wire contracts, and certificate issuance, renewal, and deployment that work against real CAs today.",
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
		title: "The ACME client built from the protocol up.",
		subtitle:
			"AsterACME is an open-source Rust ACME client and CLI: a pure protocol state machine, typed wire contracts, and certificate issuance, renewal, and deployment that work against real CAs today.",
		primaryCta: "View on GitHub",
		secondaryCta: "Browse crates",
		note: "RFC 8555-compatible · MIT OR Apache-2.0",
	},
	code: {
		label: "Register an account",
		caption:
			"A real command against a real CA, straight from the README. The key stays local; the CLI finds or creates the account.",
	},
	cratesSection: {
		kicker: "What is in the box",
		title: "Ten crates, layered by ownership.",
		docsCta: "Browse the repository",
	},
	status: {
		kicker: "Status",
		title: "The certificate lifecycle, working today.",
		body: "The CLI issues, renews, deploys, and revokes certificates against real CAs — and keeps them fresh unattended. The first release is on crates.io; external DNS automation ships today.",
		available: "Available",
		inDevelopment: "In development",
		planned: "Planned",
		items: [
			{
				label:
					"ACME account lifecycle — register, recover, rotate keys, deactivate",
				state: "available",
			},
			{
				label:
					"Certificate issuance — single-domain, SAN & wildcard via DNS-01, HTTP-01, TLS-ALPN-01",
				state: "available",
			},
			{
				label:
					"DNS-PERSIST-01 (draft -02) — persistent TXT records, reused across renewals",
				state: "available",
			},
			{
				label:
					"External DNS-01 automation — ADPP provider profiles, provider-side DNS writes",
				state: "available",
			},
			{
				label: "Renewal with ARI — single or batch, with retry backoff",
				state: "available",
			},
			{
				label:
					"Deployment — named targets per certificate, automatic after renewal, bounded reload",
				state: "available",
			},
			{
				label: "Unattended maintenance — resident daemon and cron run-once",
				state: "available",
			},
			{
				label:
					"Revocation — account or certificate-key signing, outcomes persisted locally",
				state: "available",
			},
			{
				label: "Advisory CAA/TXT/HTTP prechecks before new orders",
				state: "available",
			},
			{
				label: "Out-of-the-box DNS integrations — built-in provider adapters",
				state: "inDevelopment",
			},
		] as { label: string; state: "available" | "inDevelopment" | "planned" }[],
		cta: "Read the changelog",
	},
	start: {
		kicker: "Start here",
		title: "Meet the CLI.",
		body: "One binary manages the certificate lifecycle against public CAs — issue, renew, deploy, revoke. Install the published CLI from crates.io, or embed the library crates directly.",
		step1: "Install the CLI and register an account",
		step2: "Or embed the library",
		step2Body:
			"The library crates are published too — depend on the ones you need.",
		docsCta: "Read the README",
		apiCta: "Browse the crates",
	},
	cta: {
		title: "Issue your first certificate.",
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
			"AsterACME 是开源的 Rust ACME 客户端与 CLI：纯协议状态机、具名线上契约，签发、续期与部署今天就能对接真实 CA",
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
		title: "协议优先的 ACME 客户端",
		subtitle:
			"AsterACME 是开源的 Rust ACME 客户端与 CLI：纯协议状态机、具名线上契约，签发、续期与部署今天就能对接真实 CA",
		primaryCta: "在 GitHub 查看",
		secondaryCta: "浏览模块",
		note: "兼容 RFC 8555 协议 · MIT OR Apache-2.0",
	},
	code: {
		label: "注册一个账户",
		caption:
			"对着真实 CA 跑的真实命令，直接来自 README。密钥保存在本地，CLI 查找或创建账户",
	},
	cratesSection: {
		kicker: "里面有什么",
		title: "十个 crate，按所有权分层",
		docsCta: "浏览仓库",
	},
	status: {
		kicker: "进展",
		title: "证书全生命周期，今天就能用",
		body: "CLI 今天就能对真实 CA 签发、续期、部署和吊销证书，并无人值守地保持更新。首个版本已上 crates.io，外部 DNS 自动化今天可用",
		available: "已可用",
		inDevelopment: "构建中",
		planned: "规划中",
		items: [
			{
				label: "ACME 账户生命周期——注册、找回、换钥、停用",
				state: "available",
			},
			{
				label:
					"证书签发——单域名、多 SAN 与通配符，DNS-01、HTTP-01、TLS-ALPN-01",
				state: "available",
			},
			{
				label: "DNS-PERSIST-01（草案 -02）——长期 TXT 记录一次配置，续期复用",
				state: "available",
			},
			{
				label: "外部 DNS-01 自动化——ADPP provider 档案，provider 侧 DNS 写入",
				state: "available",
			},
			{
				label: "续期与 ARI——单张或批量，失败退避重试",
				state: "available",
			},
			{
				label:
					"证书部署——每张证书多个具名目标，续期后自动部署，reload 有界执行",
				state: "available",
			},
			{
				label: "无人值守维护——常驻 daemon 与 cron run-once",
				state: "available",
			},
			{
				label: "证书吊销——账户或证书私钥签名，结果本地独立持久化",
				state: "available",
			},
			{
				label: "签发前 CAA/TXT/HTTP 建议性预检",
				state: "available",
			},
			{
				label: "开箱即用的 DNS 集成——内置云厂商 adapter",
				state: "inDevelopment",
			},
		] as { label: string; state: "available" | "inDevelopment" | "planned" }[],
		cta: "查看更新日志",
	},
	start: {
		kicker: "从这里开始",
		title: "先认识 CLI",
		body: "一个二进制，对接公开 CA 管理证书全生命周期——签发、续期、部署、吊销。CLI 已发布到 crates.io，库 crate 也可直接嵌入",
		step1: "安装 CLI 并注册账户",
		step2: "或者嵌入库",
		step2Body: "库 crate 同样已发布，直接依赖需要的即可",
		docsCta: "阅读 README",
		apiCta: "浏览各 crate",
	},
	cta: {
		title: "签发你的第一张证书",
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
