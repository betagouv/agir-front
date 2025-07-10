<template>
  <h2 class="fr-h3">
    <i>J'agis</i> en quelques chiffres pour <i>{{ collectiviteInseeViewModel.nom }}</i> !
  </h2>

  <p v-html="collectiviteInseeViewModel.indicationAidesEtArticles" />

  <div class="fr-grid-row fr-grid-row--gutters fr-mb-2w">
    <div class="fr-col-12 fr-col-md-4">
      <div class="shadow background--white fr-p-2w fr-px-3w full-height">
        <p class="fr-h4 fr-mb-0 flex flex-column flex-space-between full-height">
          <span class="display-block">
            Nombre d'inscrits sur J'agis
            <span
              class="display-block text--normal fr-text"
              v-text="collectiviteInseeViewModel.indicationNombreUtilisateurs"
            />
          </span>

          <span
            v-if="collectiviteInseeViewModel.nombreInscrits.localDernierMois > 0"
            class="display-block fr-text--sm text--normal fr-mb-0"
          >
            <span class="display-block fr-mb-0" v-text="collectiviteInseeViewModel.nombreInscrits.localDernierMois" />
            nouvelles inscriptions ce mois-ci
          </span>
        </p>
      </div>
    </div>

    <div class="fr-col-12 fr-col-md-4">
      <div class="shadow background--white fr-p-2w fr-px-3w full-height">
        <p class="fr-h4 fr-mb-0 flex flex-column flex-space-between full-height">
          <span class="display-block">
            Nombre d'utilisateurs actifs
            <span
              class="display-block text--normal fr-text"
              v-text="collectiviteInseeViewModel.indicationNombreUtilisateurs"
            />
          </span>

          <span class="fr-text--sm text--normal fr-mb-0">
            <span class="display-block fr-mb-0">blabla</span>
            nouvelles inscriptions ce mois-ci
          </span>
        </p>
      </div>
    </div>

    <div class="fr-col-12 fr-col-md-4">
      <div class="shadow background--white fr-p-2w fr-px-3w full-height">
        <p class="fr-h4 fr-mb-0">Actions par thématique</p>
        <CollectiviteActionsParThematiqueGraph
          :chart-data="collectiviteInseeViewModel.graphiqueActionsRepartitionParThematiquesData"
        />
      </div>
    </div>
  </div>

  <div class="fr-grid-row fr-grid-row--gutters">
    <CarteDecouverte
      v-for="carte in collectiviteInseeViewModel.cartesThematiques"
      :key="carte.titre"
      :titre-emoji="carte.emoji"
      :titre-texte="carte.titre"
    >
      <div v-if="carte.aides.length > 0">
        <h4 class="fr-text--xl fr-mt-6v fr-mb-2v">
          Les <span class="text--bleu">aides</span> nationales <span aria-hidden="true">🇫🇷</span> ou locales disponibles
        </h4>
        <CollectiviteListeContenu :contenus="carte.aides" />
      </div>

      <div v-if="carte.articles.length > 0">
        <h4 class="fr-text--xl fr-mt-6v fr-mb-2v">
          Les <span class="text--bleu">articles</span> locaux sur <i>J'agis</i>
        </h4>
        <CollectiviteListeContenu :contenus="carte.articles" />
      </div>

      <template v-for="contenu in carte.contenusSupplementaires">
        <div v-if="contenu.liste.length > 0" :key="contenu.titre">
          <h4 class="fr-text--xl fr-mt-6v fr-mb-2v" v-html="contenu.titre" />
          <ul>
            <li v-for="item in contenu.liste" :key="item" v-html="item" />
          </ul>
        </div>
      </template>

      <p v-if="carte.articles.length === 0 && carte.aides.length === 0 && carte.contenusSupplementaires.length === 0">
        Aucun contenu disponible pour l'instant !
      </p>
    </CarteDecouverte>
  </div>
</template>

<script lang="ts" setup>
  import CarteDecouverte from '@/components/custom/CollectivitesContenus/CarteDecouverte.vue';
  import CollectiviteActionsParThematiqueGraph from '@/components/custom/CollectivitesContenus/CollectiviteActionsParThematiqueGraph.vue';
  import CollectiviteListeContenu from '@/components/custom/CollectivitesContenus/CollectiviteListeContenu.vue';
  import { DonneesCollectivitesInseeViewModel } from '@/domaines/collectivites/ports/donneesCollectivitesInsee.presenter';

  defineProps<{
    collectiviteInseeViewModel: DonneesCollectivitesInseeViewModel;
  }>();
</script>
