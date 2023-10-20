<template>
  <h2 class="text--center">Qu’est-ce que vous y trouverez</h2>
  <div class="carousel" role="region" aria-roledescription="carousel">
    <ul
      class="fr-grid-row fr-grid-row--gutters carousel__container fr-mb-4w list-style-none"
      aria-label="Liste des fonctionnalités du site"
    >
      <LandingCarouselItem
        v-for="(slide, index) in slides"
        :key="index"
        :titre="slide.titre"
        :liste="slide.liste"
        class="fr-col-md-6 fr-col-11"
        aria-roledescription="slide"
        :aria-current="index === activeSlide"
        :aria-hidden="index !== activeSlide"
      />
    </ul>
    <ul class="dots list-style-none fr-pl-0" aria-label="indicateurs">
      <li v-for="(slide, index) in slides" :key="index" :aria-current="index === activeSlide">
        <button
          :class="{ active: index === activeSlide }"
          @click="setActiveSlide(index)"
          :title="`Aller à la slide : ${slide.titre} (${index + 1}/${slides.length})`"
        >
          <span></span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import LandingCarouselItem from '@/components/custom/Landing/LandingCarouselItem.vue';

  const slides = [
    {
      titre: 'Le coach',
      liste: [
        'Un accompagnement personnalisé',
        'Adapté en fonction de vos revenus, où vous vivez et vos goûts',
        'Un suivi au quotidien',
        'Des articles pour apprendre de nouvelles choses',
        '...',
      ],
    },
    {
      titre: 'Le coach',
      liste: [
        'Un accompagnement personnalisé',
        'Adapté en fonction de vos revenus, où vous vivez et vos goûts',
        'Un suivi au quotidien',
        'Des articles pour apprendre de nouvelles choses',
        '...',
      ],
    },
    {
      titre: 'Des aides financières',
      liste: [
        'Un accompagnement personnalisé',
        'Adapté en fonction de vos revenus, où vous vivez et vos goûts',
        'Un suivi au quotidien',
        'Des articles pour apprendre de nouvelles choses',
        '...',
      ],
    },
  ];
  const activeSlide = ref(1);

  const setActiveSlide = (index: number) => {
    activeSlide.value = index;
  };

  const getTransform = (index: number) => {
    const pourcentageScroll = -(index * 50 - 25);

    return `translateX(${pourcentageScroll}%)`;
  };

  const getTransformMobile = (index: number) => {
    const pourcentageScroll = -(index * (11 / 12) * 100);

    return `translateX(${pourcentageScroll}%)`;
  };
</script>

<style scoped>
  .carousel {
    overflow: hidden;
    width: 100%;
    margin: auto;
  }

  .carousel__container {
    width: calc(100vw - 1rem);
    flex-wrap: nowrap;
    transition: ease-in-out 0.3s;
    transform: v-bind(getTransformMobile(activeSlide));
  }

  @media (min-width: 48rem) {
    .carousel__container {
      width: 100%;
      transform: v-bind(getTransform(activeSlide));
    }
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
