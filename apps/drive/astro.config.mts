import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, passthroughImageService } from "astro/config";

export default defineConfig({
	site: "https://drive.astercosm.com",
	image: {
		// Images are checked-in, already-encoded assets rendered through native
		// <img> tags. Keep Astro's image service explicit and transformation-free.
		service: passthroughImageService(),
	},
	integrations: [
		react(),
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
