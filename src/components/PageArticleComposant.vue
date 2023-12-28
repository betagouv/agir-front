<template>
  <div class="fr-container fr-mb-6w">
    <FilDAriane
      :page-courante="`Article: ${article.titre}`"
      :page-hierarchie="[
        {
          label: 'Coach',
          url: 'coach',
        },
      ]"
    />
    <h1>{{ article.titre }}</h1>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-md-8">
        <div class="article fr-p-6v background--white border-radius--md">
          <h2 class="fr-h3">{{ article.sousTitre }}</h2>
          <div class="cms__content" v-html="article.texte" />
          <div class="fr-grid-row fr-grid-row--middle flex-space-between border border-radius--md fr-p-2w">
            <span class="fr-m-0 fr-text--bold fr-text--md">Comment avez-vous trouvé cet article ?</span>
            <Notation @rated="noterLarticle" />
          </div>
          <router-link class="fr-btn fr-mt-5v" :to="{ name: RouteCoachName.COACH }"> Revenir au coach </router-link>
        </div>
      </div>
      <div class="fr-col-12 fr-col-md-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import FilDAriane from './dsfr/FilDAriane.vue';
  import { Article } from '@/article/recupererArticle.usecase';

  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import Notation from '@/components/Notation.vue';
  import { ArticleRepositoryAxios } from '@/article/adapters/article.repository.axios';
  import { utilisateurStore } from '@/store/utilisateur';
  import { EvaluerArticleUsecase } from '@/article/evaluerArticle.usecase';

  const props = defineProps<{
    article: Article;
  }>();

  const noterLarticle = note => {
    const noterArticleUseCase = new EvaluerArticleUsecase(new ArticleRepositoryAxios());
    noterArticleUseCase.execute(props.article.id, utilisateurStore().utilisateur.id, note);
  };
</script>

<style scoped>
  .article {
    border: 1px solid rgba(0, 0, 0, 0.19);
  }
</style>
