import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, passthroughImageService } from "astro/config";

export default defineConfig({
	site: "https://www.astercosm.com",
	image: {
		// Static assets stay untouched; never pull in an image processing runtime.
		service: passthroughImageService(),
	},
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
