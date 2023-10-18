<template>
  <h2 class="text--center">Qu’est-ce que vous y trouverez</h2>
  <div class="carousel" role="region" aria-roledescription="carousel" aria-label="Liste des fonctionnalités du site">
    <div class="fr-grid-row fr-grid-row--gutters carousel__container fr-mb-4w">
      <LandingCarouselItem
        titre="Le coach"
        :liste="[
          'Un accompagnement personnalisé',
          'Adapté en fonction de vos revenus, où vous vivez et vos goûts',
          'Un suivi au quotidien',
          'Des articles pour apprendre de nouvelles choses',
          '...',
        ]"
        class="fr-col-6"
      />
      <LandingCarouselItem
        titre="Le coach"
        :liste="[
          'Un accompagnement personnalisé',
          'Adapté en fonction de vos revenus, où vous vivez et vos goûts',
          'Un suivi au quotidien',
          'Des articles pour apprendre de nouvelles choses',
          '...',
        ]"
        class="fr-col-6"
      />
      <LandingCarouselItem
        titre="Des aides financières"
        :liste="[
          'Un accompagnement personnalisé',
          'Adapté en fonction de vos revenus, où vous vivez et vos goûts',
          'Un suivi au quotidien',
          'Des articles pour apprendre de nouvelles choses',
          '...',
        ]"
        class="fr-col-6"
      />
    </div>
    <div class="dots">
      <button
        v-for="index in slides"
        :key="index"
        :class="{ active: index === activeSlide }"
        @click="setActiveSlide(index)"
        aria-label="Aller à la slide {{ index + 1 }}"
      >
        <span></span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import LandingCarouselItem from '@/components/custom/Landing/LandingCarouselItem.vue';

  const slides = [1, 2, 3];
  const activeSlide = ref(1);

  const setActiveSlide = (index: number) => {
    activeSlide.value = index;
  };

  const getTransform = (index: number) => {
    const pourcentageScroll = -(index * 50 - 25);

    return `translateX(${pourcentageScroll}%)`;
  };
</script>

<style scoped>
  .carousel {
    position: relative;
    overflow: hidden;
    width: 100%;
    margin: auto;
  }

  .carousel__container {
    flex-wrap: nowrap;
    transition: ease-in-out 0.3s;
    transform: v-bind(getTransform(activeSlide));
  }

  .dots {
    width: fit-content;
    margin: 0 auto;
    display: flex;
  }

  .dots button {
    padding: 0.5rem;
  }

  .dots button span {
    display: block;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    background-color: rgb(197, 194, 194);
  }

  button.active span {
    background-color: rgb(88, 88, 88);
  }
</style>
