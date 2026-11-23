/**
 * 中文文案。类型绑定 en.ts 的 Messages，两语字段一一对应。
 */
import type { Messages } from "./en";

export const zh: Messages = {
	meta: {
		title: "AsterYggdrasil —— 自托管 Minecraft 皮肤站与 Yggdrasil 认证服务器",
		description:
			"AsterYggdrasil 是 Rust 实现的自托管 Minecraft 皮肤站与 Yggdrasil/authlib-injector 认证服务器：站点账号、玩家档案、启动器登录、进服校验、皮肤与披风托管，以及公共材质库——一个单二进制服务",
	},
	nav: {
		protocol: "协议",
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
		title: "自己的世界，自己的登录",
		subtitle:
			"AsterYggdrasil 是自托管的 Minecraft 皮肤站与 Yggdrasil/authlib-injector 认证服务器。站点账号、玩家档案、启动器登录、进服校验、皮肤与披风托管，以及公共材质库——一个 Rust 单二进制",
		primaryCta: "快速开始",
		secondaryCta: "GitHub 加星",
		note: "兼容 authlib-injector · MIT OR Apache-2.0",
	},
	code: {
		label: "从源码跑起来",
		caption:
			"默认 SQLite 与本地存储，自动播种默认数据，启动后打印监听地址。不需要任何外部服务",
	},
	protocol: {
		kicker: "协议面",
		title: "启动器已经会说的话，它都会听",
		body: "把 authlib-injector 启动器指向 /api/yggdrasil 就能用——完整的 Yggdrasil 协议面，按规范实现",
	},
	status: {
		kicker: "现状",
		title: "Beta 通道，已经在服务世界",
		body: "核心已稳定并在真实运行：完整的 Yggdrasil 协议、皮肤站、多种登录方式、材质库审核工作流与细粒度 operator 管理，经过六个 alpha 版本进入 beta",
		available: "已可用",
		inDevelopment: "构建中",
		items: [
			{
				label:
					"Yggdrasil 认证服务器——authenticate、refresh、validate、invalidate、signout",
				state: "available",
			},
			{
				label: "会话服务器——join / hasJoined、档案查询、blockedservers",
				state: "available",
			},
			{
				label: "带签名的 textures property，签名密钥可轮换",
				state: "available",
			},
			{
				label:
					"上游 session 转发——按优先级与权重编排本地与远程（含正版）Yggdrasil 来源",
				state: "available",
			},
			{
				label:
					"站点账号——Passkey、外部登录（GitHub、Google、QQ、OIDC)、邀请、验证码",
				state: "available",
			},
			{
				label:
					"玩家档案——一个账号多个档案，受控改名保留 UUID 并使启动器 token 失效",
				state: "available",
			},
			{
				label:
					"皮肤与披风托管——PNG 重编码、尺寸校验、哈希寻址公开读取，本地 / S3 / MinIO 存储",
				state: "available",
			},
			{
				label: "公共材质库——提交、审核工作流、标签、举报",
				state: "available",
			},
			{
				label:
					"能力封禁——只封一项能力（认证、进服、上传、材质库），不必禁用整个账号",
				state: "available",
			},
			{
				label:
					"可运维——分域 operator、append-only 审计、运行时配置热更新、带健康上报的后台任务、Prometheus 指标",
				state: "available",
			},
			{
				label: "Argon2 并发上限可配置（已合并，随下个版本发布）",
				state: "inDevelopment",
			},
		],
		cta: "查看更新日志",
	},
	start: {
		kicker: "从这里开始",
		title: "给你的服务器种一棵登录树",
		body: "一个二进制在同一端口上同时服务皮肤站与 Yggdrasil API。从 SQLite 与本地存储起步，需要时再迁到 PostgreSQL/MySQL 与 S3/MinIO",
		step1: "从源码运行",
		step2: "或者用容器",
		step2Body: "仓库自带 docker-compose.yml;卷布局与反代配置见文档",
		step3: "把启动器指向它",
		step3Body:
			"任何 authlib-injector 启动器（PCL、HMCL 等）都能按 URL 添加服务器。API 根地址是：",
		docsCta: "阅读文档",
		githubCta: "浏览仓库",
	},
	cta: {
		title: "你的世界，钥匙在你手里",
		body: "玩家身份、材质文件、签名密钥和数据库都留在你自己的基础设施上——MIT OR Apache-2.0 完全开源，在公开开发中成长",
		primary: "在 GitHub 查看",
		secondary: "AsterCosmos",
	},
	footer: {
		tagline: "来自 AsterCosmos 的自托管 Minecraft 认证服务",
		copyright: "© 2026 AsterCosmos",
		license: "代码：MIT OR Apache-2.0 · 内容：CC-BY 4.0 · 品牌：保留所有权利",
	},
};
