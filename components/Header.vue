<template>
  <div class="flex justify-between items-stretch">
    <div v-show="showHomeButton">
      <NuxtLink to="/" class="h-full flex items-center">
        <div
          class="w-8 h-8 rounded-md hover:shadow-md shadow-sm flex justify-center items-center dark:text-white dark:bg-stone-700"
        >
          <IconHome class="w-5 h-5" />
        </div>
      </NuxtLink>
    </div>
    <div class="font-bold text-3xl m-3 text-center dark:text-white">
      <slot />
    </div>
    <div>
      <div class="h-full flex items-center">
        <div
          class="cursor-pointer w-8 h-8 rounded-md shadow-sm hover:shadow-md flex justify-center items-center dark:fill-white dark:bg-stone-700"
          @click="toggle"
        >
          <IconSun class="w-5 h-5 block dark:hidden" />
          <IconMoon class="w-5 h-5 hidden dark:block" />
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
