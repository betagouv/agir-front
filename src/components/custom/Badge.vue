<template>
  <span class="fr-text--xs text--black-light fr-py-1v fr-px-2v">{{ label }}</span>
</template>

<script setup lang="ts">
  defineProps<{
    label: string;
  }>();
</script>

<style scoped>
  span {
    border-radius: 12px;
    background-color: var(--grey-950-100);
  }
</style>
