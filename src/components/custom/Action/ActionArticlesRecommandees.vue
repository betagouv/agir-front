<template>
  <section v-if="actionBaseViewModel.articlesRecommandes.length > 0" class="fr-my-4w">
    <h2>Pour aller <span class="text--bold">plus loin</span></h2>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div
        v-for="article in actionBaseViewModel.articlesRecommandes"
        :key="article.titre"
        class="fr-col-12 fr-col-sm-6 fr-col-md-4"
      >
        <CarteSimple :titre="article.titre" :image="article.image" :url="article.url" />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
  import CarteSimple from '@/components/dsfr/CarteSimple.vue';
  import { ActionBaseViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{
    actionBaseViewModel: ActionBaseViewModel;
  }>();
</script>
