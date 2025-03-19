<template>
  <h2 class="fr-h2">{{ prenom }}, dans quel domaine souhaitez-vous agir ?</h2>
</template>

<script setup lang="ts">
  import { utilisateurStore } from '@/store/utilisateur';

  const prenom = utilisateurStore().utilisateur.prenom;
</script>

<style scoped></style>
