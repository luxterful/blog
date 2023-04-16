<template>
  <main>
    <Header> LUXTER BLOG </Header>

    <div class="mt-2 dark:text-white">
      <ContentDoc>
        <template #not-found>
          <div class="text-center text-xl">Document not found</div>
        </template>

        <template #empty>
          <div class="text-center text-xl">Document is empty</div>
        </template>

        <template v-slot="{ doc }">
          <div class="text-3xl font-bold">
            {{ doc.title }}
          </div>
          <div class="my-2 text-sm">
            {{ doc.dateText }}
            {{ doc.dateText && doc.reading ? "&bull;" : null }}
            {{ doc.reading }}
          </div>
          <div class="flex flex-wrap gap-2 text-xs">
            <span
              class="rounded-full bg-black px-2 py-1 text-white dark:bg-white dark:text-black"
              v-for="tag in doc.tags"
            >
              #{{ tag }}
            </span>
          </div>

          <ContentRenderer
            v-if="!doc.external"
            class="dark:text-white"
            :value="doc"
          />
          <div v-else class="mt-5">
            Article can be read here:
            <a class="underline" :href="doc.canonical">{{ doc.canonical }}</a>
          </div>
        </template>
      </ContentDoc>
    </div>
  </main>
</template>
