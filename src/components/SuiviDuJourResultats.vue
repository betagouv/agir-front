<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-mb-2w" v-if="!voirSeulementLevolution">
    <div class="fr-col-12 fr-col-md-6">
      <CarteEmpreinteDuJour :suivi-du-jour-resultats="suiviDuJourResultats!" />
    </div>
    <div class="fr-col-12 fr-col-md-6">
      <EmpreinteDuJourDetails :suivi-du-jour-resultats="suiviDuJourResultats!" />
    </div>
  </div>
  <GraphSuiviEmpreinteCarbone
    :dates-du-graph="suiviDuJourResultats!.suivisPrecedent.datesDesSuivis"
    :valeurs-carbone-du-graph="suiviDuJourResultats!.suivisPrecedent.valeursDesSuivis"
    :moyenne-des-suivis="suiviDuJourResultats!.suivisPrecedent.moyenneDesSuivis"
  />
</template>

<script setup lang="ts">
  import CarteEmpreinteDuJour from '@/components/CarteEmpreinteDuJour.vue';
  import EmpreinteDuJourDetails from '@/components/EmpreinteDuJourDetails.vue';
  import { SuiviDuJourResultatsViewModel } from '@/suivi/adapters/suiviDuJour.presenter.impl';
  import GraphSuiviEmpreinteCarbone from '@/components/GraphSuiviEmpreinteCarbone.vue';

  interface Props {
    suiviDuJourResultats?: SuiviDuJourResultatsViewModel | null;
    voirSeulementLevolution: boolean;
  }

  withDefaults(defineProps<Props>(), {
    suiviDuJourResultats: null,
    voirSeulementLevolution: false,
  });
</script>
