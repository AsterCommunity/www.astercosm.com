# www.astercosm.com — AsterCosmos 组织门面

AsterCosmos 的落地页 —— [www.astercosm.com](https://www.astercosm.com)。
营销与品牌门面，不是产品仓库；旗舰产品落地页在 [AsterDriveLanding](https://github.com/AsterCommunity/AsterDriveLanding)，
两站共享同一套工程与内容原则，本文件只写本站差异。

## 硬约束

- 仓库可能存在未提交改动，不回滚、不覆盖、不格式化掉无关改动。
- 不顺手扩大任务范围；页面语气、结构、素材规则的变更按本文「设计与内容不变量」对齐。

## 结构与命令

```text
src/pages/           路由入口（双语各四页：index / projects / philosophy / archive + 404 双语并列）
src/components/      PageShell 组装器 + Nav/Footer + 各页内容组件（home/ 为首页三件套）
src/i18n/ui.ts       双语唯一事实源（t(lang)，结构对齐 typeof en；navPath() 生成双语页面路径）
src/styles/tokens.css  视觉 token 唯一事实源（见文件头注释）
src/styles/global.css  Tailwind 映射与全局样式
src/assets/scenes/   产品真实截图（素材同步见 README）
scripts/generate-assets.mts  og.png / apple-touch-icon 生成管线
```

```bash
bun install
bun run dev        # 本地开发
bun run build      # 构建到 dist/
bun run check      # biome check + astro check（必须全绿才算完）
```

工程要点：

- `packageManager` 的 bun 版本必须与本地工具链对齐：bun 1.4 生成的 `bun.lock`（lockfileVersion 2）不被 bun ≤1.3 识别，CI 的 `oven-sh/setup-bun` 会按 `packageManager` 字段装版本，错位直接炸 `--frozen-lockfile`。
- `astro check` 与 TypeScript 7 不兼容，锁 `typescript@^6`，勿升。
- biome 对 `*.astro` 关闭了 `noUnusedImports/noUnusedVariables`（模板引用 frontmatter 变量会误报），不要在 overrides 里再放宽别的规则。
- 站点无 JS 框架运行时（无 React/Vue 岛屿）。首屏交互保持 vanilla script；确需交互组件时先论证为什么 vanilla 不够。

## 设计与内容不变量

页面文案与视觉的任何修改都要守住这几条（与 AsterDriveLanding 同源的已确立决策）：

1. **面向用户，不是面向工程师**。第一屏只允许用户语言：禁止版本号、技术栈、协议名、内部代号、许可证罗列。工程深度随滚动展开。
2. **物料必须产品原生**。只用真实 UI 截图、真实命令与自绘品牌元素（三色 asterisk、hairline、色点）。**禁止示意图/拓扑图**、stock 插画、AI 生成配图、渐变 mesh、玻璃拟态、假 dashboard mockup、假社交证明。截图只来自两条管线：AsterDrive 图复制自 AsterDriveLanding 截图管线产物；ESAP 图由本仓库 `scripts/capture-esap.mts` 从线上实拍。不手工伪造。
3. **动效只润色不遮羞**。reduced-motion 必须完整降级；无 JS 时全部内容可见可用；首屏 JS 保持 ≈0KB。禁止全屏滚动劫持（snap 容器、scroll jacking），hero 标题不加打字机。
4. **视觉 token 的事实源**：骨架是 AsterDrive D9 体系（经 AsterDriveLanding `packages/tokens/base.css` 同步），accent 是 WeAreESAP 的 ESAP 三色；`src/styles/tokens.css` 只做语义映射与裁剪，色值不发明。
5. **双语**：`/` 英文（默认）+ `/zh/` 中文前缀，四页结构双语一一对应；文案唯一事实源 `src/i18n/ui.ts`；语言切换保持当前页并写 `localStorage.lang`，根页仅对未选择过的访客按浏览器语言跳一次。`/projects/` 是策展视图（完整列表在 GitHub org），收录标准是有公开故事可讲；`AsterFlux` 这类无描述仓库不收录，补了描述再说。

## 素材同步

从 AsterDriveLanding 复制的截图素材清单与刷新流程见 [README.md](README.md)「素材同步约定」。

## 部署

`main` 分支推送后由 GitHub Actions 构建并发布到 GitHub Pages（`www.astercosm.com`，
CNAME 在 `public/CNAME`）。不手动编辑生成产物；DNS 与 Pages 设置由仓库所有者手工管理。

## License

Code: Apache-2.0。站点内容 CC-BY 4.0；品牌标识保留所有权利。
