# astercosm.com

AsterCosmos site monorepo — the public websites of the AsterCosmos organization,
maintained in one repository and served via Cloudflare.

| Site | Directory | Domain |
| --- | --- | --- |
| Organization homepage | `apps/www` | [www.astercosm.com](https://www.astercosm.com) |
| AsterDrive landing page | `apps/drive` | [drive.astercosm.com](https://drive.astercosm.com) |

`packages/tokens` holds the AsterDrive D9 design tokens shared by `apps/drive`.

These are marketing surfaces, not product code — the products live in
[AsterDrive](https://github.com/AsterCommunity/AsterDrive). Engineering and content
guidelines are documented in [AGENTS.md](AGENTS.md).

## Development

```bash
bun install
bun run dev:www        # www on localhost
bun run dev:drive      # drive on localhost (same port — don't run both at once)
bun run build          # build all sites into apps/*/dist
bun run check          # biome + astro check for every app, all green or nothing
bun run capture:esap    # ESAP screenshot pipeline (needs local ImageMagick)
bun run capture:scenes -- --binary /path/to/aster_drive   # drive screenshot pipeline
```

Requires Bun 1.4+ (matches the `packageManager` field; CI installs this version).

## License

Code: Apache-2.0 (see [LICENSE](LICENSE)). Site content CC-BY 4.0; brand marks all
rights reserved.

---

## 中文

AsterCosmos 站点 monorepo —— AsterCosmos 组织对外的全部网站，单仓维护，Cloudflare 托管。

| 站点 | 目录 | 域名 |
| --- | --- | --- |
| 组织门面 | `apps/www` | [www.astercosm.com](https://www.astercosm.com) |
| AsterDrive 产品落地页 | `apps/drive` | [drive.astercosm.com](https://drive.astercosm.com) |

`packages/tokens` 是 `apps/drive` 使用的 AsterDrive D9 设计 token。

这里是营销门面，不是产品仓库；产品代码在
[AsterDrive](https://github.com/AsterCommunity/AsterDrive)。工程与内容原则见
[AGENTS.md](AGENTS.md)。

## 开发

```bash
bun install
bun run dev:www        # www 本地开发
bun run dev:drive      # drive 本地开发（同端口，不能同时跑）
bun run build          # 构建全部站点到 apps/*/dist
bun run check          # biome + 全部 app 的 astro check，全绿才算完
bun run capture:esap    # ESAP 实拍管线（需本机 ImageMagick）
bun run capture:scenes -- --binary /path/to/aster_drive   # drive 截图管线
```

要求：Bun 1.4+（与 `packageManager` 字段对齐，CI 按此安装）。

## License

Code: Apache-2.0（见 [LICENSE](LICENSE)）。站点内容 CC-BY 4.0；品牌标识保留所有权利。
