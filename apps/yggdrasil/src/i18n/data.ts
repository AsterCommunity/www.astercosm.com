/**
 * 语言无关的展示数据:协议端点组。
 * 事实源:AsterYggdrasil src/api/routes/yggdrasil.rs(0.1.0-beta.1,2026-11)。
 * 路径省略共同前缀 /api/yggdrasil——启动器只填服务器 URL,其余由 metadata
 * 端点驱动。minecraftservices 兼容层(player/attributes、privileges 等)
 * 面向 Minecraft Services 客户端,landing 层面并入 session 组说明。
 */
export const protocolGroups = [
	{
		name: { en: "Authenticator", zh: "认证器" },
		note: {
			en: "Launcher login and token lifecycle.",
			zh: "启动器登录与 token 生命周期",
		},
		endpoints: [
			{ method: "POST", path: "/authserver/authenticate" },
			{ method: "POST", path: "/authserver/refresh" },
			{ method: "POST", path: "/authserver/validate" },
			{ method: "POST", path: "/authserver/invalidate" },
			{ method: "POST", path: "/authserver/signout" },
		],
	},
	{
		name: { en: "Session server", zh: "会话服务器" },
		note: {
			en: "Server-join verification, with upstream forwarding.",
			zh: "进服校验,支持上游 session 转发",
		},
		endpoints: [
			{ method: "POST", path: "/sessionserver/session/minecraft/join" },
			{ method: "GET", path: "/sessionserver/session/minecraft/hasJoined" },
			{
				method: "GET",
				path: "/sessionserver/session/minecraft/profile/{uuid}",
			},
			{ method: "GET", path: "/sessionserver/blockedservers" },
		],
	},
	{
		name: { en: "Profiles & textures", zh: "档案与材质" },
		note: {
			en: "Profile lookup, texture upload, hash-addressed reads.",
			zh: "档案查询、材质上传与哈希寻址读取",
		},
		endpoints: [
			{ method: "GET", path: "/ (metadata)" },
			{ method: "POST", path: "/api/profiles/minecraft" },
			{ method: "PUT", path: "/api/user/profile/{uuid}/{texture_type}" },
			{ method: "DELETE", path: "/api/user/profile/{uuid}/{texture_type}" },
			{ method: "GET", path: "/textures/{hash}" },
		],
	},
];
