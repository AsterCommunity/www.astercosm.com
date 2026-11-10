/**
 * 首屏与快速开始代码样例。
 *
 * 事实源：AsterACME 仓库 crates/aster_acme_cli/README.md 的真实命令示例
 * （2026-11 快照）。逐 token 手工标注而非运行高亮器：样例总量小，手写换来
 * 与品牌色板严格一致的配色，且不引入构建期高亮依赖。token 语义沿用 CLI
 * help 的三色角色：命令动词 = 绿、包名 = 黄、参数值 = 青。
 *
 * token 类型：key 关键字 / fn 函数·命令动词 / type 类型·包名 / str 字符串·参数值
 *              punct 标点 / plain 普通文本 / comment 注释
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

const t = (kind: TokenKind, text: string): Token => ({ kind, text });

/** cargo run 命令的前缀：`cargo run -p aster_acme_cli -- ` */
function runPrefix(): Token[] {
	return [
		t("fn", "cargo"),
		t("plain", " run -p "),
		t("type", "aster_acme_cli"),
		t("plain", " -- "),
	];
}

/** 注册命令（CLI README 原样）：account register，条款、联系人、JSON 输出 */
export const registerLines: CodeLine[] = [
	{
		tokens: [
			...runPrefix(),
			t("fn", "account"),
			t("plain", " "),
			t("fn", "register"),
			t("plain", " \\"),
		],
	},
	{
		tokens: [
			t("plain", "  --data-dir "),
			t("str", "./data"),
			t("plain", " \\"),
		],
	},
	{
		tokens: [t("plain", "  --accept-terms \\")],
	},
	{
		tokens: [
			t("plain", "  --contact "),
			t("str", "admin@example.org"),
			t("plain", " --json"),
		],
	},
];

/** 远端验证命令（CLI README 原样）：account show --verify */
export const showVerifyLines: CodeLine[] = [
	{
		tokens: [
			...runPrefix(),
			t("fn", "account"),
			t("plain", " "),
			t("fn", "show"),
			t("plain", " --verify --data-dir "),
			t("str", "./data"),
			t("plain", " --json"),
		],
	},
];

/** 库引入：aster_acme 仓库尚在 Git 依赖阶段（publish = false） */
export const addCrateLines: CodeLine[] = [
	{
		tokens: [
			t("fn", "cargo"),
			t("plain", " add "),
			t("type", "aster_acme"),
			t("plain", " --git "),
			t("str", "https://github.com/AsterCommunity/AsterACME"),
		],
	},
];
