<template>
  <CarteInfo class="fr-mb-3w">
    <p class="fr-text--bold">
      <span class="fr-icon-information-line" aria-hidden="true"></span>
      Pourquoi ces questions ?
    </p>
    <p class="fr-text--sm">
      Votre alimentation participe à votre impact.<br />
      Elle représente en moyenne 21% des émissions de gaz à effets de serre de chaque Français.
    </p>
    <p class="fr-mb-0 text--xs">
      <span class="text--bold">Source :</span>
      Ministère de la transition écologique et de la cohésion des territoires (SDES, calculs 2023) – Année 2022
      (estimation provisoire)
    </p>
  </CarteInfo>
  <CarteExplication>
    <img
      alt="T-shirt : 6kg co2e; Jeans : 25kg co2e; Manteau : 101kg co2e;"
      class="fr-col-12 width--auto"
      src="/impact-co2-alimentation.png"
    />
    <p class="text--xs fr-mb-0">
      <span class="fr-text--bold">Source :</span>
      <a
        href="https://impactco2.fr/repas"
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
