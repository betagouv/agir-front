<template>
  <div class="fr-container fr-my-4w">
    <PageArticleComposant :article="article" />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import PageArticleComposant from '@/components/PageArticleComposant.vue';
  import { ArticleRepositoryAxios } from '@/domaines/article/adapters/article.repository.axios';
  import { PrevisualiserArticleUsecase } from '@/domaines/article/previsualiserArticle.usecase';
  import { Article } from '@/domaines/article/recupererArticle.usecase';
  import { RouteCommuneName } from '@/router';

  const router = useRouter();

  const article = ref<Article>({
    id: '',
    titre: '',
    texte: '',
    sousTitre: '',
    estEnFavori: false,
    partenaire: {
      nom: '',
      logo: '',
    },
    sources: null,
    image: '',
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
