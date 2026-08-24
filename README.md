# www.astercosm.com
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FAsterCommunity%2Fwww.astercosm.com.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FAsterCommunity%2Fwww.astercosm.com?ref=badge_shield)


AsterCosmos 的组织门面落地页 —— [www.astercosm.com](https://www.astercosm.com)。
营销与品牌门面，不是产品仓库；旗舰产品站在 [AsterDriveLanding](https://github.com/AsterCommunity/AsterDriveLanding)。

## 开发

```bash
bun install
bun run dev              # 本地开发
bun run build            # 构建到 dist/
bun run check            # biome check + astro check（必须全绿才算完）
bun run generate:assets  # 重新生成 og.png / apple-touch-icon.png（scripts/generate-assets.mts）
```

## 页面结构

- `/` — 枢纽：品牌主张 + 精选系统（AsterDrive）+ 子站入口卡
- `/projects/` — 项目索引（策展视图，完整列表在 GitHub org）
- `/philosophy/` — 工程文化：系统观、基础设施、工作原则
- `/archive/` — AsterCosmos 与 ESAP 的对照关系与站点入口

均为双语：`/` 英文（默认）+ `/zh/` 中文前缀。

## 工程要点

- Astro 静态站，无 JS 框架运行时；首屏交互（主题/语言切换、滚动入场）全部是 vanilla script。
- 双语：`/` 英文（默认）+ `/zh/` 中文，文案唯一事实源 `src/i18n/ui.ts`。
- 视觉 token 唯一事实源 `src/styles/tokens.css`（D9 骨架 + ESAP 三色 accent，色值不发明，见文件头注释）。
- 设计与内容不变量见 [AGENTS.md](AGENTS.md)。

## 素材同步约定

以下素材从 AsterDriveLanding 仓库复制，更新时手工同步并在 commit message 注明对应 revision：

| 本站路径 | 来源 |
| --- | --- |
| `src/assets/scenes/hero-*-*.webp` | AsterDriveLanding `apps/web/src/assets/scenes/`（由其截图管线 `capture-scenes.mts` 产出，AsterDrive 前端 UI 更新后需重跑并重新复制） |
| `src/assets/scenes/esap-home-dark-*.webp` | 本仓库 `scripts/capture-esap.mts` 从线上 weare.esaps.net 实拍；WeAreESAP 前端更新后重跑 `bun run capture:esap`，并在 commit message 注明对方 revision |
| `public/og.png` / `public/apple-touch-icon.png` | 本仓库 `scripts/generate-assets.mts` 生成（品牌 asterisk 自绘，改版后重跑 `bun run generate:assets`） |

## 部署

`main` 分支推送后由 GitHub Actions 构建并发布到 GitHub Pages（`www.astercosm.com`，CNAME 在 `public/CNAME`）。不手动编辑生成产物；DNS 与 Pages 设置由仓库所有者手工管理。

## License

Code: Apache-2.0（见 [LICENSE](LICENSE)）。站点内容 CC-BY 4.0；品牌标识保留所有权利。


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FAsterCommunity%2Fwww.astercosm.com.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FAsterCommunity%2Fwww.astercosm.com?ref=badge_large)