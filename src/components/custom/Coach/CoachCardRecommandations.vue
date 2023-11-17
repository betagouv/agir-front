<template>
  <div class="card-recommandation shadow">
    <div class="fr-p-3w">
      <span class="fr-text--bold fr-text--xs text--black">{{ props.recommandation.thematique }}</span>
      <h3 class="card-recommandation__titre fr-text--xl fr-mb-0 text--gris-dark">
        <a
          :href="props.recommandation.url"
          class="card-recommandation__link"
          :title="props.recommandation.titre"
          @click="interactionAEteCliquee"
          >{{ props.recommandation.titre }}</a
        >
      </h3>
    </div>
    <img :src="props.recommandation.image" alt="" class="card-recommandation__image" />
    <span class="fr-icon-arrow-right-line card-recommandation__picto text--bleu shadow" aria-hidden="true"></span>
  </div>
</template>

<script setup lang="ts">
  import { RecommandationViewModel } from '@/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.presenter.impl';
  import { useInteraction } from '@/composables/recommandationAEteCliquee';

  const props = defineProps<{
    recommandation: RecommandationViewModel;
  }>();

  const { interactionAEteCliquee } = useInteraction(props.recommandation);
</script>

<style scoped>
  .card-recommandation {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    background-color: white;
  }

  .card-recommandation__titre {
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
  }

  .card-recommandation__link {
    background: none;
  }

  .card-recommandation__link::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
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
    cursor: pointer;
  }

  .card-recommandation:hover .card-recommandation__picto::before {
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
