<template>
  <div>
    <Header :showHomeButton="false"> LUXTER BLOG </Header>
    <div
      class="mb-2 flex space-x-2 rounded-md border-black p-2 shadow-md dark:border-white"
    >
      <input
        class="w-full rounded-md bg-transparent outline-none dark:text-white"
        placeholder="Suche..."
        v-model="queryString"
        @keyup.enter="refreshData"
      />
      <button class="dark:text-white" @click="refreshData">
        <IconMagnifier />
      </button>
    </div>
    <div class="flex flex-wrap">
      <NuxtLink
        class="mb-4 w-full p-2 sm:w-1/2"
        v-for="(article, idx) in data.list"
        :key="idx"
        :to="`/blog/${article._path?.split('/').pop()}`"
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
          <div class="flex gap-2 text-xs">
            <span
              class="rounded-full bg-black px-2 py-1 text-white dark:bg-white dark:text-black"
              v-for="tag in article.tags"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>
    <div
      v-if="data.next.length !== 0"
      class="w-full cursor-pointer rounded-md p-3 text-center shadow-sm hover:shadow-md dark:bg-stone-700 dark:text-white"
      @click="loadMore"
    >
      Load more
    </div>
  </div>
</template>

<script setup>
const queryString = ref("");

async function loadRecipes(limit, skip) {
  let query = queryContent(`blog`)
    .only([
      "title",
      "image",
      "time",
      "_path",
      "tags",
      "date",
      "reading",
      "dateText",
      "external",
    ])
    .limit(limit);

  if (queryString.value) {
    query = query.where({
      title_lowercase: { $contains: [queryString.value.toLowerCase()] },
    });
  }

  if (skip) {
    query = query.skip(skip);
  }

  const response = await query.find();

  const list = response.slice(0, limit - 1);
  const next = response.slice(limit - 1);

  return { list, next };
}

const { data } = await useAsyncData("home", () => loadRecipes(11));

async function loadMore() {
  const limit = 10;
  const skip = data.value.list.length + 1;
  const { list, next } = await loadRecipes(limit, skip);

  data.value.list.push(...[...data.value.next, ...list]);
  data.value.next = next;
}

function refreshData() {
  refreshNuxtData("home");
}
</script>
