<template>
  <div>
    <Header :showHomeButton="false"> LUXTER BLOG </Header>
    <SearchInput class="mb-2" v-model="queryString" />
    <div class="flex flex-wrap" v-if="data">
      <NuxtLink
        class="mt-4 w-full px-2"
        v-for="(article, idx) in data.list"
        :key="idx"
        :to="article.external ? article.canonical : article._path"
        :target="article.external ? '_blank' : '_self"
      >
        <div
          class="border-l border-black pb-2 pl-3 text-black dark:border-white dark:text-white hover:dark:bg-stone-900"
        >
          <div class="flex w-full font-bold">
            <div class="flex-1">{{ article.title }}</div>

            <div v-if="article.external"><IconArrowTopRightOnSquare /></div>
          </div>
          <div class="my-2 text-sm">
            {{ article.dateText }}
            {{ article.dateText && article.reading ? "&bull;" : null }}
            {{ article.reading }}
          </div>
          <div class="flex flex-wrap gap-2 text-xs">
            <span
              class="rounded-full bg-black px-2 py-1 text-white dark:bg-white dark:text-black"
              v-for="tag in article.tags"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </NuxtLink>
      <div
        v-if="data.next.length !== 0"
        class="w-full cursor-pointer rounded-md p-3 text-center shadow-sm hover:shadow-md dark:bg-stone-700 dark:text-white"
        @click="page++"
      >
        Load more
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ParsedContent } from "@nuxt/content/dist/runtime/types";
import { getBlogPosts } from "~/queries";

const queryString = useState("home-query-string", () => "");

const page = ref(0);
const pageSize = 5;

const data = useState<{
  list: Pick<ParsedContent, string>[];
  next: Pick<ParsedContent, string>[];
  loaded: boolean;
}>("home-data", () => ({ list: [], next: [], loaded: false }));

async function loadBlogPosts() {
  page.value = 0;
  const limit = pageSize + 1;
  const { list, next } = await getBlogPosts(limit, queryString.value);
  data.value = { list, next, loaded: true };
}

const { pending, error } = await useAsyncData(
  "home",
  async (ctx) => {
    if (ctx?.ssrContext || !data.value.loaded) {
      await loadBlogPosts();
    }
  },
  { watch: [queryString] }
);

watch([queryString], async () => await loadBlogPosts());

watch([page], async () => {
  const limit = pageSize + 1;
  const skip = data.value?.list.length;

  const { list, next } = await getBlogPosts(limit, queryString.value, skip);

  if (data.value) {
    data.value = {
      list: [...data.value?.list, ...list],
      next,
      loaded: true,
    };
  }
});
</script>
