<template>
  <div class="fr-container fr-py-15w">
    <h2>Agir à <span class="fr-icon-map-pin-2-fill"></span>{{ commune || '' }}</h2>
    <p>D’après nos calculs, voici ce que nous pouvons vous proposer :</p>

    <ListeRaccourcis v-if="props.listeRaccourcis" :liste-raccourcis="props.listeRaccourcis" />
  </div>
</template>

<script setup lang="ts">
  import ListeRaccourcis from '@/components/custom/Thematiques/ListeRaccourcis.vue';
  import { RaccourciViewModel } from '@/domaines/thematiques/ports/thematiqueResume.presenter';

  const props = defineProps<{ commune?: string; listeRaccourcis?: RaccourciViewModel[] }>();
</script>

<style scoped>
  .fr-icon-map-pin-2-fill {
    color: #9d9c88;
  }
</style>
