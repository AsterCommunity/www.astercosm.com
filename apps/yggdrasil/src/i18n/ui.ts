export const languages = {
	en: "English",
	zh: "中文",
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

export const GITHUB_URL = "https://github.com/AsterCommunity/AsterYggdrasil";
export const WWW_URL = "https://www.astercosm.com";

/**
 * 文档站地址。docs 已迁至 yggdrasil.docs.astercosm.com(forge.docs 的先例),
 * yggdrasil.astercosm.com 归本 landing 站。
 */
export const DOCS_URL = "https://yggdrasil.docs.astercosm.com";
export const CHANGELOG_URL = `${GITHUB_URL}/blob/main/CHANGELOG.md`;

/** 文档站 zh 在根、en 在 /en/ 前缀下,cleanUrls 无尾斜杠 */
export function docsUrl(lang: Lang, path: string): string {
	const prefix = lang === "zh" ? "" : "/en";
	return `${DOCS_URL}${prefix}${path}`;
}

/** 站内语言切换目标路径 */
export function localizedPath(lang: Lang): string {
	return lang === defaultLang ? "/" : `/${lang}/`;
}

export { protocolGroups } from "./data";
export { en, type Messages } from "./en";
export { zh } from "./zh";

import { en, type Messages } from "./en";
import { zh } from "./zh";

const messages: Record<Lang, Messages> = { en, zh };

export function t(lang: Lang): Messages {
	return messages[lang];
}
