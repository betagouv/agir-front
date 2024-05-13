<template>
  <ul class="list-style-none fr-p-0 fr-m-0">
    <li v-for="todo in missions" :key="todo.titre" class="fr-mb-2w">
      <CoachCardToDo
        v-if="!todo.aEteRealisee"
        :id-du-contenu="todo.idDuContenu"
        type=""
        :nombre-de-points-a-gagner="todo.points"
        :titre="todo.titre"
        :value="todo.progession.etapeCourante"
        :value-max="todo.progession.etapeTotal"
        :url="todo.url"
        :hash="todo.hash"
      />
      <CoachCardDone
        v-else
        :titre="todo.titre"
        :value="todo.progession.etapeCourante"
        :nombre-points="todo.points"
        :point-a-ete-recolte="false"
        :element-id="todo.id"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import CoachCardDone from '@/components/custom/Coach/CoachCardDone.vue';
  import CoachCardToDo from '@/components/custom/Coach/CoachCardToDo.vue';
  import { MissionItemViewModel } from '@/thematiques/adapters/missionThematique.presenter.impl';

  defineProps<{ missions: MissionItemViewModel[] }>();
</script>
