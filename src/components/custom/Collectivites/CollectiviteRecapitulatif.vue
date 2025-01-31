<template>
  <div class="background--white fr-p-4w shadow">
    <h2 class="fr-h3">
      <i>J'agis</i> en quelques chiffres pour <i>{{ collectiviteInseeViewModel.nom }}</i> !
    </h2>

    <!--    <p v-if="collectiviteInseeViewModel.listeCommunesPourEPCI" class="fr-mt-0">-->
    <!--      Composé de {{ collectiviteInseeViewModel.listeCommunesPourEPCI }}-->
    <!--    </p>-->

    <p v-html="collectiviteInseeViewModel.indicationNombreUtilisateurs"></p>
    <p v-html="collectiviteInseeViewModel.indicationAidesEtArticles"></p>

    <div class="fr-grid-row fr-mt-5w">
      <div class="fr-col-12 fr-col-sm-6" v-if="collectiviteInseeViewModel.aides.length !== 0">
        <h3 class="fr-h4"><span aria-hidden="true">📌 </span>Les aides</h3>

        <div class="fr-accordions-group">
          <Accordeon
            v-for="aidesAccordeon in collectiviteInseeViewModel.aides"
            :name-id="aidesAccordeon.id"
            :key="aidesAccordeon.id"
          >
            <template v-slot:titre>{{ aidesAccordeon.titre }}</template>
            <template v-slot:contenu>
              <ul>
                <li v-for="aide in aidesAccordeon.contenu" :key="aide.id">
                  <router-link :to="aide.url" target="_blank">{{ aide.titre }}</router-link>
                </li>
              </ul>
            </template>
          </Accordeon>
        </div>
      </div>

      <div class="fr-col-12 fr-col-sm-6" v-if="collectiviteInseeViewModel.articles.length !== 0">
        <h3 class="fr-h4"><span aria-hidden="true">🗞️ </span>Les articles</h3>
        <div class="fr-accordions-group">
          <Accordeon
            v-for="articlesAccordeon in collectiviteInseeViewModel.articles"
            :name-id="articlesAccordeon.id"
            :key="articlesAccordeon.id"
          >
            <template v-slot:titre>{{ articlesAccordeon.titre }}</template>
            <template v-slot:contenu>
              <ul>
                <li v-for="article in articlesAccordeon.contenu" :key="article.id">
                  <router-link :to="article.url" target="_blank">{{ article.titre }}</router-link>
                </li>
              </ul>
            </template>
          </Accordeon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Accordeon from '@/components/dsfr/Accordeon.vue';
  import { DonneesCollectivitesInseeViewModel } from '@/domaines/collectivites/ports/donneesCollectivitesInsee.presenter';

  defineProps<{
    collectiviteInseeViewModel: DonneesCollectivitesInseeViewModel;
  }>();
</script>

<style>
  .fr-accordions-group {
    width: 90%;
  }
</style>
