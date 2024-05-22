<template>
  <h2 class="fr-h2">Chiffres clés</h2>
  <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
    <div class="fr-col-md-5 fr-col-12">
      <div class="fr-grid-row fr-grid-row--middle">
        <div
          class="background--bleu-dark text--white fr-grid-row flex-column fr-p-3w border-radius--lg text--center fr-text--bold"
        >
          <span class="text--3xl fr-py-1w">8.9</span>
          <span>tonnes de</span>
          <span>CO<sub>2</sub>-e*</span>
        </div>
        <p class="fr-col fr-text--lg fr-text--bold fr-pl-2w fr-m-0">
          Empreinte carbone moyenne annuelle de chaque Français
        </p>
      </div>
    </div>
    <div class="fr-col-md-7 fr-col-12">
      <h3 class="fr-text--lg">Répartition thématique de l’empreinte moyenne des Français</h3>
      <div class="fr-grid-row fr-grid-row--middle">
        <div class="fr-col-5 fr-hidden fr-unhidden-md">
          <img src="/camembert-onboarding.svg" alt="" />
        </div>
        <div class="fr-col-md-6 fr-col-11">
          <ul class="graph-legend list-style-none fr-text--bold fr-text--lg">
            <li class="fr-grid-row flex-space-between fr-mb-1v"><span>🚗 Transports</span> 32%</li>
            <li class="fr-grid-row flex-space-between fr-mb-1v"><span>🥦 Alimentation</span> 21%</li>
            <li class="fr-grid-row flex-space-between fr-mb-1v"><span>🏡 Logement</span> 22%</li>
            <li class="fr-grid-row flex-space-between fr-mb-1v"><span>🛒 Biens de consommation</span> 18%</li>
            <li class="fr-grid-row flex-space-between fr-mb-1v"><span>🏛️ Services publics</span> 7%</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <p class="fr-mt-2w fr-mb-0 fr-text--sm">
    Source : Ministère de la transition écologique et de la cohésion des territoires (SDES, calculs 2023) – Année 2022
    (estimation provisoire)<br />
    *<span class="nowrap">kg CO<sub>2</sub>-e</span> : kilogramme d’équivalent dioxyde de carbone (masse de tous les gaz
    à effet de serre rapportée au dioxyde de carbone)
  </p>
</template>

<style scoped>
  .graph-legend li {
    position: relative;
  }

  .graph-legend li::before {
    content: '';
    display: block;
    position: absolute;
    left: -2rem;
    bottom: calc(50% - 0.5rem);
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }

  .graph-legend li:first-child::before {
    background: rgba(0, 0, 145, 1);
  }

  .graph-legend li:nth-child(2)::before {
    background: rgba(0, 0, 145, 0.6);
  }

  .graph-legend li:nth-child(3)::before {
    background: rgba(0, 0, 145, 0.4);
  }

  .graph-legend li:nth-child(4)::before {
    background: rgba(0, 0, 145, 0.2);
  }

  .graph-legend li:nth-child(5)::before {
    background: rgba(0, 0, 145, 0.1);
  }
</style>
