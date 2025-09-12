<template>
  <span class="fr-tag">
    <span aria-hidden="true" class="fr-mr-1v">{{ tag.style.emoji }}</span>
    {{ tag.label }}
  </span>
</template>

<script lang="ts" setup>
  import { TagStyle } from '@/domaines/thematiques/TagThematique';

  const props = defineProps<{
    tag: {
      label: string;
      style: TagStyle;
    };
  }>();
</script>

<style scoped>
  .fr-tag {
    width: fit-content;
    background-color: v-bind(props.tag.style.backgroundColor);
    color: v-bind(props.tag.style.color);
  }
</style>
