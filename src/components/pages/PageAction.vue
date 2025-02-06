<template>
  <div class="fr-container fr-mt-3w">
    <!--  TODO: Où le bouton retour envoie ?-->
    <router-link class="fr-btn fr-btn--icon-left fr-btn--tertiary-no-outline fr-icon-arrow-left-line fr-pl-0" to="#">
      Retour
    </router-link>

    <CarteSkeleton v-if="isLoading" />
    <div v-else-if="actionViewModel" class="action fr-my-1w">
      <h1 class="action__titre text--normal" v-html="actionViewModel.titre" />
      <p class="fr-text--lg" v-html="actionViewModel.sousTitre" />

      <section class="background--white border-radius--md fr-p-2w fr-mb-3w shadow">
        <p class="action__corps-introduction fr-p-3w border-radius--md" v-html="actionViewModel.corps.introduction" />
        <p class="action__corps-astuces fr-p-3w border-radius--md" v-html="actionViewModel.corps.astuces" />
      </section>

      <section class="fr-p-2w">
        <h2>Pour aller <span class="text--bold">plus loin</span></h2>
        <div class="fr-grid-row fr-grid-row--gutters">
          <div
            v-for="article in actionViewModel.recommandations"
            :key="article.titre"
            class="fr-col-12 fr-col-md-6 fr-col-lg-4"
          >
            <router-link
              class="display-block background--white shadow border-radius--md fr-p-1w text--bold full-height background--none"
              :to="{ path: article.url }"
            >
              <img
                :src="article.image"
                class="action__recommandations-img full-width fr-mb-1w border-radius--md"
                alt=""
              />
              <h4 class="fr-h5 text--semi-bold" v-html="article.titre" />
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

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import CarteSkeleton from '@/components/custom/Skeleton/CarteSkeleton.vue';
  import { ActionPresenterImpl } from '@/domaines/actions/adapters/action.presenter.impl';
  import { ActionsRepositoryMock } from '@/domaines/actions/adapters/actions.repository.mock';
  import { ChargerActionUsecase } from '@/domaines/actions/chargerAction.usecase';
  import { ActionViewModel } from '@/domaines/actions/ports/action.presenter';

  const isLoading = ref<boolean>(false);
  const actionViewModel = ref<ActionViewModel>();

  onMounted(() => {
    isLoading.value = true;
    const usecase = new ChargerActionUsecase(new ActionsRepositoryMock());
    usecase
      .execute(0, new ActionPresenterImpl(vm => (actionViewModel.value = vm)))
      .finally(() => (isLoading.value = false));
  });
</script>

<style>
  .action h1,
  .action h2,
  .action h3,
  .action h4 {
    font-weight: 400;
  }

  .action__titre > span.text--bold {
    display: inline-block;
    position: relative;
    z-index: 40;
  }

  .action__titre > span.text--bold::before {
    content: '';
    position: absolute;
    top: 70%;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #e3fbaf;
    z-index: -1;
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
