<template>
  <div class="fr-container fr-py-6w">
    <ThematiqueTag :tag="tag" />
    <h1 class="fr-mt-2w">
      {{ titre }}
    </h1>
    <img :src="urlImage" alt="" />
    <p class="fr-mt-2w text--bold">{{ texte }}</p>
    <button class="fr-btn" @click="onClickContinuer">Continuer</button>
  </div>
</template>

<script setup lang="ts">
  import ThematiqueTag from '@/components/custom/Thematiques/ThematiqueTag.vue';
  import { TagStyle } from '@/domaines/thematiques/TagThematique';

  defineProps<{
    titre: string;
    urlImage: string;
    texte: string;
    tag: {
      label: string;
      style: TagStyle;
    };
    onClickContinuer: () => void;
  }>();
</script>
