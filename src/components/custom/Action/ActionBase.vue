<template>
  <div class="action fr-my-1w">
    <h1 class="action__titre text--normal fr-mb-3w" v-html="actionBaseViewModel.titreAffiche" />
    <p v-if="actionBaseViewModel.sousTitre" class="fr-text--lg fr-mb-4w" v-html="actionBaseViewModel.sousTitre" />

    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-lg-8">
        <slot name="contenu" />
      </div>

      <ActionAside class="fr-col-12 fr-col-lg-4" :action-base-view-model="actionBaseViewModel">
        <slot name="aside" />
      </ActionAside>
    </div>

    <section v-if="actionBaseViewModel.recommandations.length > 0" class="fr-p-2w">
      <h2>Pour aller <span class="text--bold">plus loin</span></h2>
      <div class="fr-grid-row fr-grid-row--gutters">
        <div
          v-for="article in actionBaseViewModel.recommandations"
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

<script lang="ts" setup>
  import ActionAside from '@/components/custom/Action/Aside/ActionAside.vue';
  import { ActionBaseViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{ actionBaseViewModel: ActionBaseViewModel }>();
</script>

<style scoped>
  .action__recommandations-img {
    height: 6rem;
    object-fit: cover;
  }
</style>
