<template>
  <PageArticleComposant :article="articleAAfficher" @update:article-modifie="onArticleModifie"> </PageArticleComposant>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import PageArticleComposant from '@/components/PageArticleComposant.vue';
  import { ArticleRepositoryAxios } from '@/domaines/article/adapters/article.repository.axios';
  import { PasserUnArticleCommeLuUsecase } from '@/domaines/article/passerUnArticleCommeLu.usecase';
  import { Article, RecupererArticleUsecase } from '@/domaines/article/recupererArticle.usecase';
  import { ToDoListEventBusImpl } from '@/domaines/toDoList/toDoListEventBusImpl';
  import { RouteCommuneName } from '@/router';
  import { utilisateurStore } from '@/store/utilisateur';

  const router = useRouter();

  const articleAAfficher = ref<Article>({
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
    sources: [],
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
          utilisateurId,
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
