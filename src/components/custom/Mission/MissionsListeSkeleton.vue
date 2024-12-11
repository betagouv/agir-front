<template>
  <ul class="fr-grid-row fr-grid-row--gutters list-style-none fr-m-0 fr-pb-2w">
    <li v-for="n in 6" :key="n" class="fr-mb-1w fr-col-6 fr-col-md-4 fr-col-lg-2">
      <MissionCarteSkeleton class="fr-mb-3w" />
    </li>
  </ul>
</template>

<script setup>
  import MissionCarteSkeleton from '@/components/custom/Mission/MissionCardSkeleton.vue';
</script>
