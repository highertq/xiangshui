# 技术架构与交付方案

更新：2026-11-01。已确定仅询盘，无商业或内容管理后台。

## 架构

Astro + TypeScript strict + 原生 CSS/少量 TypeScript。商品与编辑内容采用本地结构化数据/Content Collections，构建生成页面；更改资料后通过 GitHub 重建发布。

Cloudflare Workers + Static Assets 为推荐托管方式。若采用轻量询盘 API，则只让该端点动态执行，展示页预渲染；若采用第三方表单端点则网站可完全静态。投递渠道待提供收件方式后选择，不提前购买服务。

浏览者 → 静态商品页面 → 询盘表单 → 轻量 API/表单服务 → 经营者收件箱。

不引入 Shopify、支付平台、订单服务、数据库、登录系统或管理后台。邮件投递是询盘能力所需的最小服务，不是管理后台。

## 版本与目录

上一轮 npm 查询记录：Astro 7.4.4，Node >=22.23.4；初始化当天重新核验稳定版及 engines，安装后锁定 Node 和 package-lock.json。CI 使用 npm ci，不自动升级 latest。

计划目录：src/components/{layout,home,product,inquiry,ui}、src/pages、src/content、src/data、src/lib/inquiry、src/styles、src/assets，以及 tests、docs 和 .github/workflows。已实现静态 Astro 前台和本地询盘草稿；详见 IMPLEMENTATION.md。

## 数据边界

- Product：id、slug、名称、描述、图片/alt、香调、分类、variants。
- Variant：id、容量/单位、可选的 USD/EUR 金额及价格来源；不用虚构库存。
- Inquiry：商品/规格、数量、目的国、姓名、邮箱、需求、preferredCurrency。
- SiteConfig：参考品牌名 Ellis Brooklyn、English、USD/EUR、导航、联系方式和 SEO。
- 金额用最小货币单位或精确小数，Intl.NumberFormat 格式化。默认建议 USD，可切 EUR；默认币种是实现建议。缺少对应报价时显示 Request a quote，不擅自实时换汇。
- 币种偏好可保存在浏览器；邮箱和询盘正文不存公共缓存、不记入普通日志。
- 表单服务端校验类型、长度、邮箱、数量和商品标识，限流、防重复，必要时增加 Turnstile；凭据只存服务端 secrets。
- mailto 若作为临时方案，只表示打开邮件客户端，不能宣称已发送。

## GitHub 与 Cloudflare

目标仓库：[highertq/xiangshui](https://github.com/highertq/xiangshui)，用户已创建。当前已登记地址，尚未配置 origin 或推送。

后续同步时先检查远程分支和已有文件，再关联本地仓库，不覆盖远程内容或另建仓库。默认 feature → PR → main，按实际仓库设置执行。

初始化应用后建立 CI：npm ci → check → 相关测试 → build。Workers Builds 负责部署，GitHub Actions 仅检查，避免重复部署。预览与生产分离邮件凭据/收件配置，预览 noindex。

适配器和 Wrangler 配置按实际安装版本生成并验证，不能猜测入口文件。纯静态部署无须为了展示页面引入 SSR。动态端点需在 Cloudflare 本地运行时或预览环境验证。

发布记录 commit、Worker 版本、域名、时间与回滚步骤；验证首页、列表、商品、404、币种和真实询盘投递。

## 官方文档入口

- [Astro 发布](https://astro.build/blog/)
- [Astro 部署到 Cloudflare](https://docs.astro.build/en/guides/deploy/cloudflare/)
- [Cloudflare Astro 指南](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/)
- [Workers 分支构建](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/)

以上为后续实施核验入口，本轮没有重新查询版本或执行部署。
