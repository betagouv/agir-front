<template>
  <div class="skeleton-parent background--white fr-p-1w shadow">
    <Skeleton height="55%" has-margin-bottom />
    <Skeleton height="8%" />
    <Skeleton height="8%" width="40%" />
  </div>
</template>

<style scoped>
  .skeleton-parent {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-radius: 6px;
    height: 17rem;
  }
</style>

<script setup>
  import Skeleton from '@/components/custom/Skeleton/Skeleton.vue';
</script>
