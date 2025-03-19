<template>
  <div>
    <router-link
      class="fr-btn shadow full-width flex flex-space-between fr-p-2w fr-mb-2w"
      :to="{ name: RouteThematiquesName.THEMATIQUE_V2, params: { id: clefThematique } }"
    >
      <span><span aria-hidden="true" v-text="thematique.emoji" />&nbsp;{{ thematique.labelDansLeMenu }}</span>
      <span class="fr-btn--icon-right fr-icon-arrow-right-s-line"></span>
    </router-link>

    <p class="text--center fr-text--sm text--gris-light fr-hidden fr-unhidden-sm" v-text="description" />
  </div>
</template>

<script lang="ts" setup>
  import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { RouteThematiquesName } from '@/router/thematiques/routes';

  const { clefThematique } = defineProps<{
    clefThematique: ClefThematiqueAPI;
    description: string;
  }>();

  const thematique = MenuThematiques.getThematiqueData(clefThematique);
</script>
