/**
 * ESAP 截图管线：从线上 weare.esaps.net 实拍首页首屏。
 *
 * 产物：src/assets/scenes/esap-home-dark-{en,zh}.webp（Archive 页「看一眼 ESAP」物料）。
 * WeAreESAP 前端更新后重跑本脚本并在 commit message 注明对方 revision：
 *
 *   bun run capture:esap
 *
 * 只截 dark 主题（ESAP 站的标志性观感）；语言按路径 / 与 /en/ 各一张。
 */
import { Buffer } from "node:buffer";
import { execFile } from "node:child_process";
import { unlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { chromium } from "playwright";

const execFileAsync = promisify(execFile);

const BASE = "https://weare.esaps.net";

const targets = [
	{ lang: "zh", path: "/" },
	{ lang: "en", path: "/en/" },
] as const;

const VIEWPORT = { width: 1600, height: 1000 };

const browser = await chromium.launch();

for (const target of targets) {
	const context = await browser.newContext({
		viewport: VIEWPORT,
		colorScheme: "dark",
		locale: target.lang === "zh" ? "zh-CN" : "en-US",
	});
	const page = await context.newPage();
	await page.goto(`${BASE}${target.path}`, {
		waitUntil: "load",
		timeout: 30_000,
	});
	// 等首屏立绘与动效落地（角色条带是大图，给足余量）
	await page.waitForTimeout(3000);

	const png = await page.screenshot({ type: "png" });
	const out = `src/assets/scenes/esap-home-dark-${target.lang}.webp`;
	const input = join(tmpdir(), `astercosm-esap-${target.lang}.png`);
	try {
		await Bun.write(input, Buffer.from(png));
		await execFileAsync("magick", [input, "-quality", "82", out]);
	} finally {
		await unlink(input).catch(() => {});
	}
	console.log(`captured: ${out}`);

	await context.close();
}

await browser.close();
