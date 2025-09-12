<template>
  <Modale :id="modaleId" label-id="" :radius="false" :is-footer-actions="false" size="m">
    <template #contenu>
      <h1 class="fr-h3">Le service de géolocalisation n'a pas pu déterminer votre position.</h1>
      <ul class="fr-mb-6w">
        <li>Vérifiez que vous avez autorisé l'accès à votre position dans les paramètres de votre navigateur</li>
        <li>Assurez-vous que votre appareil dispose d'un service de localisation actif</li>
        <li>Vous pouvez également saisir manuellement votre adresse dans la barre de recherche</li>
      </ul>
    </template>
  </Modale>
</template>

<script setup lang="ts">
  import Modale from '@/components/custom/Modale/Modale.vue';
  defineProps<{ modaleId: string }>();
</script>
