<template>
  <div class="flex flex-column flex-center align-items--center fr-pt-6w fr-my-5w">
    <div class="ball-loader fr-mb-5w" />
    <p class="text--semi-bold fr-text--lg text--center" v-text="text" ref="paragrapheRef" tabindex="-1" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  withDefaults(
    defineProps<{
      text?: string;
    }>(),
    {
      text: 'Chargement en cours...',
    },
  );

  const paragrapheRef = ref<HTMLParagraphElement>();

  defineExpose({
    focus: () => {
      paragrapheRef.value?.focus();
    },
  });
</script>
