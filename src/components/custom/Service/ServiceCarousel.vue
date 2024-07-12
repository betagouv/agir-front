<template>
  <h2>{{ titre }}</h2>
  <div class="carousel" role="region" aria-roledescription="carousel">
    <ul
      class="fr-grid-row fr-grid-row--gutters carousel__container fr-mb-4w list-style-none"
      aria-label="Liste des fonctionnalités du site"
    >
      <li
        v-for="(serviceRechercheFavorisViewModel, index) in servicesRechercheFavorisViewModel"
        :key="index"
        class="fr-col-md-3 fr-col-7"
        aria-roledescription="slide"
        :aria-current="index === activeSlide"
        :aria-hidden="index !== activeSlide"
      >
        <ServiceCarouselItem :services-recherche-favoris="serviceRechercheFavorisViewModel" />
      </li>
    </ul>
    <ul class="dots list-style-none fr-pl-0" aria-label="indicateurs">
      <li
        v-for="(slide, index) in servicesRechercheFavorisViewModel"
        :key="index"
        :aria-current="index === activeSlide"
      >
        <button
          :class="{ active: index === activeSlide }"
          @click="setActiveSlide(index)"
          :title="`Aller à la slide : ${slide.titre} (${index + 1}/${servicesRechercheFavorisViewModel.length})`"
        >
          <span></span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import ServiceCarouselItem from '@/components/custom/Service/ServiceCarouselItem.vue';

  defineProps<{
    titre: string;
    servicesRechercheFavorisViewModel: {
      titre: string;
      img: string;
      description?: string;
      information?: string;
      nombreMiseEnFavoris: number;
      tag?: {
        label: string;
        style: string;
      };
    }[];
  }>();

  const activeSlide = ref(0);

  const setActiveSlide = (index: number) => {
    activeSlide.value = index;
  };

  const getTransform = (index: number): string => {
    const pourcentageScroll = -(index * 25 - 5);

    return `translateX(${pourcentageScroll}%)`;
  };

  const getTransformMobile = (index: number): string => {
    const pourcentageScroll = -(index * (7 / 12) * 100);

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
    height: 0.7rem;
    width: 0.7rem;
    border-radius: 50%;
    background-color: #d9d9d9;
  }

  button.active span {
    background-color: #000091;
  }
</style>
