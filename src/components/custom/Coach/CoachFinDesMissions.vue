<template>
  <div class="card-fin-missions fr-grid-row fr-grid-row--middle flex-column fr-py-6w border-radius--lg text--center">
    <div class="card-fin-missions--picto text--bleu fr-mb-3w">
      <span class="fr-icon-flag-fill" aria-hidden="true"></span>
      <span class="fr-icon-flag-fill" aria-hidden="true"></span>
      <span class="fr-icon-flag-fill" aria-hidden="true"></span>
    </div>
    <p class="fr-col-8 fr-grid-row flex-column">
      <span class="fr-display--xs text--uppercase fr-mb-2w">Bravo !</span>
      <span class="text--bleu text--3xl fr-mb-2w text--lh-1">Vous avez accompli l’ensemble des missions.</span>
      <span class="fr-text--lead fr-text--bold fr-mb-0 text--lh-1">
        De nouvelles missions arriveront très prochainement.
      </span>
    </p>
  </div>
  <div id="container-survey"></div>
</template>
<script setup lang="ts">
  import { publierEvenementHotjar, HotjarEvenement } from '@/shell/publierEvenementHotjar';
  import { inject } from 'vue';

  const hotjar = inject('Hotjar') as {
    event: (eventName: string) => void;
  };
  if (hotjar) {
    publierEvenementHotjar(hotjar, HotjarEvenement.DEBRIEF);
  }
</script>
<style scoped>
  .card-fin-missions {
    background-image: url('/bg_fin-des-missions.jpg');
    background-size: cover;
    background-position: center;
  }

  .card-fin-missions--picto {
    display: flex;
    align-items: end;
  }

  .card-fin-missions--picto span:nth-child(2)::before {
    --icon-size: 3rem;
  }
</style>
