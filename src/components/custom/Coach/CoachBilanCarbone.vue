<template>
  <div v-if="bilanCarboneCompletViewModel">
    <h2 class="fr-h2">Votre <span class="text--bleu">bilan environnemental</span> complet</h2>
    <BilanCarboneProgressBar
      :impact-tonne-annuel="bilanCarboneCompletViewModel.nombreDeTonnesAnnuel"
      :pourcentage-progess-bar="bilanCarboneCompletViewModel.pourcentageProgessBar"
      class="fr-col-md-6 fr-mb-4w"
    />
  </div>
  <div v-else-if="bilanCarbonePartielViewModel">
    <h2 class="fr-h2">Estimez votre <span class="text--bleu">bilan environnemental</span></h2>
    <p>
      Et obtenez des <span class="text--bold">recommandations</span> et
      <span class="text--bold">aides</span> personnalisées
    </p>
    <ul class="fr-grid-row fr-grid-row--gutters list-style-none fr-mb-4w">
      <li
        class="fr-col-md-2 fr-col-6"
        v-for="univers in bilanCarbonePartielViewModel?.universBilan"
        :key="univers.contentId"
      >
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
    <p class="fr-mb-0 background--bleu-info fr-p-2w border border-radius--md display-inline-block border--bleu">
      ✨ Estimation complète à
      <span class="text--bleu fr-text--bold">{{ bilanCarbonePartielViewModel?.pourcentageCompletionTotal }}%</span>
    </p>
  </div>
</template>

<script setup lang="ts">
  import BilanCarboneProgressBar from '@/components/custom/BilanCarbone/BilanCarboneProgressBar.vue';
  import BilanUniversCarte from '@/components/custom/BilanCarbone/BilanUniversCarte.vue';
  import {
    BilanCarboneCompletViewModel,
    BilanCarbonePartielViewModel,
  } from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';

  defineProps<{
    bilanCarboneCompletViewModel: BilanCarboneCompletViewModel;
    bilanCarbonePartielViewModel: BilanCarbonePartielViewModel;
  }>();
</script>
