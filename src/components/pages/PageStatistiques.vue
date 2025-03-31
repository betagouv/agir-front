<template>
  <div class="fr-container fr-py-6w">
    <h1>Statistiques d'utilisation de J'agis</h1>
    <div>
      <IframeResizer
        allowtransparency
        license="GPLv3"
        src="https://agir-metabase-prod.osc-secnum-fr1.scalingo.io/public/dashboard/365a0702-4f9d-45b7-b8f5-7a07a4d48e16"
        title="Statistiques d'utilisation de J'agis"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import IframeResizer from '@iframe-resizer/vue/iframe-resizer.vue';
</script>

<style scoped>
  iframe {
    width: 100%;
    height: 100vh;
  }
</style>
