<template>
  <h2 class="fr-h2 fr-mb-0">Univers</h2>
  <p class="fr-text--xl">Découvrez des thèmes et débloquez de nouvelles actions.</p>
  <ul class="fr-grid-row fr-grid-row--gutters list-style-none">
    <li class="fr-col-md-2 fr-col-6" v-for="univers in universViewModel" :key="univers.id">
      <CoachUniversCard :titre="univers.nom" :image="univers.urlImage" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import CoachUniversCard from '@/components/custom/Coach/CoachUniversCard.vue';
  import { UniversViewModel } from '@/univers/adapters/listeUnivers.presenter.impl';

  defineProps<{ universViewModel: UniversViewModel[] }>();
</script>
