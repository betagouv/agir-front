<template>
  <MissionEtapeSkeleton :view-model-existe="articleViewModel !== undefined" :is-loading="isLoading">
    <PageArticleComposant
      :article="articleViewModel!"
      :est-enchainement-mission="true"
      @update:article-modifie="onArticleModifie"
    >
      <button class="fr-btn fr-btn--lg fr-mt-3w" @click="onClickContinuer">Continuer</button>
    </PageArticleComposant>
  </MissionEtapeSkeleton>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import MissionEtapeSkeleton from '@/components/custom/Mission/MissionEtapeSkeleton.vue';
  import PageArticleComposant from '@/components/PageArticleComposant.vue';
  import { ArticleRepositoryAxios } from '@/domaines/article/adapters/article.repository.axios';
  import { PasserUnArticleCommeLuUsecase } from '@/domaines/article/passerUnArticleCommeLu.usecase';
  import { Article, RecupererArticleUsecase } from '@/domaines/article/recupererArticle.usecase';
  import { ToDoListEventBusImpl } from '@/domaines/toDoList/toDoListEventBusImpl';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{ articleId: string; onClickContinuer: () => void }>();

  const articleViewModel = ref<Article>();
  const isLoading = ref<boolean>(true);

  onMounted(() => {
    const idArticle = props.articleId;

    const articleRepositoryAxios = new ArticleRepositoryAxios();
    const utilisateurId = utilisateurStore().utilisateur.id;

    new RecupererArticleUsecase(articleRepositoryAxios)
      .execute(utilisateurId, idArticle)
      .then(async article => {
        articleViewModel.value = article;
        await new PasserUnArticleCommeLuUsecase(articleRepositoryAxios, ToDoListEventBusImpl.getInstance()).execute(
          idArticle,
          utilisateurId,
        );
      })
      .finally(() => {
        isLoading.value = false;
      });
  });

  const onArticleModifie = (article: Article) => {
    articleViewModel.value = article;
  };
</script>
