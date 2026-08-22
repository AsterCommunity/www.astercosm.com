/**
 * 品牌静态资产管线：asterisk SVG → public/og.png + public/apple-touch-icon.png。
 *
 * 品牌元素（三色 asterisk、hairline、色值）与 tokens.css 同源；
 * 品牌改版时改本文件后重跑：bun run generate:assets
 *
 * 产物是生成文件，但按仓库约定提交入库（public/ 直出，不经构建期处理）。
 */
import { Buffer } from "node:buffer";
import sharp from "sharp";

/** ESAP 三色（src/styles/tokens.css light 主题精确值） */
const YELLOW = "#ffd93d";
const PINK = "#ff69b4";
const BLUE = "#4da6ff";
const SURFACE_1 = "#faf9fb";
const INK = "#151515";
const MUTED = "#62635d";

/** 三色 asterisk 辐条（中心 cx/cy，半径 r） */
function asterisk(
	cx: number,
	cy: number,
	r: number,
	strokeWidth: number,
): string {
	const dx = r * Math.cos(Math.PI / 6);
	const dy = r * Math.sin(Math.PI / 6);
	return `
	<g fill="none" stroke-linecap="round" stroke-width="${strokeWidth}">
		<line x1="${cx}" y1="${cy - r}" x2="${cx}" y2="${cy + r}" stroke="${YELLOW}" />
		<line x1="${cx + dx}" y1="${cy - dy}" x2="${cx - dx}" y2="${cy + dy}" stroke="${PINK}" />
		<line x1="${cx - dx}" y1="${cy - dy}" x2="${cx + dx}" y2="${cy + dy}" stroke="${BLUE}" />
	</g>`;
}

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
	<rect width="1200" height="630" fill="${SURFACE_1}" />
	<defs>
		<linearGradient id="tricolor" x1="0" y1="0" x2="1" y2="0">
			<stop offset="0" stop-color="${YELLOW}" />
			<stop offset="0.5" stop-color="${PINK}" />
			<stop offset="1" stop-color="${BLUE}" />
		</linearGradient>
	</defs>
	${asterisk(132, 292, 62, 14)}
	<text x="240" y="320" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="76" font-weight="700" letter-spacing="-2" fill="${INK}">AsterCosmos</text>
	<text x="242" y="392" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="32" fill="${MUTED}">The engineering home of Aster projects.</text>
	<text x="242" y="442" font-family="SF Mono, Menlo, Consolas, monospace" font-size="20" fill="${MUTED}">www.astercosm.com</text>
	<rect x="0" y="618" width="1200" height="12" fill="url(#tricolor)" />
</svg>`;

const touchIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
	<rect width="180" height="180" rx="40" fill="${SURFACE_1}" />
	${asterisk(90, 90, 56, 13)}
</svg>`;

await sharp(Buffer.from(ogSvg), { density: 150 }).png().toFile("public/og.png");
await sharp(Buffer.from(touchIconSvg), { density: 150 })
	.png()
	.toFile("public/apple-touch-icon.png");

console.log(
	"generated: public/og.png (1200x630), public/apple-touch-icon.png (180x180)",
);
