<template>
  <div
    :class="`fr-grid-row border-radius--md full-height shadow ${recommandation.joursRestants ? 'background--marron-caramel' : 'background--white'}`"
  >
    <div class="fr-col-3 coach-card__image" :style="`background-image: url(${recommandation.image})`"></div>
    <div class="fr-col-9 fr-p-3w">
      <div class="fr-mb-2w">
        <span :class="`fr-mr-1w fr-tag ${recommandation.type.style}`">{{ recommandation.type.libelle }}</span>
        <span v-if="recommandation.joursRestants" class="fr-tag background--pink-macaron coach-card__defi-en-cours">
          <span class="fr-icon-timer-line" aria-hidden="true"></span> {{ recommandation.joursRestants }}
        </span>
      </div>
      <span class="fr-text--bold fr-text--sm text--black">
        {{ recommandation.thematique }}
      </span>
      <h3 class="fr-h6 fr-my-1w">{{ recommandation.titre }}</h3>
      <router-link
        :to="recommandation.bouton.url"
        :class="`fr-btn ${recommandation.bouton.style}`"
        :title="`${recommandation.bouton.libelle} : ${recommandation.titre}`"
      >
        {{ recommandation.bouton.libelle }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { RecommandationViewModel } from '@/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.presenter.impl';

  defineProps<{ recommandation: RecommandationViewModel }>();
</script>

<style scoped>
  .coach-card__image {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .coach-card__defi-en-cours {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .fr-icon-timer-line::before {
    --icon-size: 14px;
  }
</style>
