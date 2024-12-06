<template>
  <div class="skeleton-card background--white border-radius--md shadow fr-p-1w fr-grid-row">
    <Skeleton height="100%" class="fr-col-3" />

    <div class="skeleton-card__details fr-col-9 position--relative fr-pl-1w fr-grid-row flex-column flex-space-between">
      <Skeleton width="60%" />
      <Skeleton width="35%" />
      <Skeleton width="75%" />
      <Skeleton width="20%" />
    </div>
  </div>
</template>

<style scoped>
  .skeleton-card {
    height: 10rem;
  }
</style>
<script setup>
  import Skeleton from '@/components/custom/Skeleton/Skeleton.vue';
</script>
