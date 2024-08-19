<template>
  <ul class="list-style-none fr-p-0 fr-m-0">
    <li v-for="mission in missions" :key="mission.titre" class="fr-mb-2w">
      <MissionCarteBloquee v-if="mission.estBloquee" :picto-mission="mission.picto" />
      <MissionCarteDone v-else-if="mission.aEteRealisee" :mission="mission" />
      <MissionCarteKyc v-else :mission="mission" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import MissionCarteBloquee from '@/components/custom/Mission/MissionCarteBloquee.vue';
  import MissionCarteDone from '@/components/custom/Mission/MissionCarteDone.vue';
  import MissionCarteKyc from '@/components/custom/Mission/MissionCarteKyc.vue';
  import { MissionKycViewModel } from '@/domaines/thematiques/adapters/missionThematique.presenter.impl';

  defineProps<{ missions: MissionKycViewModel[] }>();
</script>
