<template>
  <div class="fr-grid-row position--relative full-height border-radius--md shadow background--white fr-p-1w">
    <img src="/ic_defi.svg" class="fr-mr-2w" alt="" />
    <div class="fr-col">
      <div class="toto">
        <div>
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
        <div></div>
        <span class="fr-tag">{{ recommandation.points }} <img width="16" src="/ic_score.svg" alt="point" /></span>
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
    padding-right: 2rem;
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
  }

  .toto {
    display: flex;
    align-items: center;
  }
</style>
