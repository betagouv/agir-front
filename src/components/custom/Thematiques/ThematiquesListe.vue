<template>
  <ul class="fr-grid-row fr-grid-row--gutters list-style-none fr-m-0 fr-py-4w">
    <li v-for="thematique in thematiques" :key="thematique.id" class="fr-col-md-2 fr-col-6">
      <ThematiquesCard :thematique="thematique" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import ThematiquesCard from '@/components/custom/Thematiques/ThematiquesCard.vue';
  import { ThematiqueViewModel } from '@/thematiques/adapters/thematiques.presenter.impl';

  defineProps<{
    thematiques: ThematiqueViewModel[];
  }>();
</script>
