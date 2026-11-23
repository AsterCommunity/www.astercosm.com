/**
 * 首屏与快速开始的代码样例(逐 token 手工标注,不跑高亮器)。
 *
 * 事实源:AsterYggdrasil 仓库 README Quick start 与 config.example.toml
 * 默认端口 3000(2026-11 快照)。token 色彩角色:命令动词 = emerald 亮档,
 * 路径与包名 = emerald 最亮档,参数值与字符串 = zinc 亮档,详见 global.css
 * 的 tok-* 注释。
 */
export type TokenKind =
	| "key"
	| "fn"
	| "type"
	| "str"
	| "num"
	| "punct"
	| "plain"
	| "comment";

export interface Token {
	kind: TokenKind;
	text: string;
}

export interface CodeLine {
	tokens: Token[];
}

const tk = (kind: TokenKind, text: string): Token => ({ kind, text });

/** README Quick start 原样:clone、进目录、跑起来 */
export const runLines: CodeLine[] = [
	{
		tokens: [
			tk("fn", "git"),
			tk("plain", " clone "),
			tk("str", "https://github.com/AsterCommunity/AsterYggdrasil.git"),
		],
	},
	{
		tokens: [tk("fn", "cd"), tk("plain", " AsterYggdrasil")],
	},
	{
		tokens: [tk("fn", "cargo"), tk("plain", " run")],
	},
];

/** docker-compose.yml 随仓库分发,部署细节见文档站的部署指南 */
export const dockerLines: CodeLine[] = [
	{
		tokens: [
			tk("fn", "docker"),
			tk("plain", " compose "),
			tk("fn", "up"),
			tk("plain", " "),
			tk("str", "-d"),
		],
	},
];

/** authlib-injector 启动器里按 URL 添加服务器;3000 是 config.example.toml 默认端口 */
export const launcherLines: CodeLine[] = [
	{
		tokens: [
			tk("str", "http://localhost:"),
			tk("num", "3000"),
			tk("str", "/api/yggdrasil"),
		],
	},
];
