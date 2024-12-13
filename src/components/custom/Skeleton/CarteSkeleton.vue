<template>
  <CarteVierge>
    <Skeleton width="200px" has-margin-bottom class="fr-mx-auto" />
    <Skeleton width="100px" has-margin-bottom class="fr-mx-auto" />
    <Skeleton width="70px" class="fr-mx-auto" />
  </CarteVierge>
</template>

<script setup lang="ts">
  import CarteVierge from '../../CarteVierge.vue';
  import Skeleton from '@/components/custom/Skeleton/Skeleton.vue';
</script>
