<template>
  <CarteVierge>
    <h3 class="fr-h6 fr-mb-0">Votre score</h3>
    <p class="fr-grid-row fr-grid-row--middle fr-m-0 fr-text--xs"><img src="/leaf.svg" alt="" class="fr-mr-1w" /> {{ scoreValue }} points</p>
    <h3 class="fr-h6 fr-mb-0 fr-mt-2w">Badges obtenus</h3>
    <ul class="list-style-none fr-m-0 fr-p-0">
      <li v-for="badge in badgeViewModel" :key="badge.titre">
        <p class="fr-grid-row fr-grid-row--middle fr-m-0 fr-text--xs"><img src="/award.svg" alt="Badge :" class="fr-mr-1w" /> {{ badge.titre }}</p>
      </li>
    </ul>
  </CarteVierge>
</template>

<script setup lang="ts">
  import { BadgeViewModel } from "@/score/ports/chargementScorePresenter";
  import CarteVierge from "@/components/CarteVierge.vue";

  interface MesResultatsProps {
    badgeViewModel?: BadgeViewModel[]
    scoreValue: number
  }

  withDefaults(defineProps<MesResultatsProps>(), {
    scoreValue: 0
  })
</script>
