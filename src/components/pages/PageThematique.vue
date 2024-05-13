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

    <div class="before--path">
      <ul class="list-style-none fr-p-0 fr-m-0">
        <li v-for="todo in mission?.kyc" :key="todo.titre" class="fr-mb-2w">
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

    <div>
      <h2 class="text--uppercase fr-mb-0 fr-text--xs text--gris-dark fr-mb-1w fr-ml-8w">ARTICLES ET QUIZ</h2>
      <ul class="list-style-none fr-p-0 fr-m-0">
        <li v-for="todo in mission?.articleEtQuiz" :key="todo.titre" class="fr-mb-2w">
          <CoachCardToDo
            :id-du-contenu="todo.idDuContenu"
            type=""
            :nombre-de-points-a-gagner="todo.points"
            :titre="todo.titre"
            :value="todo.progession.etapeCourante"
            :value-max="todo.progession.etapeTotal"
            :url="todo.url"
            :hash="todo.hash"
            class="before--path before-top--path"
          />
        </li>
      </ul>
    </div>

    <div>
      <h2 class="text--uppercase fr-mb-0 fr-text--xs text--gris-dark fr-mb-1w fr-ml-8w">DEFIS</h2>
      <ul class="list-style-none fr-p-0 fr-m-0">
        <li v-for="todo in mission?.defis" :key="todo.titre" class="fr-mb-2w">
          <CoachCardToDo
            :id-du-contenu="todo.idDuContenu"
            type=""
            :nombre-de-points-a-gagner="todo.points"
            :titre="todo.titre"
            :value="todo.progession.etapeCourante"
            :value-max="todo.progession.etapeTotal"
            :url="todo.url"
            :hash="todo.hash"
            class="before--path before-top--path"
          />
        </li>
      </ul>
      <div class="before-top--path">
        <h2 class="text--uppercase fr-mb-0 fr-text--xs text--gris-dark fr-mb-1w">
          <span class="fr-icon-gift-fill" aria-hidden="true"></span>
          Bonus de fin de mission
        </h2>
      </div>
    </div>
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

<style scoped>
  .before--path {
    position: relative;
  }

  .before-top--path {
    position: relative;
  }

  .before--path::before {
    content: '';
    position: absolute;
    bottom: -19px;
    left: 30px;
    display: block;
    width: 0;
    height: 20px;
    border: 1px dashed var(--text-disabled-grey);
  }

  .before-top--path::before {
    content: '';
    position: absolute;
    top: -22px;
    left: 30px;
    display: block;
    width: 0;
    height: 20px;
    border: 1px dashed var(--text-disabled-grey);
  }
</style>
