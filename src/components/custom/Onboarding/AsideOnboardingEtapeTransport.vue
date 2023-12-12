<template>
  <CarteInfo>
    <p class="fr-text--bold">
      <span class="fr-icon-information-line" aria-hidden="true"></span>
      Pourquoi ces questions ?
    </p>
    <p class="fr-text--sm">Les transports sont un des principaux postes de notre empreinte écologique.</p>
    <p class="fr-text--sm">
      Par exemple, ils représentent 27% des émissions de gaz à effet de serre d’un français moyen.
    </p>
    <span class="text--xs">Source : carbone 4</span>
  </CarteInfo>
  <div class="background-color--gris-image border border-radius--md fr-p-2w">
    <p class="fr-text--bold">
      <span class="fr-icon-lightbulb-line" aria-hidden="true"></span>
      Pour vous donner une idée
    </p>
    <p class="fr-text--sm">
      Pour 5 km, voici les émissions de gaz à effet de serre selon les moyens de transport utilisés en kg CO2e*
    </p>
    <img
      alt="Vélo ou marche : 0kg co2e; Métro : 0.01kg co2e; Scooter ou moto : 0.4kg co2e; Bus : 0.6kg co2e; Voiture: 1.1kg co2e"
      class="fr-col-12 width--auto"
      src="/impact-co2.png"
    />
    <p class="text--xs">
      *kg CO2e : kilogramme d’équivalent dioxyde de carbone (masse de tous les gaz à effet de serre rapportée au dioxyde
      de carbone)
    </p>
    <span class="text--xs">
      Source :
      <a
        href="https://impactco2.fr/"
        target="_blank"
        rel="noopener"
        title="Site impact CO2 - ouvre une nouvelle fenêtre"
        class="fr-mb-0"
      >
        Impact CO2
      </a>
    </span>
  </div>
</template>

<script setup lang="ts">
  import CarteInfo from '@/components/custom/CarteInfo.vue';
</script>
