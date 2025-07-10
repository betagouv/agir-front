<template>
  <section v-if="actionBaseViewModel.articlesRecommandes.length > 0" class="fr-my-4w fr-mx-0 fr-mx-md-2w">
    <h2>Pour aller <span class="text--bold">plus loin</span></h2>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div
        v-for="article in actionBaseViewModel.articlesRecommandes"
        :key="article.titre"
        class="fr-col-12 fr-col-sm-6 fr-col-md-4"
      >
        <CarteDsfr :titre="article.titre" :image="article.image" :to="{ path: article.url }" />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
  import CarteDsfr from '@/components/dsfr/CarteDsfr.vue';
  import { ActionBaseViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{
    actionBaseViewModel: ActionBaseViewModel;
  }>();
</script>
