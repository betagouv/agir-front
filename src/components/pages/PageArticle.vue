<template>
  <PageArticleComposant :article="articleAAfficher"> </PageArticleComposant>
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
  });

  onMounted(async () => {
    const route = useRoute();
    const idArticle = route.params.id.toString();

    const articleRepositoryAxios = new ArticleRepositoryAxios();
    new RecupererArticleUsecase(articleRepositoryAxios)
      .execute(idArticle)
      .then(async article => {
        articleAAfficher.value = article;
        await new PasserUnArticleCommeLuUsecase(articleRepositoryAxios, ToDoListEventBusImpl.getInstance()).execute(
          idArticle,
          utilisateurStore().utilisateur.id
        );
      })
      .catch(async () => {
        await router.push({ name: RouteCommuneName.NOT_FOUND });
      });
  });
</script>
