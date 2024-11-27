<template>
  <ThematiqueTag :tag="tag" />
  <h1 class="fr-mt-2w">
    {{ titre }}
  </h1>
  <img :src="urlImage" height="200" alt="" />
  <p class="fr-mt-2w" v-html="texte"></p>
  <button id="btnContinuer" class="fr-btn fr-btn--lg" @click="onClickContinuer">Continuer</button>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
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

  onMounted(() => {
    const btnContinuer = document.getElementById('btnContinuer');
    btnContinuer?.focus();
  });
</script>
