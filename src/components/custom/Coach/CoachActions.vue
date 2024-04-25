<template>
  <ul class="fr-grid-row fr-grid-row--gutters list-style-none">
    <li v-for="recommandation in recommandations" :key="recommandation.titre" class="fr-col-12 fr-col-md-6">
      <CoachCardAction :recommandation="recommandation" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import CoachCardAction from '@/components/custom/Coach/CoachCardAction.vue';
  import { RecommandationViewModel } from '@/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.presenter.impl';

  defineProps<{ recommandations: RecommandationViewModel[] }>();
</script>
