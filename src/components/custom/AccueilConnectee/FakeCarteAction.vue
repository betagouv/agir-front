<template>
  <div
    class="fakeCarte background--white shadow fr-p-5v fr-hidden fr-unhidden-lg"
    :style="customStyle"
    aria-hidden="true"
  >
    <p class="fr-mb-1v">{{ label }}</p>
    <div class="flex flex-end">
      <span class="fr-icon-arrow-right-line"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{ label: string; customStyle: Record<string, string> }>();
</script>

<style scoped>
  .fakeCarte {
    font-weight: bold;
    position: absolute;
    display: block;
    width: 20rem;
    z-index: 2;
  }
</style>
