<template>
  <PageArticleComposant :article="articleAAfficher" @update:article-modifie="onArticleModifie"> </PageArticleComposant>
</template>
<script setup lang="ts">
  import PageArticleComposant from '@/components/PageArticleComposant.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import { Article, RecupererArticleUsecase } from '@/article/recupererArticle.usecase';
  import { ArticleRepositoryAxios } from '@/article/adapters/article.repository.axios';
  import { PasserUnArticleCommeLuUsecase } from '@/article/passerUnArticleCommeLu.usecase';
  import { ToDoListEventBusImpl } from '@/toDoList/toDoListEventBusImpl';
  import { RouteCommuneName } from '@/router';

  const router = useRouter();

  const articleAAfficher = ref<Article>({
    id: '',
    titre: '',
    texte: '',
    sousTitre: '',
    estEnFavori: false,
  });

  onMounted(() => {
    const route = useRoute();
    const idArticle = route.params.id.toString();

    const articleRepositoryAxios = new ArticleRepositoryAxios();
    const utilisateurId = utilisateurStore().utilisateur.id;

    new RecupererArticleUsecase(articleRepositoryAxios)
      .execute(utilisateurId, idArticle)
      .then(async article => {
        articleAAfficher.value = article;
        await new PasserUnArticleCommeLuUsecase(articleRepositoryAxios, ToDoListEventBusImpl.getInstance()).execute(
          idArticle,
          utilisateurId
        );
      })
      .catch(async () => {
        await router.push({ name: RouteCommuneName.NOT_FOUND });
      });
  });

  const onArticleModifie = (article: Article) => {
    articleAAfficher.value = article;
  };
</script>
