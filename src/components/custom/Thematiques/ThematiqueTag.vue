<template>
  <span class="tag border-radius--xl display-inline text--xs text--semi-bold">
    <span class="emoji">{{ utilitaires.emoji }}</span>
    {{ tagInfo.label }}
  </span>
</template>

<script setup lang="ts">
  import { TagThematique } from '@/shell/TagThematique';

  const props = defineProps<{
    tagInfo: {
      thematiqueClefAPI: string;
      label: string;
    };
  }>();

  const utilitaires = TagThematique.getTagThematiqueUtilitaire(props.tagInfo.thematiqueClefAPI);
</script>

<style scoped>
  .tag {
    width: fit-content;
    padding: 0.2rem 0.5rem;
    background-color: v-bind(utilitaires.color);
  }

  .emoji {
    margin-right: 0.1rem;
  }
</style>
