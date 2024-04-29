<template>
  <div class="fr-grid-row border-radius--md full-height shadow background--white">
    <img class="full-width border-radius--md-top" :src="recommandation.image" />
    <div class="fr-px-2w full-width">
      <div class="fr-grid-row flex-space-between fr-mt-2w fr-mb-2w">
        <span :class="`fr-tag ${recommandation.type.style}`">{{ recommandation.type.libelle }}</span>
        <span class="fr-text--bold fr-text--sm text--black fr-m-0 fr-p-0">
          {{ recommandation.thematique }}
        </span>
      </div>

      <h3 class="fr-h6 fr-my-1w">{{ recommandation.titre }}</h3>
      <router-link
        :to="recommandation.bouton.url"
        :class="`fr-btn fr-mb-2w ${recommandation.bouton.style}`"
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
