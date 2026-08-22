export const languages = {
	en: "English",
	zh: "中文",
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

export const GITHUB_ORG_URL = "https://github.com/AsterCommunity";
export const SOURCE_URL = "https://github.com/AsterCommunity/www.astercosm.com";
export const DRIVE_URL = "https://drive.astercosm.com";
export const DRIVE_GITHUB_URL = "https://github.com/AsterCommunity/AsterDrive";
export const ESAP_URL = "https://weare.esaps.net";
export const ESAP_STORY_URL = "https://story.esaps.net";

/** 站内语言切换目标路径 */
export function localizedPath(lang: Lang): string {
	return lang === defaultLang ? "/" : `/${lang}/`;
}

const en = {
	meta: {
		title: "AsterCosmos — The engineering home of Aster projects",
		description:
			"AsterCosmos is the public engineering node of the Aster project: systems, infrastructure, and archives, built to be operated.",
	},
	nav: {
		systems: "Systems",
		infrastructure: "Infrastructure",
		archive: "Archive",
		principles: "Principles",
		github: "GitHub",
	},
	a11y: {
		toggleTheme: "Toggle color theme",
		toggleLang: "切换到中文",
		skipToContent: "Skip to content",
		brandHome: "AsterCosmos home",
	},
	hero: {
		kicker: "01 / Public engineering node",
		title: "AsterCosmos",
		subtitle: "The engineering home of Aster projects.",
		description:
			"Built for systems that need to run, evolve, and be maintained. AsterCosmos is a peer organization to ESAP, sharing membership while keeping engineering work in its own public space.",
		primaryCta: "Explore systems",
		secondaryCta: "View GitHub",
	},
	systems: {
		kicker: "02 / Systems",
		title: "Products are treated as running systems, not demos.",
		description:
			"AsterCosmos maintains the things that need to stay alive: self-hosted services, engineering foundations, management panels, and the infrastructure that lets them be deployed, observed, and modified again.",
		points: [
			"Self-hosted product systems",
			"Developer-facing foundations",
			"Small-team operational surfaces",
		],
		showcaseCaption: "AsterDrive — self-hosted file infrastructure",
		showcaseAlt: "AsterDrive web panel screenshot",
		showcaseCta: "Visit AsterDrive",
	},
	infrastructure: {
		kicker: "03 / Infrastructure",
		title: "The path from code to maintenance stays visible.",
		description:
			"AsterCosmos exists so code, services, documentation, deployment, and ownership boundaries can be managed together instead of scattered across personal repositories.",
		points: [
			{
				title: "Runtime and deployment defaults",
				body: "Every project ships with a documented way to run it: configuration boundaries, deployment targets, and the commands that get it there.",
			},
			{
				title: "Identity, storage, monitoring, automation",
				body: "Shared operational concerns are owned by the organization, not re-invented per project.",
			},
			{
				title: "Maintainable boundaries between projects",
				body: "Projects stay independent to deploy and modify, without drifting into private sprawl.",
			},
		],
	},
	archive: {
		kicker: "04 / Archive",
		title: "ESAP remains beside AsterCosmos, not underneath it.",
		description:
			"ESAP keeps characters, timelines, worldbuilding, and creative archives. AsterCosmos keeps engineering projects, running systems, and technical entry points. They share membership while preserving separate public identities.",
		pillars: [
			{
				heading: "ESAP",
				subheading: "Creative archive",
				body: "Characters, timelines, worldbuilding.",
				cta: "Visit WeAreESAP",
				href: ESAP_URL,
			},
			{
				heading: "AsterCosmos",
				subheading: "Engineering entry",
				body: "Projects, running systems, technical entries.",
				cta: "Browse GitHub",
				href: GITHUB_ORG_URL,
			},
		],
		points: [
			"Shared membership and trust boundary",
			"Separate public identities",
			"Archives and systems cross-reference each other",
		],
	},
	principles: {
		kicker: "05 / Operating principles",
		title: "Built to be operated.",
		description:
			"AsterCosmos projects begin with the parts that keep them alive: deployment, ownership, configuration, documentation, and the path back into maintenance.",
		items: [
			{
				title: "Build for deployment",
				body: "Every project should have a clear runtime path, configuration boundary, and deployment story.",
			},
			{
				title: "Keep ownership visible",
				body: "The organization should make projects, permissions, and maintainers easier to find, not hide complexity.",
			},
			{
				title: "Document the running system",
				body: "Documentation is not only for the first install. It is also for the person who returns six months later to repair the system.",
			},
		],
	},
	entry: {
		kicker: "06 / Entry points",
		title: "A quiet front door for systems that are still growing.",
		description:
			"AsterCosmos keeps engineering projects in one public place: source, runtime surfaces, maintenance boundaries, and the links back into ESAP.",
	},
	footer: {
		tagline: "AsterCosmos public node. Built for the Aster project.",
		columns: {
			projects: "Projects",
			community: "Community",
			esap: "ESAP",
		},
		links: {
			driveSite: "AsterDrive",
			source: "Site source",
			github: "GitHub",
			driveRepo: "AsterDrive repository",
			characterArchive: "Character archive",
			stories: "Stories",
		},
		copyright: "© 2026 AsterCosmos",
		license:
			"Code: Apache 2.0 · Content: CC-BY 4.0 · Brand: all rights reserved",
		badge: "ESAP peer organization",
	},
};

export type Messages = typeof en;

const zh: Messages = {
	meta: {
		title: "AsterCosmos — Aster 项目的工程入口",
		description:
			"AsterCosmos 是 Aster 项目的公开工程节点：系统、基础设施与档案，为运行而构建。",
	},
	nav: {
		systems: "系统",
		infrastructure: "基础设施",
		archive: "档案",
		principles: "原则",
		github: "GitHub",
	},
	a11y: {
		toggleTheme: "切换颜色主题",
		toggleLang: "Switch to English",
		skipToContent: "跳到正文",
		brandHome: "AsterCosmos 首页",
	},
	hero: {
		kicker: "01 / 公开工程节点",
		title: "AsterCosmos",
		subtitle: "Aster 项目的工程归档与运行入口。",
		description:
			"为需要运行、演进和维护的系统而建。AsterCosmos 与 ESAP 同级，共享成员关系，同时把工程项目保留在自己的公开空间里。",
		primaryCta: "查看系统",
		secondaryCta: "访问 GitHub",
	},
	systems: {
		kicker: "02 / 系统",
		title: "产品首先是正在运行的系统，不是演示样板。",
		description:
			"AsterCosmos 维护那些需要长期运行的东西：自托管服务、工程底座、管理面板，以及让它们能被部署、观察和继续修改的基础设施。",
		points: ["自托管产品系统", "面向开发者的工程底座", "小团队运维界面"],
		showcaseCaption: "AsterDrive —— 自托管文件基础设施",
		showcaseAlt: "AsterDrive 网盘面版截图",
		showcaseCta: "访问 AsterDrive",
	},
	infrastructure: {
		kicker: "03 / 基础设施",
		title: "从代码到维护的路径，应该一直可见。",
		description:
			"AsterCosmos 存在的意义，是让代码、服务、文档、部署和责任边界能被统一管理，而不是散落在个人仓库里。",
		points: [
			{
				title: "运行时与部署默认值",
				body: "每个项目都附带文档化的运行方式：配置边界、部署目标，以及抵达那里的命令。",
			},
			{
				title: "身份、存储、监控、自动化",
				body: "共享的运维事项由组织统一负责，而不是每个项目重新发明一遍。",
			},
			{
				title: "项目之间可维护的边界",
				body: "项目保持独立部署与修改的能力，同时不漂变成私人仓库的蔓生。",
			},
		],
	},
	archive: {
		kicker: "04 / 档案",
		title: "ESAP 在 AsterCosmos 旁边，不在它下面。",
		description:
			"ESAP 保存角色、时间线、世界构建和创作档案；AsterCosmos 保存工程项目、运行系统和技术入口。它们共享成员关系，但保留各自的公开身份。",
		pillars: [
			{
				heading: "ESAP",
				subheading: "创作档案",
				body: "角色、时间线、世界构建。",
				cta: "访问 WeAreESAP",
				href: ESAP_URL,
			},
			{
				heading: "AsterCosmos",
				subheading: "工程入口",
				body: "工程项目、运行系统、技术入口。",
				cta: "浏览 GitHub",
				href: GITHUB_ORG_URL,
			},
		],
		points: ["共享成员与信任边界", "保留各自的公开身份", "档案和系统互相引用"],
	},
	principles: {
		kicker: "05 / 工作原则",
		title: "为运行而构建。",
		description:
			"AsterCosmos 的项目从维持运行的部分开始：部署、责任边界、配置、文档，以及重新回到维护状态的路径。",
		items: [
			{
				title: "为部署而构建",
				body: "每个项目都应该有清晰的运行方式、配置边界和部署路径。",
			},
			{
				title: "让责任边界可见",
				body: "组织不是用来藏复杂度的；它应该让项目、权限和维护者更容易被找到。",
			},
			{
				title: "记录正在运行的系统",
				body: "文档不只写给第一次安装，也写给半年后回来修东西的人。",
			},
		],
	},
	entry: {
		kicker: "06 / 入口",
		title: "一个安静的入口，给仍在生长的系统。",
		description:
			"AsterCosmos 把工程项目放在一个公开位置：源码、运行界面、维护边界，以及回到 ESAP 的路径。",
	},
	footer: {
		tagline: "AsterCosmos 公开节点。为 Aster 项目构建。",
		columns: {
			projects: "项目",
			community: "社区",
			esap: "ESAP",
		},
		links: {
			driveSite: "AsterDrive",
			source: "本站源码",
			github: "GitHub",
			driveRepo: "AsterDrive 仓库",
			characterArchive: "角色档案",
			stories: "故事站",
		},
		copyright: "© 2026 AsterCosmos",
		license: "代码：Apache 2.0 · 内容：CC-BY 4.0 · 品牌：保留所有权利",
		badge: "ESAP 同级组织",
	},
};

const messages: Record<Lang, Messages> = { en, zh };

export function t(lang: Lang): Messages {
	return messages[lang];
}
