<template>
  <CarteInfo>
    <p class="fr-text--bold">
      <span class="fr-icon-information-line" aria-hidden="true"></span>
      Pouquoi ces questions ?
    </p>
    <p class="fr-text--sm">Les transports sont un des principaux postes de notre empreinte écologique.</p>
    <p class="fr-text--sm fr-mb-0">
      Par exemple, ils représentent XX% des émissions de gaz à effet de serre moyenne des ménages français.
    </p>
  </CarteInfo>
  <div class="background-color--gris-image border border-radius--md fr-p-2w">
    <p class="fr-text--bold">
      <span class="fr-icon-lightbulb-line" aria-hidden="true"></span>
      Pour vous donner une idée
    </p>
    <img
      alt="Vélo ou marche : 0kg co2e; Métro : 0.01kg co2e; Scooter ou moto : 0.4kg co2e; Bus : 0.6kg co2e; Voiture: 1.1kg co2e"
      class="fr-col-12"
      src="/impact-co2.png"
    />
    <a
      href="https://impactco2.fr/"
      target="_blank"
      rel="noopener"
      title="Site impact CO2 - ouvre une nouvelle fenêtre"
      class="lien-impact-co2 fr-text--sm fr-mb-0"
    >
      Propulsé par
      <img src="/logo_impact_CO2.png" alt="impact CO2" class="fr-ml-1v" />
    </a>
  </div>
</template>

<script setup lang="ts">
  import CarteInfo from '@/components/custom/CarteInfo.vue';
</script>

<style scoped>
  .background-color--gris-image {
    background-color: #eeeeee;
  }

  .lien-impact-co2 {
    display: inline-flex;
    align-items: center;
  }
</style>
