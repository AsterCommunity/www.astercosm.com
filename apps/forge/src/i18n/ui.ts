export const languages = {
	en: "English",
	zh: "中文",
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

export const GITHUB_URL = "https://github.com/AsterCommunity/AsterForge";
export const WWW_URL = "https://www.astercosm.com";
export const DOCS_URL = "https://forge.docs.astercosm.com";
export const RUSTDOC_URL = "https://forge.docs.astercosm.com/crates/rustdoc/";
export const DRIVE_URL = "https://github.com/AsterCommunity/AsterDrive";
export const YGGDRASIL_URL = "https://github.com/AsterCommunity/AsterYggdrasil";

/** 站内语言切换目标路径 */
export function localizedPath(lang: Lang): string {
	return lang === defaultLang ? "/" : `/${lang}/`;
}

/** 文档站链接：中文站为根，英文站在 /en/ 下 */
export function docsUrl(lang: Lang, path = ""): string {
	const base = lang === "zh" ? DOCS_URL : `${DOCS_URL}/en`;
	return path ? `${base}${path}` : `${base}/`;
}

/**
 * crate 目录。事实源：AsterForge 仓库 Cargo.toml 的 workspace members
 * （32 个，2026-10 快照），与 docs/crates/*.md 的 crate 页面一一对应。
 * 分组沿用 README 的 Areas 口径；events 归入数据与协调，test 归入工具与测试。
 */
export const crateGroups = {
	runtime: {
		items: [
			{ name: "aster_forge_runtime", doc: "/crates/aster_forge_runtime" },
			{ name: "aster_forge_config", doc: "/crates/aster_forge_config" },
			{ name: "aster_forge_logging", doc: "/crates/aster_forge_logging" },
			{ name: "aster_forge_metrics", doc: "/crates/aster_forge_metrics" },
			{ name: "aster_forge_panic", doc: "/crates/aster_forge_panic" },
			{ name: "aster_forge_alloc", doc: "/crates/aster_forge_alloc" },
		],
	},
	web: {
		items: [
			{ name: "aster_forge_api", doc: "/crates/aster_forge_api" },
			{
				name: "aster_forge_api_docs_macros",
				doc: "/crates/aster_forge_api_docs_macros",
			},
			{ name: "aster_forge_middleware", doc: "/crates/aster_forge_middleware" },
			{
				name: "aster_forge_observability",
				doc: "/crates/aster_forge_observability",
			},
			{
				name: "aster_forge_external_auth",
				doc: "/crates/aster_forge_external_auth",
			},
			{ name: "aster_forge_http", doc: "/crates/aster_forge_http" },
			{ name: "aster_forge_webdav", doc: "/crates/aster_forge_webdav" },
		],
	},
	data: {
		items: [
			{ name: "aster_forge_db", doc: "/crates/aster_forge_db" },
			{
				name: "aster_forge_db_migration",
				doc: "/crates/aster_forge_db_migration",
			},
			{ name: "aster_forge_cache", doc: "/crates/aster_forge_cache" },
			{ name: "aster_forge_tasks", doc: "/crates/aster_forge_tasks" },
			{ name: "aster_forge_mail", doc: "/crates/aster_forge_mail" },
			{ name: "aster_forge_audit", doc: "/crates/aster_forge_audit" },
			{ name: "aster_forge_events", doc: "/crates/aster_forge_events" },
		],
	},
	storage: {
		items: [
			{
				name: "aster_forge_cloud_files_core",
				doc: "/crates/aster_forge_cloud_files_core",
			},
			{
				name: "aster_forge_cloud_files_linux",
				doc: "/crates/aster_forge_cloud_files_linux",
			},
			{
				name: "aster_forge_cloud_files_macos_bridge",
				doc: "/crates/aster_forge_cloud_files_macos_bridge",
			},
			{
				name: "aster_forge_cloud_files_windows",
				doc: "/crates/aster_forge_cloud_files_windows",
			},
			{
				name: "aster_forge_storage_core",
				doc: "/crates/aster_forge_storage_core",
			},
			{
				name: "aster_forge_file_classification",
				doc: "/crates/aster_forge_file_classification",
			},
		],
	},
	utilities: {
		items: [
			{ name: "aster_forge_crypto", doc: "/crates/aster_forge_crypto" },
			{ name: "aster_forge_utils", doc: "/crates/aster_forge_utils" },
			{ name: "aster_forge_validation", doc: "/crates/aster_forge_validation" },
			{ name: "aster_forge_xml", doc: "/crates/aster_forge_xml" },
			{ name: "aster_forge_test", doc: "/crates/aster_forge_test" },
		],
	},
	auth: {
		items: [{ name: "aster_forge_auth", doc: "/crates/aster_forge_auth" }],
	},
} as const;

const en = {
	meta: {
		title: "AsterForge — The runtime your service plugs into",
		description:
			"AsterForge is the shared Rust runtime behind Aster services. Compose lifecycle, data, and background work from ready-made crates, and keep your product's own rules to yourself.",
	},
	nav: {
		crates: "Crates",
		boundary: "Ownership",
		start: "Get started",
		github: "GitHub",
	},
	a11y: {
		toggleTheme: "Toggle color theme",
		toggleLang: "切换到中文",
		skipToContent: "Skip to content",
	},
	hero: {
		kicker: "Shared runtime for Aster services",
		title: "The runtime your service plugs into.",
		subtitle:
			"AsterForge is the foundation underneath Aster products: lifecycle, data, coordination, and background work, packaged as crates you compose instead of rewrite. Your product keeps its own rules.",
		primaryCta: "Read the guide",
		secondaryCta: "Browse crates",
		note: "Used by AsterDrive and AsterYggdrasil",
	},
	code: {
		label: "Your service entrypoint",
		caption:
			"Register what you need, then run. Startup order, health checks, and graceful shutdown are handled for you.",
	},
	crates: {
		kicker: "What is in the box",
		title: "Thirty-two crates, each with one job.",
		body: "Every crate is product-neutral. Take the runtime first, then add only the pieces your service actually needs.",
		groups: {
			runtime: "Runtime kernel",
			web: "Web and API",
			data: "Data and background work",
			storage: "Storage and files",
			utilities: "Utilities and testing",
			auth: "Authentication",
		},
		docsCta: "Full API reference",
	},
	boundary: {
		kicker: "The boundary",
		title: "Forge owns the mechanics. Your product owns the meaning.",
		body: "Permissions, user-facing API semantics, product entities, task payloads, audit actions, and presentation rules stay in your repository. Forge owns the reusable runtime mechanics behind them.",
		ours: {
			title: "Forge owns",
			items: [
				"Component registration, startup order, and shutdown ordering",
				"Health reporting, runtime leases, and graceful termination",
				"Shared infrastructure tables, migrations, and stores",
				"Cache backends, mail outbox dispatch, and audit storage",
				"Scheduled tasks, retry, and claim rules",
				"API helpers, middleware adapters, and external-auth connectors",
			],
		},
		yours: {
			title: "Your product owns",
			items: [
				"Permissions, roles, and access decisions",
				"User-facing API semantics and error messages",
				"Product entities and business repositories",
				"Task payloads, results, and scheduling policy",
				"Audit action enums and what they detail",
				"Presentation rules and product-specific formats",
			],
		},
		cta: "Read the integration principles",
	},
	start: {
		kicker: "Start here",
		title: "One command to a running service.",
		body: "The bundled Actix service template wires the standard components and leaves product-owned migrations for you to fill in.",
		step1: "Generate the project",
		step2: "Or add a crate to an existing service",
		step2Body: "Crates are independent — depend on the ones you need.",
		docsCta: "New project integration guide",
		apiCta: "Rust API reference",
	},
	reference: {
		kicker: "Proof, not promises",
		title: "Already running inside real products.",
		body: "AsterDrive and AsterYggdrasil are reference integrations. Read their code to see exactly where shared infrastructure stops and product behavior begins.",
		items: [
			{
				name: "AsterDrive",
				body: "File management, storage backends, and service infrastructure at scale.",
				href: DRIVE_URL,
			},
			{
				name: "AsterYggdrasil",
				body: "A smaller service with deliberately narrow integration boundaries.",
				href: YGGDRASIL_URL,
			},
		],
		cta: "More reference projects",
	},
	cta: {
		title: "Give your next service a foundation.",
		body: "Everything is open source, documented, and MIT or Apache-2.0 licensed.",
		primary: "Read the guide",
		secondary: "AsterCosmos",
	},
	footer: {
		tagline: "Shared runtime foundation for Aster services.",
		copyright: "© 2026 AsterCosmos",
		license:
			"Code: Apache 2.0 · Content: CC-BY 4.0 · Brand: all rights reserved",
	},
};

export type Messages = typeof en;

const zh: Messages = {
	meta: {
		title: "AsterForge —— 你的服务接入的运行时底座",
		description:
			"AsterForge 是 Aster 服务共享的 Rust 运行时底座。用现成 crate 组合生命周期、数据与后台任务，把产品自己的规则留在自己手里",
	},
	nav: {
		crates: "模块",
		boundary: "边界",
		start: "开始接入",
		github: "GitHub",
	},
	a11y: {
		toggleTheme: "切换颜色主题",
		toggleLang: "Switch to English",
		skipToContent: "跳到正文",
	},
	hero: {
		kicker: "Aster 服务共享的运行时",
		title: "你的服务接入的运行时底座",
		subtitle:
			"AsterForge 是 Aster 产品底下的那层基础：生命周期、数据、任务与后台工作，拆成可以直接组合的 crate，而不是每个服务重写一遍。产品自己的规则，仍归产品自己",
		primaryCta: "阅读接入指南",
		secondaryCta: "浏览模块",
		note: "AsterDrive 与 AsterYggdrasil 正在使用",
	},
	code: {
		label: "你的服务入口",
		caption:
			"注册你需要的组件，然后启动。启动顺序、健康检查与优雅关闭都由底座处理",
	},
	crates: {
		kicker: "里面有什么",
		title: "三十二个 crate，各司其职",
		body: "每个 crate 都与具体产品无关。先接运行时，再按需补上你这个服务真正需要的部分",
		groups: {
			runtime: "运行时内核",
			web: "Web 与 API",
			data: "数据与后台工作",
			storage: "存储与文件",
			utilities: "工具与测试",
			auth: "认证",
		},
		docsCta: "完整 API 参考",
	},
	boundary: {
		kicker: "边界",
		title: "机制归底座，意义归产品",
		body: "权限、对外的 API 语义、产品实体、任务载荷、审计动作与展示规则，都留在你的仓库里。Forge 负责它们背后可复用的运行时机制",
		ours: {
			title: "Forge 负责",
			items: [
				"组件注册、启动顺序与关闭顺序",
				"健康上报、运行时租约与优雅终止",
				"共享的基础表、迁移与 store",
				"缓存后端、邮件发件箱与审计存储",
				"定时任务、重试与任务认领规则",
				"API helper、中间件适配器与外部认证连接器",
			],
		},
		yours: {
			title: "你的产品负责",
			items: [
				"权限、角色与访问判定",
				"对外的 API 语义与错误信息",
				"产品实体与业务仓储",
				"任务载荷、结果与调度策略",
				"审计动作枚举及其明细",
				"展示规则与产品特有格式",
			],
		},
		cta: "阅读接入原则",
	},
	start: {
		kicker: "从这里开始",
		title: "一条命令，得到一个能跑的服务",
		body: "内置的 Actix 服务模板已经接好标准组件，产品自己的 migration 留给你填",
		step1: "生成项目",
		step2: "或者给已有服务加一个 crate",
		step2Body: "各 crate 相互独立——只依赖你真正需要的那些",
		docsCta: "新项目接入指南",
		apiCta: "Rust API 参考",
	},
	reference: {
		kicker: "不是承诺，是证据",
		title: "已经在真实产品里跑着",
		body: "AsterDrive 与 AsterYggdrasil 是接入参考。读它们的代码，能看清共享基础设施在哪里停下、产品行为从哪里开始",
		items: [
			{
				name: "AsterDrive",
				body: "文件管理、存储后端与规模化运行的服务基础设施",
				href: DRIVE_URL,
			},
			{
				name: "AsterYggdrasil",
				body: "更小的服务，接入边界刻意收得更窄",
				href: YGGDRASIL_URL,
			},
		],
		cta: "更多参考项目",
	},
	cta: {
		title: "让下一个服务有地基",
		body: "全部开源、有文档，MIT 或 Apache-2.0 授权",
		primary: "阅读接入指南",
		secondary: "AsterCosmos",
	},
	footer: {
		tagline: "Aster 服务共享的运行时底座",
		copyright: "© 2026 AsterCosmos",
		license: "代码：Apache 2.0 · 内容：CC-BY 4.0 · 品牌：保留所有权利",
	},
};

const messages: Record<Lang, Messages> = { en, zh };

export function t(lang: Lang): Messages {
	return messages[lang];
}
