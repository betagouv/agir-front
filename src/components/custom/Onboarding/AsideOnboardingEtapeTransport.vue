<template>
  <CarteInfo>
    <p class="fr-text--bold">
      <span class="fr-icon-information-line" aria-hidden="true"></span>
      Pourquoi ces questions ?
    </p>
    <p class="fr-text--sm">Les transports sont un des principaux postes de notre empreinte écologique.</p>
    <p class="fr-text--sm">
      Par exemple, ils représentent en moyenne 27% des émissions de gaz à effet de serre de chaque Français.
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
  <div class="background-color--gris-image border border-radius--md fr-p-2w">
    <p class="fr-text--bold">
      <span class="fr-icon-lightbulb-line" aria-hidden="true"></span>
      Pour vous donner une idée
    </p>
    <p class="fr-text--sm">
      Pour 5 km, voici les émissions de gaz à effet de serre selon les moyens de transport utilisés en
      <span class="nowrap">kg CO<sub>2</sub>-e* </span>
    </p>
    <img
      alt="Vélo ou marche : 0kg co2e; Métro : 0.01kg co2e; Scooter ou moto : 0.4kg co2e; Bus : 0.6kg co2e; Voiture: 1.1kg co2e"
      class="fr-col-12 width--auto"
      src="/impact-co2.png"
    />
    <p class="text--xs">
      *<span class="nowrap">kg CO<sub>2</sub>-e</span> : kilogramme d’équivalent dioxyde de carbone (masse de tous les
      gaz à effet de serre rapportée au dioxyde de carbone)
    </p>
    <span class="text--xs">
      Source :
      <a
        href=" https://impactco2.fr/transport"
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
