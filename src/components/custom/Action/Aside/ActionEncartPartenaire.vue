<template>
  <a
    class="background--white shadow fr-p-2w fr-grid-row fr-no-after background--none"
    target="_blank"
    rel="noopener noreferrer"
    :href="partenaire.url"
  >
    <div class="fr-col-9 flex align-items--center">
      <span class="fr-text--sm fr-mb-0 text--italic text--bleu"
        >Proposé par
        <span class="display-block text--black text--no-italic text--bold fr-text--lg fr-m-0" v-text="partenaire.nom" />
      </span>
    </div>

    <div class="fr-col-3">
      <img :src="partenaire.logo" alt="" class="full-width img-object-fit-contain full-height" />
    </div>
  </a>
</template>

<script setup lang="ts">
  import { ActionPartenaireViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{
    partenaire: ActionPartenaireViewModel;
  }>();
</script>
