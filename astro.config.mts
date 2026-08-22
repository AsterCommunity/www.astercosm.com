import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://www.astercosm.com",
	integrations: [
		sitemap({
			i18n: {
				defaultLocale: "en",
				locales: {
					en: "en",
					zh: "zh-CN",
				},
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
