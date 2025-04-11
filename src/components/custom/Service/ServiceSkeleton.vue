<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-py-3w">
    <div class="skeleton-cards fr-col-12 fr-col-md-9">
      <Skeleton width="70%" height="1.75rem" has-margin-bottom class="fr-mt-3w" />

      <Skeleton width="40%" height="1.5rem" has-margin-bottom class="fr-mt-1w" />

      <Skeleton width="100%" height="4rem" class="fr-my-5w" />

      <Skeleton width="20%" height="1.5rem" has-margin-bottom />
      <ServiceSkeletonCartes />
    </div>

    <div class="skeleton-aside fr-col-12 fr-col-md-3 fr-pt-3w">
      <Skeleton height="100%" />
    </div>
  </div>
</template>

<style scoped>
  .skeleton-aside {
    height: 60vh;
  }
</style>

<script setup>
  import ServiceSkeletonCartes from '@/components/custom/Service/ServiceSkeletonCartes.vue';
  import Skeleton from '@/components/custom/Skeleton/Skeleton.vue';
</script>
