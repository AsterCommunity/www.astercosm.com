/**
 * 首屏代码样例。
 *
 * 事实源：AsterForge 仓库 README.md 的 "The target shape for a new product is
 * a thin entrypoint" 代码块（2026-10 快照），与 docs/en/guide/index.md 里的
 * 同一段一致。逐 token 手工标注而非运行高亮器：样例只有 8 行，手写换来的是
 * 与品牌色板严格一致的配色，且不引入构建期高亮依赖。
 *
 * token 类型：key 关键字 / fn 函数 / type 类型 / str 字符串 / num 数字
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

/** 入口示例：注册组件，然后运行 */
export const entrypointLines: CodeLine[] = [
	{
		tokens: [
			t("type", "aster_forge_runtime"),
			t("punct", "::"),
			t("type", "AsterRuntime"),
			t("punct", "::"),
			t("fn", "builder"),
			t("punct", "()"),
		],
	},
	{
		tokens: [
			t("punct", "    ."),
			t("fn", "component"),
			t("punct", "("),
			t("fn", "http_component"),
			t("punct", "("),
			t("punct", "..."),
			t("punct", "),"),
		],
	},
	{
		tokens: [
			t("punct", "    ."),
			t("fn", "component"),
			t("punct", "("),
			t("fn", "database_component"),
			t("punct", "("),
			t("punct", "..."),
			t("punct", "),"),
		],
	},
	{
		tokens: [
			t("punct", "    ."),
			t("fn", "component"),
			t("punct", "("),
			t("fn", "background_task_component"),
			t("punct", "("),
			t("punct", "..."),
			t("punct", "),"),
		],
	},
	{
		tokens: [
			t("punct", "    ."),
			t("fn", "component"),
			t("punct", "("),
			t("fn", "mail_outbox_component"),
			t("punct", "("),
			t("punct", "..."),
			t("punct", "),"),
		],
	},
	{
		tokens: [
			t("punct", "    ."),
			t("fn", "component"),
			t("punct", "("),
			t("fn", "audit_component"),
			t("punct", "("),
			t("punct", "..."),
			t("punct", ")"),
		],
	},
	{
		tokens: [t("punct", "    ."), t("fn", "run"), t("punct", "()")],
	},
	{
		tokens: [t("punct", "    ."), t("key", "await"), t("punct", "?;")],
	},
];

/** 生成新服务的命令：与仓库 README / templates/aster-service-actix 一致 */
export const generateLines: CodeLine[] = [
	{
		tokens: [
			t("fn", "cargo"),
			t("plain", " "),
			t("fn", "generate"),
			t("plain", " --git "),
			t("str", "https://github.com/AsterCommunity/AsterForge.git"),
		],
	},
	{
		tokens: [
			t("plain", "  "),
			t("str", "templates/aster-service-actix"),
			t("plain", " \\"),
		],
	},
	{
		tokens: [
			t("plain", "  --name "),
			t("str", "aster_product_service"),
			t("plain", " \\"),
		],
	},
	{
		tokens: [t("plain", "  --define "), t("str", "server_port=3000")],
	},
];

/** 往已有服务里加一个 crate：crates 目前是 publish = false，走 git 依赖 */
export const addCrateLines: CodeLine[] = [
	{
		tokens: [
			t("fn", "cargo"),
			t("plain", " add "),
			t("str", "aster_forge_runtime"),
			t("plain", " --git "),
			t("str", "https://github.com/AsterCommunity/AsterForge"),
		],
	},
];
