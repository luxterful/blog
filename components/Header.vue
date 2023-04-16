<template>
  <div class="flex items-stretch justify-between">
    <div v-show="showHomeButton">
      <NuxtLink to="/" class="flex h-full items-center">
        <div
          class="flex h-8 w-8 items-center justify-center rounded-md shadow-sm hover:shadow-md dark:bg-stone-700 dark:text-white"
        >
          <IconHome class="h-5 w-5" />
        </div>
      </NuxtLink>
    </div>
    <div class="m-3 text-center text-3xl font-bold dark:text-white">
      <slot />
    </div>
    <div>
      <div class="flex h-full items-center gap-1">
        <a
          href="https://www.github.com/luxterful/blog"
          title="Code on GitHub"
          class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md shadow-sm hover:shadow-md dark:bg-stone-700 dark:fill-white dark:text-white"
        >
          <IconGithub class="block h-5 w-5" />
        </a>
        <a
          href="/rss"
          title="RSS Feed"
          class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md shadow-sm hover:shadow-md dark:bg-stone-700 dark:fill-white dark:text-white"
        >
          <IconRss class="block h-5 w-5" />
        </a>
        <div
          class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md shadow-sm hover:shadow-md dark:bg-stone-700 dark:fill-white"
          @click="toggle"
        >
          <IconSun class="block h-5 w-5 dark:hidden" />
          <IconMoon class="hidden h-5 w-5 dark:block" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  showHomeButton: {
    type: Boolean,
    default: true,
  },
});

function toggleAppearance() {
  const classList = document.documentElement.classList;
  classList.toggle("dark");
}

const toggle = typeof localStorage !== "undefined" ? useAppearance() : () => {};

function useAppearance() {
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  const classList = document.documentElement.classList;

  let userPreference = localStorage.getItem("Appearance") || "auto";

  let isDark =
    userPreference === "auto" ? query.matches : userPreference === "dark";

  query.onchange = (e) => {
    if (userPreference === "auto") {
      setClass((isDark = e.matches));
    }
  };

  function toggle() {
    setClass((isDark = !isDark));

    userPreference = isDark
      ? query.matches
        ? "auto"
        : "dark"
      : query.matches
      ? "light"
      : "auto";

    localStorage.setItem("Appearance", userPreference);
  }

  function setClass(dark: boolean): void {
    classList[dark ? "add" : "remove"]("dark");
  }

  return toggle;
}
</script>
