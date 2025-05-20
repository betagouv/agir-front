<template>
  <ul>
    <li v-for="contenu in contenus" :key="contenu.id">
      <router-link :to="contenu.url" target="_blank">
        {{ contenu.titre }}
      </router-link>
      &nbsp;<i>({{ contenu.indicationGeographique }})</i>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { ArticleOuAideCollectiviteViewModel } from '@/domaines/collectivites/ports/donneesCollectivitesInsee.presenter';

  defineProps<{
    contenus: ArticleOuAideCollectiviteViewModel[];
  }>();
</script>
