/**
 * 首屏与快速开始代码样例。
 *
 * 事实源：AsterACME 仓库 README Quick start 与 crates/aster_acme_cli/README.md
 * （0.1.0-alpha.3，2026-11 快照）。逐 token 手工标注而非运行高亮器：样例总量小，
 * 手写换来与品牌色板严格一致的配色，且不引入构建期高亮依赖。token 语义沿用
 * CLI help 的三色角色：命令动词 = 绿、包名 = 黄、参数值 = 青。
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

/** 安装命令（README Quick start 原样）：crates.io 已发布版本 */
export const installLines: CodeLine[] = [
	{
		tokens: [
			t("fn", "cargo"),
			t("plain", " install "),
			t("type", "aster_acme_cli"),
			t("plain", " --version "),
			t("str", "0.1.0-alpha.3"),
		],
	},
];

/** 注册命令（README Quick start 原样）：account register + 账户名 + 联系人 */
export const registerLines: CodeLine[] = [
	{
		tokens: [
			t("fn", "aster-acme"),
			t("plain", " "),
			t("fn", "account"),
			t("plain", " "),
			t("fn", "register"),
			t("plain", " "),
			t("str", "default"),
			t("plain", " \\"),
		],
	},
	{
		tokens: [t("plain", "  --contact "), t("str", "admin@example.com")],
	},
];

/** 库引入：aster_acme 已发布到 crates.io，直接按版本依赖 */
export const addCrateLines: CodeLine[] = [
	{
		tokens: [t("fn", "cargo"), t("plain", " add "), t("type", "aster_acme")],
	},
];
