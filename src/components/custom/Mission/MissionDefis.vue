<template>
  <ul class="fr-grid fr-grid-row fr-grid-row--gutters list-style-none">
    <li v-for="defi in defis" :key="defi.id" class="fr-col-4">
      <MissionCarteBloquee v-if="defi.estBloquee" :picto-mission="defi.picto" />
      <MissionCarteDefi v-else :defi="defi" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import MissionCarteBloquee from '@/components/custom/Mission/MissionCarteBloquee.vue';
  import MissionCarteDefi from '@/components/custom/Mission/MissionCarteDefi.vue';
  import { MissionDefiViewModel } from '@/domaines/missions/adapters/mission.presenter.impl';

  defineProps<{ defis: MissionDefiViewModel[] }>();
</script>
