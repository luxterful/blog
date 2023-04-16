<template>
  <div class="mx-auto max-w-screen-md px-5">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <div class="mx-auto max-w-screen-md px-5 pb-4">
    <hr class="mb-4 mt-9 border-stone-300 dark:border-stone-700" />
    <div class="text-center text-xs text-stone-300 dark:text-stone-700">
      provided by
      <a
        href="https://luxterful.eu"
        class="rounded-full bg-stone-300 px-2 py-1 text-white hover:bg-stone-400 dark:bg-stone-700 dark:text-stone-800 dark:hover:bg-stone-600"
      >
        luxterful.eu </a
      ><br /><br />
      Copyright {{ new Date().getFullYear() }}
      <a
        href="https://www.luxterful.eu/legal"
        class="rounded-full bg-stone-300 px-2 py-1 text-white hover:bg-stone-400 dark:bg-stone-700 dark:text-stone-800 dark:hover:bg-stone-600"
      >
        legal notice
      </a>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Luxter Blog",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  meta: [
    { name: "description", content: "Collection of our favourite recipes" },
    {
      name: "theme-color",
      content: "white",
      media: "(prefers-color-scheme: light)",
    },
    {
      name: "theme-color",
      content: "rgb(41 37 36)",
      media: "(prefers-color-scheme: dark)",
    },
  ],
  link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
  bodyAttrs: {
    class:
      "dark:bg-stone-800 bg-white transition-colors ease-in-out duration-500",
  },
  script: [
    {
      src: "/appearance.js",
      body: false,
    },
  ],
});
</script>
