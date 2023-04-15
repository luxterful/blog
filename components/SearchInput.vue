<template>
  <div
    class="flex space-x-2 rounded-md border-black p-2 shadow-md dark:border-white"
  >
    <input
      class="w-full rounded-md bg-transparent outline-none dark:text-white"
      placeholder="Suche..."
      v-model="text"
      @keypress.enter="submitSearch"
    />
    <button class="dark:text-white" @click="submitSearch">
      <IconMagnifier />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
}>();
const emits = defineEmits<{
  (event: "update:modelValue", modelValue: string): string;
}>();

const text = ref(props.modelValue);

function submitSearch() {
  emits("update:modelValue", text.value);
}
</script>
