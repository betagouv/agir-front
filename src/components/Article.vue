<template>
  <div class="fr-container">
    <FilDAriane
      :page-courante="`Article: ${article.title}`"
      :page-hierarchie="[
        {
          label: 'Coach',
          url: '/coach',
        },
      ]"
    />
    <h1>{{ article.title }}</h1>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-md-8">
        <div class="article fr-p-6v" v-html="article.content" />
      </div>
      <div class="fr-col-12 fr-col-md-4">
        <BilanNosGestesClimat :get-impact-value="store.valeurBilanCarbone" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import BilanNosGestesClimat from './BilanNosGestesClimat.vue';
  import FilDAriane from './dsfr/FilDAriane.vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import { ObtenirArticleUsecase } from '@/article/obtenirArticle.usecase'
  import { ArticleRepositoryAxios } from '@/article/adapters/articleRepository.axios';
  import { Article } from '@/article/ports/article.repository';
  import { useRoute } from 'vue-router';

  const store = utilisateurStore();
  const route = useRoute();
  const idArticle = Number(route.params.id);

  const article = ref<Article>({
    title: '',
    content: '',
  });

  onMounted(async () => {
    const articleUsecase = await new ObtenirArticleUsecase(new ArticleRepositoryAxios()).execute(idArticle);
    article.value = articleUsecase;
  });
</script>

<style>
  .article {
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.19);
  }
</style>