<template>
  <div class="fr-container fr-py-14w">
    <h2>Agir à <span class="fr-icon-map-pin-2-fill"></span>{{ commune }}</h2>
    <p>D’après nos calculs, voici ce que nous pouvons vous proposer :</p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ commune?: string }>();
</script>

<style scoped>
  .fr-icon-map-pin-2-fill {
    color: #9d9c88;
  }
</style>
