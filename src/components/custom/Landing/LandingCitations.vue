<template>
  <h2 class="fr-h2 text--center">Ils agissent avec nous</h2>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-md-6">
      <LandingCitation
        citation="Beaucoup plus <strong>facile à prendre en main</strong> que ce que je pensais"
        image="/hp-user-1.png"
        autheur="Jean-Yves"
        activite="Retraité, La Roche-Sur-Yon"
      />
      <div
        class="empty-card empty-card--bottom fr-mt-2w background--vert-light border-radius--md fr-hidden fr-unhidden-md"
      />
    </div>
    <div class="fr-col-md-6">
      <div class="empty-card empty-card--top background--vert border-radius--md fr-mb-2w fr-hidden fr-unhidden-md" />
      <LandingCitation
        citation="J’ai enfin eu des réponses à mes <strong>questions concrètes</strong> du quotidien"
        image="/hp-user-2.png"
        autheur="Sarah"
        activite="Ingénieure, Marseille"
      />
    </div>
    <div class="fr-col-12">
      <LandingCitation
        citation="Des idées pour <strong>agir localement</strong>, c’est ce dont j’avais besoin"
        image="/hp-user-3.png"
        autheur="Matthieu"
        activite="Étudiant, Rennes"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import LandingCitation from '@/components/custom/Landing/LandingCitation.vue';
</script>

<style scoped>
  .empty-card {
    height: 13rem;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .empty-card--top {
    background-image: url('/bulle1.svg');
    background-position: bottom left;
  }

  .empty-card--bottom {
    background-image: url('/bulle2.svg');
    background-position: top right;
  }
</style>
