# astercosm.com monorepo — AsterCosmos 站点集合

一个仓库、多个静态站点，Cloudflare Workers 部署。营销与品牌门面，不是产品仓库；
旗舰产品代码和文档站在 [AsterDrive](https://github.com/AsterCommunity/AsterDrive)。

## 硬约束

- 仓库可能存在未提交改动，不回滚、不覆盖、不格式化掉无关改动。
- 不顺手扩大任务范围；页面语气、结构、素材规则的变更按本文「设计与内容不变量」对齐。

## 结构与命令

```text
apps/www/           @astercosm/www — www.astercosm.com 组织门面（无 JS 框架运行时）
apps/drive/         @astercosm/drive — drive.astercosm.com 产品落地页（React 折叠线以下岛屿）
apps/gate/          @astercosm/gate — gate.astercosm.com AsterGate 预告页（无 JS 框架运行时）
apps/forge/         @astercosm/forge — forge.astercosm.com AsterForge 落地页（无 JS 框架运行时）
packages/tokens/    @astercosm/tokens — AsterDrive D9 设计 token 语义映射（drive、gate 依赖）
```

`apps/drive` 迁移自 AsterDriveLanding@`250df1d`（原仓库归档，其 AGENTS.md 约束已并入本文）。

```bash
bun install
bun run dev                   # 四站并行：www 4321 / drive 4322 / gate 4323 / forge 4324
bun run dev:www / dev:drive / dev:gate / dev:forge   # 单独拉起某一站
bun run build                 # 构建全部站点
bun run check                 # biome + 全部 app 的 astro check（必须全绿才算完）
bun run capture:esap          # www 的 ESAP 实拍管线（见 README）
bun run capture:scenes -- --binary /path/to/aster_drive   # drive 的截图管线（见 README）
```

工程要点：
- `bunfig.toml` 设了 `install.minimumReleaseAge = 86400`：发布不满 24 小时的 npm
  版本不装（供应链冷静期）；豁免走 `minimumReleaseAgeExcludes`，别删这条。
- `packageManager` 的 bun 版本必须与本地工具链对齐：bun 1.4 生成的 `bun.lock`
  （lockfileVersion 2）不被 bun ≤1.3 识别，CI 的 `oven-sh/setup-bun` 按 `packageManager`
  字段装版本，错位直接炸 `--frozen-lockfile`。
- CI 显式用 `actions/setup-node@v7` 装 Node 24：astro 7.4 要求 node ≥ 22.23.4，而
  runner 系统路径和工具缓存里的 22.x 都不满足；降 Node 版本前先对 astro 的 engines。
- `astro check` 与 TypeScript 7 不兼容，两个 app 都锁 `typescript@^6`，勿升。
- biome 对 `*.astro` 关闭了 `noUnusedImports/noUnusedVariables`（模板引用 frontmatter
  变量会误报），不要在 overrides 里再放宽别的规则。
- 根 `overrides` 把 `sharp` 锁到 `npm:imagemagick@0.1.3`（两个 app 共用），避免解析带
  LGPL libvips 的平台包；两个 app 的 Astro image service 都是显式 no-op，勿动。
- 每个站点一个 assets-only Worker：配置在各自 `apps/*/wrangler.jsonc`（assets 目录、
  404 处理、custom domain routes）。加新站 = 新 app 目录 + `wrangler.jsonc` +
  `deploy.yml` 加一步。

## 设计与内容不变量

两站同源的已确立决策，任何页面文案与视觉修改都要守住：
1. **面向用户，不是面向工程师**。第一屏只允许用户语言：禁止版本号、技术栈、协议名、
   内部代号、许可证罗列。工程深度随滚动展开。
2. **物料必须产品原生**。只用真实 UI 截图、真实命令、真实后端列表与自绘品牌元素。
   **禁止示意图/拓扑图**、stock 插画、AI 生成配图、渐变 mesh、玻璃拟态、假 dashboard
   mockup、假社交证明。截图只来自两条管线（drive 的 capture-scenes、www 的
   capture-esap，及同仓复制），不手工伪造。
3. **动效只润色不遮羞**。reduced-motion 必须完整降级；无 JS 时全部内容可见可用；首屏
   JS 保持 ≈0KB。禁止全屏滚动劫持（snap 容器、scroll jacking），hero 标题不加打字机。
4. **双语**：`/` 英文（默认）+ `/zh/` 前缀，页面结构双语一一对应；文案唯一事实源各自
   的 `src/i18n/ui.ts`；语言切换保持当前页并写 `localStorage.lang`。

app 差异：
- **apps/www**：站点无 JS 框架运行时（无 React/Vue 岛屿），确需交互组件时先论证
  vanilla 为何不够；视觉 token 唯一事实源 `src/styles/tokens.css`（D9 骨架 + ESAP
  三色 accent，色值不发明，见文件头注释）；`/projects/` 是策展视图（完整列表在 GitHub
  org），收录标准是有公开故事可讲。
- **apps/drive**：React 只允许在 `client:visible` 的折叠线以下岛屿；视觉 token 的事实
  源是 AsterDrive `frontend-panel/src/index.css`（D9 体系），`packages/tokens` 只做
  语义映射与裁剪，色值不发明；connector 展示数据 `src/i18n/connectors.ts`（快照来源
  见文件头注释）。
- **apps/forge**：视觉 token 唯一事实源 `src/styles/tokens.css`，取自 AsterForge 主仓库
  `docs/.vitepress/theme/custom.css` 的自有品牌色板（青 teal + 琥珀 amber，墨绿黑底）。
  **不共用 `packages/tokens` 的 D9 蓝**——那是 AsterDrive 的色板，与 Forge 自己的标识
  冲突。物料例外：库没有 UI，其原生物料是代码与 crate 目录，代码样例在
  `src/i18n/code.ts`（事实源为 Forge 仓库 README，token 手工标注，不跑高亮器）。

## 素材同步

### apps/drive（来源：AsterDrive 主仓库）

以下素材从 AsterDrive 仓库复制，更新时手工同步并在 commit message 注明对应 revision：

| 本站路径                                     | 来源                                                                                                             |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `apps/drive/public/brand/`                   | `frontend-panel/public/static/asterdrive/`                                                                       |
| `apps/drive/public/connectors/`              | `src/storage/connectors/assets/`（后端拥有的 connector 图标，与产品管理端同源）                                  |
| `apps/drive/public/.well-known/security.txt` | `docs/public/.well-known/security.txt`                                                                           |
| `apps/drive/src/i18n/connectors.ts`          | `docs/generated/storage-connectors.json` + `src/storage/connectors/` 下各 Rust descriptor（badge_rgb，含子目录） |
| `apps/drive/public/favicon.svg`              | `frontend-panel/public/favicon.svg` 的**本地变体**（背景圆→方，rx=64）；源图标改版时需手工同步                   |

截图资产管线（`apps/drive/src/assets/scenes/`）：由 `scripts/capture-scenes.mts` 生成，
AsterDrive 前端更新后 `bun run capture:scenes -- --binary /path/to/aster_drive` 一键刷新；
截图脚本使用本机 ImageMagick 做格式转换，部署构建不需要图像处理运行时。

### apps/www

| 本站路径                                           | 来源                                                                                                                                                  |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/www/src/assets/scenes/hero-*-*.webp`         | 复制自 `apps/drive/src/assets/scenes/`（同仓；drive 截图管线刷新后重新复制）                                                                          |
| `apps/www/src/assets/scenes/esap-home-dark-*.webp` | 本 app `scripts/capture-esap.mts` 从线上 weare.esaps.net 实拍；WeAreESAP 前端更新后重跑 `bun run capture:esap`，并在 commit message 注明对方 revision |
| `apps/www/public/og.png`、`apple-touch-icon.png`   | 已入库的静态品牌素材；改版时直接替换产物并保留尺寸/品牌 token 约束                                                                                    |

### apps/forge（来源：AsterForge 主仓库）

| 本站路径                           | 来源                                                                                         |
| ---------------------------------- | -------------------------------------------------------------------------------------------- |
| `apps/forge/public/favicon.svg`    | `docs/public/favicon.svg`（Forge 自有标识：青 + 琥珀，墨绿黑底）                             |
| `apps/forge/src/styles/tokens.css` | `docs/.vitepress/theme/custom.css` 的品牌色板（hex→oklch 换算，文件头保留原值）              |
| `apps/forge/src/i18n/code.ts`      | 仓库 README 的入口示例与 `cargo generate` 命令（逐 token 手工标注）                          |
| `apps/forge/src/i18n/ui.ts`        | crate 目录取自 `Cargo.toml` workspace members（32 个）；分组沿用 README 的 Areas 口径        |
| `apps/forge/public/og.svg`、`.png` | 自绘：复用 `docs/public/favicon.svg` 的标识形状与品牌色，PNG 由 `rsvg-convert` 渲染 1200×630 |

## 部署

`main` 推送 → GitHub Actions 构建全部站点 → `wrangler deploy` 到 Cloudflare Workers
（`astercosm-www` → www.astercosm.com，`asterdrive-landing` → drive.astercosm.com，
`astergate-landing` → gate.astercosm.com，`asterforge-landing` → forge.astercosm.com）。
Worker 与自定义域名配置在各自 `wrangler.jsonc`，不手动编辑生成产物；DNS、zone 与
Cloudflare 账号侧设置由仓库所有者管理。前置：GitHub secrets `CLOUDFLARE_API_TOKEN`
（Account → Workers Scripts → Admin + Zone → DNS → Write + Workers Routes → Write）与
`CLOUDFLARE_ACCOUNT_ID`。接入新站点：新建 `apps/<name>/`（Astro 站点 + `wrangler.jsonc`），
在 `deploy.yml` 加一个部署步骤即可。

`forge.astercosm.com` 此前承载 AsterForge 文档站（GitHub Pages），文档已于 Forge 仓库
`fd06ec4` 迁至 `forge.docs.astercosm.com`。因此旧文档书签路径（`/guide`、`/crates`、
`/en`）在本域名下已无对应内容；按当前决定不保留跳转（不做 `_redirects`），站内所有
文档链接一律指向 `forge.docs.astercosm.com`。

## License

Code: Apache-2.0（`apps/drive` 原以 MIT OR Apache-2.0 发布，并入后随仓库统一）。
站点内容 CC-BY 4.0；品牌标识保留所有权利。
