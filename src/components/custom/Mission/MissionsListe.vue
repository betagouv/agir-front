<template>
  <ul class="fr-grid-row fr-grid-row--gutters list-style-none fr-m-0 fr-pb-2w">
    <li v-for="thematique in missions" :key="thematique.id" class="fr-mb-1w fr-col-6 fr-col-md-4 fr-col-lg-2">
      <MissionCard :mission="thematique" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import MissionCard from '@/components/custom/Mission/MissionCard.vue';
  import { MissionViewModel } from '@/domaines/missions/adapters/missions.presenter.impl';

  defineProps<{
    missions: MissionViewModel[];
  }>();
</script>
