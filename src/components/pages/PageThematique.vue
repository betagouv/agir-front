<template>
  <div class="fr-container">
    <FilDAriane
      page-courante="Thématique: thématique courant"
      :page-hierarchie="[{ label: 'Univers courant', url: '#' }]"
    />
    <h1>Page thématique</h1>
  </div>
</template>

<script setup lang="ts">
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
</script>
