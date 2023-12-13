<template>
  <CarteInfo class="fr-mb-3w">
    <p class="fr-text--bold">
      <span class="fr-icon-information-line" aria-hidden="true"></span>
      Pourquoi ces questions ?
    </p>
    <p class="fr-text--sm">
      Le logement, et en particulier les modes de chauffage, représentent en moyenne 19% des émissions de gaz à effet de
      serre de chaque Français.
    </p>
    <p>
      <span class="text--xs text--bold">Source :</span>
      <a
        href="https://www.carbone4.com/analyse-myco2-empreinte-carbone-moyenne-2021"
        target="_blank"
        rel="noopener"
        class="fr-link text--xs"
        title="Carbone 4 - ouvre une nouvelle fenêtre"
      >
        Carbone 4
      </a>
    </p>
    <p class="fr-text--sm fr-mb-0">
      Il existe de nombreuses manières de réduire sa consommation et ses factures ! De nombreuses aides sont disponibles
      si vous êtes proriétaire (bailleur ou occupant).
    </p>
  </CarteInfo>
  <div class="background-color--gris-image border border-radius--md fr-p-2w">
    <p class="fr-text--bold fr-mb-0">
      <span class="fr-icon-lightbulb-line" aria-hidden="true"></span>
      Pour vous donner une idée
    </p>
    <img
      alt="Chauffage électrique : 6kg co2e; Chauffage au gaz : 38kg co2e; Chauffage au fioul : 53kg co2e;"
      class="fr-col-12 width--auto"
      src="/impact-co2-logement.png"
    />
    <p class="text--xs fr-mb-0">
      <span class="fr-text--bold">Source :</span>
      <a
        href="https://impactco2.fr/chauffage"
        target="_blank"
        rel="noopener"
        title="Site impact CO2 - ouvre une nouvelle fenêtre"
        class="fr-link text--xs"
      >
        Impact CO2
      </a>
    </p>
  </div>
</template>

<script setup lang="ts">
  import CarteInfo from '@/components/custom/CarteInfo.vue';
</script>
