# 香水外贸独立站

当前阶段：**第一版 Astro 询盘前台已实现，可本地浏览；真实投递、GitHub 同步与 Cloudflare 发布待完成**。

目标：借鉴 Ellis Brooklyn 的摄影主导风格与购物体验，建立可持续运营的独立品牌网站；使用最新版稳定 Astro，后续将源码同步到 GitHub，并部署到 Cloudflare。

## 文档入口

| 文件 | 内容 |
| --- | --- |
| [AGENTS.md](AGENTS.md) | 后续开发代理统一遵守的项目规范 |
| [项目规划](docs/PROJECT_PLAN.md) | 目标、页面范围、优先级、实施里程碑与验收 |
| [技术架构](docs/ARCHITECTURE.md) | Astro、询盘投递、数据边界、GitHub 与 Cloudflare 部署方案 |
| [参考站分析](docs/REFERENCE_AUDIT.md) | 本地截图与 HTML 的结构、视觉和可复用思路 |
| [待补充信息](docs/OPEN_QUESTIONS.md) | 业务决策和上线素材清单，可直接填写 |

## 当前决定

- 仅询盘，无在线交易、购物车或管理后台。
- 品牌名、图片与商品资料参考 Ellis Brooklyn，最大程度沿用原站布局。
- 欧美市场，English，支持 USD/EUR 展示与询盘偏好；实际价格待确定。
- Astro 最新稳定版，推荐 Cloudflare Workers；本地数据维护内容。
- 已有仓库：[highertq/xiangshui](https://github.com/highertq/xiangshui)。已记录，尚未关联或推送。

## 目录说明

- `原网站图片/`：8 张桌面端截图，只读参考。
- `原html/`：首页快照及其资源，只读参考。
- `docs/`：项目文档。

原始参考目录不推送 GitHub；选用素材复制至 `src/assets/`，来源记录在 `docs/ASSETS.md`。当前页面统一 noindex。

## 本地运行

使用 Node 24.20.0（见 `.node-version`），Astro 锁定为 7.4.4。

```sh
npm ci
npm run dev
```

开发地址默认 http://127.0.0.1:4321 。

```sh
npm run check
npm run build
npm test
npm run preview
```

`npm test` 检查构建产物，需先 build。检查范围包含内部链接/资源、英文与 noindex 元数据、第三方脚本和表单目标。GitHub workflow 已推送并通过远程 CI（check/build/test）。

## 当前功能

首页手动轮播、专题、9 款商品、5 个系列列表、搜索/筛选/排序、商品图集、规格选择、询盘预填、USD/EUR 偏好持久化、移动菜单、品牌/联系/FAQ/政策与 404，共 23 个静态页面。

询盘表单仅生成本地文本草稿，页面明确标注未发送。未部署 API，不会提交个人信息；没有后台、支付或订单。价格显示 Request a quote。

## 后续配置

- 提供询盘收件邮箱后选择投递渠道，实现服务端校验和真实邮件投递。
- 核对正式商品资料、品牌素材使用范围、联系信息和价格策略。
- 已同步仓库 `highertq/xiangshui` 并部署 Cloudflare Workers；自定义域 `xiangshui.qing.best` 已绑定并开放索引。
- `wrangler.jsonc` 为纯静态 Workers Assets 配置，`routes` 声明 `xiangshui.qing.best` 自定义域；`workers_dev` 未启用，workers.dev 预览域不再对外。
- 生产地址：https://xiangshui.qing.best ，sitemap 由 `@astrojs/sitemap` 在构建时生成。
- 生产前添加实际域名的 canonical/sitemap/结构化数据并按环境管理 noindex；当前没有虚构正式域名。

见 [实施记录](docs/IMPLEMENTATION.md)。
