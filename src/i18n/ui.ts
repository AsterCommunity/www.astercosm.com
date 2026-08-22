export const languages = {
	en: "English",
	zh: "中文",
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

export const GITHUB_ORG_URL = "https://github.com/AsterCommunity";
export const SOURCE_URL = "https://github.com/AsterCommunity/www.astercosm.com";
export const DRIVE_URL = "https://drive.astercosm.com";
export const DRIVE_DOCS_URL = "https://drive.docs.astercosm.com";
export const DRIVE_GITHUB_URL = "https://github.com/AsterCommunity/AsterDrive";
export const ESAP_URL = "https://weare.esaps.net";
export const ESAP_STORY_URL = "https://story.esaps.net";
export const PULSE_URL = "https://github.com/AsterCommunity/AsterPulse";
export const YGGDRASIL_URL = "https://github.com/AsterCommunity/AsterYggdrasil";
export const ASTERGIT_URL = "https://github.com/AsterCommunity/AsterGit";
export const LANDING_GITHUB_URL =
	"https://github.com/AsterCommunity/AsterDriveLanding";

/** 站内语言切换目标路径（根页） */
export function localizedPath(lang: Lang): string {
	return lang === defaultLang ? "/" : `/${lang}/`;
}

/** 站内子页路径，如 pagePath("zh", "projects") → "/zh/projects/" */
export function pagePath(lang: Lang, page: PageId): string {
	const prefix = lang === defaultLang ? "" : `/${lang}`;
	return `${prefix}/${page}/`;
}

/** 页面标识："home" 为根页，其余为同名子页 */
export type PageId = "home" | "projects" | "philosophy" | "archive";

/** 某页面在指定语言下的路径 */
export function navPath(lang: Lang, page: PageId): string {
	return page === "home" ? localizedPath(lang) : pagePath(lang, page);
}

const en = {
	meta: {
		title: "AsterCosmos — The engineering home of Aster projects",
		description:
			"AsterCosmos is the public engineering node of the Aster project: systems, infrastructure, and archives, built to be operated.",
	},
	nav: {
		home: "Home",
		projects: "Projects",
		philosophy: "Philosophy",
		archive: "Archive",
		github: "GitHub",
	},
	a11y: {
		toggleTheme: "Toggle color theme",
		toggleLang: "切换到中文",
		skipToContent: "Skip to content",
		brandHome: "AsterCosmos home",
	},
	home: {
		hero: {
			kicker: "The Aster project's engineering arm",
			title: "Built to be operated.",
			subtitle: "AsterCosmos is the engineering home of Aster projects.",
			description:
				"Built for systems that need to run, evolve, and be maintained. AsterCosmos is a peer organization to ESAP, sharing membership while keeping engineering work in its own public space.",
			primaryCta: "Explore projects",
			secondaryCta: "View GitHub",
		},
		relation: {
			text: "Creative archives? That's ESAP — our peer organization.",
			cta: "How we fit together",
		},
		featured: {
			kicker: "Featured system",
			title: "AsterDrive — self-hosted file infrastructure",
			body: "Reliable uploads, storage policies across S3 and remote-node backends, WebDAV/WOPI, and first-class ops tooling. The reference for how AsterCosmos builds and runs software.",
			alt: "AsterDrive web panel screenshot",
			cta: "Visit AsterDrive",
			repoCta: "Repository",
			alsoRunning: {
				label: "Also running",
				items: [
					{ name: "AsterPulse", href: PULSE_URL },
					{ name: "AsterYggdrasil", href: YGGDRASIL_URL },
					{ name: "AsterGit", href: ASTERGIT_URL },
				] as { name: string; href: string }[],
				allCta: "All projects",
			},
		},
		entries: {
			kicker: "Entry points",
			cards: [
				{
					title: "Projects",
					body: "Running systems, engineering foundations, and the sites that present them.",
					cta: "Browse the index",
					page: "projects",
				},
				{
					title: "Philosophy",
					body: "Products are running systems, and the path from code to maintenance stays visible.",
					cta: "How we build",
					page: "philosophy",
				},
				{
					title: "Archive",
					body: "ESAP remains beside AsterCosmos, not underneath it — shared membership, separate identities.",
					cta: "The other half",
					page: "archive",
				},
			] as { title: string; body: string; cta: string; page: PageId }[],
		},
	},
	projects: {
		meta: {
			title: "Projects — AsterCosmos",
			description:
				"The public systems and engineering foundations of AsterCosmos: self-hosted products, shared runtimes, and the tooling that keeps them maintained.",
		},
		kicker: "Projects",
		title: "Everything here is meant to stay running.",
		description:
			"A curated index of AsterCommunity repositories. The complete list lives on GitHub; this page presents the ones with a public story.",
		groups: [
			{
				heading: "Systems",
				note: "Self-hosted products with running deployments.",
				items: [
					{
						name: "AsterDrive",
						tagline:
							"Self-hosted file infrastructure for small teams: reliable uploads, storage policies, S3/remote-node backends, WebDAV/WOPI, and ops tooling.",
						href: DRIVE_GITHUB_URL,
						site: DRIVE_URL,
						tech: "Rust",
					},
					{
						name: "AsterPulse",
						tagline: "A distributed uptime monitoring system.",
						href: "https://github.com/AsterCommunity/AsterPulse",
						tech: "Rust",
					},
					{
						name: "AsterYggdrasil",
						tagline:
							"Self-hosted Minecraft skin site and Yggdrasil/authlib-injector authentication server.",
						href: "https://github.com/AsterCommunity/AsterYggdrasil",
						tech: "Rust",
					},
					{
						name: "AsterGit",
						tagline:
							"A lightweight self-hosted software development forge built in Rust.",
						href: "https://github.com/AsterCommunity/AsterGit",
						tech: "Rust",
					},
					{
						name: "AsterMail",
						tagline: "Sovereign, self-hosted mail system.",
						href: "https://github.com/AsterCommunity/AsterMail",
						tech: "—",
					},
				],
			},
			{
				heading: "Foundations",
				note: "Shared engineering bases that products build on.",
				items: [
					{
						name: "AsterForge",
						tagline:
							"Shared Rust runtime foundation and infrastructure kernel for Aster services.",
						href: "https://github.com/AsterCommunity/AsterForge",
						tech: "Rust",
					},
					{
						name: "aster-automation",
						tagline:
							"Deterministic GitHub PR and CI lifecycle automation for AsterCommunity repositories.",
						href: "https://github.com/AsterCommunity/aster-automation",
						tech: "JavaScript",
					},
					{
						name: "AsterDriveClients",
						tagline: "Client applications for AsterDrive.",
						href: "https://github.com/AsterCommunity/AsterDriveClients",
						tech: "—",
					},
					{
						name: "AsterDriveMigration",
						tagline:
							"Migration tooling for moving existing file services onto AsterDrive.",
						href: "https://github.com/AsterCommunity/AsterDriveMigration",
						tech: "Rust",
					},
				],
			},
			{
				heading: "Sites",
				note: "The public surfaces you are looking at.",
				items: [
					{
						name: "www.astercosm.com",
						tagline: "This site — the AsterCosmos front door.",
						href: SOURCE_URL,
						tech: "Astro",
					},
					{
						name: "AsterDriveLanding",
						tagline:
							"The AsterDrive product landing page and its screenshot asset pipeline.",
						href: "https://github.com/AsterCommunity/AsterDriveLanding",
						tech: "Astro",
					},
				],
			},
		],
		fullListCta: "Full repository list on GitHub",
		involve:
			"Want to get involved? Each repository's README is the entry point — issues and discussions are open.",
	},
	philosophy: {
		meta: {
			title: "Philosophy — AsterCosmos",
			description:
				"How AsterCosmos builds: products are running systems, the path from code to maintenance stays visible, and projects begin with the parts that keep them alive.",
		},
		kicker: "Philosophy",
		title: "How AsterCosmos builds.",
		intro:
			"These are not aspirations. They are the constraints every AsterCosmos project is expected to satisfy before it is called done.",
		systems: {
			kicker: "01 / Systems",
			title: "Products are treated as running systems, not demos.",
			description:
				"AsterCosmos maintains the things that need to stay alive: self-hosted services, engineering foundations, management panels, and the infrastructure that lets them be deployed, observed, and modified again.",
			points: [
				"Self-hosted product systems",
				"Developer-facing foundations",
				"Small-team operational surfaces",
			],
		},
		infrastructure: {
			kicker: "02 / Infrastructure",
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
		principles: {
			kicker: "03 / Operating principles",
			title: "How we work.",
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
		practice: {
			kicker: "04 / In practice",
			title: "Already true, not aspirational.",
			items: [
				{
					principle: "Build for deployment",
					evidence:
						"AsterDrive ships a five-minute quick trial and a documented path from a single container to production.",
					cta: "Quick trial docs",
					href: `${DRIVE_DOCS_URL}/start/quick-trial/`,
				},
				{
					principle: "Document the running system",
					evidence:
						"AsterDrive's landing screenshots are captured from a real running instance by an automated pipeline — docs and UI never drift apart.",
					cta: "See the pipeline",
					href: LANDING_GITHUB_URL,
				},
				{
					principle: "Keep ownership visible",
					evidence:
						"Every public project sits on one index page, repository and live site side by side — including this site itself.",
					cta: "The projects index",
					href: "",
					page: "projects",
				},
			] as {
				principle: string;
				evidence: string;
				cta: string;
				href: string;
				page?: PageId;
			}[],
		},
	},
	archive: {
		meta: {
			title: "Archive — AsterCosmos",
			description:
				"ESAP remains beside AsterCosmos, not underneath it: shared membership, separate public identities, archives and systems that cross-reference each other.",
		},
		kicker: "Archive",
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
		esapSites: {
			kicker: "ESAP sites",
			items: [
				{
					name: "weare.esaps.net",
					body: "The character archive and main site of the ESAP project.",
					href: ESAP_URL,
				},
				{
					name: "story.esaps.net",
					body: "Long-form stories from the ESAP universe.",
					href: ESAP_STORY_URL,
				},
			],
		},
		look: {
			kicker: "A look inside",
			caption: "weare.esaps.net — the character archive, live.",
			alt: "WeAreESAP homepage screenshot",
			cta: "Visit WeAreESAP",
		},
	},
	footer: {
		tagline: "AsterCosmos public node. Built for the Aster project.",
		columns: {
			site: "Site",
			projects: "Projects",
			esap: "ESAP",
		},
		links: {
			home: "Home",
			philosophy: "Philosophy",
			archive: "Archive",
			driveSite: "AsterDrive",
			driveDocs: "AsterDrive docs",
			source: "Site source",
			github: "GitHub",
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
		home: "首页",
		projects: "项目",
		philosophy: "理念",
		archive: "档案",
		github: "GitHub",
	},
	a11y: {
		toggleTheme: "切换颜色主题",
		toggleLang: "Switch to English",
		skipToContent: "跳到正文",
		brandHome: "AsterCosmos 首页",
	},
	home: {
		hero: {
			kicker: "Aster 项目的工程组织",
			title: "为运行而构建。",
			subtitle: "AsterCosmos 是 Aster 项目的工程归档与运行入口。",
			description:
				"为需要运行、演进和维护的系统而建。AsterCosmos 与 ESAP 同级，共享成员关系，同时把工程项目保留在自己的公开空间里。",
			primaryCta: "浏览项目",
			secondaryCta: "访问 GitHub",
		},
		relation: {
			text: "创作档案？那是 ESAP —— 我们的同级组织。",
			cta: "我们如何拼在一起",
		},
		featured: {
			kicker: "精选系统",
			title: "AsterDrive —— 自托管文件基础设施",
			body: "可靠上传、跨 S3 与远程节点后端的存储策略、WebDAV/WOPI，以及一等公民的运维工具。它是 AsterCosmos 如何构建和运行软件的参考实现。",
			alt: "AsterDrive 网盘面板截图",
			cta: "访问 AsterDrive",
			repoCta: "仓库",
			alsoRunning: {
				label: "同样在运行",
				items: [
					{ name: "AsterPulse", href: PULSE_URL },
					{ name: "AsterYggdrasil", href: YGGDRASIL_URL },
					{ name: "AsterGit", href: ASTERGIT_URL },
				] as { name: string; href: string }[],
				allCta: "全部项目",
			},
		},
		entries: {
			kicker: "入口",
			cards: [
				{
					title: "项目",
					body: "运行中的系统、工程底座，以及展示它们的站点。",
					cta: "浏览索引",
					page: "projects",
				},
				{
					title: "理念",
					body: "产品是正在运行的系统，从代码到维护的路径始终可见。",
					cta: "我们如何构建",
					page: "philosophy",
				},
				{
					title: "档案",
					body: "ESAP 在 AsterCosmos 旁边，不在它下面——共享成员，各自独立。",
					cta: "另一半",
					page: "archive",
				},
			] as { title: string; body: string; cta: string; page: PageId }[],
		},
	},
	projects: {
		meta: {
			title: "项目 — AsterCosmos",
			description:
				"AsterCosmos 的公开系统与工程底座：自托管产品、共享运行时，以及让它们保持可维护的工具。",
		},
		kicker: "项目",
		title: "这里的一切都是为了持续运行。",
		description:
			"这是 AsterCommunity 仓库的策展视图。完整列表在 GitHub 上；本页展示那些有公开故事可讲的。",
		groups: [
			{
				heading: "系统",
				note: "有真实部署在运行的自托管产品。",
				items: [
					{
						name: "AsterDrive",
						tagline:
							"面向小团队的自托管文件基础设施：可靠上传、跨 S3 与远程节点的存储策略、WebDAV/WOPI 与运维工具。",
						href: DRIVE_GITHUB_URL,
						site: DRIVE_URL,
						tech: "Rust",
					},
					{
						name: "AsterPulse",
						tagline: "分布式可用性监控系统。",
						href: "https://github.com/AsterCommunity/AsterPulse",
						tech: "Rust",
					},
					{
						name: "AsterYggdrasil",
						tagline:
							"自托管 Minecraft 皮肤站与 Yggdrasil/authlib-injector 认证服务器。",
						href: "https://github.com/AsterCommunity/AsterYggdrasil",
						tech: "Rust",
					},
					{
						name: "AsterGit",
						tagline: "用 Rust 构建的轻量自托管软件开发 forge。",
						href: "https://github.com/AsterCommunity/AsterGit",
						tech: "Rust",
					},
					{
						name: "AsterMail",
						tagline: "主权自托管邮件系统。",
						href: "https://github.com/AsterCommunity/AsterMail",
						tech: "—",
					},
				],
			},
			{
				heading: "底座",
				note: "产品赖以构建的共享工程基础。",
				items: [
					{
						name: "AsterForge",
						tagline: "Aster 服务共享的 Rust 运行时底座与基础设施内核。",
						href: "https://github.com/AsterCommunity/AsterForge",
						tech: "Rust",
					},
					{
						name: "aster-automation",
						tagline:
							"AsterCommunity 仓库的确定性 GitHub PR 与 CI 生命周期自动化。",
						href: "https://github.com/AsterCommunity/aster-automation",
						tech: "JavaScript",
					},
					{
						name: "AsterDriveClients",
						tagline: "AsterDrive 的客户端应用。",
						href: "https://github.com/AsterCommunity/AsterDriveClients",
						tech: "—",
					},
					{
						name: "AsterDriveMigration",
						tagline: "把现有文件服务迁移到 AsterDrive 的工具集。",
						href: "https://github.com/AsterCommunity/AsterDriveMigration",
						tech: "Rust",
					},
				],
			},
			{
				heading: "站点",
				note: "你正在看的公开界面。",
				items: [
					{
						name: "www.astercosm.com",
						tagline: "本站 —— AsterCosmos 的门面。",
						href: SOURCE_URL,
						tech: "Astro",
					},
					{
						name: "AsterDriveLanding",
						tagline: "AsterDrive 产品落地页及其截图资产管线。",
						href: "https://github.com/AsterCommunity/AsterDriveLanding",
						tech: "Astro",
					},
				],
			},
		],
		fullListCta: "GitHub 上的完整仓库列表",
		involve:
			"想参与？每个仓库的 README 就是入口——issues 和 discussions 都开着。",
	},
	philosophy: {
		meta: {
			title: "理念 — AsterCosmos",
			description:
				"AsterCosmos 如何构建：产品是正在运行的系统，从代码到维护的路径始终可见，项目从维持运行的部分开始。",
		},
		kicker: "理念",
		title: "AsterCosmos 的构建方式。",
		intro:
			"这些不是愿望清单。它们是每个 AsterCosmos 项目在被称为「完成」之前必须满足的约束。",
		systems: {
			kicker: "01 / 系统",
			title: "产品首先是正在运行的系统，不是演示样板。",
			description:
				"AsterCosmos 维护那些需要长期运行的东西：自托管服务、工程底座、管理面板，以及让它们能被部署、观察和继续修改的基础设施。",
			points: ["自托管产品系统", "面向开发者的工程底座", "小团队运维界面"],
		},
		infrastructure: {
			kicker: "02 / 基础设施",
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
		principles: {
			kicker: "03 / 工作原则",
			title: "我们如何工作。",
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
		practice: {
			kicker: "04 / 在实践中",
			title: "已经是事实，不是愿望。",
			items: [
				{
					principle: "为部署而构建",
					evidence:
						"AsterDrive 提供五分钟的快速试用，以及从单容器到生产环境的文档化路径。",
					cta: "快速试用文档",
					href: `${DRIVE_DOCS_URL}/start/quick-trial/`,
				},
				{
					principle: "记录正在运行的系统",
					evidence:
						"AsterDrive 落地页的截图由自动化管线从真实运行的实例截取——文档和界面永远不会脱节。",
					cta: "看看这条管线",
					href: LANDING_GITHUB_URL,
				},
				{
					principle: "让责任边界可见",
					evidence:
						"每个公开项目都在同一页索引上，仓库和运行站点并排——包括本网站自己。",
					cta: "项目索引",
					href: "",
					page: "projects",
				},
			] as {
				principle: string;
				evidence: string;
				cta: string;
				href: string;
				page?: PageId;
			}[],
		},
	},
	archive: {
		meta: {
			title: "档案 — AsterCosmos",
			description:
				"ESAP 在 AsterCosmos 旁边，不在它下面：共享成员关系，保留各自的公开身份，档案与系统互相引用。",
		},
		kicker: "档案",
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
		esapSites: {
			kicker: "ESAP 站点",
			items: [
				{
					name: "weare.esaps.net",
					body: "ESAP 企划的角色档案与主站。",
					href: ESAP_URL,
				},
				{
					name: "story.esaps.net",
					body: "ESAP 世界观的长篇故事。",
					href: ESAP_STORY_URL,
				},
			],
		},
		look: {
			kicker: "看一眼里面",
			caption: "weare.esaps.net —— 角色档案，运行中。",
			alt: "WeAreESAP 首页截图",
			cta: "访问 WeAreESAP",
		},
	},
	footer: {
		tagline: "AsterCosmos 公开节点。为 Aster 项目构建。",
		columns: {
			site: "本站",
			projects: "项目",
			esap: "ESAP",
		},
		links: {
			home: "首页",
			philosophy: "理念",
			archive: "档案",
			driveSite: "AsterDrive",
			driveDocs: "AsterDrive 文档",
			source: "本站源码",
			github: "GitHub",
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
