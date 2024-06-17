<template>
  <ul class="fr-grid-row fr-grid-row--gutters list-style-none fr-m-0 fr-pb-4w">
    <li v-for="thematique in thematiques" :key="thematique.id" class="fr-mb-1w fr-col-6 fr-col-md-4 fr-col-lg-2">
      <ThematiquesCard :univers-id="universId" :thematique="thematique" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import ThematiquesCard from '@/components/custom/Thematiques/ThematiquesCard.vue';
  import { ThematiqueViewModel } from '@/domaines/thematiques/adapters/thematiques.presenter.impl';

  defineProps<{
    thematiques: ThematiqueViewModel[];
    universId: string;
  }>();
</script>
