<template>
  <h2 class="fr-h2 text--center">Ils agissent avec nous</h2>
  <div class="fr-grid-row fr-grid-row--gutters fr-pb-3w">
    <div class="fr-col-md-6">
      <LandingCitation
        citation="J’ai enfin eu des réponses à mes <span class='text--bold'>questions concrètes</span> du quotidien."
        image="/hp-user-2.webp"
        autheur="Sarah"
        activite="Infirmière, Angers"
      />
      <div class="empty-card empty-card--bottom fr-mt-2w background--vert-light fr-hidden fr-unhidden-md" />
    </div>
    <div class="fr-col-md-6">
      <div class="empty-card empty-card--top background--vert fr-mb-2w fr-hidden fr-unhidden-md" />
      <LandingCitation
        citation="Beaucoup plus <span class='text--bold'>facile à prendre en main</span> que ce que je pensais."
        image="/hp-user-1.webp"
        autheur="Jean-Yves"
        activite="Retraité, Besançon"
      />
    </div>
    <div class="fr-col-12">
      <LandingCitation
        citation="Des idées pour <span class='text--bold'>agir localement</span>, c'est ce dont j'avais besoin."
        image="/hp-user-3.webp"
        autheur="Matthieu"
        activite="Étudiant, Dijon"
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
