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
      <h2>Mes actions recommandées</h2>
      <template v-if="idEnchainementKycs">
        <p>Afin d’obtenir vos actions personnalisées, pouvez-vous nous en dire un peu plus sur vous ?</p>
        <div class="background--white fr-p-3w position--relative">
          <div v-if="!aCommenceEnchainement" class="mini-modale background--white fr-p-3w shadow">
            <p class="text--bold fr-mb-1w fr-text--lg">Envie d'avoir un vrai impact ?</p>
            <p class="fr-mb-2w">
              Laissez-vous guider par nos recommandations d’actions <span>choisies pour vous</span> !
            </p>
            <button class="fr-btn" @click="fermerModale">Commencer</button>
          </div>

          <div :class="!aCommenceEnchainement && 'effet-flou'" :aria-hidden="aCommenceEnchainement">
            <EnchainementQuestionsKyc
              :id-enchainement-kycs="idEnchainementKycs"
              @fin-kyc-atteinte="chargerActionsRecommandeesAvecUnDelai"
              :est-desactive="!aCommenceEnchainement"
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
  const aCommenceEnchainement = ref<boolean>(false);
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

  function fermerModale() {
    aCommenceEnchainement.value = true;
  }
</script>

<style scoped>
  .effet-flou {
    filter: blur(2px);
    pointer-events: none;
  }

  .mini-modale {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 30%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 10;
  }
</style>
