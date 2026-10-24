# astercosm.com monorepo

AsterCosmos 的站点 monorepo —— 一个仓库多个静态站点，Cloudflare Workers 静态资产部署。

| 站点 | 目录 | 包 | 域名 |
| --- | --- | --- | --- |
| 组织门面 | `apps/www/` | `@astercosm/www` | [www.astercosm.com](https://www.astercosm.com) |
| AsterDrive 落地页 | `apps/drive/` | `@astercosm/drive` | [drive.astercosm.com](https://drive.astercosm.com) |
| D9 设计 token | `packages/tokens/` | `@astercosm/tokens` | —（drive 依赖） |

`apps/drive` 迁移自 [AsterDriveLanding](https://github.com/AsterCommunity/AsterDriveLanding)@`250df1d`
（原仓库归档后，历史提交保留在原仓库）。两个 app 共享同一套工程与内容原则，见 [AGENTS.md](AGENTS.md)。

## 开发

```bash
bun install
bun run dev:www        # www 本地开发
bun run dev:drive      # drive 本地开发（两个 dev server 同端口，不能同时跑）
bun run build          # 构建全部站点到各自 apps/*/dist
bun run check          # biome check + 两个 app 的 astro check（全绿才算完）
bun run capture:esap    # www 的 ESAP 实拍管线（需本机 ImageMagick）
bun run capture:scenes -- --binary /path/to/aster_drive   # drive 的截图管线
```

要求：Bun 1.4+（`packageManager` 字段对齐，CI 按此安装）。

## 部署

`main` 分支推送后由 GitHub Actions（`.github/workflows/deploy.yml`）构建全部站点，
`wrangler deploy` 发布两个 assets-only Worker，custom domain 由 `apps/*/wrangler.jsonc`
中的 `routes` 声明、部署时自动附加：

- `astercosm-www` → www.astercosm.com
- `asterdrive-landing` → drive.astercosm.com

### 一次性切换清单（仓库所有者执行）

1. `astercosm.com` zone 接入 Cloudflare 账号（若尚未）。
2. GitHub 仓库 secrets：`CLOUDFLARE_API_TOKEN`（Account token 即可，需
   Account → Workers Scripts → Edit + Zone → DNS → Edit）、`CLOUDFLARE_ACCOUNT_ID`。
3. 提交并推送本迁移，Actions 部署成功即完成切换。
4. 若 DNS 仍存在指向 GitHub Pages 的 `www` / `drive` 记录，先删除（custom domain
   接管时记录冲突会明确报错）。
5. 两个域名验证通过后，在 GitHub 归档 AsterDriveLanding 仓库；确认 Cloudflare 稳定后
   可在原仓库关闭 GitHub Pages。

## 素材同步约定

### apps/drive（来源：AsterDrive 主仓库）

以下素材从 AsterDrive 仓库复制，更新时手工同步并在 commit message 注明对应 revision：

| 本站路径 | 来源 |
| --- | --- |
| `apps/drive/public/brand/` | `frontend-panel/public/static/asterdrive/` |
| `apps/drive/public/connectors/` | `frontend-panel/public/static/storage/`（厂商 logo，后期统一徽标后随源更新） |
| `apps/drive/public/.well-known/security.txt` | `docs/public/.well-known/security.txt` |
| `apps/drive/src/i18n/connectors.ts` | `docs/generated/storage-connectors.json` + `src/storage/connectors/*.rs`（badge_rgb） |
| `apps/drive/public/favicon.svg` | `frontend-panel/public/favicon.svg` 的**本地变体**（背景圆→方，rx=64）；源图标改版时需手工同步 |
| `apps/drive/public/connectors/asterfollower.svg`、`local-disk.svg`、`sftp-server.svg` | landing 自绘 |

截图资产管线（`apps/drive/src/assets/scenes/`）：由 `scripts/capture-scenes.mts` 生成，
AsterDrive 前端更新后 `bun run capture:scenes -- --binary /path/to/aster_drive` 一键刷新；
截图脚本使用本机 ImageMagick 做格式转换，部署构建不需要图像处理运行时。

### apps/www

| 本站路径 | 来源 |
| --- | --- |
| `apps/www/src/assets/scenes/hero-*-*.webp` | 复制自 `apps/drive/src/assets/scenes/`（同仓；drive 截图管线刷新后重新复制） |
| `apps/www/src/assets/scenes/esap-home-dark-*.webp` | 本 app `scripts/capture-esap.mts` 从线上 weare.esaps.net 实拍；WeAreESAP 前端更新后重跑 `bun run capture:esap`，并在 commit message 注明对方 revision |
| `apps/www/public/og.png`、`apple-touch-icon.png` | 已入库的静态品牌素材；改版时直接替换产物并保留尺寸/品牌 token 约束 |

## License

Code: Apache-2.0（见 [LICENSE](LICENSE)；`apps/drive` 在原仓库以 MIT OR Apache-2.0 发布，
并入本仓库后随仓库统一为 Apache-2.0）。站点内容 CC-BY 4.0；品牌标识保留所有权利。
