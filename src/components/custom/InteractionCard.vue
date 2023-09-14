<template>
  <a v-bind="attributsDuLien" role="link" @click="props.onInteractionClick ? props.onInteractionClick(interactionViewModel) : null" class="interaction-card fr-grid-row fr-grid-row--middle background--white border-radius--md fr-p-2w">
    <img :src="interactionViewModel.illustrationURL" class="fr-col-3 interaction-card__img border-radius--md fr-hidden fr-unhidden-md" alt="">
    <div class="fr-col-12 fr-col-md-7 interaction-card__contenu">
      <span v-if="interactionViewModel.categorie" class="text--black-light">{{ interactionViewModel.categorie }}</span>
      <h2 class="fr-h4 fr-mb-2w">{{ interactionViewModel.titre }}</h2>
      <Badge :label="interactionViewModel.duree" class="fr-mr-1w" />
      <span class="fr-icon-leaf-line fr-icon--sm fr-text--xs text--black-light">+{{ interactionViewModel.nombreDePointsAGagner }}</span>
    </div>
    <span class="fr-col-2 text--right fr-hidden fr-unhidden-md">
      <span v-if="!interactionViewModel.estBloquee" class="text--bleu">Commencer<span class="fr-icon-arrow-right-s-line" aria-hidden="true">&nbsp;</span></span>
      <span v-else class="text--gris">À venir <span class="fr-icon-lock-line" aria-hidden="true">&nbsp;</span></span>
    </span>
  </a>
</template>

<script setup lang="ts">
  import { AnchorHTMLAttributes, computed } from 'vue';
  import Badge from '@/components/custom/Badge.vue';
  import { InteractionViewModel } from '@/interactions/adapters/interactions.presenter.impl';

  const props = defineProps<{
    interactionViewModel: InteractionViewModel
    onInteractionClick?: (interaction: InteractionViewModel) => void
  }>();

  const attributsDuLien = computed<AnchorHTMLAttributes>(() => {
    if (props.interactionViewModel.estBloquee) return { 'aria-disabled': 'true' };

    return {
      href: props.interactionViewModel.url,
      'aria-disabled': 'false'
    };
  });
</script>

<style scoped>
  .interaction-card {
    border: 1px solid rgba(0, 0, 0, .19)
  }

  .interaction-card__img {
    height: 120px;
    object-fit: cover;
  }

  @media screen and (min-width: 768px) {
    .interaction-card__contenu {
      padding: 0 1rem;
    }
  }
</style>
