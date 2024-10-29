<template>
  <span class="tag border-radius--xl display-inline text--xs text--semi-bold">
    <span class="emoji">{{ utilitaires.emoji }}</span>
    {{ label }}
  </span>
</template>

<script setup lang="ts">
  import { TagThematique } from '@/shell/TagThematique';

  const props = defineProps<{
    thematiqueClefAPI: string;
    label: string;
  }>();

  const utilitaires = TagThematique.getTagThematiqueUtilitaire(props.thematiqueClefAPI);
</script>

<style scoped>
  .tag {
    width: fit-content;
    padding: 0.2rem 0.7rem;
    background-color: v-bind(utilitaires.color);
  }

  .emoji {
    margin-right: 0.1rem;
  }
</style>
