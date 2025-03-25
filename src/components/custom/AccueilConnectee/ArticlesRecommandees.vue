<template>
  <div class="fr-container fr-py-5w fr-py-md-10w">
    <div class="fr-grid-row flex-space-between align-items--center fr-mb-3w">
      <h2 class="fr-h2 fr-mb-0">Quoi de neuf ?</h2>
      <router-link :to="{ name: RouteCoachName.BIBLIOTHEQUE }" class="fr-link">Voir tous les articles</router-link>
    </div>

    <template v-if="isLoading">
      <ul class="fr-grid-row fr-grid-row--gutters list-style-none">
        <li v-for="index in 4" :key="index" class="fr-col-12 fr-col-sm-6 fr-col-md-3">
          <div class="shadow fr-p-2w">
            <Skeleton height="200px" width="100%" has-margin-bottom class="fr-mx-auto" />
            <Skeleton width="80%" class="fr-mb-1w" />
            <Skeleton width="100%" class="fr-mb-1w" />
            <Skeleton width="30%" class="fr-mb-1w" />
          </div>
        </li>
      </ul>
    </template>
    <ul v-else-if="articlesRecommandes" class="fr-grid-row fr-grid-row--gutters list-style-none">
      <li v-for="article in articlesRecommandes" :key="article.id" class="fr-col-12 fr-col-sm-6 fr-col-md-3">
        <CarteSimple :titre="article.titre" :image="article.image" :url="article.url" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Skeleton from '@/components/custom/Skeleton/Skeleton.vue';
  import CarteSimple from '@/components/dsfr/CarteSimple.vue';
  import { ArticleRepositoryAxios } from '@/domaines/article/adapters/article.repository.axios';
  import {
    ArticleRecommandeViewModel,
    ArticlesRecommandesPresenterImpl,
  } from '@/domaines/article/adapters/articlesRecommandes.presenter.impl';
  import { RecupererArticlesPersonnaliseesUsecase } from '@/domaines/article/recupererArticlesPersonnalisees.usecase';
  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import { utilisateurStore } from '@/store/utilisateur';

  const usecase = new RecupererArticlesPersonnaliseesUsecase(new ArticleRepositoryAxios());
  const NOMBRE_ARTICLES = 4;
  const articlesRecommandes = ref<ArticleRecommandeViewModel[]>();
  const isLoading = ref<boolean>(true);

  onMounted(async () => {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      NOMBRE_ARTICLES,
      new ArticlesRecommandesPresenterImpl(vm => (articlesRecommandes.value = vm)),
    );
    isLoading.value = false;
  });
</script>

<style scoped></style>
