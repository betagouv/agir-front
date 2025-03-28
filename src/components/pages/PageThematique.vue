<template>
  <ThematiqueResume
    v-if="thematiqueResumeViewModel"
    :thematique="thematique"
    :thematiqueResume="thematiqueResumeViewModel"
  />

  <section class="fr-py-4w background-color--gris-galet-950-100">
    <div class="fr-container">
      <h2 class="fr-mb-1w">Mes actions recommandées</h2>

      <div v-if="isLoading" class="placeholder"></div>

      <template v-else-if="idEnchainementKycs">
        <p class="fr-mb-4w">
          Afin d’obtenir vos actions personnalisées, pouvez-vous nous en dire un peu plus sur vous ?
        </p>

        <ParcoursKYCPourRecommandations
          :id-enchainement-kycs="idEnchainementKycs"
          :on-fin-k-y-c="chargerActionsRecommandeesAvecUnDelai"
        />
      </template>

      <template v-else-if="actionsViewModel">
        <CatalogueActionsRecommandees
          :actions="actionsViewModel"
          :rafraichir-actions="chargerActionsRecommandees"
          :reset-parcours="resetParcours"
          :thematiqueId="thematiqueId"
          card-classes="fr-col-12 fr-col-md-6 fr-col-xl-4"
        />
      </template>
    </div>
  </section>

  <div class="fr-container">
    <div v-if="thematique.clefTechniqueAPI === ClefThematiqueAPI.alimentation" class="fr-mt-4w">
      <WidgetServiceRecettes parametre-de-recherche="saison">
        <template #titre>
          <h2 class="fr-h3">Manger sainement et de saison</h2>
        </template>
      </WidgetServiceRecettes>

      <div class="fr-grid-row fr-my-6w">
        <WidgetServiceFruitsEtLegumes class="fr-col-12 fr-col-md-6 fr-pr-md-3w fr-text--sm" />

        <WidgetServicePresDeChezNous class="fr-col-12 fr-col-md-6 fr-pl-md-3w" />
      </div>
    </div>

    <WidgetAides :clef-thematique="thematiqueId as ClefThematiqueAPI" :nombre-aides-max="4" class="fr-my-4w" />

    <section class="fr-mt-8w fr-mb-12w flex flex-column align-items--center">
      <img src="/jumelle.svg" alt="" class="fr-mt-6w fr-mb-2w" />

      <h2 class="fr-h3">Envie de voir ou de revoir toutes les actions ?</h2>

      <router-link :to="{ name: RouteActionsName.CATALOGUE_ACTION }" class="fr-btn fr-btn--secondary">
        Accéder au catalogue
      </router-link>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { onBeforeRouteUpdate, useRoute } from 'vue-router';
  import CatalogueActionsRecommandees from '@/components/custom/Action/Catalogue/CatalogueActionsRecommandees.vue';
  import WidgetAides from '@/components/custom/Aides/WidgetAides.vue';
  import ParcoursKYCPourRecommandations from '@/components/custom/Thematiques/ParcoursKYCPourRecommandations.vue';
  import ThematiqueResume from '@/components/custom/Thematiques/ThematiqueResume.vue';
  import WidgetServiceFruitsEtLegumes from '@/components/pages/PagesService/components/WidgetServiceFruitsEtLegumes.vue';
  import WidgetServicePresDeChezNous from '@/components/pages/PagesService/components/WidgetServicePresDeChezNous.vue';
  import WidgetServiceRecettes from '@/components/pages/PagesService/components/WidgetServiceRecettes.vue';
  import { ActionsEventBus } from '@/domaines/actions/actions.eventbus';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { ActionsDansUneThematiquePresenterImpl } from '@/domaines/actions/adapters/actionsDansUneThematique.presenter.impl';
  import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
  import { RecupererDetailThematiqueUsecase } from '@/domaines/actions/recupererDetailThematique.usecase';
  import { ThematiqueResumePresenterImpl } from '@/domaines/thematiques/adapters/thematiqueResume.presenter.impl';
  import { ThematiquesRepositoryAxios } from '@/domaines/thematiques/adapters/thematiques.repository.axios';
  import { ClefThematiqueAPI, MenuThematiques, Thematique } from '@/domaines/thematiques/MenuThematiques';
  import { PersonnalisationThematiqueEffectueeUsecase } from '@/domaines/thematiques/personnalisationThematiqueEffectuee.usecase';
  import { ThematiqueResumeViewModel } from '@/domaines/thematiques/ports/thematiqueResume.presenter';
  import { ResetPersonnalisationUsecase } from '@/domaines/thematiques/resetPersonnalisation.usecase';
  import { RouteActionsName } from '@/router/actions/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const thematique = ref<Thematique>(MenuThematiques.getFromUrl(useRoute().params.id as string));
  const actionsViewModel = ref<ActionViewModel[]>();
  const thematiqueResumeViewModel = ref<ThematiqueResumeViewModel>();
  const idEnchainementKycs = ref<string>();
  const isLoading = ref<boolean>(true);

  const store = utilisateurStore();
  const idUtilisateur = store.utilisateur.id;
  let thematiqueId = thematique.value.clefTechniqueAPI;

  const chargerActionsRecommandeesUsecase = new RecupererDetailThematiqueUsecase(new ActionsRepositoryAxios());

  onBeforeRouteUpdate(async (to, from, next) => {
    next();
    thematique.value = MenuThematiques.getFromUrl(to.params.id as string)!;
    thematiqueId = thematique.value.clefTechniqueAPI;

    isLoading.value = true;
    await chargerActionsRecommandees();
    isLoading.value = false;
  });

  onMounted(async () => {
    isLoading.value = true;
    await chargerActionsRecommandees();
    isLoading.value = false;
  });

  async function chargerActionsRecommandees() {
    await chargerActionsRecommandeesUsecase.execute(
      idUtilisateur,
      thematiqueId,
      new ActionsDansUneThematiquePresenterImpl(
        vm => {
          actionsViewModel.value = vm;
          idEnchainementKycs.value = undefined;
        },
        (id: string) => {
          idEnchainementKycs.value = id;
        },
      ),
      new ThematiqueResumePresenterImpl(vm => (thematiqueResumeViewModel.value = vm)),
    );
  }

  async function chargerActionsRecommandeesAvecUnDelai() {
    const personnalisationThematiqueEffectueeUsecase = new PersonnalisationThematiqueEffectueeUsecase(
      new ThematiquesRepositoryAxios(),
    );

    personnalisationThematiqueEffectueeUsecase
      .execute(idUtilisateur, thematiqueId as ClefThematiqueAPI, ActionsEventBus.getInstance())
      .then(() => {
        setTimeout(async () => {
          await chargerActionsRecommandees();
        }, 2000);
      });
  }

  async function resetParcours() {
    const resetPersonnalisationUsecase = new ResetPersonnalisationUsecase(new ThematiquesRepositoryAxios());
    await resetPersonnalisationUsecase.execute(idUtilisateur, thematiqueId as ClefThematiqueAPI);
    await chargerActionsRecommandees();
  }
</script>

<style scoped>
  .placeholder {
    min-height: 20rem;
  }
</style>
