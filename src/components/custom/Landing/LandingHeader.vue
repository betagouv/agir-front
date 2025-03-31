<template>
  <div class="fr-container fr-my-md-16w">
    <div class="fr-mx-auto fr-col-md-7 text--center flex flex-column align-items--center">
      <h1>Des solutions pour la transition écologique à mon échelle</h1>
      <ul class="fr-grid-row fr-grid-row--gutters list-style-none fr-pl-0 fr-mb-2w">
        <li class="fr-col-auto">
          <span class="fr-icon-check-line text--vert" aria-hidden="true" />
          Selon mes moyens
        </li>
        <li class="fr-col-auto">
          <span class="fr-icon-check-line text--vert" aria-hidden="true" />
          Selon mes lieux de vie
        </li>
        <li class="fr-col-auto">
          <span class="fr-icon-check-line text--vert" aria-hidden="true" />
          Selon mes envies
        </li>
      </ul>
      <div class="fr-grid-row fr-col-md-6 fr-col-12">
        <span class="fr-col-12 fr-p-1v">
          <router-link
            class="fr-btn full-width fr-btn--lg display-block text--center"
            :to="{ name: RouteCompteName.CREATION_COMPTE }"
          >
            Créer mon compte
          </router-link>
        </span>
        <div class="fr-col-6 fr-p-1v">
          <a
            href="https://apps.apple.com/fr/app/jagis/id6504984321"
            target="_blank"
            class="fr-btn background--none no_blank fr-p-0"
          >
            <img src="/bouton-app-store.svg" alt="Télécharger dans l'App Store" class="display-block full-width" />
          </a>
        </div>
        <div class="fr-col-6 fr-p-1v">
          <a
            href="https://play.google.com/store/apps/details?id=fr.gouv.agir"
            target="_blank"
            class="fr-btn background--none no_blank fr-p-0"
          >
            <img src="/bouton-google-play.svg" alt="Disponible sur Google Play" class="display-block full-width" />
          </a>
        </div>
      </div>
    </div>
  </div>
  <!--  <div class="color-change position&#45;&#45;relative">-->
  <!--    <div class="mask background&#45;&#45;main">-->
  <!--      <img src="/etagere-vide.webp" alt="" />-->
  <!--    </div>-->
  <!--  </div>-->

  <div class="background--olive-clair">
    <div class="fr-container">
      <h2 class="fr-h2 text--white text--center flex flex-column flex-center align-items--center">
        <CompteurDynamique :valeur="42" background="#34449f" />
        <span class="fr-mt-2w text-olive fr-text--xl">
          Actions réalisées ensemble
          <br aria-hidden="true" />
          partout en France
        </span>
      </h2>
    </div>

    <img src="/ciseau-decoupe.svg" alt="" class="ciseau" />
  </div>
</template>

<script setup lang="ts">
  import CompteurDynamique from '@/components/custom/AccueilConnectee/CompteurDynamique.vue';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
</script>

<style scoped>
  .text-olive {
    color: #656357;
  }

  .ciseau {
    width: 100%;
  }

  /*.breaker {
    background-color: #ecebe0;
    height: 10vh;
  }*/

  /*.mask {
  //  position: absolute;
  //  clip-path: ellipse(50% 50% at 50% 50%);
  //  width: 100%;
  //  height: 10vh;
  //} */
</style>
