<template>
  <h2 class="fr-h2 fr-mb-0">Vos actions</h2>
  <p class="fr-text--xl">
    Gagnez des <img width="16" src="/ic_score.svg" alt="point" /> chaque semaine avec de nouvelles actions !
  </p>
  <p v-if="defis.length === 0">
    Vous n'avez aucune action à réaliser en ce moment. Débloquez-en de nouvelles dans les univers.
  </p>
  <ul v-else class="fr-grid-row fr-grid-row--gutters list-style-none fr-mb-2w">
    <li v-for="defi in defis" :key="defi.titre" class="fr-col-12 fr-col-md-6">
      <ActionCard :defi="defi" />
    </li>
  </ul>
  <router-link :to="{ name: RouteCompteName.DEFIS }" class="fr-link"> Voir toutes mes actions </router-link>
</template>

<script setup lang="ts">
  import ActionCard from '@/components/custom/Action/ActionCard.vue';
  import { DefiDescriptionViewModel } from '@/domaines/defi/adapters/listeDefisDescription.presenter.impl';
  import { RouteCompteName } from '@/router/compte/routeCompteName';

  defineProps<{ defis: DefiDescriptionViewModel[] }>();
</script>
