<template>
  <CarteInfo class="fr-mb-3w">
    <p class="fr-text--bold">
      <span class="fr-icon-information-line" aria-hidden="true"></span>
      Pourquoi ces questions ?
    </p>
    <p class="fr-text--sm">
      Le logement, et en particulier les modes de chauffage, représentent en moyenne 22% des émissions de gaz à effet de
      serre de chaque Français.
    </p>
    <p class="text--xs">
      <span class="text--bold">Source :</span>
      Ministère de la transition écologique et de la cohésion des territoires (SDES, calculs 2023) – Année 2022
      (estimation provisoire)
    </p>
    <p class="fr-text--sm fr-mb-0">
      Il existe de nombreuses manières de réduire sa consommation et ses factures ! De nombreuses aides sont disponibles
      si vous êtes proriétaire (bailleur ou occupant).
    </p>
  </CarteInfo>
  <CarteExplication>
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
  </CarteExplication>
</template>

<script setup lang="ts">
  import CarteExplication from '@/components/custom/CarteExplication.vue';
  import CarteInfo from '@/components/custom/CarteInfo.vue';
</script>
