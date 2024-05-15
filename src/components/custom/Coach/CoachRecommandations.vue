<template>
  <ul class="fr-grid-row fr-grid-row--gutters list-style-none">
    <li v-for="recommandation in recommandations" :key="recommandation.titre" class="fr-col-6 fr-col-md-3">
      <CoachCardRecommandation :recommandation="recommandation" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import CoachCardRecommandation from '@/components/custom/Coach/CoachCardRecommandation.vue';
  import { RecommandationViewModel } from '@/domaines/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.presenter.impl';

  defineProps<{ recommandations: RecommandationViewModel[] }>();
</script>
