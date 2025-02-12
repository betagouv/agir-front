<template>
  <div class="action fr-my-1w">
    <h1 class="action__titre text--normal" v-html="actionQuizViewModel.titre" />
    <p v-if="actionQuizViewModel.sousTitre" class="fr-text--lg" v-html="actionQuizViewModel.sousTitre" />

    <section v-if="actionQuizViewModel.recommandations.length > 0" class="fr-p-2w">
      <h2>Pour aller <span class="text--bold">plus loin</span></h2>
      <div class="fr-grid-row fr-grid-row--gutters">
        <div
          v-for="article in actionQuizViewModel.recommandations"
          :key="article.titre"
          class="fr-col-12 fr-col-md-6 fr-col-lg-4"
        >
          <router-link
            :to="{ path: article.url }"
            class="display-block background--white shadow border-radius--md fr-p-1w full-height background--none"
          >
            <img
              :src="article.image"
              alt=""
              class="action__recommandations-img full-width fr-mb-1w border-radius--md"
            />
            <p class="text--semi-bold" v-html="article.titre" />
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ActionQuizViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{ actionQuizViewModel: ActionQuizViewModel }>();
</script>

<style scoped>
  .action__recommandations-img {
    height: 6rem;
    object-fit: cover;
  }
</style>
