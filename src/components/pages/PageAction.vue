<template>
  <div class="fr-container fr-mt-3w">
    <router-link
      :to="{ name: RouteActionsName.CATALOGUE_ACTION }"
      class="fr-btn fr-btn--icon-left fr-btn--tertiary-no-outline fr-icon-arrow-left-line fr-pl-0"
    >
      Retour
    </router-link>

    <CarteSkeleton v-if="isLoading" />
    <div v-else-if="actionClassiqueViewModel" class="action fr-my-1w">
      <h1 class="action__titre text--normal" v-html="actionClassiqueViewModel.titre" />
      <p v-if="actionClassiqueViewModel.sousTitre" class="fr-text--lg" v-html="actionClassiqueViewModel.sousTitre" />

      <section class="background--white border-radius--md fr-p-2w fr-mb-3w shadow">
        <section
          v-if="actionClassiqueViewModel.corps.introduction"
          class="action__corps-introduction fr-p-3w border-radius--md fr-mb-3w"
          v-html="actionClassiqueViewModel.corps.introduction"
        />

        <section class="fr-mt-2w fr-mb-4w fr-mx-3w">
          <div v-for="service in actionClassiqueViewModel.services" :key="service.type">
            <WidgetServiceRecettes
              v-if="service.type === 'recettes'"
              :parametre-de-recherche="service.parametreDuService"
            />

            <WidgetServiceLongueVieAuxObjets
              v-if="service.type === 'longue_vie_objets'"
              :commune="actionClassiqueViewModel.commune"
              :parametre-de-recherche="service.parametreDuService"
            />
          </div>
        </section>

        <section
          v-if="actionClassiqueViewModel.corps.astuces"
          class="action__corps-astuces fr-p-3w border-radius--md"
          v-html="actionClassiqueViewModel.corps.astuces"
        />
      </section>

      <section v-if="actionClassiqueViewModel.recommandations.length > 0" class="fr-p-2w">
        <h2>Pour aller <span class="text--bold">plus loin</span></h2>
        <div class="fr-grid-row fr-grid-row--gutters">
          <div
            v-for="article in actionClassiqueViewModel.recommandations"
            :key="article.titre"
            class="fr-col-12 fr-col-md-6 fr-col-lg-4"
          >
            <router-link
              :to="{ path: article.url }"
              class="display-block background--white shadow border-radius--md fr-p-1w full-height background--none"
            >
              <img
                :src="article.image"
                alt=""
                class="action__recommandations-img full-width fr-mb-1w border-radius--md"
              />
              <p class="text--semi-bold" v-html="article.titre" />
            </router-link>
          </div>
        </div>
      </section>
    </div>
    <div v-else>
      Une erreur est survenue
      <!--     TODO -->
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import CarteSkeleton from '@/components/custom/Skeleton/CarteSkeleton.vue';
  import WidgetServiceLongueVieAuxObjets from '@/components/pages/PagesService/components/WidgetServiceLongueVieAuxObjets.vue';
  import WidgetServiceRecettes from '@/components/pages/PagesService/components/WidgetServiceRecettes.vue';
  import { ActionPresenterImpl } from '@/domaines/actions/adapters/action.presenter.impl';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { ChargerActionUsecase } from '@/domaines/actions/chargerAction.usecase';
  import { ChargerActionClassiqueUsecase } from '@/domaines/actions/chargerActionClassique.usecase';
  import { ChargerActionQuizUsecase } from '@/domaines/actions/chargerActionQuiz.usecase';
  import { ActionClassiqueViewModel, ActionQuizViewModel } from '@/domaines/actions/ports/action.presenter';
  import { RouteActionsName } from '@/router/actions/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(false);
  const actionClassiqueViewModel = ref<ActionClassiqueViewModel>();
  const actionQuizViewModel = ref<ActionQuizViewModel>();

  onMounted(() => {
    const idUtilisateur = utilisateurStore().utilisateur.id;
    const idAction = useRoute().params.id.toString();
    const typeAction = useRoute().params.type.toString();
    isLoading.value = true;

    const usecase = new ChargerActionUsecase(
      new ChargerActionClassiqueUsecase(),
      new ChargerActionQuizUsecase(),
      new ActionsRepositoryAxios(),
      new ActionPresenterImpl(
        vm => (actionClassiqueViewModel.value = vm),
        vm => (actionQuizViewModel.value = vm),
      ),
    );
    usecase.execute(idUtilisateur, idAction, typeAction).finally(() => (isLoading.value = false));
  });
</script>

<style scoped>
  .action__titre {
    font-size: 2rem;
  }

  .action__corps-introduction {
    background-color: rgba(0, 0, 145, 0.03);
    border: 1px solid #e5e5f8;
  }

  .action__corps-astuces {
    background-color: rgba(249, 251, 251, 1);
    border: 1px solid rgba(57, 130, 108, 0.2);
  }

  .action__recommandations-img {
    height: 6rem;
    object-fit: cover;
  }
</style>
