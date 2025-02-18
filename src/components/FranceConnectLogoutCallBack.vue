<template>Redirection en cours ... veuillez patienter.</template>
<script lang="ts" setup>
  import { onMounted } from 'vue';
  import router, { RouteCommuneName } from '@/router';
  import { utilisateurStore } from '@/store/utilisateur';

  onMounted(async () => {
    utilisateurStore().reset();
    await router.push({ name: RouteCommuneName.ACCUEIL });
  });
</script>
