<template>
  <h2 class="text--center">De nombreux services pour naviguer dans la transition écologique</h2>
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
        :accroche="slide.accroche"
        :imgUrl="slide.imgUrl"
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
      titre: 'Un accompagnement personnalisé',
      liste: [
        'tous les outils pour comprendre vos usages, vos moyens et vos envies et faire des recommandations adaptées',
        'des solutions pour toutes les situations',
        'une bibliothèque de contenus pour trouver les réponses à vos questions',
        'une approche ludique et pas à pas pour aller à votre rythme',
      ],
      accroche: "Plus de 1000 façons d'interagir avec Agir",
      imgUrl: '/OB-Coach.png',
    },
    {
      titre: 'Toutes les aides à la transition écologique',
      liste: [
        'De nombreuses aides sont disponibles pour vous accompagner dans la transition écologique : vélo, rénovation, logement, consommation durable...',
        "Pas facile de s'y retrouver entre les aides nationales, de la ville, de la région etc.",
        'Agir est là pour vous accompagner : toutes les aides et des simulateurs pour vérifier votre élligibilité et les montants associés.',
      ],
      accroche: "Jusqu'à 30 aides disponibles dans certaines communes !",
      imgUrl: '/OB-aide.png',
    },
    {
      titre: 'Des solutions éprouvées et partagées avec d’autres citoyens',
      liste: [
        'de nombreuses opportunités d’échanger les bonnes pratiques entre citoyens ayant les mêmes contraintes',
        'l’actualité de votre zone de vie pour connaître les événements et les nouvelles infrastructures',
        'des groupes thématiques pour avancer ensemble',
      ],
      accroche: 'Déjà 180 groupes locaux créés dans Agir',
      imgUrl: '/OB-Suivi.png',
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
