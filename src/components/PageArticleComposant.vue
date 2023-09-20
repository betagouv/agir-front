<template>
  <div class="fr-container">
    <FilDAriane
      :page-courante="`Article: ${article.titre}`"
      :page-hierarchie="[
        {
          label: 'Coach',
          url: 'coach',
        },
      ]"
    />
    <h1>{{ article.titre }}</h1>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-md-8">
        <div class="article fr-p-6v background--white border-radius--md">
          <h2 class="fr-h3">{{ article.sousTitre }}</h2>
          <div v-html="article.texte" />
        </div>
      </div>
      <div class="fr-col-12 fr-col-md-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FilDAriane from "./dsfr/FilDAriane.vue";
import { ArticleCMS } from "@/cms/chargerContenuCms";

defineProps<{
  article: ArticleCMS;
}>();
</script>

<style>
.article {
  border: 1px solid rgba(0, 0, 0, 0.19);
}
</style>
