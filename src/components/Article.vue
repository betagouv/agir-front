<template>
  <div class="fr-container">
    <FilDAriane
      :page-courante="`Article: ${article.titre}`"
      :page-hierarchie="[
        {
          label: 'Coach',
          url: '/coach',
        },
      ]"
    />
    <h1>{{ article.titre }}</h1>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-md-8">
        <div class="article fr-p-6v background--white" v-html="article.contenu" />
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
  import { useRoute, useRouter } from 'vue-router';

  const store = utilisateurStore();
  const route = useRoute();
  const router = useRouter();

  const idArticle = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

  const article = ref<Article>({
    titre: '',
    contenu: '',
  });

  onMounted(async () => {
    const articleUsecase = await new ObtenirArticleUsecase(new ArticleRepositoryAxios()).execute(idArticle);
    
    if (articleUsecase) {
      article.value = articleUsecase;
    } else {
      router.push('/not-found'); 
    }
  });
</script>

<style>
  .article {
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.19);
  }
</style>