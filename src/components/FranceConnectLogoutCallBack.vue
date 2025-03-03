<template>Redirection en cours ... veuillez patienter.</template>
<script lang="ts" setup>
  import { onMounted } from 'vue';
  import router, { RouteCommuneName } from '@/router';

  onMounted(async () => {
    await router.push({ name: RouteCommuneName.ACCUEIL });
  });
</script>
