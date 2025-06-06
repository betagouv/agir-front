<template>
  <div class="position--relative">
    <div class="fr-container fr-py-md-16w fr-py-6w">
      <div class="fr-mx-auto fr-col-md-7 text--center flex flex-column align-items--center">
        <h1 class="fr-h1 fr-display--xs">Des solutions pour la transition écologique à mon échelle</h1>
        <ul class="fr-grid-row fr-grid-row--gutters list-style-none fr-pl-0 fr-mb-2w flex-center">
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
        <div class="fr-grid-row fr-col-md-6 fr-col-sm-8 fr-col-12">
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
              rel="noopener noreferrer"
              class="fr-btn background--none no_blank fr-p-0"
            >
              <img src="/bouton-app-store.svg" alt="Télécharger dans l'App Store" class="display-block full-width" />
            </a>
          </div>
          <div class="fr-col-6 fr-p-1v">
            <a
              href="https://play.google.com/store/apps/details?id=fr.gouv.agir"
              target="_blank"
              rel="noopener noreferrer"
              class="fr-btn background--none no_blank fr-p-0"
            >
              <img src="/bouton-google-play.svg" alt="Disponible sur Google Play" class="display-block full-width" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="illustrations-wrapper">
      <img src="/hp-hero-perso1.webp" alt="" class="illustration-perso1" />
      <img src="/hp-hero-perso1-feuille.svg" alt="" class="illustration-perso1-feuille fr-hidden fr-unhidden-sm" />

      <img src="/hp-hero-perso2.webp" alt="" class="illustration-perso2" />
      <img src="/hp-hero-perso2-feuille.svg" alt="" class="illustration-perso2-feuille fr-hidden fr-unhidden-md" />
    </div>
  </div>

  <div class="position--relative breaker-et-compteur">
    <div class="breaker"></div>

    <h2
      class="fr-h2 text--white text--center flex flex-column flex-center align-items--center compteur-absolute full-width"
      :aria-label="`${nombreActions ?? 0} actions réalisées ensemble partout en France`"
    >
      <CompteurDynamique :valeur="nombreActions ?? 0" background="rgb(52, 68, 159)" />
      <span class="fr-mt-2w text-olive fr-text--xl text--lh-1-3">
        Actions réalisées ensemble
        <br aria-hidden="true" />
        partout en France
      </span>
    </h2>
  </div>

  <div class="background--olive-clair fr-pt-16w fr-pb-2w">
    <div class="ciseau-bg"></div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import CompteurDynamique from '@/components/custom/AccueilConnectee/CompteurDynamique.vue';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { CompterActionsUsecase } from '@/domaines/actions/compterActions.usecase';
  import { RouteCompteName } from '@/router/compte/routeCompteName';

  const nombreActions = ref<number>(0);
  const compterActionsUsecase = new CompterActionsUsecase(new ActionsRepositoryAxios());
  onMounted(async () => {
    nombreActions.value = await compterActionsUsecase.execute();
  });
</script>

<style scoped>
  @media (max-width: 48em) {
    .illustrations-wrapper {
      display: flex;
      max-width: 100vw;
      position: relative;
      justify-content: space-between;
    }
  }

  .compteur-absolute {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);

    @media (max-width: 48em) {
      top: 0;
    }
  }

  .illustration-perso1,
  .illustration-perso2 {
    position: absolute;
    bottom: 0;
    max-height: 80%;
    max-width: 40%;

    @media (max-width: 48em) {
      position: relative;
      bottom: auto;
      left: auto;
      right: auto;
      max-width: 50%;
      max-height: 40vh;
    }
  }

  .illustration-perso1 {
    left: 0;
    z-index: 1;
  }

  .illustration-perso1-feuille {
    @media (max-width: 48em) {
      left: 12% !important;
    }
    left: 0;
    z-index: 0;
    position: absolute;
    bottom: 0;
  }

  .illustration-perso2 {
    right: 0;
    z-index: 1;
  }

  .illustration-perso2-feuille {
    right: 12%;
    z-index: 0;
    position: absolute;
    bottom: -2%;
  }

  .breaker-et-compteur {
    margin-top: -3rem;
    z-index: 2;
  }

  .text-olive {
    color: #656357;
  }

  .ciseau-bg {
    height: 4rem;
    width: 100%;
    background-image: url('/ciseau-decoupe.svg');
    background-repeat: no-repeat;
    background-size: 350%;
    background-position: 15% center;

    @media (min-width: 36em) {
      background-size: 250%;
    }

    @media (min-width: 48em) {
      background-size: 200%;
    }

    @media (min-width: 62em) {
      background-size: 100%;
    }
  }

  .breaker {
    background-image: url('/breaker_hp_non_connecte.svg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 10vh;
  }
</style>
