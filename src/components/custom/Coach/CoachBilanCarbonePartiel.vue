<template>
  <BilanThematiquesListeCartes
    titre="Affiner mon <span class='text--bleu'>bilan environnemental</span>"
    sous-titre="Pour obtenir des <span class='text--bold'>recommandations</span> et <span class='text--bold'>aides</span> personnalisées"
    :thematiques-bilan="thematiqueBilan"
    colonnes="fr-col-md-2 fr-col-6"
  />
  <p class="background--bleu-info fr-p-2w border border-radius--md width--fit-content border--bleu fr-my-4w">
    ✨ Estimation complète à
    <span class="text--bleu fr-text--bold">{{ pourcentageCompletion }}%</span>
  </p>
  <router-link :to="{ name: RouteBilanCarboneName.BILAN_CARBONE }" class="fr-link">Voir mon bilan</router-link>
</template>

<script setup lang="ts">
  import BilanThematiquesListeCartes from '@/components/custom/BilanCarbone/BilanThematiquesListeCartes.vue';
  import { BilanCarbonePartielViewModel } from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';
  import { RouteBilanCarboneName } from '@/router/bilanCarbone/routes';

  defineProps<{
    pourcentageCompletion: BilanCarbonePartielViewModel['pourcentageCompletionTotal'];
    thematiqueBilan: BilanCarbonePartielViewModel['thematiquesBilan'];
  }>();
</script>
