<template>
  <PageArticleComposant :article="article" />
</template>
<script setup lang="ts">
  import PageArticleComposant from '@/components/PageArticleComposant.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import { Article } from '@/article/recupererArticle.usecase';
  import { ArticleRepositoryAxios } from '@/article/adapters/article.repository.axios';
  import { RouteCommuneName } from '@/router';
  import { PrevisualiserArticleUsecase } from '@/article/previsualiserArticle.usecase';

  const router = useRouter();

  const article = ref<Article>({
    id: '',
    titre: '',
    texte: '',
    sousTitre: '',
    estEnFavori: false,
    partenaire: {
      id: '',
      nom: '',
      logo: '',
    },
    source: '',
  });

  onMounted(async () => {
    const route = useRoute();
    const idArticle = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    const articleRecupere = await new PrevisualiserArticleUsecase(new ArticleRepositoryAxios()).execute(idArticle);
    if (articleRecupere) {
      article.value = articleRecupere;
    } else {
      await router.push({ name: RouteCommuneName.NOT_FOUND });
    }
  });
</script>
