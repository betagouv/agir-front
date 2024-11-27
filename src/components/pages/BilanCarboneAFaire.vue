<template>
  <section class="fr-py-2w">
    <h1>Mon bilan environnemental</h1>
    <BilanThematiquesListeCartes
      :thematiques-bilan="thematiques"
      colonnes="fr-col-md-2 fr-col-6"
      sous-titre="Pour obtenir des <span class='text--bold'>recommandations</span> et <span class='text--bold'>aides</span> personnalisées"
      titre="Affiner mon <span class='text--bleu'>bilan environnemental</span>"
    />
    <p class="background--bleu-info fr-p-2w border border-radius--md width--fit-content border--bleu fr-my-4w">
      ✨ Estimation complète à
      <span class="text--bleu fr-text--bold">{{ pourcentageCompletionTotal }}%</span>
    </p>
  </section>
</template>

<script lang="ts" setup>
  import BilanThematiquesListeCartes from '@/components/custom/BilanCarbone/BilanThematiquesListeCartes.vue';
  import { ThematiquesBilan } from '@/domaines/bilanCarbone/ports/bilanCarbone.presenter';

  defineProps<{ thematiques: ThematiquesBilan[]; pourcentageCompletionTotal: number }>();
</script>
