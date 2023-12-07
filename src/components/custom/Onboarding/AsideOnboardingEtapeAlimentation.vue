<template>
  <CarteInfo class="fr-mb-3w">
    <p class="fr-text--bold">
      <span class="fr-icon-information-line" aria-hidden="true"></span>
      Pourquoi ces questions ?
    </p>
    <p class="fr-text--sm">
      Votre alimentation participe à votre impact.<br />
      Elle représente en moyenne 24% des émissions de gaz à effets de serre du Français moyen.
    </p>
    <p class="fr-mb-0">
      <span class="text--xs text--bold">Source :</span>
      <a
        href="https://www.carbone4.com/"
        target="_blank"
        rel="noopener"
        class="fr-link text--xs"
        title="Carbone 4 - ouvre une nouvelle fenêtre"
      >
        Carbone 4
      </a>
    </p>
  </CarteInfo>
</template>

<script setup lang="ts">
  import CarteInfo from '@/components/custom/CarteInfo.vue';
</script>
