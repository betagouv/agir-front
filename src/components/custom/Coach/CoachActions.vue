<template>
  <h2 class="fr-h2 fr-mb-0">Mes Actions</h2>
  <p class="fr-text--xl">
    Gagnez des <img width="16" src="/ic_score.svg" alt="point" /> chaque semaine avec de nouvelles actions !
  </p>
  <ul class="fr-grid-row fr-grid-row--gutters list-style-none fr-mb-2w">
    <li v-for="recommandation in recommandations" :key="recommandation.titre" class="fr-col-12 fr-col-md-6">
      <CoachCardAction :recommandation="recommandation" />
    </li>
  </ul>
  <router-link :to="{ name: RouteCompteName.DEFIS }" class="fr-link"> Voir toutes mes actions </router-link>
</template>

<script setup lang="ts">
  import CoachCardAction from '@/components/custom/Coach/CoachCardAction.vue';
  import { RecommandationViewModel } from '@/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.presenter.impl';
  import { RouteCompteName } from '@/router/compte/routeCompteName';

  defineProps<{ recommandations: RecommandationViewModel[] }>();
</script>
