<template>
  <div class="background--white border-radius--md shadow fr-grid-row">
    <div class="fr-col-3">
      <Skeleton height="100%" />
    </div>

    <div class="skeleton-card__details fr-col-9 fr-pl-1w fr-grid-row flex-column fr-p-1w">
      <Skeleton width="70%" class="fr-mb-3v" />
      <Skeleton width="35%" class="fr-mb-3v" />
      <Skeleton width="80%" class="fr-mb-3v" />
      <Skeleton width="15%" class="fr-mb-3v" />
    </div>
  </div>
</template>

<script setup>
  import Skeleton from '@/components/custom/Skeleton/Skeleton.vue';
</script>
