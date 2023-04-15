// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content"],
  extends: "@nuxt-themes/typography",
  nitro: { plugins: ["~/server/plugins/content.ts"] },
});
