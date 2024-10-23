<template>
  <h2 class="fr-h2">Affiner mon <span class="text--bleu">bilan environnemental</span></h2>
  <p>
    Pour obtenir des <span class="text--bold">recommandations</span> et
    <span class="text--bold">aides</span> personnalisées
  </p>
  <ul class="fr-grid-row fr-grid-row--gutters list-style-none fr-mb-2w">
    <li class="fr-col-md-2 fr-col-6" v-for="univers in universBilan" :key="univers.contentId">
      <BilanUniversCarte
        :content-id="univers.contentId"
        :url-image="univers.urlImage"
        :label="univers.label"
        :est-termine="univers.estTermine"
        :nombre-de-questions="univers.nombreTotalDeQuestion"
        :progression="univers.pourcentageProgression"
        :univers="univers.nomDeLunivers"
      />
    </li>
  </ul>
  <p class="background--bleu-info fr-p-2w border border-radius--md width--fit-content border--bleu">
    ✨ Estimation complète à
    <span class="text--bleu fr-text--bold">{{ pourcentageCompletion }}%</span>
  </p>
  <router-link :to="{ name: RouteBilanCarboneName.BILAN_CARBONE }" class="fr-link">Voir mon bilan</router-link>
</template>

<script setup lang="ts">
  import BilanUniversCarte from '@/components/custom/BilanCarbone/BilanUniversCarte.vue';
  import { BilanCarbonePartielViewModel } from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';
  import { RouteBilanCarboneName } from '@/router/bilanCarbone/routes';

  defineProps<{
    pourcentageCompletion: BilanCarbonePartielViewModel['pourcentageCompletionTotal'];
    universBilan: BilanCarbonePartielViewModel['thematiquesBilan'];
  }>();
</script>
