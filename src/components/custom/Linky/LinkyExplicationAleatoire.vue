<template>
  <div>
    <Transition name="fade">
      <p v-if="afficherAction">{{ infoActionQuotidienneAffichee }}</p>
    </Transition>
    <button
      @click="selectionnerInfoAleatoire"
      class="fr-btn fr-btn--tertiary-no-outline fr-btn--icon-left fr-icon-refresh-line"
    >
      Autre idée
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  const afficherAction = ref(true);

  const infosActionsQuotidiennes = [
    "Laver son linge à 30°C consomme trois fois moins d'énergie qu'à 90°C.",
    "Le programme Eco du lave-vaisselle utilise 45% d'électricité de mois qu'un programme intensif.",
    "Couvrir les casseroles permet de raccourcir le temps de cuisson et d'économiser 25% d'électricité ou de gaz.",
    "Éteindre complètement les appareils plutôt que de les laisser en veille peut représenter jusqu'à 10% d'économies.",
    "Installer un thermostat programmable pour réguler la température des pièces selon les besoins permet de réaliser jusqu'à 15% d'économies sur le chauffage.",
    'Réduire la température du logement de 1°C permet de réduire la consommation d’énergie de 7%.',
  ];

  const infoActionQuotidienneAffichee = ref(infosActionsQuotidiennes[0]);

  const selectionnerInfoAleatoire = () => {
    afficherAction.value = false;
    const infoActionsQuotidienneSansCelleAffichee = infosActionsQuotidiennes.filter(
      i => i !== infoActionQuotidienneAffichee.value,
    );
    const randomIndex = Math.floor(Math.random() * infoActionsQuotidienneSansCelleAffichee.length);
    infoActionQuotidienneAffichee.value = infoActionsQuotidienneSansCelleAffichee[randomIndex];
    setTimeout(() => {
      afficherAction.value = true;
    }, 500);
  };
</script>
<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
