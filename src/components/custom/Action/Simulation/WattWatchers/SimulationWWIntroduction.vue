<template>
  <section class="border fr-p-3w">
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-md-7">
        <h2>Réduisez jusqu’à 25% votre facture d’énergie</h2>
        <p>
          En nous renseignant votre adresse ou votre numéro de compteur et en répondant à quelques questions sur votre
          logement, découvrez vos postes les plus gourmands en énergie et les astuces pour réduire leur consommation !
        </p>
        <button class="fr-btn" @click="passerEtapeSuivante">Commencer</button>
      </div>

      <div class="fr-col-12 fr-col-md-5 flex flex-center flex-column">
        <img src="/winter-preview.png" alt="" class="preview" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  defineProps<{
    passerEtapeSuivante: () => void;
  }>();
</script>

<style>
  .preview {
    width: 100%;
    height: auto;
    object-fit: contain;
    max-height: 16rem;
  }
</style>
