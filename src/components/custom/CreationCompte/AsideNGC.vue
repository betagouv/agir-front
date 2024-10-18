<template>
  <aside class="full-width fr-p-2w fr-pb-5w border-radius--md background--white position--relative fr-mt-6w shadow">
    <span class="fr-text--xl text--bold fr-mb-2w display-block">Envie d'en savoir plus ?</span>
    <router-link class="fr-btn fr-btn--secondary" target="_blank" :to="{ name: RouteCommuneName.ACCUEIL }"
      >Découvrir</router-link
    >
    <img src="/aside_inscription_ngc.webp" class="image-aside-ngc" height="200px" alt="" />
  </aside>
</template>

<script setup lang="ts">
  import { RouteCommuneName } from '@/router';
</script>

<style scoped>
  .image-aside-ngc {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
