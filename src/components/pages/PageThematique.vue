<template>
  <div class="fr-container">
    <FilDAriane
      page-courante="Thématique: à la maison"
      :page-hierarchie="[{ label: 'Univers', url: `univers/${useRoute().params.id}` }]"
    />
    <div class="fr-grid-row align-items--center fr-mb-4w">
      <img
        :src="mission?.urlImage"
        class="border-radius--full img-object-fit-cover fr-mr-2w"
        width="80"
        height="80"
        alt="univers"
      />
      <h1 class="fr-h1 fr-col fr-m-0">{{ mission?.titre }}</h1>
    </div>

    <ul class="list-style-none fr-p-0 fr-m-0">
      <li v-for="todo in mission?.items" :key="todo.titre" class="fr-mb-2w">
        <CoachCardToDo
          :id-du-contenu="todo.idDuContenu"
          type=""
          :nombre-de-points-a-gagner="todo.points"
          :titre="todo.titre"
          :value="todo.progession.etapeCourante"
          :value-max="todo.progession.etapeTotal"
          :url="todo.url"
          :hash="todo.hash"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import CoachCardToDo from '@/components/custom/Coach/CoachCardToDo.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import {
    MissionThematiquePresenterImpl,
    MissionThematiqueViewModel,
  } from '@/thematiques/adapters/missionThematique.presenter.impl';
  import { ThematiqueRepositoryInMemory } from '@/thematiques/adapters/thematique.repository.inmemory';
  import { RecupererMissionThematiqueUsecase } from '@/thematiques/recupererMissionThematiqueUsecase';

  const mission = ref<MissionThematiqueViewModel>();

  const usecase = new RecupererMissionThematiqueUsecase(new ThematiqueRepositoryInMemory());

  function onMissionPretAAffchee(viewModel: MissionThematiqueViewModel) {
    mission.value = viewModel;
  }

  usecase.execute('universId', 'utilisateurId', new MissionThematiquePresenterImpl(onMissionPretAAffchee));
</script>
