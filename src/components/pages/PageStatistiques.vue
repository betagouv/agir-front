<template>
  <div class="fr-container fr-py-6w">
    <h1>Statistiques d'utilisation de J'agis</h1>
    <div>
      <IframeResizer
        src="https://agir-metabase-prod.osc-secnum-fr1.scalingo.io/public/dashboard/ee7ed49c-eb83-48ce-a548-ff74b6ff99c7"
        title="Statistiques d'utilisation de J'agis"
        allowtransparency
        license="GPLv3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import IframeResizer from '@iframe-resizer/vue/iframe-resizer.vue';
</script>

<style scoped>
  iframe {
    width: 100%;
    height: 100vh;
  }
</style>
