<template>
  <span class="tag border-radius--xl text--xs text--semi-bold fr-py-1v fr-px-3v">
    <span class="fr-mr-1v">{{ utilitaires.emoji }}</span>
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
    background-color: v-bind(utilitaires.color);
  }
</style>
