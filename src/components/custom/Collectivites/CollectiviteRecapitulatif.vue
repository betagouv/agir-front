<template>
  <h2 class="fr-h3">
    <i>J'agis</i> en quelques chiffres pour <i>{{ collectiviteInseeViewModel.nom }}</i> !
  </h2>

  <p v-html="collectiviteInseeViewModel.indicationNombreUtilisateurs" />
  <p v-html="collectiviteInseeViewModel.indicationAidesEtArticles" />

  <div class="fr-grid-row fr-grid-row--gutters">
    <CarteDecouverte
      v-for="carte in collectiviteInseeViewModel.cartesThematiques"
      :key="carte.titre"
      :titre-emoji="carte.emoji"
      :titre-texte="carte.titre"
    >
      <div v-if="carte.aides.length > 0">
        <p class="fr-m-0">Les <span class="text--bold">aides</span> disponibles :</p>
        <CollectiviteListeContenu :contenus="carte.aides" />
      </div>

      <div v-if="carte.articles.length > 0">
        <p class="fr-m-0">Les <span class="text--bold">articles</span> <i>J'agis</i> :</p>
        <CollectiviteListeContenu :contenus="carte.articles" />
      </div>

      <template v-for="contenu in carte.contenusSupplementaires">
        <div :key="contenu.titre" v-if="contenu.liste.length > 0">
          <p class="fr-m-0" v-html="contenu.titre" />
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

<script setup lang="ts">
  import CarteDecouverte from '@/components/custom/Collectivites/CarteDecouverte.vue';
  import CollectiviteListeContenu from '@/components/custom/Collectivites/CollectiviteListeContenu.vue';
  import { DonneesCollectivitesInseeViewModel } from '@/domaines/collectivites/ports/donneesCollectivitesInsee.presenter';

  defineProps<{
    collectiviteInseeViewModel: DonneesCollectivitesInseeViewModel;
  }>();
</script>
