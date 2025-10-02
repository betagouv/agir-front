<template>
  <div class="fr-p-6v">
    <Skeleton width="200px" has-margin-bottom class="fr-mx-auto" />
    <Skeleton width="100px" has-margin-bottom class="fr-mx-auto" />
    <Skeleton width="70px" class="fr-mx-auto" />
  </div>
</template>

<script setup lang="ts">
  import Skeleton from '@/components/custom/Skeleton/Skeleton.vue';
</script>

<style scoped>
  div {
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.19);
  }
</style>
