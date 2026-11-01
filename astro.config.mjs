import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://xiangshui.qing.best',
  output: 'static',
  devToolbar: { enabled: false },
  integrations: [sitemap()],
});
