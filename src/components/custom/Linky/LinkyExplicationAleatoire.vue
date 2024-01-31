<template>
  <div>
    <p>{{ info }}</p>
    <button
      @click="selectionnerInfoAleatoire"
      class="fr-btn fr-btn--tertiary-no-outline fr-btn--icon-left fr-icon-refresh-line"
    >
      Rafraîchir
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const infosActionsQuotidiennes = [
    "Le lavage à 30°C au lieu de 60°C peut réduire la consommation d'énergie du lave-linge jusqu'à 40%.",
    "Utiliser le lave-linge à pleine charge peut économiser jusqu'à 3 400 litres d'eau par an.",
    "Les appareils en mode veille peuvent représenter jusqu'à 10% de la consommation énergétique d'un foyer.",
    "Utiliser des ampoules LED peut réduire la consommation d'énergie pour l'éclairage de 75% par rapport aux ampoules traditionnelles.",
    "Utiliser un couvercle sur les casseroles peut réduire l'énergie nécessaire à la cuisson de jusqu'à 90%.",
    "Chaque degré plus bas dans le réfrigérateur peut augmenter la consommation d'énergie de 5%.",
  ];

  const info = ref(infosActionsQuotidiennes[0]);

  const selectionnerInfoAleatoire = () => {
    const randomIndex = Math.floor(Math.random() * infosActionsQuotidiennes.length);
    info.value = infosActionsQuotidiennes[randomIndex];
  };
</script>
