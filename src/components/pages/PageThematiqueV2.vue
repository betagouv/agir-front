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

  <section class="fr-py-3w background-color--gris-galet-950-100">
    <div class="fr-container">
      <h2 class="fr-mb-1w">Mes actions recommandées</h2>

      <template v-if="idEnchainementKycs">
        <p class="fr-mb-4w">
          Afin d’obtenir vos actions personnalisées, pouvez-vous nous en dire un peu plus sur vous ?
        </p>

        <div class="background--white fr-px-3w fr-pb-3w fr-pt-2w position--relative">
          <ModaleCommencerParcours v-if="!aCommenceEnchainement" :fermer-modale="fermerModale" />

          <div
            :aria-hidden="aCommenceEnchainement"
            :class="!aCommenceEnchainement && 'effet-flou'"
            class="enchainementKYC fr-mb-2w"
          >
            <EnchainementQuestionsKyc
              :est-desactive="!aCommenceEnchainement"
              :id-enchainement-kycs="idEnchainementKycs"
              @fin-kyc-atteinte="chargerActionsRecommandeesAvecUnDelai"
            >
              <template v-slot:fin>
                <div>Nous préparons vos recommandations personnalisées...</div>
              </template>
            </EnchainementQuestionsKyc>
          </div>
        </div>
      </template>

      <template v-if="actionsViewModel">
        <CatalogueActionsComposant :catalogue-view-model="actionsViewModel" />
      </template>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { onBeforeRouteUpdate, useRoute } from 'vue-router';
  import EnchainementQuestionsKyc from '@/components/custom/KYC/EnchainementQuestionsKyc.vue';
  import ModaleCommencerParcours from '@/components/custom/Thematiques/ModaleCommencerParcours.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import CatalogueActionsComposant from '@/components/pages/CatalogueActionsComposant.vue';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { ActionsDansUneThematiquePresenterImpl } from '@/domaines/actions/adapters/actionsDansUneThematique.presenter.impl';
  import { CatalogueActionsViewModel } from '@/domaines/actions/ports/catalogueActions.presenter';
  import { RecupererActionsPersonnaliseesUsecase } from '@/domaines/actions/recupererActionsPersonnalisees.usecase';
  import { ThematiquesRepositoryAxios } from '@/domaines/thematiques/adapters/thematiques.repository.axios';
  import { ClefThematiqueAPI, MenuThematiques, Thematique } from '@/domaines/thematiques/MenuThematiques';
  import { PersonnalisationThematiqueEffectueeUsecase } from '@/domaines/thematiques/personnalisationThematiqueEffectuee.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const store = utilisateurStore();
  const isLoading = ref<boolean>(true);
  const aCommenceEnchainement = ref<boolean>(false);
  const thematique = ref<Thematique>(MenuThematiques.getFromUrl(useRoute().params.id as string));

  const idUtilisateur = store.utilisateur.id;
  let thematiqueId = thematique.value.clefTechniqueAPI;
  const actionsViewModel = ref<CatalogueActionsViewModel>();
  const idEnchainementKycs = ref<string>();

  function chargerActionsRecommandeesAvecUnDelai() {
    const personnalisationThematiqueEffectueeUsecase = new PersonnalisationThematiqueEffectueeUsecase(
      new ThematiquesRepositoryAxios(),
    );
    personnalisationThematiqueEffectueeUsecase.execute(idUtilisateur, thematiqueId as ClefThematiqueAPI).then(() => {
      setTimeout(() => {
        chargerActionsRecommandees();
      }, 500);
    });
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

  function fermerModale() {
    aCommenceEnchainement.value = true;
  }
</script>

<style scoped>
  .effet-flou {
    filter: blur(3px);
    pointer-events: none;
  }

  .mini-modale {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 30%;
    min-width: 20rem;
    transform: translateX(-50%) translateY(-50%);
    z-index: 10;
  }

  .enchainementKYC {
    transition: 0.5s ease filter;
  }

  .surlignage {
    position: relative;
    display: inline-block;
  }

  .surlignage::before {
    content: '';
    position: absolute;
    top: 70%;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }

  .surlignage-bleu::before {
    background-color: #def2ffc7;
  }
</style>
