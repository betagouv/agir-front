<template>
  <PageArticleComposant :article="article" />
</template>
<script setup lang="ts">
  import PageArticleComposant from '@/components/PageArticleComposant.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import { Article, RecupererArticleUsecase } from '@/article/recupererArticle.usecase';
  import { ArticleRepositoryAxios } from '@/article/adapters/article.repository.axios';

  const router = useRouter();

  const article = ref<Article>({
    titre: '',
    texte: '',
    sousTitre: '',
  });

  onMounted(async () => {
    const route = useRoute();
    const idArticle = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    const articleUsecase = await new RecupererArticleUsecase(new ArticleRepositoryAxios()).execute(idArticle);
    if (articleUsecase) {
      article.value = articleUsecase;
    } else {
      await router.push('/not-found');
    }
  });
</script>
