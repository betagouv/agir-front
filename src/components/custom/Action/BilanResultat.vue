<template>
  <div v-if="bilanThematiqueViewModel" class="fr-p-1w">
    <h2 class="fr-h3" v-text="bilanThematiqueViewModel.titreBilan" />
    <p class="fr-mb-0" v-html="bilanThematiqueViewModel.resume" />
    <ul class="list-style-none full-width fr-py-3w fr-p-0 fr-pr-4w fr-m-0">
      <li v-for="detail in bilanThematiqueViewModel.details" :key="detail.label" class="flex fr-mb-3w">
        <span class="fr-p-1w fr-mr-1w" aria-hidden="true">{{ detail.emoji }}</span>
        <div class="full-width">
          <p class="fr-grid-row fr-grid-row--gutters align-items--center fr-mb-1v flex-space-between text--bold">
            <span>{{ detail.label }}</span>
            <span>{{ detail.impactAnnuelEnKg }} <span class="text--normal">kg</span></span>
          </p>
          <div class="progress-bar background--gris-dark border-radius--md" aria-hidden="true">
            <div class="progress-bar-inner border-radius--md" :style="`--width: ${detail.pourcentage}%`"></div>
          </div>
        </div>
      </li>
    </ul>

    <div class="flex gap--small">
      <router-link :to="{ path: dernierePageStore.path }" class="fr-btn display-block fr-my-0">
        Revenir {{ labelBouton }}
      </router-link>

      <button class="fr-btn fr-btn--secondary" @click="recommencerBilan">Recommencer le bilan</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { ActionsEventBus } from '@/domaines/actions/actions.eventbus';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository';
  import { TerminerActionUsecase } from '@/domaines/actions/terminerAction.usecase';
  import { BilanCarboneRepositoryAxios } from '@/domaines/bilanCarbone/adapters/bilanCarbone.repository.axios';
  import {
    BilanThematiquePresenterImpl,
    BilanThematiqueViewModel,
  } from '@/domaines/bilanCarbone/adapters/bilanThematique.presenter.impl';
  import { RecupererBilanDepuisThematiqueUsecase } from '@/domaines/bilanCarbone/recupererBilanDepuisThematique.usecase';
  import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
  import { RouteActionsName } from '@/router/actions/routes';
  import { RouteThematiquesName } from '@/router/thematiques/routes';
  import { useNavigationStore } from '@/store/navigationStore';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    thematique: ClefThematiqueAPI;
    idAction: string;
  }>();
  const bilanThematiqueViewModel = ref<BilanThematiqueViewModel>();
  const recupererBilanUsecase = new RecupererBilanDepuisThematiqueUsecase(new BilanCarboneRepositoryAxios());
  const actionTermineUsecase = new TerminerActionUsecase(new ActionsRepositoryAxios(), ActionsEventBus.getInstance());

  onMounted(async () => {
    await actionTermineUsecase.execute(utilisateurStore().utilisateur.id, props.idAction, TypeAction.BILAN);

    await recupererBilanUsecase.execute(
      utilisateurStore().utilisateur.id,
      props.thematique,
      new BilanThematiquePresenterImpl(vm => {
        bilanThematiqueViewModel.value = vm;
      }),
    );
  });

  function recommencerBilan() {
    window.location.reload();
  }

  const dernierePageStore = useNavigationStore().pagePrecedente;
  const labelBouton =
    dernierePageStore.name === RouteActionsName.CATALOGUE_ACTION
      ? 'au catalogue'
      : dernierePageStore.name === RouteThematiquesName.THEMATIQUE_V2
        ? 'à la thématique'
        : "à l'accueil";
</script>

<style scoped>
  .progress-bar {
    height: 1rem;
    width: 100%;
  }

  .progress-bar-inner {
    --width: 80%;

    background: #df1351;
    width: var(--width);
    height: 100%;
    border: 2px solid white;
    min-width: 1.5%;
  }
</style>
