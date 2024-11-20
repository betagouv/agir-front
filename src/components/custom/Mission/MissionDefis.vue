<template>
  <section class="fr-py-6w">
    <MissionNavigation
      :on-click-revenir-etape-precedente="onClickRetour"
      :etape-actuelle="nombreEtapesMission"
      :etape-totale="nombreEtapesMission"
    />
    <h1 class="fr-h2">Sélectionnez un défi</h1>
    <ul class="fr-grid fr-grid-row fr-grid-row--gutters list-style-none fr-mb-3w">
      <li v-for="defi in defis" :key="defi.id" class="fr-col-4">
        <MissionCarteDefi :defi="defi" />
      </li>
    </ul>
    <button v-if="afficherTerminerMission" @click="onClickFinDefis" class="fr-btn fr-btn--lg">Continuer</button>
  </section>
</template>

<script setup lang="ts">
  import MissionCarteDefi from '@/components/custom/Mission/MissionCarteDefi.vue';
  import MissionNavigation from '@/components/custom/Mission/MissionNavigation.vue';
  import { MissionDefiViewModel } from '@/domaines/missions/adapters/mission.presenter.impl';

  defineProps<{
    defis: MissionDefiViewModel[];
    onClickFinDefis: () => void;
    onClickRetour: () => void;
    nombreEtapesMission: number;
    afficherTerminerMission: boolean;
  }>();
</script>
