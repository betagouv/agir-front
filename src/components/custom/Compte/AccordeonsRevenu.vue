<template>
  <div class="fr-accordions-group background--white">
    <Accordeon name-id="ou-trouver">
      <template #titre>Où trouver ces informations&nbsp;?</template>
      <template #contenu>
        <p>
          Le revenu fiscal de référence et votre nombre de parts se trouvent sur la 1ère page de votre dernier avis
          d’impôt.
        </p>
        <p>
          <strong>Nombre de parts&nbsp;:</strong><br />
          Si vous ne disposez pas de votre dernier avis d’impôt, renseignez 1 part pour chaque adulte de votre foyer
          fiscal, puis 0,5 part par enfant jusqu’à 2 enfants, puis 1 part par enfant à partir du 3ème enfant.
        </p>
        <p class="fr-mb-0">
          <strong>Revenu fiscal de référence&nbsp;:</strong><br />
          Si vous ne disposez pas de votre dernier avis d’impôt, renseignez la somme des revenus de toutes les personnes
          avec lequelles vous partagez vos déclarations d’impôts (pour toute l’année) pour vous faire une première idée.
        </p>
      </template>
    </Accordeon>
    <Accordeon name-id="pourquoi">
      <template #titre>Pourquoi ces questions&nbsp;?</template>
      <template #contenu>
        <p class="fr-mb-0">
          Votre revenu fiscal de référence et le nombre de parts permettent d’afficher les aides en fonction de vos
          ressources.
        </p>
      </template>
    </Accordeon>
  </div>
</template>
<script setup lang="ts">
  import Accordeon from '@/components/dsfr/Accordeon.vue';
</script>
