<template>
  <div class="skeleton-card background--white border-radius--md shadow fr-p-1w fr-grid-row">
    <Skeleton height="7rem" has-margin-bottom />

    <div class="skeleton-card__details fr-col-9 position--relative fr-pl-1w fr-grid-row flex-column flex-space-between">
      <Skeleton width="35%" has-margin-bottom />
      <Skeleton width="60%" has-margin-bottom />
      <Skeleton width="75%" has-margin-bottom />
    </div>
  </div>
</template>

<style scoped>
  .skeleton-card {
    height: 16rem;
  }
</style>
<script setup>
  import Skeleton from '@/components/custom/Skeleton/Skeleton.vue';
</script>
