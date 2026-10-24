# @astercosm/tokens

AsterDrive D9 设计 token 的 landing 分发包。

## 事实源与同步约定

色值的唯一事实源是 [AsterDrive](https://github.com/AsterCommunity/AsterDrive) 仓库的
`frontend-panel/src/index.css`（D9 无框化设计体系）。本包：
- 保留 panel 的 oklch 色值，只做语义重命名（`surface-1/2/3` 三级明度台阶）。一处有意的偏离：
  亮色 `surface-2` 取 panel 的 `muted`（0.955）而非 `sidebar`（0.972）——sidebar 是持久区域的
  低对比分区，landing 大色带需要可辨的明度台阶
- 裁掉 landing 用不到的 panel 专用 token（`sidebar-*`、`chart-*`、z-index 层级、scrollbar）
- panel 侧 D9 token 变更时**手工同步**本文件，并在 commit message 中注明对应 revision

不引入跨仓库生成管道——两个仓库各自演进，同步频率低，手工核对比自动化更可靠。

## 使用

```css
@import "@astercosm/tokens/css";
```

消费者（`apps/drive`）负责把变量映射进 Tailwind 4 的 `@theme`。
