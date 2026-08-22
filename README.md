# www.astercosm.com

AsterCosmos 的组织门面落地页 —— [www.astercosm.com](https://www.astercosm.com)。
营销与品牌门面，不是产品仓库；旗舰产品站在 [AsterDriveLanding](https://github.com/AsterCommunity/AsterDriveLanding)。

## 开发

```bash
bun install
bun run dev      # 本地开发
bun run build    # 构建到 dist/
bun run check    # biome check + astro check（必须全绿才算完）
```

## 工程要点

- Astro 静态站，无 JS 框架运行时；首屏交互（主题/语言切换、滚动入场）全部是 vanilla script。
- 双语：`/` 英文（默认）+ `/zh/` 中文，文案唯一事实源 `src/i18n/ui.ts`。
- 视觉 token 唯一事实源 `src/styles/tokens.css`（D9 骨架 + ESAP 三色 accent，色值不发明，见文件头注释）。
- 设计与内容不变量见 [AGENTS.md](AGENTS.md)。

## 素材同步约定

以下素材从 AsterDriveLanding 仓库复制，更新时手工同步并在 commit message 注明对应 revision：

| 本站路径 | 来源 |
| --- | --- |
| `src/assets/scenes/` | AsterDriveLanding `apps/web/src/assets/scenes/`（由其截图管线 `capture-scenes.mts` 产出，AsterDrive 前端 UI 更新后需重跑并重新复制） |

## 部署

`main` 分支推送后由 GitHub Actions 构建并发布到 GitHub Pages（`www.astercosm.com`，CNAME 在 `public/CNAME`）。不手动编辑生成产物；DNS 与 Pages 设置由仓库所有者手工管理。

## License

Code: Apache-2.0（见 [LICENSE](LICENSE)）。站点内容 CC-BY 4.0；品牌标识保留所有权利。
