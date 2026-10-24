/**
 * AsterDrive README 头图截图管线
 *
 * 用法：
 *   bun run scripts/capture-readme.mts --binary /path/to/aster_drive [--port 8951] [--keep]
 *
 * 与 capture-scenes.mts（落地页 1440×900 场景图）互补：
 * 本脚本只产出主仓库 README 头图（1792×974，亮色，en/zh 各一张 PNG），
 * 输出到 ../../AsterDrive/assets/Readme/，webp 转换由仓库侧自行处理。
 */

import { execFile, spawn } from "node:child_process";
import {
	copyFileSync,
	existsSync,
	mkdirSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { resolve } from "node:path";
import { promisify } from "node:util";
import { type Browser, chromium } from "playwright";

const execFileAsync = promisify(execFile);

/* ---------------- 参数 ---------------- */

const args = process.argv.slice(2);
const argOf = (name: string) => {
	const i = args.indexOf(`--${name}`);
	return i >= 0 ? args[i + 1] : undefined;
};
const BINARY = argOf("binary");
const KEEP = args.includes("--keep");
if (!BINARY || !existsSync(BINARY)) {
	console.error(
		"用法: bun run scripts/capture-readme.mts --binary /path/to/aster_drive [--port N] [--keep]",
	);
	process.exit(1);
}

const OUT_DIR = resolve(
	import.meta.dirname,
	"../../../../AsterDrive/assets/Readme",
);
const WORK_DIR = `${process.env.HOME}/.cache/ad-capture-readme-work`;
const BASE_PORT = Number(argOf("port") ?? 8951);

/** README 资产分辨率：与现存 webp 严格一致（1792×974，亮色） */
const VIEWPORT = { width: 1792, height: 974 } as const;

/* ---------------- 工具 ---------------- */

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function findFreePort(start: number): Promise<number> {
	for (let p = start; p < start + 50; p++) {
		const ok = await new Promise<boolean>((resolve) => {
			const req = fetch(`http://127.0.0.1:${p}/health`, {
				signal: AbortSignal.timeout(800),
			})
				.then(() => resolve(false))
				.catch(() => resolve(true));
			return req;
		});
		if (ok) return p;
	}
	throw new Error("no free port found");
}

async function waitHealth(port: number, timeoutMs = 60_000) {
	const deadline = Date.now() + timeoutMs;
	while (Date.now() < deadline) {
		try {
			const r = await fetch(`http://127.0.0.1:${port}/health`);
			if (r.ok) return;
		} catch {}
		await sleep(500);
	}
	throw new Error("instance did not become healthy in time");
}

/* ---------------- 演示文件生成 ---------------- */

async function generateDemoFiles(dir: string) {
	mkdirSync(dir, { recursive: true });
	const scenes = [
		{
			name: "kyoto-street.jpg",
			bg: ["#1e3a5f", "#3b82f6"],
			shape: `<circle cx="420" cy="220" r="120" fill="#93c5fd" opacity="0.8"/><rect x="120" y="380" width="560" height="140" rx="20" fill="#dbeafe" opacity="0.55"/>`,
		},
		{
			name: "studio-light.jpg",
			bg: ["#3f2d52", "#8b5cf6"],
			shape: `<circle cx="400" cy="240" r="100" fill="#c4b5fd" opacity="0.85"/><circle cx="520" cy="300" r="60" fill="#ddd6fe" opacity="0.6"/>`,
		},
		{
			name: "forest-trail.jpg",
			bg: ["#14532d", "#16a34a"],
			shape: `<rect x="180" y="160" width="200" height="200" rx="32" fill="#86efac" opacity="0.8"/><circle cx="540" cy="360" r="90" fill="#bbf7d0" opacity="0.65"/>`,
		},
	];
	for (const s of scenes) {
		const svg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${s.bg[0]}"/><stop offset="1" stop-color="${s.bg[1]}"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/>${s.shape}</svg>`;
		const svgPath = `${dir}/${s.name.replace(/\.jpg$/, ".svg")}`;
		writeFileSync(svgPath, svg);
		await execFileAsync("magick", [
			svgPath,
			"-quality",
			"88",
			`${dir}/${s.name}`,
		]);
	}
	writeFileSync(
		`${dir}/Welcome.md`,
		"# Welcome to AsterDrive\n\nThis workspace is where your files live — upload, organize, share.\n\n## Highlights\n\n- Route files across storage backends\n- Share with passwords and expiry\n- Open this file in the built-in editor\n\n> Edit me and save — version history keeps every change.\n",
	);
}

/* ---------------- 页面驱动 ---------------- */

const ADMIN = { email: "demo@example.com", password: "DemoPassw0rd!" };

async function runSetupFlow(page: import("playwright").Page, base: string) {
	await page.goto(`${base}/login`, { waitUntil: "networkidle" });
	await page.waitForTimeout(1200);
	await page.locator('input[placeholder="Choose a username"]').fill("demo");
	await page.locator('input[placeholder="you@example.com"]').fill(ADMIN.email);
	await page.locator('input[placeholder="Password"]').fill(ADMIN.password);
	await page.locator('button:has-text("Create Admin Account")').click();
	await page.waitForTimeout(2500);
	await page.locator('button:has-text("Start storage setup")').click();
	await page.waitForTimeout(2000);
	await page.locator('button:has-text("LocalStore files")').click();
	await page.waitForTimeout(1500);
	await page.locator("input").first().fill("Local Default");
	await page.getByRole("button", { name: "Review", exact: true }).click();
	await page.waitForTimeout(2000);
	await page.getByRole("button", { name: "Create", exact: true }).click();
	await page.waitForTimeout(3500);
}

async function login(page: import("playwright").Page, base: string) {
	await page.goto(`${base}/login`, { waitUntil: "networkidle" });
	await page.waitForTimeout(1200);
	const inputs = page.locator("input:visible");
	await inputs.nth(0).fill(ADMIN.email);
	await inputs.nth(1).fill(ADMIN.password);
	await page.locator('button[type="submit"]').first().click();
	await page.waitForTimeout(3500);
}

function apiCall(
	page: import("playwright").Page,
	path: string,
	body?: unknown,
) {
	return page.evaluate(
		async ({ path, body }) => {
			const readCookie = (name: string) => {
				const enc = `${encodeURIComponent(name)}=`;
				for (const c of document.cookie.split(";")) {
					const t = c.trim();
					if (t.startsWith(enc)) return decodeURIComponent(t.slice(enc.length));
				}
				return null;
			};
			const headers: Record<string, string> = {};
			const csrf = readCookie("aster_csrf");
			if (csrf) headers["X-CSRF-Token"] = csrf;
			if (body) headers["Content-Type"] = "application/json";
			const r = await fetch(path, {
				method: body ? "POST" : "GET",
				headers,
				credentials: "include",
				body: body ? JSON.stringify(body) : undefined,
			});
			return { status: r.status, json: await r.json().catch(() => null) };
		},
		{ path, body },
	);
}

async function uploadFile(
	page: import("playwright").Page,
	filePath: string,
	name: string,
	mime: string,
) {
	const { readFileSync } = await import("node:fs");
	const b64 = readFileSync(filePath).toString("base64");
	return page.evaluate(
		async ({ b64, name, mime }) => {
			const readCookie = (n: string) => {
				const enc = `${encodeURIComponent(n)}=`;
				for (const c of document.cookie.split(";")) {
					const t = c.trim();
					if (t.startsWith(enc)) return decodeURIComponent(t.slice(enc.length));
				}
				return null;
			};
			const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
			const fd = new FormData();
			fd.append("file", new File([bytes], name, { type: mime }));
			const headers: Record<string, string> = {};
			const csrf = readCookie("aster_csrf");
			if (csrf) headers["X-CSRF-Token"] = csrf;
			const r = await fetch("/api/v1/files/upload", {
				method: "POST",
				body: fd,
				headers,
				credentials: "include",
			});
			return r.status;
		},
		{ b64, name, mime },
	);
}

async function captureLocale(
	browser: Browser,
	base: string,
	lang: "en" | "zh",
	outDir: string,
) {
	const ctx = await browser.newContext({
		viewport: VIEWPORT,
		colorScheme: "light",
		locale: lang === "zh" ? "zh-CN" : "en-US",
	});
	// 默认视图是 list，README 头图用 grid——直接写 storage，比点按钮可靠
	await ctx.addInitScript(() => {
		window.localStorage.setItem("aster-view-mode", "grid");
	});
	const page = await ctx.newPage();
	await login(page, base);
	await page.goto(`${base}/`, { waitUntil: "networkidle" });
	// 等缩略图 worker：网格里出现真实 <img> 缩略图再拍（超时兜底 20s）
	await page
		.waitForSelector("main img", { timeout: 20_000 })
		.catch(() => undefined);
	await page.waitForTimeout(2500);
	await page.screenshot({
		path: `${outDir}/Screenshot-${lang === "zh" ? "Chinese" : "English"}.png`,
	});
	await ctx.close();
}

/* ---------------- 主流程 ---------------- */

async function main() {
	rmSync(WORK_DIR, { recursive: true, force: true });
	mkdirSync(`${WORK_DIR}/data`, { recursive: true });
	mkdirSync(OUT_DIR, { recursive: true });

	const port = await findFreePort(BASE_PORT);
	console.log(`→ port ${port}`);

	copyFileSync(BINARY, `${WORK_DIR}/aster_drive`);
	writeFileSync(
		`${WORK_DIR}/data/config.toml`,
		`[server]\nhost = "127.0.0.1"\nport = ${port}\n\n[database]\nurl = "sqlite://asterdrive.db?mode=rwc"\n\n[auth]\njwt_secret = "capture-jwt"\nshare_cookie_secret = "capture-share"\ndirect_link_secret = "capture-direct"\nmfa_secret_key = "capture-mfa"\nstorage_credential_secret_key = "capture-storage"\nwebdav_auth_cache_secret = "capture-webdav"\nbootstrap_insecure_cookies = true\n\n[cache]\nbackend = "memory"\n`,
	);

	const server = spawn(`${WORK_DIR}/aster_drive`, [], {
		cwd: WORK_DIR,
		stdio: ["ignore", "pipe", "pipe"],
	});
	server.stderr.on("data", (d) => process.stderr.write(d));

	const cleanup = () => {
		try {
			server.kill("SIGTERM");
		} catch {}
		if (!KEEP) rmSync(WORK_DIR, { recursive: true, force: true });
	};
	process.on("SIGINT", () => {
		cleanup();
		process.exit(130);
	});

	try {
		await waitHealth(port);
		console.log("→ instance healthy");

		const base = `http://127.0.0.1:${port}`;
		const browser = await chromium.launch();
		try {
			const setupCtx = await browser.newContext({ viewport: VIEWPORT });
			await runSetupFlow(await setupCtx.newPage(), base);
			await setupCtx.close();
			console.log("→ setup done");

			const demoDir = `${WORK_DIR}/demo`;
			await generateDemoFiles(demoDir);
			const contentCtx = await browser.newContext({ viewport: VIEWPORT });
			const contentPage = await contentCtx.newPage();
			await login(contentPage, base);
			for (const name of [
				"Documents",
				"Photos",
				"Projects",
				"Archives",
				"Music",
				"Backups",
				"Design",
				"Research",
				"Shared",
			]) {
				await apiCall(contentPage, "/api/v1/folders", {
					name,
					parent_id: null,
				});
			}
			for (const [file, name, mime] of [
				[`${demoDir}/kyoto-street.jpg`, "kyoto-street.jpg", "image/jpeg"],
				[`${demoDir}/studio-light.jpg`, "studio-light.jpg", "image/jpeg"],
				[`${demoDir}/forest-trail.jpg`, "forest-trail.jpg", "image/jpeg"],
				[`${demoDir}/Welcome.md`, "Welcome.md", "text/markdown"],
			] as const) {
				const status = await uploadFile(contentPage, file, name, mime);
				if (status !== 201) throw new Error(`upload ${name} failed: ${status}`);
			}
			await contentCtx.close();
			console.log("→ demo content ready");

			await captureLocale(browser, base, "en", OUT_DIR);
			console.log("→ en captured");
			await captureLocale(browser, base, "zh", OUT_DIR);
			console.log("→ zh captured");
		} finally {
			await browser.close();
		}
	} finally {
		server.kill("SIGTERM");
	}

	cleanup();
	if (KEEP) console.log(`→ workdir kept at ${WORK_DIR}`);
	console.log(`✓ PNG written to ${OUT_DIR}`);
}

await main();
