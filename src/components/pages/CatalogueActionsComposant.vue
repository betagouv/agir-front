<template>
  <section v-for="action in catalogueViewModel?.actions" :key="action.code" class="fr-col-12 fr-col-md-6 fr-col-lg-3">
    <router-link
      :to="action.url"
      class="background--white shadow border-radius--md fr-p-3w display-block background--none full-height"
    >
      <h2 class="fr-text--xl text--bold fr-mb-1w text--lh-1-3 fr-mb-2w" v-html="action.titre" />
      <ul class="list-style-none fr-p-0">
        <li v-if="action.nombreDePersonnes" class="text--bleu fr-icon-team-line">
          <span class="text--gris fr-pl-1w" v-html="action.nombreDePersonnes"></span>
        </li>
        <li v-if="action.aidesDisponibles" class="text--bleu fr-icon-money-euro-circle-line">
          <span class="text--gris fr-pl-1w" v-html="action.aidesDisponibles"></span>
        </li>
      </ul>
    </router-link>
  </section>
</template>
<script lang="ts" setup>
  import { CatalogueActionsViewModel } from '@/domaines/actions/ports/catalogueActions.presenter';

  defineProps<{
    catalogueViewModel: CatalogueActionsViewModel;
  }>();
</script>
