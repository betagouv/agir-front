<template>
  <div v-if="isLoading">
    <Skeleton width="250px" has-margin-bottom />

    <div class="kyc-skeleton fr-p-4w background--white fr-p-1w shadow">
      <Skeleton width="300px" has-margin-bottom />
      <Skeleton width="200px" has-margin-bottom />
      <Skeleton width="100px" has-margin-bottom />
      <Skeleton width="300px" />
    </div>
  </div>

  <slot v-else-if="viewModelExiste" />

  <p v-else>Problème de chargement...</p>
</template>

<script setup lang="ts">
  import Skeleton from '@/components/custom/Skeleton/Skeleton.vue';

  defineProps<{ viewModelExiste: boolean; isLoading: boolean }>();
</script>

<style>
  .kyc-skeleton {
    height: 100vh;
  }
</style>
