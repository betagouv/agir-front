<template>
  <CarteInfo>
    <p class="fr-text--bold">
      <span class="fr-icon-information-line" aria-hidden="true"></span>
      Pouquoi ces questions ?
    </p>
    <p>Adapter les résultats au plus près de votre situation</p>
    <p v-show="props.afficherExplicationCodePostal">
      Votre <strong>code postal</strong> permet de consulter les aides locales.
    </p>
    <p v-show="props.afficherExplicationRevenuFiscal">
      Votre <strong>revenu fiscal de référence</strong> et le <strong>nombre de parts</strong> permettent d’afficher les
      aides en fonction de vos ressources.
    </p>
  </CarteInfo>
</template>
<script setup lang="ts">
  const props = defineProps<{
    afficherExplicationCodePostal: boolean;
    afficherExplicationRevenuFiscal: boolean;
  }>();
</script>
