<template>
  <div class="fr-container fr-mb-6w">
    <p v-if="isLoading">Chargement en cours ...</p>
    <div v-else-if="articleAAfficher">
      <FilDAriane
        :page-courante="`Article: ${articleAAfficher.titre}`"
        :page-hierarchie="
          useRoute().params.thematiqueId && useRoute().params.missionId
            ? [
                {
                  label: `${MenuThematiques.getFromUrl(useRoute().params.thematiqueId as string).labelDansLeMenu}`,
                  url: `/thematique/${useRoute().params.thematiqueId}`,
                },
                {
                  label: `Mission`,
                  url: `/thematique/${useRoute().params.thematiqueId}/mission/${useRoute().params.missionId}`,
                },
              ]
            : []
        "
      />
      <PageArticleComposant :article="articleAAfficher" @update:article-modifie="onArticleModifie" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import PageArticleComposant from '@/components/PageArticleComposant.vue';
  import { ArticleRepositoryAxios } from '@/domaines/article/adapters/article.repository.axios';
  import { PasserUnArticleCommeLuUsecase } from '@/domaines/article/passerUnArticleCommeLu.usecase';
  import { Article, RecupererArticleUsecase } from '@/domaines/article/recupererArticle.usecase';
  import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { ToDoListEventBusImpl } from '@/domaines/toDoList/toDoListEventBusImpl';
  import { RouteCommuneName } from '@/router';
  import { utilisateurStore } from '@/store/utilisateur';

  const router = useRouter();

  const isLoading = ref<boolean>(true);
  const articleAAfficher = ref<Article | null>(null);

  onMounted(() => {
    const route = useRoute();
    const idArticle = route.params.id ? route.params.id.toString() : null;
    if (!idArticle) {
      router.push({ name: RouteCommuneName.NOT_FOUND });
      return;
    }
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
        isLoading.value = false;
        document.title = `${article.titre as string} - J'agis`;
      })
      .catch(async () => {
        await router.push({ name: RouteCommuneName.NOT_FOUND });
      });
  });

  const onArticleModifie = (article: Article) => {
    articleAAfficher.value = article;
  };
</script>
