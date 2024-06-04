<template>
  <ul class="list-style-none fr-p-0 fr-m-0">
    <li v-for="mission in missions" :key="mission.titre" class="fr-mb-2w">
      <MissionCarteBloquee v-if="mission.estBloquee" :picto-mission="mission.picto" />
      <CoachCardDone
        v-else-if="mission.aEteRealisee"
        :titre="mission.titre"
        :value="mission.progression?.etapeCourante"
        :nombre-points="mission.points"
        :point-a-ete-recolte="mission.pointAEteRecolte"
        :element-id="mission.id"
        :on-recolter-points="onRecolterPoints"
      />
      <CoachCardToDo
        v-else
        :titre="mission.titre"
        :value="mission.progression?.etapeCourante"
        :value-max="mission.progression?.etapeTotal"
        :url="mission.url"
        :hash="mission.hash"
        :picto="mission.picto"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import CoachCardDone from '@/components/custom/Coach/CoachCardDone.vue';
  import CoachCardToDo from '@/components/custom/Coach/CoachCardToDo.vue';
  import MissionCarteBloquee from '@/components/custom/Mission/MissionCarteBloquee.vue';
  import { MissionItemViewModel } from '@/domaines/thematiques/adapters/missionThematique.presenter.impl';
  import { ThematiqueRepositoryAxios } from '@/domaines/thematiques/adapters/thematique.repository.axios';
  import { RecupererPointsMissionThematiqueUsecase } from '@/domaines/thematiques/recupererPointsMissionThematique.usecase';
  import { ThematiqueEventBusImpl } from '@/domaines/thematiques/thematiqueEventBusImpl';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{ missions: MissionItemViewModel[] }>();

  function onRecolterPoints(missionId: string) {
    const utilisateurId: string = utilisateurStore().utilisateur.id;
    new RecupererPointsMissionThematiqueUsecase(
      new ThematiqueRepositoryAxios(),
      ThematiqueEventBusImpl.getInstance(),
    ).execute(utilisateurId, missionId);
  }
</script>
