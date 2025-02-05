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

        <ul>
          <li v-for="aide in carte.aides" :key="aide.id">
            <router-link :to="aide.url" target="_blank">{{ aide.titre }}</router-link
            >&nbsp;<i>({{ aide.indicationGeographique }})</i>
          </li>
        </ul>
      </div>

      <div v-if="carte.articles.length > 0">
        <p class="fr-m-0">Les <span class="text--bold">articles</span> <i>J'agis</i> :</p>
        <ul>
          <li v-for="article in carte.articles" :key="article.id">
            <router-link :to="article.url">{{ article.titre }}</router-link>
            ({{ article.indicationGeographique }})
          </li>
        </ul>
      </div>

      <p v-if="carte.articles.length === 0 && carte.aides.length === 0">Aucun contenu disponible pour l'instant !</p>
    </CarteDecouverte>
  </div>
</template>

<script setup lang="ts">
  import CarteDecouverte from '@/components/custom/Collectivites/CarteDecouverte.vue';
  import { DonneesCollectivitesInseeViewModel } from '@/domaines/collectivites/ports/donneesCollectivitesInsee.presenter';

  defineProps<{
    collectiviteInseeViewModel: DonneesCollectivitesInseeViewModel;
  }>();
</script>
