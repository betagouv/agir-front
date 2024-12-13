<template>
  <ul class="fr-grid-row fr-grid-row--gutters fr-mb-2w list-style-none">
    <li v-for="n in 6" :key="n" class="fr-col-12 fr-col-md-6">
      <ServiceSkeletonCarte />
    </li>
  </ul>
</template>

<script setup>
  import ServiceSkeletonCarte from '@/components/custom/Service/ServiceSkeletonCarte.vue';
</script>
