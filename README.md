<p align="center">
  <img src="apps/www/public/favicon.svg" alt="AsterCosmos" width="120" />
</p>

<p align="center">
  The AsterCosmos organization sites — maintained as one monorepo and served via Cloudflare.
</p>

<p align="center">
  <a href="https://www.astercosm.com/"><img alt="Website" src="https://img.shields.io/badge/site-www.astercosm.com-2563EB?style=for-the-badge"></a>
  <a href="https://drive.astercosm.com/"><img alt="AsterDrive" src="https://img.shields.io/badge/site-drive.astercosm.com-7C3AED?style=for-the-badge"></a>
  <a href="https://gate.astercosm.com/"><img alt="AsterGate" src="https://img.shields.io/badge/site-gate.astercosm.com-3B82F6?style=for-the-badge"></a>
  <a href="README.zh.md"><img alt="中文 README" src="https://img.shields.io/badge/README-中文-E11D48?style=for-the-badge"></a>
</p>

## Sites

| Site                    | Directory    | Domain                                             |
| ----------------------- | ------------ | -------------------------------------------------- |
| Organization homepage   | `apps/www`   | [www.astercosm.com](https://www.astercosm.com)     |
| AsterDrive landing page | `apps/drive` | [drive.astercosm.com](https://drive.astercosm.com) |
| AsterGate teaser page   | `apps/gate`  | [gate.astercosm.com](https://gate.astercosm.com)   |

`packages/tokens` holds the AsterDrive D9 design tokens shared by `apps/drive` and `apps/gate`.

These are marketing surfaces, not product code — the products live in
[AsterDrive](https://github.com/AsterCommunity/AsterDrive). Engineering and content
guidelines are documented in [AGENTS.md](AGENTS.md).

## Development

```bash
bun install
bun run dev            # all three sites in parallel: www 4321 / drive 4322 / gate 4323
bun run dev:www        # www only
bun run dev:drive      # drive only
bun run dev:gate       # gate only
bun run build          # build all sites into apps/*/dist
bun run check          # biome + astro check for every app, all green or nothing
bun run capture:esap    # ESAP screenshot pipeline (needs local ImageMagick)
bun run capture:scenes -- --binary /path/to/aster_drive   # drive screenshot pipeline
```

Requires Bun 1.4+ (matches the `packageManager` field; CI installs this version).

## License

Code: Apache-2.0 (see [LICENSE](LICENSE)). Site content CC-BY 4.0; brand marks all
rights reserved.
