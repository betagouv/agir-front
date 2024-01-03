<template>
  <div class="card-recommandation-highlight shadow fr-mb-3w background--white fr-p-3w">
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-4">
        <div
          class="card-recommandation-highlight__image"
          :style="`background-image: url('${props.recommandation.image}')`"
          aria-hidden="true"
        ></div>
      </div>
      <div class="fr-col-8">
        <span class="fr-text--bold">L'article à lire !</span>
        <h3 class="fr-h4 text--gris-dark">{{ props.recommandation.titre }}</h3>
        <p>{{ props.recommandation.description }}</p>
        <router-link
          :to="props.recommandation.url"
          class="card-recommandation-highlight__link fr-link"
          @click="interactionAEteCliquee"
        >
          Continuer la lecture
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { RecommandationViewModel } from '@/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.presenter.impl';
  import { useInteraction } from '@/composables/interactionAEteCliquee';

  const props = defineProps<{
    recommandation: RecommandationViewModel;
  }>();

  const { interactionAEteCliquee } = useInteraction({
    id: props.recommandation.id,
    type: props.recommandation.type,
    nombreDePointsAGagner: props.recommandation.nombreDePointsAGagner,
    idDuContenu: props.recommandation.contentId,
  });
</script>

<style scoped>
  .card-recommandation-highlight {
    position: relative;
    border-radius: 8px;
    background: #fff;
  }

  .card-recommandation-highlight__image {
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 8px;
  }

  .card-recommandation-highlight__link::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
  }
</style>
