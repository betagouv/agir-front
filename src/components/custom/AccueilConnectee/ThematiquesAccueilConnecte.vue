<template>
  <div>
    <div class="fr-container">
      <div class="text--center fr-mb-10w">
        <h2 class="text--semi-bold">
          <span class="text--bold">{{ prenom }}</span
          >, dans quel domaine souhaitez-vous agir ?
        </h2>
        <p>
          Découvrez des actions personnalisées pour vous<template v-if="commune">, à {{ commune }}</template>
        </p>
      </div>

      <ul class="list-style-none fr-grid-row fr-grid-row--gutters fr-pb-8w fr-pb-md-16w">
        <li
          v-for="(description, clefThematique) in thematiques"
          :key="clefThematique"
          class="fr-col-12 fr-col-sm-6 fr-col-md-3"
        >
          <BlocThematiqueAccueilConnecte
            :description="description"
            :clef-thematique="clefThematique as ClefThematiqueAPI"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BlocThematiqueAccueilConnecte from '@/components/custom/AccueilConnectee/BlocThematiqueAccueilConnecte.vue';
  import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{
    commune?: string;
  }>();

  const prenom = utilisateurStore().utilisateur.prenom;

  const thematiques: Record<ClefThematiqueAPI, string> = {
    [ClefThematiqueAPI.alimentation]: 'Des recettes, commerces locaux et alternatives pour bien manger',
    [ClefThematiqueAPI.logement]: 'Les aides et outils pour économiser, rénover et améliorer le confort au quotidien',
    [ClefThematiqueAPI.transports]: 'Comparer, bénéficier d’aides et trouver la meilleure solution pour vous déplacer',
    [ClefThematiqueAPI.consommation]: 'Réparer, donner, acheter autrement : les solutions économiques et responsables',
  } as Record<ClefThematiqueAPI, string>;
</script>
