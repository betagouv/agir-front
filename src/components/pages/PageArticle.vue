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
      <PageArticleComposant
        v-if="articleAAfficher"
        :article="articleAAfficher"
        @update:article-modifie="onArticleModifie"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useHead } from '@unhead/vue';
  import { computed, onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import PageArticleComposant from '@/components/PageArticleComposant.vue';
  import { ArticleRepositoryAxios } from '@/domaines/article/adapters/article.repository.axios';
  import { Article, RecupererArticleUsecase } from '@/domaines/article/recupererArticle.usecase';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { RouteCommuneName } from '@/router';
  import useHeadProperties from '@/shell/useHeadProperties';

  const router = useRouter();

  const isLoading = ref<boolean>(true);
  const articleAAfficher = ref<Article>();

  useHead({
    ...useHeadProperties,
    title: computed(() => articleAAfficher.value?.titre && `${articleAAfficher.value.titre}`),
  });

  onMounted(() => {
    const route = useRoute();
    const idArticle = route.params.id ? route.params.id.toString() : null;
    if (!idArticle) {
      router.push({ name: RouteCommuneName.NOT_FOUND });
      return;
    }
    const articleRepositoryAxios = new ArticleRepositoryAxios();

    const sessionRepositoryStore = new SessionRepositoryStore();
    new RecupererArticleUsecase(articleRepositoryAxios, sessionRepositoryStore)
      .execute(idArticle)
      .then(async article => {
        articleAAfficher.value = article;
        isLoading.value = false;
      })
      .catch(async () => {
        await router.push({ name: RouteCommuneName.NOT_FOUND });
      });
  });

  const onArticleModifie = (article: Article) => {
    articleAAfficher.value = article;
  };
</script>
