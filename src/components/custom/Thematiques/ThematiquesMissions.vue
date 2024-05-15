<template>
  <ul class="list-style-none fr-p-0 fr-m-0">
    <li v-for="mission in missions" :key="mission.titre" class="fr-mb-2w">
      <CoachCardToDo
        v-if="!mission.aEteRealisee"
        :titre="mission.titre"
        :value="mission.progession.etapeCourante"
        :value-max="mission.progession.etapeTotal"
        :url="mission.url"
        :hash="mission.hash"
      />
      <CoachCardDone
        v-else
        :titre="mission.titre"
        :value="mission.progession.etapeCourante"
        :nombre-points="mission.points"
        :point-a-ete-recolte="false"
        :element-id="mission.id"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import CoachCardDone from '@/components/custom/Coach/CoachCardDone.vue';
  import CoachCardToDo from '@/components/custom/Coach/CoachCardToDo.vue';
  import { MissionItemViewModel } from '@/domaines/thematiques/adapters/missionThematique.presenter.impl';

  defineProps<{ missions: MissionItemViewModel[] }>();
</script>
