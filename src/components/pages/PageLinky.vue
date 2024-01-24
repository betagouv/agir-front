<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane
      page-courante="Ma consommation électrique"
      :page-hierarchie="[{ label: 'Services', url: 'agir/services' }]"
    />
    <h1 class="fr-h2">Ma consommation électrique</h1>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-md-9 fr-col-12">
        <LinkyGraphique />
      </div>
      <div class="fr-col-md-3 fr-col-12">
        <LinkyAside />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import LinkyGraphique from '@/components/custom/Linky/LinkyGraphique.vue';
  import LinkyAside from '@/components/custom/Linky/LinkyAside.vue';
</script>
