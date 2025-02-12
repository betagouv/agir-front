<template>
  <div class="action fr-my-1w">
    <h1 class="action__titre text--normal" v-html="actionClassiqueViewModel.titre" />
    <p v-if="actionClassiqueViewModel.sousTitre" class="fr-text--lg" v-html="actionClassiqueViewModel.sousTitre" />

    <section class="background--white border-radius--md fr-p-2w fr-mb-3w shadow">
      <section
        v-if="actionClassiqueViewModel.corps.introduction"
        class="action__corps-introduction fr-p-3w border-radius--md fr-mb-3w"
        v-html="actionClassiqueViewModel.corps.introduction"
      />

      <section class="fr-mt-2w fr-mb-4w fr-mx-3w">
        <div v-for="service in actionClassiqueViewModel.services" :key="service.type">
          <WidgetServiceRecettes
            v-if="service.type === 'recettes'"
            :parametre-de-recherche="service.parametreDuService"
          />

          <WidgetServiceLongueVieAuxObjets
            v-if="service.type === 'longue_vie_objets'"
            :parametre-de-recherche="service.parametreDuService"
            :commune="actionClassiqueViewModel.commune"
          />
        </div>
      </section>

      <section
        v-if="actionClassiqueViewModel.corps.astuces"
        class="action__corps-astuces fr-p-3w border-radius--md"
        v-html="actionClassiqueViewModel.corps.astuces"
      />
    </section>
    <section v-if="actionClassiqueViewModel.recommandations.length > 0" class="fr-p-2w">
      <h2>Pour aller <span class="text--bold">plus loin</span></h2>
      <div class="fr-grid-row fr-grid-row--gutters">
        <div
          v-for="article in actionClassiqueViewModel.recommandations"
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
  import WidgetServiceLongueVieAuxObjets from '@/components/pages/PagesService/components/WidgetServiceLongueVieAuxObjets.vue';
  import WidgetServiceRecettes from '@/components/pages/PagesService/components/WidgetServiceRecettes.vue';
  import { ActionClassiqueViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{ actionClassiqueViewModel: ActionClassiqueViewModel }>();
</script>

<style scoped>
  .action__corps-introduction {
    background-color: rgba(0, 0, 145, 0.03);
    border: 1px solid #e5e5f8;
  }

  .action__corps-astuces {
    background-color: rgba(249, 251, 251, 1);
    border: 1px solid rgba(57, 130, 108, 0.2);
  }

  .action__recommandations-img {
    height: 6rem;
    object-fit: cover;
  }
</style>
