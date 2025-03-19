<template>
  <span class="compteur fr-p-2w border-radius--lg">{{ compte }}</span>
</template>

<script setup lang="ts">
  defineProps<{
    compte: number;
  }>();
</script>

<style>
  .compteur {
    border: 5px solid white;
  }
</style>
