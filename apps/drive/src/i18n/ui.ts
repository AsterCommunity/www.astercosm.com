export const languages = {
	en: "English",
	zh: "中文",
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

export const GITHUB_URL = "https://github.com/AsterCommunity/AsterDrive";

/** docs 站 zh 在根、en 在 /en/ 前缀下 */
export function docsUrl(lang: Lang, path: string): string {
	const prefix = lang === "zh" ? "" : "/en";
	return `https://drive.docs.astercosm.com${prefix}${path}`;
}

/** 站内语言切换目标路径 */
export function localizedPath(lang: Lang): string {
	return lang === defaultLang ? "/" : `/${lang}/`;
}

const en = {
	meta: {
		title: "AsterDrive — Self-hosted file infrastructure in Rust",
		description:
			"AsterDrive is a self-hosted file service for small teams: reliable uploads, safe sharing, your choice of storage, and an interface that stays out of your way.",
	},
	nav: {
		features: "Features",
		storage: "Storage",
		deploy: "Deploy",
		docs: "Docs",
		github: "GitHub",
	},
	a11y: {
		toggleTheme: "Toggle color theme",
		toggleLang: "切换到中文",
		skipToContent: "Skip to content",
	},
	hero: {
		title: "Your files. Your storage. Your rules.",
		subtitle:
			"AsterDrive is a self-hosted file service for small teams — upload, organize, and share with confidence, connect the tools you already use, and decide exactly where every file lives.",
		primaryCta: "Quick start",
		secondaryCta: "Star on GitHub",
		screenshotAlt: "AsterDrive web panel screenshot",
	},
	pillars: {
		title: "Built around what a file service should be",
		items: [
			{
				title: "Storage control",
				body: "Route uploads to local disk, S3-compatible buckets, Azure Blob, Tencent COS, Alibaba OSS, Qiniu Kodo, OneDrive, SFTP, or remote follower nodes — by user, team, and file size. Policies decide where bytes live; you decide the policies.",
			},
			{
				title: "Large files, first class",
				body: "Direct, resumable chunked, presigned, and multipart uploads. The backend negotiates the right path by policy and object size instead of forcing every file through one funnel.",
			},
			{
				title: "Operations built in",
				body: "Health endpoints, audit logs, background task records, storage connection tests, doctor diagnostics, and migration commands are first-class features — because you run this thing yourself.",
			},
		],
	},
	connectors: {
		title: "Nine backends, one contract",
		subtitle:
			"Every storage backend implements the same connector contract: descriptor-driven admin UI, versioned typed config, encrypted credentials. Adding a provider no longer means forking the core.",
		docsCta: "Storage backend guides",
	},
	coverage: {
		title: "One install, the whole workflow",
		subtitle:
			"The complete drive workflow out of the box — no plugin marketplace required.",
		groups: [
			{
				title: "File management",
				body: "The daily drive work: browse, search, preview, edit, and recover when things go wrong.",
				items: [
					"Folder tree & breadcrumbs",
					"Full-text search",
					"Batch operations",
					"Thumbnails & previews",
					"Monaco text editing",
					"Full keyboard navigation",
					"Version history & trash",
				],
			},
			{
				title: "Sharing & workspaces",
				body: "Team space with boundaries, share links with rules — password, expiry, download limits.",
				items: [
					"Personal & team workspaces",
					"Public shares with password & expiry",
					"Download limits & counters",
					"Per-workspace quotas",
					"Audit logs",
				],
			},
			{
				title: "Access & editing",
				body: "Open files from anywhere: the browser, a WebDAV mount, or your Office suite.",
				items: [
					"WebDAV with scoped accounts",
					"Office editing via WOPI",
					"Passkey / WebAuthn login",
					"Archive compress & extract",
				],
			},
			{
				title: "Operations",
				body: "You run it, so you can see it: health, audit, tasks, and diagnostics built in.",
				items: [
					"Health endpoints & doctor",
					"Background task records",
					"Storage connection tests",
					"Runtime settings & cleanup",
					"Multi-primary cluster ready",
				],
			},
		],
	},
	deploy: {
		title: "From zero to drive in three commands",
		subtitle:
			"One container, embedded frontend, SQLite out of the box. PostgreSQL or MySQL when you grow. Kubernetes and Helm charts when you grow a lot.",
		dockerCta: "Docker deployment guide",
		k8sCta: "Kubernetes & Helm",
	},
	fit: {
		title: "Where AsterDrive fits — and where it doesn't",
		fitsTitle: "A good fit when you want",
		fits: [
			"A single self-hosted service with embedded frontend assets",
			"SQLite out of the box, PostgreSQL / MySQL when you need them",
			"Storage routing across local, object-storage, and remote-node backends",
			"Personal and team workspaces with quotas, shares, trash, and audit logs",
			"WebDAV access with independent accounts and scoped root folders",
			"Office preview and editing through OnlyOffice or Collabora (WOPI)",
			"A codebase meant to be read, modified, and deployed — no plugin marketplace required",
		],
		notFitsTitle: "Probably not when you need",
		notFits: [
			"A full collaboration suite with calendars, contacts, chat, and mail",
			"Mature native desktop and mobile sync clients today",
			"An ultra-minimal web UI over a single server directory",
			"Vendor-managed HA, cross-region failover, or compliance guarantees",
			"A SaaS where someone else owns the deployment and the data responsibility",
		],
	},
	cta: {
		title: "Take back your files.",
		subtitle:
			"Spin up a local trial in minutes. Keep it because it stays out of your way.",
		primary: "Quick start",
		secondary: "Read the docs",
		license:
			"Free and open source under MIT OR Apache-2.0 — read the code, modify it, run it anywhere. No vendor lock-in, ever.",
	},
	footer: {
		tagline: "Self-hosted file service for small teams.",
		product: "Product",
		community: "Community",
		legal: "Legal & Security",
		docs: "Documentation",
		quickStart: "Quick start",
		dockerDeploy: "Docker deployment",
		k8s: "Kubernetes & Helm",
		issues: "Issues",
		releases: "Releases",
		security: "Security",
		license: "MIT OR Apache-2.0",
		copyright: "© 2026 AsterCommunity & AptS-1547",
	},
};

export type Messages = typeof en;

const zh: Messages = {
	meta: {
		title: "AsterDrive — Rust 写的自托管文件基础设施",
		description:
			"AsterDrive 是小团队的自托管文件服务：可靠上传、安全分享、存储位置由你决定，还有一个不碍事的界面",
	},
	nav: {
		features: "特性",
		storage: "存储",
		deploy: "部署",
		docs: "文档",
		github: "GitHub",
	},
	a11y: {
		toggleTheme: "切换颜色主题",
		toggleLang: "Switch to English",
		skipToContent: "跳到正文",
	},
	hero: {
		title: "文件归你，存储归你，规矩也归你",
		subtitle:
			"AsterDrive 是小团队的自托管文件服务——安心上传、整理和分享，接上你已经在用的工具，并且由你决定每个文件存在哪里",
		primaryCta: "快速开始",
		secondaryCta: "GitHub 加星",
		screenshotAlt: "AsterDrive Web 面板截图",
	},
	pillars: {
		title: "围绕文件服务本该有的样子构建",
		items: [
			{
				title: "存储控制",
				body: "按用户、团队和文件大小，把上传路由到本机磁盘、S3 兼容存储、Azure Blob、腾讯云 COS、阿里云 OSS、七牛 Kodo、OneDrive、SFTP 或远程从节点。策略决定字节的落点，你决定策略",
			},
			{
				title: "大文件是一等公民",
				body: "直连、断点续传分块、预签名和 multipart 上传。后端按策略和对象大小协商最合适的路径，而不是把所有文件挤进同一条管道",
			},
			{
				title: "运维内生",
				body: "健康端点、审计日志、后台任务记录、存储连接测试、doctor 诊断和迁移命令都是一等功能——因为跑这套系统的人是你自己",
			},
		],
	},
	connectors: {
		title: "九个后端，一个契约",
		subtitle:
			"每个存储后端实现同一套 connector 契约：descriptor 驱动的管理界面、版本化类型配置、加密凭据。新增 provider 不再需要改动核心",
		docsCta: "存储后端指南",
	},
	coverage: {
		title: "一次部署，覆盖整个文件工作流",
		subtitle: "完整的文件工作流开箱即有——不用逛插件市场",
		groups: [
			{
				title: "文件管理",
				body: "每天的文件活：浏览、搜索、预览、编辑，出了岔子还能找回来",
				items: [
					"目录树与面包屑",
					"全文搜索",
					"批量操作",
					"缩略图与预览",
					"Monaco 文本编辑",
					"全键盘导航",
					"版本历史与回收站",
				],
			},
			{
				title: "分享与工作空间",
				body: "有边界的团队空间，有规矩的分享链接——密码、过期时间、下载限制",
				items: [
					"个人与团队工作空间",
					"密码与过期时间的公开分享",
					"下载限制与计数",
					"独立配额",
					"审计日志",
				],
			},
			{
				title: "接入与编辑",
				body: "从任何地方打开文件：浏览器、WebDAV 挂载，或者你的 Office 套件",
				items: [
					"限定根目录的 WebDAV",
					"WOPI 在线编辑 Office",
					"Passkey 与 WebAuthn 登录",
					"压缩包在线打包解压",
				],
			},
			{
				title: "运维",
				body: "系统是你自己跑的，所以你看得见：健康、审计、任务、诊断全部内置",
				items: [
					"健康端点与 doctor",
					"后台任务记录",
					"存储连接测试",
					"运行时设置与定期清理",
					"多 Primary 集群就绪",
				],
			},
		],
	},
	deploy: {
		title: "三条命令，从零到网盘",
		subtitle:
			"一个容器，内嵌前端，SQLite 开箱即用。长大了换 PostgreSQL 或 MySQL。长很大还有 Kubernetes 和 Helm chart",
		dockerCta: "Docker 部署指南",
		k8sCta: "Kubernetes 与 Helm",
	},
	fit: {
		title: "适合什么，不适合什么",
		fitsTitle: "当你想要这些，选它没错",
		fits: [
			"一个内嵌前端的单体式自托管服务",
			"SQLite 开箱即用，需要时再上 PostgreSQL / MySQL",
			"跨本机、对象存储和远程节点的存储路由",
			"个人与团队工作空间：配额、分享、回收站、审计日志",
			"独立账号、限定根目录的 WebDAV 访问",
			"通过 OnlyOffice 或 Collabora 预览编辑 Office 文件（WOPI）",
			"一个读得懂、改得动、部署得了的代码库——不需要插件市场",
		],
		notFitsTitle: "当你需要这些，另请高明",
		notFits: [
			"日历、联系人、聊天、邮件俱全的协作全家桶",
			"今天就要成熟的原生桌面和移动同步客户端",
			"只罩一个服务器目录的极简 Web 界面",
			"厂商托管的高可用、跨区域故障转移或合规保证",
			"别人替你承担部署和数据责任的 SaaS",
		],
	},
	cta: {
		title: "把文件拿回来",
		subtitle: "几分钟起一个本地试用。留下它，因为它不碍事",
		primary: "快速开始",
		secondary: "阅读文档",
		license:
			"MIT OR Apache-2.0 双许可的自由开源软件——代码可读、可改、可部署在任何地方，永远没有厂商锁定",
	},
	footer: {
		tagline: "小团队的自托管文件服务",
		product: "产品",
		community: "社区",
		legal: "法律与安全",
		docs: "文档",
		quickStart: "快速开始",
		dockerDeploy: "Docker 部署",
		k8s: "Kubernetes 与 Helm",
		issues: "问题反馈",
		releases: "版本发布",
		security: "安全",
		license: "MIT OR Apache-2.0",
		copyright: "© 2026 AsterCommunity & AptS-1547",
	},
};

export const ui: Record<Lang, Messages> = { en, zh };

export function t(lang: Lang): Messages {
	return ui[lang];
}
