<template>
  <div
    class="position--relative aide-link-card aide fr-p-3w fr-mb-3w full-height background--white shadow border-radius--md full-width"
  >
    <div>
      <h3 class="fr-text--lg text--semi-bold fr-m-0 fr-mb-2w">
        <router-link :to="aide.url" class="aide-link-card__link display-block fr-mb-0">
          {{ aide.titre }}
        </router-link>
      </h3>
      <ThematiqueTag :tag="aide.thematiqueTag" />
    </div>
    <div class="fr-ml-auto">
      <span
        v-if="aide.isSimulateur"
        class="fr-tag background-bleu-light fr-mr-1w fr-icon-money-euro-circle-line fr-tag--icon-left"
      >
        Simulateur
      </span>
      <span class="fr-icon-arrow-right-s-line todo__picto text--bleu" aria-hidden="true"></span>
    </div>
  </div>
</template>
<script setup lang="ts">
  import ThematiqueTag from '@/components/custom/Thematiques/ThematiqueTag.vue';
  import { AideNonGroupeeViewModel } from '@/domaines/aides/adapters/chargementCinqAidesNonGroupees.presenter.impl';

  defineProps<{
    aide: AideNonGroupeeViewModel;
  }>();
</script>
<style scoped>
  .aide {
    display: flex;
    gap: 1rem;
    align-items: center;
    border-radius: 8px;
    transition: box-shadow 0.3s ease;
  }

  .aide-link-card {
    transition: box-shadow 0.3s ease-in-out;
  }

  .aide-link-card:hover {
    box-shadow: 0 6px 18px 0 rgba(0, 0, 18, 0.4);
    outline-width: 0;
  }

  .aide-link-card__link {
    background-image: none;
    outline-width: 0;
  }

  .aide-link-card__link::before {
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

  .aide:hover .fr-icon-arrow-right-s-line::before {
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
