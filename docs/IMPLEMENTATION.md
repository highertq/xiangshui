# 第一版实施记录

日期：2026-11-01。

## 已完成

- Astro 7.4.4、TypeScript strict、原生 CSS/TypeScript；Node 24.20.0，npm 锁文件。
- 23 个静态页面：主页、9 个商品、5 个系列、搜索、询盘、About、Contact、FAQ、Privacy、Terms、404。
- 手动首页轮播、商品横滑、商品图库与规格、筛选/排序/搜索、移动菜单、USD/EUR 偏好。
- 商品/规格自动带入询盘；前端校验、下载草稿、未发送提示。不接收或传输询盘个人信息。
- 按用户提供资料复用品牌与图片，27 张素材补充同名高清图，来源见 ASSETS.md。
- GitHub CI 已推送并通过；Cloudflare 纯静态 Workers Assets 已实际部署（2026-11-01）。
- 上线前所有页面与静态响应为 noindex；确定生产域后已切换为 `index, follow` 并补 canonical/sitemap（见下节）。

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

- 仓库：https://github.com/highertq/xiangshui ，分支 main。
- 远程 CI（Check site）通过：npm ci → check → build → test，首次约 35s。
- Cloudflare：wrangler 4.156.0，Worker 名 `xiangshui`，Workers Assets 纯静态。
- **正式地址：https://xiangshui.qing.best**（自定义域，DNS 在 Cloudflare zone `qing.best`，证书已签发）
- 最新版本 ID：`6c9cd9c2-d8db-4813-a5d7-e21c23c7841a`（自定义域上线版）
- 首版版本 ID：`75fedc81-a990-46c4-86cf-8e10ea0ffe5e`（workers.dev 阶段）
- `workers_dev` 未显式启用，workers.dev 预览域已关闭，只保留生产域，避免重复内容。
- 本地执行需 Node ≥ 22.23.4（仓库 `.node-version` 为 24.20.0）；用旧版 Node 时 `astro check` 会直接拒绝运行。
- 回滚：`npx wrangler rollback` 选择上一版本，或切回旧 commit 重新 `npx wrangler deploy`。

## 索引与 SEO（2026-11-01 起）

- `astro.config.mjs` 声明 `site: https://xiangshui.qing.best`，并接入 `@astrojs/sitemap@3.7.4`，构建产出 `sitemap-index.xml` + `sitemap-0.xml`（22 条 URL，排除 404）。
- `Base.astro` 输出 `canonical`、`og:url`、`og:type`、`og:site_name`、`twitter:card`；生产页 `robots: index, follow`，404 页通过 `noindex` prop 输出 `noindex, nofollow`。
- `public/robots.txt` 改为 `Allow: /` 并声明 sitemap；`public/_headers` 移除原 `X-Robots-Tag: noindex`，保留 nosniff 与 referrer-policy。
- 测试同步更新：断言每页 `index, follow`、404 `noindex`、canonical 与 `site` 同域，防止回退成误索引或误屏蔽。

线上抽查（curl 跟随实际路由，域名 `xiangshui.qing.best`）：

- 200：`/`、`/collections/{all,fragrance,mists,sets,vanilla}/`、`/products/memoir/`、`/search/`、`/about/`、`/contact/`、`/faq/`、`/privacy/`、`/terms/`、`/inquiry/`。
- 404：`/nope-xyz` 返回 404，页面带 `noindex, nofollow`。
- 首页与商品页 canonical 均指向 `https://xiangshui.qing.best/...`；`robots.txt`、`sitemap-index.xml`、`sitemap-0.xml` 均可访问。
- `/about`、`/contact`、`/inquiry` 无尾斜杠时 307 跳转到带斜杠版本，属 Astro 默认行为。
- `/collections/` 返回 404 是正常的：站点没有系列索引页，只有五个列表页。

## 当前限制与后续步骤

1. 提供询盘邮箱并选定投递渠道，接入最小服务端校验、限流与邮件发送，再进行收件端测试。当前没有该端点。
2. 商品文案/容量来自有限参考，正式供货、价格、具体香调/成分需进一步核实。分类中的 mood 是展示标签，不代替正式香调表；当前不发布库存或价格承诺。
3. 已上线但仍是参考品牌名与参考文案，正式经营前需落实品牌素材使用范围、联系资料与政策。
4. 仓库已关联 highertq/xiangshui 并推送 main；分支/PR 流程尚未实际走通。
5. Cloudflare 已部署并绑定自定义域；**Workers Builds 已连接 GitHub，推送 main 自动构建上线**（2026-11-01 实测：推送后 10–15 秒出现新版本，`Source` 为 deployment 而非 Upload）。构建机需保持 `NODE_VERSION=24.20.0`。
6. **首页 5 条视频热链 `cdn.shopify.com`**（`src/data/videos.json`），存在版权与稳定性风险；现有测试只检查 script/form 外链，不覆盖 `<video>` 的 `data-src`，需补测试并改用自有或本地素材。
7. canonical 与 sitemap 已按 `xiangshui.qing.best` 生成，域名若更换需同步改 `astro.config.mjs`、`site.ts`、`robots.txt` 三处；结构化数据尚未添加，性能指标尚未通过 Lighthouse/真实流量测量。

## 常用入口

- 本地：http://127.0.0.1:4321
- 商品数据：src/data/products.ts
- 品牌与导航：src/data/site.ts
- 统一样式：src/styles/global.css
- 询盘页面：src/pages/inquiry.astro
- 截图：output/playwright/（已忽略，不提交）
