<template>
  <PageArticleComposant :article="articleAAfficher"> </PageArticleComposant>
</template>
<script setup lang="ts">
  import PageArticleComposant from '@/components/PageArticleComposant.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import { interactionEnCoursStore } from '@/store/interaction';
  import { Article, RecupererArticleUsecase } from '@/article/recupererArticle.usecase';
  import { ArticleRepositoryAxios } from '@/article/adapters/article.repository.axios';
  import { PasserUnArticleCommeLuUsecase } from '@/article/passerUnArticleCommeLu.usecase';
  import { ToDoListEventBusImpl } from '@/toDoList/toDoListEventBusImpl';
  import { RouteCommuneName } from '@/router';

  const store = interactionEnCoursStore();
  const router = useRouter();

  const articleAAfficher = ref<Article>({
    id: '',
    titre: '',
    texte: '',
    sousTitre: '',
  });

  onMounted(async () => {
    const route = useRoute();
    const idArticle = route.params.id ? route.params.id.toString() : store.interactionEnCours!.idDuContenu;
    const articleRepositoryAxios = new ArticleRepositoryAxios();
    new RecupererArticleUsecase(articleRepositoryAxios)
      .execute(idArticle)
      .then(async article => {
        articleAAfficher.value = article;
        if (!route.params.id) {
          await new PasserUnArticleCommeLuUsecase(articleRepositoryAxios, ToDoListEventBusImpl.getInstance()).execute(
            store.interactionEnCours!.id,
            utilisateurStore().utilisateur.id
          );
        }
      })
      .catch(async () => {
        await router.push({ name: RouteCommuneName.NOT_FOUND });
      });
  });
</script>
