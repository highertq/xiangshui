# 第一版实施记录

日期：2026-11-01。

## 已完成

- Astro 7.4.4、TypeScript strict、原生 CSS/TypeScript；Node 24.20.0，npm 锁文件。
- 23 个静态页面：主页、9 个商品、5 个系列、搜索、询盘、About、Contact、FAQ、Privacy、Terms、404。
- 手动首页轮播、商品横滑、商品图库与规格、筛选/排序/搜索、移动菜单、USD/EUR 偏好。
- 商品/规格自动带入询盘；前端校验、下载草稿、未发送提示。不接收或传输询盘个人信息。
- 按用户提供资料复用品牌与图片，27 张素材补充同名高清图，来源见 ASSETS.md。
- GitHub CI 已推送并通过；Cloudflare 纯静态 Workers Assets 已实际部署（2026-11-01）。
- 所有页面及静态响应配置 noindex，生产域名未定，因此未伪造 canonical/sitemap。

## 验证

- npm run check：0 errors / warnings / hints。
- npm run build：23 页构建成功，图片生成 WebP/srcset。
- npm test：3 项通过；全站内部链接与资源可解析，英文/预览元数据完整，无抓取站第三方脚本/远程表单目标。
- Playwright：筛选空状态、清除恢复 9 款商品、名称排序通过。
- 产品 10 ml 选择带入表单、EUR 跨页保留、必填校验与文本草稿下载通过；下载文件核对商品/规格/币种一致。
- 375/768/1440 下首页、列表、商品和询盘无横向溢出。
- 手机菜单打开、Escape 关闭及焦点恢复、首页手动轮播通过。
- 全页截图需先滚动触发懒加载；仅直接截图出现空白不代表缺图。

## 远程同步与部署（2026-11-01）

- 仓库：https://github.com/highertq/xiangshui ，分支 main，推送 commit `836322a`。
- 远程 CI（Check site）通过：npm ci → check → build → test，耗时约 35s。
- Cloudflare：wrangler 4.156.0，Worker 名 `xiangshui`，Workers Assets 纯静态，136 个资源上传。
- 线上地址：https://xiangshui.yourmantq.workers.dev
- 版本 ID：`75fedc81-a990-46c4-86cf-8e10ea0ffe5e`
- 本地执行需 Node ≥ 22.23.4（仓库 `.node-version` 为 24.20.0）；用旧版 Node 时 `astro check` 会直接拒绝运行。
- 回滚：`npx wrangler rollback` 选择上一版本，或切回旧 commit 重新 `npx wrangler deploy`。

线上抽查（curl 跟随实际路由）：

- 200：`/`、`/collections/all/`、`/collections/fragrance/`、`/products/memoir/`、`/products/vanilla-salt/`、`/search/`、`/about/`、`/contact/`、`/faq/`、`/privacy/`、`/inquiry/`、`/_astro/Base.Diou4tMn.css`。
- 404：`/nonexistent-page-xyz`，走 `404-page` 处理，符合预期。
- `/about`、`/contact`、`/inquiry` 无尾斜杠时返回 307 跳转到带斜杠版本，属 Astro 默认行为。
- `/collections/` 返回 404 是正常的：站点没有系列索引页，只有 all/fragrance/mists/sets/vanilla 五个列表页。
- 首页 title/description 正常输出，未出现占位文案。

## 当前限制与后续步骤

1. 提供询盘邮箱并选定投递渠道，接入最小服务端校验、限流与邮件发送，再进行收件端测试。当前没有该端点。
2. 商品文案/容量来自有限参考，正式供货、价格、具体香调/成分需进一步核实。分类中的 mood 是展示标签，不代替正式香调表；当前不发布库存或价格承诺。
3. 目前本地预览，不是正式经营站。正式发布前落实品牌素材使用范围、联系资料与政策。
4. 仓库已关联 highertq/xiangshui 并推送 main；分支/PR 流程尚未实际走通。
5. Cloudflare 已用 wrangler 4.156.0 部署静态产物，workers.dev 预览域可访问；自定义域名、生产索引策略、Workers Builds 自动部署均未配置，回滚仅能靠 `wrangler rollback` 或重部署历史版本。
6. 域名确定后补 canonical、sitemap、可信结构化数据并设置生产/预览索引差异。性能指标尚未通过 Lighthouse/真实流量测量。

## 常用入口

- 本地：http://127.0.0.1:4321
- 商品数据：src/data/products.ts
- 品牌与导航：src/data/site.ts
- 统一样式：src/styles/global.css
- 询盘页面：src/pages/inquiry.astro
- 截图：output/playwright/（已忽略，不提交）
