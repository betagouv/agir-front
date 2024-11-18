<template>
  <section class="fr-py-6w">
    <button
      class="fr-mb-2w fr-btn fr-btn--icon-left fr-btn--tertiary-no-outline fr-icon-arrow-left-line"
      @click="onClickRetour"
    >
      Retour
    </button>
    Etape {{ nombreEtapesMission }} sur {{ nombreEtapesMission }}
    <h1 class="fr-h2">Sélectionnez un défi</h1>
    <ul class="fr-grid fr-grid-row fr-grid-row--gutters list-style-none">
      <li v-for="defi in defis" :key="defi.id" class="fr-col-4">
        <MissionCarteDefi :defi="defi" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
  import MissionCarteDefi from '@/components/custom/Mission/MissionCarteDefi.vue';
  import { MissionDefiViewModel } from '@/domaines/missions/adapters/mission.presenter.impl';

  defineProps<{ defis: MissionDefiViewModel[]; onClickRetour: () => void; nombreEtapesMission: number }>();
</script>
