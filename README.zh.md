<p align="center">
  <img src="apps/www/public/favicon.svg" alt="AsterCosmos" width="120" />
</p>

<p align="center">
  AsterCosmos 组织站点 —— 单仓维护，Cloudflare 托管。
</p>

<p align="center">
  <a href="https://www.astercosm.com/"><img alt="Website" src="https://img.shields.io/badge/site-www.astercosm.com-2563EB?style=for-the-badge"></a>
  <a href="https://drive.astercosm.com/"><img alt="AsterDrive" src="https://img.shields.io/badge/site-drive.astercosm.com-7C3AED?style=for-the-badge"></a>
  <a href="README.md"><img alt="English README" src="https://img.shields.io/badge/README-English-2563EB?style=for-the-badge"></a>
</p>

## 站点

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
