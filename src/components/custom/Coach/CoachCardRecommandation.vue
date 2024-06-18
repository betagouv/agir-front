<template>
  <div
    class="coach-card-recommandation border-radius--md full-height shadow background--white fr-p-1w position--relative"
  >
    <div class="position--relative">
      <img class="full-width border-radius--md coach-card-recommandation__image" :src="recommandation.image" alt="" />
      <span :class="`coach-card-recommandation__type fr-tag ${recommandation.type.style}`">
        {{ recommandation.type.libelle }}
      </span>
      <span
        class="coach-card-recommandation__points border border-radius--xs display-block background--white fr-text--bold fr-py-1v fr-px-1w"
      >
        {{ recommandation.points }}
        <img width="16" src="/ic_score.svg" alt="point" />
      </span>
    </div>
    <div class="fr-py-2w full-width">
      <div class="fr-grid-row flex-space-between">
        <span class="fr-text--bold fr-text--sm text--black fr-m-0 fr-p-0">
          {{ recommandation.thematique }}
        </span>
      </div>
      <p class="fr-text--lg text--semi-bold text--black fr-mt-1w fr-mb-0">
        <router-link
          :to="recommandation.bouton.url"
          class="coach-card-recommandation__link"
          :title="`${recommandation.bouton.libelle} : ${recommandation.titre}`"
        >
          {{ recommandation.titre }}
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { RecommandationViewModel } from '@/domaines/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.presenter.impl';

  defineProps<{ recommandation: RecommandationViewModel }>();
</script>

<style scoped>
  .coach-card-recommandation {
    transition: box-shadow 0.3s ease-in-out;
  }

  .coach-card-recommandation:hover {
    box-shadow: 0 6px 18px 0 rgba(0, 0, 18, 0.4);
  }

  .coach-card-recommandation__link {
    background-image: none;
    outline-width: 0;
  }

  .coach-card-recommandation__link::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    outline-color: inherit;
    outline-offset: 2px;
    outline-style: inherit;
    border-radius: 0.5rem;
  }

  .coach-card-recommandation__image {
    height: 10rem;
    object-fit: cover;
    display: block;
    width: 100%;
  }

  .coach-card-recommandation__type {
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
  }

  .coach-card-recommandation__points {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
  }
</style>
