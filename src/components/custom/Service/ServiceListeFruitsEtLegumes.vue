<template>
  <h2 class="fr-h5 fr-mb-1v">{{ titre }}</h2>
  <p class="text--mention-grey">{{ sousTitre }}</p>
  <ul class="fr-grid-row fr-grid-row--gutters list-style-none fr-mb-4w">
    <li v-for="item in liste" :key="item.nom" class="fr-col-6 fr-col-md-4">
      <div class="fr-grid-row flex-space-between shadow--light background--white border-radius--md fr-p-2w">
        <span>{{ item.nom }}</span>
        <span aria-hidden="true">{{ item.emoji }}</span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { ServiceFruitsEtLegumesDetailViewModel } from '@/domaines/serviceRecherche/adapters/serviceRechercheFruitsEtLegumes.presenter.impl';

  defineProps<{ titre: string; sousTitre: string; liste: ServiceFruitsEtLegumesDetailViewModel[] }>();
</script>
