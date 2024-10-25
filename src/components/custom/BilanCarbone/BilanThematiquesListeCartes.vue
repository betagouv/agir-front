<template>
  <h2 v-html="titre" class="fr-h3" />
  <p class="fr-text--md" v-html="sousTitre" />

  <ul class="fr-grid-row fr-grid-row--gutters list-style-none">
    <li class="fr-col-md-3 fr-col-6" v-for="thematique in thematiquesBilan" :key="thematique.contentId">
      <BilanThematiquesCarte
        :content-id="thematique.contentId"
        :url-image="thematique.urlImage"
        :label="thematique.label"
        :est-termine="thematique.estTermine"
        :nombre-de-questions="thematique.nombreTotalDeQuestion"
        :progression="thematique.pourcentageProgression"
        :univers="thematique.clefUnivers"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import BilanThematiquesCarte from '@/components/custom/BilanCarbone/BilanThematiquesCarte.vue';
  import { ThematiquesBilan } from '@/domaines/bilanCarbone/ports/bilanCarbone.presenter';

  defineProps<{
    titre: string;
    sousTitre: string;
    thematiquesBilan: ThematiquesBilan[];
  }>();
</script>
