<template>
  <CarteInfo class="fr-mb-3w">
    <p class="fr-text--bold">
      <span class="fr-icon-information-line" aria-hidden="true"></span>
      Pourquoi ces questions ?
    </p>
    <p class="fr-text--sm">
      Votre alimentation participe à votre impact.<br />
      Elle représente en moyenne 24% des émissions de gaz à effets de serre de chaque Français.
    </p>
    <p class="fr-mb-0">
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
  import CarteInfo from '@/components/custom/CarteInfo.vue';
  import CarteExplication from '@/components/custom/CarteExplication.vue';
</script>
