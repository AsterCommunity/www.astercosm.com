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
apps/acme/          @astercosm/acme — acme.astercosm.com AsterACME 落地页（无 JS 框架运行时）
apps/yggdrasil/     @astercosm/yggdrasil — yggdrasil.astercosm.com AsterYggdrasil 落地页（无 JS 框架运行时）
packages/tokens/    @astercosm/tokens — AsterDrive D9 设计 token 事实源在 AsterDrive（drive、gate、acme 依赖）
```

`apps/drive` 迁移自 AsterDriveLanding@`250df1d`（原仓库归档，其 AGENTS.md 约束已并入本文）。

```bash
bun install
bun run dev                   # 六站并行：www 4321 / drive 4322 / gate 4323 / forge 4324 / acme 4325 / yggdrasil 4326
bun run dev:www / dev:drive / dev:gate / dev:forge / dev:acme / dev:yggdrasil   # 单独拉起某一站
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
- `astro check` 与 TypeScript 7 不兼容，各 app 都锁 `typescript@^6`，勿升。
- biome 对 `*.astro` 关闭了 `noUnusedImports/noUnusedVariables`（模板引用 frontmatter
  变量会误报），不要在 overrides 里再放宽别的规则。
- 根 `overrides` 把 `sharp` 锁到 `npm:imagemagick@0.1.3`（各 app 共用），避免解析带
  LGPL libvips 的平台包；各 app 的 Astro image service 都是显式 no-op，勿动。
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
  `docs/.vitepress/theme/custom.css` 色板（青 teal + 琥珀 amber，墨绿黑底）。
  **不共用 `packages/tokens` 的 D9 蓝**——那是 AsterDrive 的色板，与 Forge 自己的标识
  冲突。物料例外：库没有 UI，其原生物料是代码与 crate 目录，代码样例在
  `src/i18n/code.ts`（事实源为 Forge 仓库 README，token 手工标注，不跑高亮器）。
- **apps/acme**：视觉 token 与 drive/gate 同源——`@astercosm/tokens` 的 D9 色板，
  不设站内 tokens.css，不发明色值；代码块高亮色从 D9 蓝推导（hue 258–260 及近邻，
  锚点取 dark `--primary`，见 `src/styles/global.css` 注释）。物料例外同 forge：
  库/CLI 没有 UI，其原生物料是真实命令与 crate 目录，代码样例在
  `src/i18n/code.ts`（事实源为 ACME 仓库 CLI README，token 手工标注）。
  **状态分节口径学 gate**：用 Available / In development / Planned 三档进行时
  列表陈述进展，不写"诚实边界"之类的元话语；能力清单与主仓库 README/changelog
  保持一致，不得把规划写成已可用。
- **apps/yggdrasil**：视觉 token 唯一事实源 `src/styles/tokens.css`，取自
  AsterYggdrasil 主仓库 `docs/public/favicon.svg` 色板（emerald 绿 + zinc 黑，
  hex→oklch 换算，文件头保留原值）。**不共用 D9 蓝（hue 258）也不混 forge 的
  teal（hue 186）**——emerald（hue 163）是 favicon 自己的色相。独有视觉签名
  来自 favicon 的方块世界：`--radius` 全站收紧到 0.375rem（另几站 0.75rem）、
  pill/徽章近方角、点缀一律小方块（favicon 的孢子就是 rect）、卡片 hover 用
  边框点亮而非阴影浮起。**主题默认浅色**（1547 指定，不跟随系统），Nav 切换为
  明暗两档；中文文案不用末尾句号，逗号/冒号/括号用全角。物料口径：服务没有
  截图管线，原生物料是真实协议端点（`src/i18n/data.ts`，事实源为主仓库
  `src/api/routes/yggdrasil.rs`）与真实命令（`src/i18n/code.ts`，事实源为
  README Quick start，默认端口 3000 取自 config.example.toml）；hero 的等距
  草方块与 og 图形是 favicon path 的仿射复刻（系数写在文件头注释）。不设
  crates 节——crate 未发布、受众是服务器主不是库用户（1547 拍板）。
  **状态分节口径同 acme**（Available / In development 两档，无 Planned 就不
  渲染该档），能力清单与主仓库 README/changelog 保持一致。

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
| `apps/forge/src/i18n/ui.ts`        | crate 目录取自 `Cargo.toml` workspace members（34 个）；分组沿用 README 的 Areas 口径        |
| `apps/forge/public/og.svg`、`.png` | 自绘：复用 `docs/public/favicon.svg` 的标识形状与品牌色，PNG 由 `rsvg-convert` 渲染 1200×630 |

### apps/acme（来源：AsterACME 主仓库）

| 本站路径                                  | 来源                                                                                                                                                 |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/acme/public/brand/`                 | 自绘：AsterACME wordmark 双版本（深墨 `#0E1424` / 白 `#F8FAFC` 透明底，`#3B82F6` 四芒星 + 顶点蓝点点睛；初稿 AI 生成后手工整理）。light 版不得带底板 |
| `apps/acme/public/favicon.svg`            | 自绘：圆规 A + 盾形星轨 + 四芒星标识的**本地变体**（圆形→方形 rx=64，`#0E1424` 底）；源图标改版时需手工同步                                          |
| `apps/acme/public/og.svg`、`.png`         | 自绘：复用 favicon 标识形状与品牌色（`#0E1424` 底 + `#3B82F6`），PNG 由 `rsvg-convert` 渲染 1200×630                                                 |
| `apps/acme/src/i18n/code.ts`              | 仓库 CLI README 的真实命令示例（逐 token 手工标注，不跑高亮器）                                                                                      |
| `apps/acme/src/i18n/ui.ts` 的 crates 列表 | `Cargo.toml` workspace members（11 个）；说明文案取自各 crate README                                                                                 |
| `apps/acme/src/i18n/ui.ts` 的 status 分节 | 主仓库 README/changelog 的已实现与路线图清单；改动产品能力时同步                                                                                     |

### apps/yggdrasil（来源：AsterYggdrasil 主仓库）

| 本站路径                               | 来源                                                                                                                  |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `apps/yggdrasil/public/favicon.svg`    | `docs/public/favicon.svg` 原样复制（品牌标识：zinc 黑底 + emerald 草方块 + 赛博根系，2026-11 快照）                   |
| `apps/yggdrasil/public/og.svg`、`.png` | 自绘：favicon 方块几何的仿射复刻（x×1.875+90、y×1.875+125，系数写在 SVG 内注释），PNG 由 `rsvg-convert` 渲染 1200×630 |
| `apps/yggdrasil/src/styles/tokens.css` | favicon 色板 hex→oklch 换算，文件头保留原值                                                                           |
| `apps/yggdrasil/src/i18n/data.ts`      | 主仓库 `src/api/routes/yggdrasil.rs` 的真实协议端点（0.1.0-beta.1 快照）；产品能力变化时同步                          |
| `apps/yggdrasil/src/i18n/code.ts`      | 仓库 README Quick start 的真实命令；端口 3000 取自 `config.example.toml`                                              |

## 部署

`main` 推送 → GitHub Actions 构建全部站点 → `wrangler deploy` 到 Cloudflare Workers
（`astercosm-www` → www.astercosm.com，`asterdrive-landing` → drive.astercosm.com，
`astergate-landing` → gate.astercosm.com，`asterforge-landing` → forge.astercosm.com，
`asteracme-landing` → acme.astercosm.com，`asteryggdrasil-landing` → yggdrasil.astercosm.com）。
Worker 与自定义域名配置在各自 `wrangler.jsonc`，不手动编辑生成产物；DNS、zone 与
Cloudflare 账号侧设置由仓库所有者管理。前置：GitHub secrets `CLOUDFLARE_API_TOKEN`
（Account → Workers Scripts → Admin + Zone → DNS → Write + Workers Routes → Write）与
`CLOUDFLARE_ACCOUNT_ID`。接入新站点：新建 `apps/<name>/`（Astro 站点 + `wrangler.jsonc`），
在 `deploy.yml` 加一个部署步骤即可。

**yggdrasil 域名口径**：AsterYggdrasil 文档站已在 `yggdrasil.docs.astercosm.com`
（VitePress，同 `forge.docs.astercosm.com` 先例），主域 `yggdrasil.astercosm.com`
归本仓 landing 的 Worker（`asteryggdrasil-landing`，已入 `deploy.yml` matrix）。
主仓库 README 里的 docs badge 若仍指向主域，属于对方仓库的待同步项。

`forge.astercosm.com` 此前承载 AsterForge 文档站（GitHub Pages），文档已于 Forge 仓库
`fd06ec4` 迁至 `forge.docs.astercosm.com`。因此旧文档书签路径（`/guide`、`/crates`、
`/en`）在本域名下已无对应内容；按当前决定不保留跳转（不做 `_redirects`），站内所有
文档链接一律指向 `forge.docs.astercosm.com`。

## License

Code: Apache-2.0（`apps/drive` 原以 MIT OR Apache-2.0 发布，并入后随仓库统一）。
站点内容 CC-BY 4.0；品牌标识保留所有权利。
