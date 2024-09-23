<template>
  <CarteInfo>
    <p class="fr-text--bold">
      <span class="fr-icon-question-line" aria-hidden="true"></span>
      Où trouver ces informations&nbsp;?
    </p>
    <p>
      Le revenu fiscal de référence et votre nombre de parts se trouvent sur la 1ère page de votre dernier avis d’impôt.
    </p>
    <p>
      <strong>Nombre de parts&nbsp;:</strong><br />
      Si vous ne disposez pas de votre dernier avis d’impôt, renseignez 1 part pour chaque adulte de votre foyer fiscal,
      puis 0,5 part par enfant jusqu’à 2 enfants, puis 1 part par enfant à partir du 3ème enfant.
    </p>
    <p>
      <strong>Revenu fiscal de référence&nbsp;:<br /></strong>
      Si vous ne disposez pas de votre dernier avis d’impôt, renseignez la somme des revenus de toutes les personnes
      avec lequelles vous partagez vos déclarations d’impôts (pour toute l’année) pour vous faire une première idée.
    </p>
    <p class="fr-text--bold">
      <span class="fr-icon-information-line" aria-hidden="true"></span>
      Pourquoi ces questions&nbsp;?
    </p>
    <p class="fr-mb-0">
      Votre revenu fiscal de référence et le nombre de parts permettent d’afficher les aides en fonction de vos
      ressources.
    </p>
  </CarteInfo>
</template>

<script setup lang="ts">
  import CarteInfo from '@/components/custom/CarteInfo.vue';
</script>
