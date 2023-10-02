<template>
  <CarteInfo class="fr-mb-3w">
    <p class="fr-text--bold">
      <span class="fr-icon-information-line" aria-hidden="true"></span>
      Pouquoi ces questions ?
    </p>
    <p class="fr-text--sm">
      Votre alimentation participe à votre impact.<br />
      Elle représente en moyenne XX% des émissions de gaz à effets de serre des Français
    </p>
  </CarteInfo>
  <div class="background--gris-dark border border-radius--md fr-p-2w">
    <p class="fr-text--bold">
      <span class="fr-icon-lightbulb-line" aria-hidden="true"></span>
      Pour vous donner une idée
    </p>
    <p class="fr-text--sm fr-mb-0">Contenu à prévoir</p>
  </div>
</template>

<script setup lang="ts">
  import CarteInfo from '@/components/custom/CarteInfo.vue';
</script>
