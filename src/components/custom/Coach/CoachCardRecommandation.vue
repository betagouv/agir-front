<template>
  <div class="fr-grid-row border-radius--md full-height background--white shadow">
    <img class="fr-col-4 border-radius--md img-object-fit-cover" :src="recommandation.image" alt="" />
    <div class="fr-col-8 fr-p-3w">
      <div class="fr-mb-2w">
        <span :class="`fr-mr-1w fr-tag ${recommandation.type.style}`">{{ recommandation.type.libelle }}</span>
      </div>
      <span class="fr-text--bold fr-text--sm text--black">
        {{ recommandation.thematique }}
      </span>
      <h3 class="fr-h6 fr-my-1w">{{ recommandation.titre }}</h3>
      <p v-if="recommandation.description" class="fr-text--md text--gris">
        {{ recommandation.description }}
      </p>
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
