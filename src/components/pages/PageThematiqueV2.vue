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

    <section>
      <h2>Mes actions recommandées</h2>
      <div v-if="idEnchainementKycs" class="background--white border fr-p-4w border-radius--md">
        <p>Afin d’obtenir vos actions personnalisées, pouvez-vous nous en dire un peu plus sur vous ?</p>
        <EnchainementQuestionsKyc
          :id-enchainement-kycs="idEnchainementKycs"
          @fin-kyc-atteinte="chargerActionsRecommandeesAvecUnDelai"
        >
          <div>Nous préparons vos recommandations personnalisées...</div>
        </EnchainementQuestionsKyc>
      </div>
      <div v-if="actionsViewModel">
        <CatalogueActionsComposant :catalogue-view-model="actionsViewModel" />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { onBeforeRouteUpdate, useRoute } from 'vue-router';
  import EnchainementQuestionsKyc from '@/components/custom/KYC/EnchainementQuestionsKyc.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import CatalogueActionsComposant from '@/components/pages/CatalogueActionsComposant.vue';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { ActionsDansUneThematiquePresenterImpl } from '@/domaines/actions/adapters/actionsDansUneThematique.presenter.impl';
  import { CatalogueActionsViewModel } from '@/domaines/actions/ports/catalogueActions.presenter';
  import { RecupererActionsPersonnaliseesUsecase } from '@/domaines/actions/recupererActionsPersonnalisees.usecase';
  import { MenuThematiques, Thematique } from '@/domaines/thematiques/MenuThematiques';
  import { utilisateurStore } from '@/store/utilisateur';

  const store = utilisateurStore();
  const isLoading = ref<boolean>(true);
  const thematique = ref<Thematique>(MenuThematiques.getFromUrl(useRoute().params.id as string));

  const idUtilisateur = store.utilisateur.id;
  let thematiqueId = thematique.value.clefTechniqueAPI;
  const actionsViewModel = ref<CatalogueActionsViewModel>();
  const idEnchainementKycs = ref<string>();

  function chargerActionsRecommandeesAvecUnDelai() {
    setTimeout(() => {
      chargerActionsRecommandees();
    }, 500);
  }

  function chargerActionsRecommandees() {
    const chargerActionsRecommandees = new RecupererActionsPersonnaliseesUsecase(new ActionsRepositoryAxios());
    chargerActionsRecommandees.execute(
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

  const lancerChargementDesDonnees = () => {
    isLoading.value = true;

    chargerActionsRecommandees();

    isLoading.value = false;
  };
  onBeforeRouteUpdate((to, from, next) => {
    next();
    thematique.value = MenuThematiques.getFromUrl(to.params.id as string)!;
    thematiqueId = thematique.value.clefTechniqueAPI;
  });

  onMounted(() => {
    lancerChargementDesDonnees();
  });
</script>
