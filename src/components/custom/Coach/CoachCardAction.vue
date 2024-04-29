<template>
  <div class="fr-grid-row position--relative full-height border-radius--md shadow background--white fr-p-1w">
    <img src="/ic_defi.svg" class="fr-mr-2w" alt="" />
    <div class="fr-col">
      <div class="action__contenu">
        <div class="flex-grow">
          <span class="fr-text--bold fr-text--sm text--black">
            {{ recommandation.thematique }}
          </span>
          <h3 class="fr-h6 fr-mb-0">
            <router-link
              :to="recommandation.bouton.url"
              class="action__link"
              :title="`${recommandation.bouton.libelle} : ${recommandation.titre}`"
            >
              {{ recommandation.titre }}
            </router-link>
          </h3>
        </div>
        <span class="action__points border border-radius--md display-block background--gris fr-text--bold fr-p-1w">
          <span>{{ recommandation.points }}</span>
          <img width="16" src="/ic_score.svg" alt="point" />
        </span>
        <span class="fr-icon-arrow-right-s-line" aria-hidden="true"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { RecommandationViewModel } from '@/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.presenter.impl';

  defineProps<{ recommandation: RecommandationViewModel }>();
</script>

<style scoped>
  .action__link {
    background-image: none;
    outline-width: 0;
  }

  .action__link::before {
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

  .action__contenu {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .action__points {
    flex-shrink: 0;
  }
</style>
