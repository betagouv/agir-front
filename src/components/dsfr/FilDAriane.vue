<template>
  <nav role="navigation" class="print-hidden fr-breadcrumb" aria-label="vous êtes ici :">
    <button class="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb">Voir le fil d’Ariane</button>
    <div class="fr-collapse" id="breadcrumb">
      <ol class="fr-breadcrumb__list">
        <li>
          <router-link class="fr-breadcrumb__link" to="/agir">Accueil</router-link>
        </li>
        <li v-for="page in pageHierarchie" :key="page.label">
          <router-link class="fr-breadcrumb__link" :to="`/${page.url}`">{{ page.label }}</router-link>
        </li>
        <li>
          <a class="fr-breadcrumb__link" aria-current="page">{{ pageCourante }}</a>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/breadcrumb/breadcrumb.min.css';

  defineProps<{
    pageHierarchie?: {
      label: string;
      url: string;
    }[];
    pageCourante: string;
  }>();
</script>

<style scoped>
  .fr-breadcrumb__link {
    font-size: 0.8rem;
  }
</style>
