<template>
  <div class="fr-container">
    <FilDAriane :page-courante="thematique.labelDansLeMenu" />
    <div class="fr-grid-row align-items--center fr-mb-4w">
      <img
        :src="thematique.imageUrl"
        alt="thématique"
        class="border-radius--full img-object-fit-cover fr-mr-2w"
        height="80"
        width="80"
      />
      <h1 class="fr-h1 fr-col fr-m-0">{{ thematique.labelDansLeMenu }}</h1>
    </div>
  </div>

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
          :thematiqueId="thematiqueId"
          :rafraichir-actions="chargerActionsRecommandees"
          card-classes="fr-col-12 fr-col-md-6 fr-col-xl-4"
        />
        <button class="fr-btn fr-mt-4w fr-btn--icon-left fr-icon-refresh-line" @click="resetParcours">
          Recommencer le parcours
        </button>
      </template>
    </div>
  </section>

  <section class="fr-container fr-my-6w flex flex-column align-items--center">
    <h2>Envie de voir ou de revoir toutes les actions ?</h2>

    <router-link :to="{ name: RouteActionsName.CATALOGUE_ACTION }" class="fr-btn fr-btn--secondary">
      Accéder au catalogue
    </router-link>
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { onBeforeRouteUpdate, useRoute } from 'vue-router';
  import CatalogueActionsRecommandees from '@/components/custom/Action/Catalogue/CatalogueActionsRecommandees.vue';
  import ParcoursKYCPourRecommandations from '@/components/custom/Thematiques/ParcoursKYCPourRecommandations.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { ActionsDansUneThematiquePresenterImpl } from '@/domaines/actions/adapters/actionsDansUneThematique.presenter.impl';
  import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
  import { RecupererActionsPersonnaliseesUsecase } from '@/domaines/actions/recupererActionsPersonnalisees.usecase';
  import { ThematiquesRepositoryAxios } from '@/domaines/thematiques/adapters/thematiques.repository.axios';
  import { ClefThematiqueAPI, MenuThematiques, Thematique } from '@/domaines/thematiques/MenuThematiques';
  import { PersonnalisationThematiqueEffectueeUsecase } from '@/domaines/thematiques/personnalisationThematiqueEffectuee.usecase';
  import { ResetPersonnalisationUsecase } from '@/domaines/thematiques/resetPersonnalisation.usecase';
  import { RouteActionsName } from '@/router/actions/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const thematique = ref<Thematique>(MenuThematiques.getFromUrl(useRoute().params.id as string));
  const actionsViewModel = ref<ActionViewModel[]>();
  const idEnchainementKycs = ref<string>();
  const isLoading = ref<boolean>(true);

  const store = utilisateurStore();
  const idUtilisateur = store.utilisateur.id;
  let thematiqueId = thematique.value.clefTechniqueAPI;

  const chargerActionsRecommandeesUsecase = new RecupererActionsPersonnaliseesUsecase(new ActionsRepositoryAxios());

  onBeforeRouteUpdate((to, from, next) => {
    next();
    thematique.value = MenuThematiques.getFromUrl(to.params.id as string)!;
    thematiqueId = thematique.value.clefTechniqueAPI;
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
    );
  }

  async function chargerActionsRecommandeesAvecUnDelai() {
    const personnalisationThematiqueEffectueeUsecase = new PersonnalisationThematiqueEffectueeUsecase(
      new ThematiquesRepositoryAxios(),
    );

    personnalisationThematiqueEffectueeUsecase.execute(idUtilisateur, thematiqueId as ClefThematiqueAPI).then(() => {
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
