<template>
  <span class="tag border-radius--xl text--xs text--semi-bold fr-py-1v fr-px-3v">
    <span class="fr-mr-1v">{{ tag.style.emoji }}</span>
    {{ tag.label }}
  </span>
</template>

<script setup lang="ts">
  import { TagStyle } from '@/domaines/thematiques/TagThematique';

  const props = defineProps<{
    tag: {
      label: string;
      style: TagStyle;
    };
  }>();
</script>

<style scoped>
  .tag {
    width: fit-content;
    background-color: v-bind(props.tag.style.backgroundColor);
    color: v-bind(props.tag.style.color);
  }
</style>
