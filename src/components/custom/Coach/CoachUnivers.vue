<template>
  <h2 class="fr-text--lg text--normal fr-mb-2w">
    Choisissez un univers pour réduire votre empreinte environnementale&nbsp;:
  </h2>
  <ul class="fr-grid-row fr-grid-row--gutters list-style-none">
    <li class="fr-col-md-2 fr-col-6" v-for="univers in universViewModel" :key="univers.id">
      <UniversCarte :univers-view-model="univers" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import UniversCarte from '@/components/custom/Univers/UniversCarte.vue';
  import { UniversViewModel } from '@/domaines/univers/adapters/listeUnivers.presenter.impl';

  defineProps<{ universViewModel: UniversViewModel[] }>();
</script>
