<template>
  <div class="fr-container fr-py-6w">
    <img src="/bg_fin-des-missions.webp" height="200" alt="" />
    <h1 class="fr-mt-2w">Bravo, vous avez terminé la mission "{{ titreMission }}" !</h1>
    <router-link to="" class="fr-btn">Retourner à la liste des missions</router-link>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ titreMission: string }>();
</script>
