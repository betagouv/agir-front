<template>
  <div
    class="action-card fr-grid-row position--relative full-height border-radius--md shadow background--white fr-p-2w"
  >
    <img src="/ic_defi.svg" class="fr-mr-2w" alt="" />
    <div class="fr-col">
      <div class="action__contenu">
        <div class="flex-grow">
          <span class="fr-text--bold fr-text--sm text--black">
            {{ defi.thematique }}
          </span>
          <p class="fr-text--lg text--semi-bold text--black fr-mb-0">
            <router-link :to="defi.url" class="action__link">
              {{ defi.titre }}
            </router-link>
          </p>
        </div>
        <span class="action__points border border-radius--md display-block background--gris fr-text--bold fr-p-1w">
          <span>{{ defi.points }}</span>
          <img width="16" src="/ic_score.svg" alt="point" />
        </span>
        <span class="fr-icon-arrow-right-s-line" aria-hidden="true"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { DefiDescriptionViewModel } from '@/defi/adapters/listeDefisDescription.presenter.impl';

  defineProps<{ defi: DefiDescriptionViewModel }>();
</script>

<style scoped>
  .action-card {
    transition: box-shadow 0.3s ease-in-out;
  }

  .action-card:hover {
    box-shadow: 0 6px 18px 0 rgba(0, 0, 18, 0.4);
  }

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
    height: 100%;
  }

  .action__points {
    flex-shrink: 0;
  }
</style>
