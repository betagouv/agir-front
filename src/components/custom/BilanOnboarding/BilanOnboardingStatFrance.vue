<template>
  <h2 class="fr-h2">Où en est-on ?</h2>
  <p class="fr-text--lg">La France s’engage à réduire ses émissions de gaz à effet de serre de XX% d’ici 2030</p>
  <div class="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-mb-2w fr-text--lg text--left">
    <img src="/graph-bilan-onboarding.svg" class="fr-mr-3w" alt="" />
    <div class="fr-grid-row flex-column graph-legend">
      <span class="fr-text--bold text--bleu">25% Particuliers (c’est nous !)</span>
      <span>50% Entreprises</span>
      <span>25% État et collectivités territoriales</span>
    </div>
  </div>
  <p class="fr-text--bold fr-mb-0">Répartition des efforts à engager dans le cadre de la planification écologique</p>
</template>

<style scoped>
  .graph-legend span::before {
    content: '';
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    margin-right: 0.25rem;
  }

  .graph-legend span:first-child::before {
    background: var(--blue-france-sun-113-625);
  }

  .graph-legend span:nth-child(2)::before {
    background: #919191;
  }

  .graph-legend span:nth-child(3)::before {
    background: #353535;
  }
</style>
