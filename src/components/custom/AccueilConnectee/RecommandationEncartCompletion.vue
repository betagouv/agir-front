<template>
  <div class="background--marron-clair flex flex-space-between align-items--center fr-py-2w fr-px-4w">
    <div class="flex align-items--center">
      <CercleProgression :pourcentage="completionGlobaleRecommandations" />
      <span class="fr-sr-only">de complétion pour vos recommandations personnalisés</span>

      <div class="fr-ml-2w">
        <h2 class="fr-h4 fr-mb-0">Affinez vos recommandations</h2>
        <p class="fr-mb-0">Répondez à quelques questions sur le thème de votre choix</p>
      </div>
    </div>
    <div>
      <ul class="list-style-none flex gap--small fr-pl-0">
        <li v-for="thematique in thematiquesEtCompletion" :key="thematique.clefTechniqueAPI">
          <router-link
            v-if="!thematique.estComplete"
            :to="{ name: RouteThematiquesName.THEMATIQUE, params: { id: thematique.url } }"
            class="fr-link"
          >
            <span aria-hidden="true">{{ thematique.emoji }}</span>
            {{ thematique.labelDansLeMenu }}
          </router-link>

          <span v-else>
            <span aria-label="(complet)">✅</span>
            {{ thematique.labelDansLeMenu }}</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CercleProgression from '@/components/custom/CercleProgression.vue';
  import { AccueilConnecteViewModel } from '@/domaines/accueilConnecte/ports/accueilConnecte.presenter';
  import { RouteThematiquesName } from '@/router/thematiques/routes';

  defineProps<{
    completionGlobaleRecommandations: number;
    thematiquesEtCompletion: AccueilConnecteViewModel['thematiquesEtCompletion'];
  }>();
</script>

<style>
  .background--marron-clair {
    background-color: #e6e1d5;
  }
</style>
