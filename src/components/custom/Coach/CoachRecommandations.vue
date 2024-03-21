<template>
  <h2 class="fr-h2 fr-mb-0">Recommandé pour vous</h2>
  <p class="fr-text--xl">En fonction de qui vous êtes et où vous en êtes</p>
  <ul class="fr-grid-row fr-grid-row--gutters list-style-none">
    <li
      v-for="recommandation in recommandations.recommandationsList"
      :key="recommandation.titre"
      class="fr-col-12 fr-col-md-6"
    >
      <CoachCardRecommandation :recommandation="recommandation" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import CoachCardRecommandation from '@/components/custom/Coach/CoachCardRecommandation.vue';

  import { RecommandationPersonnaliseeViewModel } from '@/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.presenter.impl';

  defineProps<{ recommandations: RecommandationPersonnaliseeViewModel }>();
</script>
