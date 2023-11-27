<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane page-courante="Faire le suivi du jour" :page-hierarchie="[{ label: 'Coach', url: 'coach' }]" />
    <SuiviDuJour />
  </div>
</template>

<script setup lang="ts">
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import SuiviDuJour from '@/components/SuiviDuJour.vue';
</script>
