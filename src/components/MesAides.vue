<template>
  <FilDAriane
    page-courante="Mes aides"
    :page-hierarchie="[{ label: 'Coach', url: 'coach' }]"
  />
  <h1 class="fr-h2">Vos aides personnalisées</h1>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-lg-8">
      <InteractionCard
        v-for="aide in aides" :key="aide.id"
        class="fr-mb-2w"
        :interaction-view-model="aide"
      />
    </div>
    <div class="fr-col-12 fr-col-lg-4">
      <BilanNosGestesClimat :get-impact-value="valeurBilanCarbone" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import FilDAriane from "@/components/dsfr/FilDAriane.vue";
  import InteractionCard from "@/components/custom/InteractionCard.vue";
  import BilanNosGestesClimat from "@/components/BilanNosGestesClimat.vue";
  import { InteractionViewModel } from "@/interactions/adapters/interactions.presenter.impl";
  import { EmpreinteViewModel } from "@/bilan/adapters/chargementEmpreinte.presenter.impl";

  defineProps<{
    aides: InteractionViewModel[]
    valeurBilanCarbone: EmpreinteViewModel
  }>();  
</script>
