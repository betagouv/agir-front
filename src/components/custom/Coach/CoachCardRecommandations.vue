<template>
  <div class="card-recommandation shadow">
    <div class="fr-p-3w">
      <span class="fr-text--bold fr-text--xs text--black">{{ thematique }}</span>
      <h3 class="fr-text--xl fr-mb-0 text--gris-dark">
        <a :href="url" class="card-recommandation__link">{{ titre }}</a>
      </h3>
    </div>
    <img :src="image" alt="" class="card-recommandation__image" />
    <span class="fr-icon-arrow-right-line card-recommandation__picto text--bleu shadow" aria-hidden="true"></span>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    thematique: string;
    titre: string;
    image: string;
    url: string;
  }>();
</script>

<style scoped>
  .card-recommandation {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    background-color: white;
  }

  .card-recommandation__link {
    text-decoration: none;
    background: none;
  }

  .card-recommandation__link::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .card-recommandation__image {
    height: 6rem;
    display: block;
    object-fit: cover;
    width: 100%;
  }

  .card-recommandation__picto {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 1.5rem;
    bottom: 1.5rem;
    background-color: white;
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
  }

  .card-recommandation:hover .card-recommandation__picto {
    animation: slide1 1s ease-in-out infinite;
  }

  @keyframes slide1 {
    0%,
    100% {
      transform: translate(0, 0);
    }

    50% {
      transform: translate(10px, 0);
    }
  }
</style>
