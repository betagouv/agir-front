<template>
  <h2 class="fr-h3" v-html="titre" />
  <p class="fr-text--md" v-html="sousTitre" />
  <ul class="fr-grid-row fr-grid-row--gutters list-style-none">
    <li :class="colonnes" v-for="thematique in thematiquesBilan" :key="thematique.contentId">
      <BilanThematiquesCarte
        :content-id="thematique.contentId"
        :url-image="thematique.urlImage"
        :label="thematique.label"
        :est-termine="thematique.estTermine"
        :nombre-de-questions="thematique.nombreTotalDeQuestion"
        :progression="thematique.pourcentageProgression"
        :thematique="thematique.clefUnivers"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import BilanThematiquesCarte from '@/components/custom/BilanCarbone/BilanThematiquesCarte.vue';
  import { ThematiqueBilanViewModel } from '@/domaines/bilanCarbone/ports/bilanCarbone.presenter';

  defineProps<{
    titre: string;
    sousTitre: string;
    colonnes: string;
    thematiquesBilan: ThematiqueBilanViewModel[];
  }>();
</script>
