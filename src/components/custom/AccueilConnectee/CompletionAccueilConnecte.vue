<template>
  <div class="background">
    <img class="illustration" src="/accueil-connecte-illustration.svg" alt="" />
    <img class="fleche" src="/accueil-connecte-fleche.png" alt="" />

    <div class="fr-container full-height flex flex-column flex-center marginBottomResponsive fr-pb-md-5w contenu">
      <div class="fr-grid-row fr-grid-row--gutters fr-mb-5w">
        <div class="fr-col-12 fr-col-md-7">
          <div class="fr-pt-3w fr-pt-md-0">
            <h1 class="fr-h1 fr-mr-3w">Des solutions ensemble, pour la transition écologique</h1>
            <ul class="fr-grid-row fr-grid-row--gutters list-style-none fr-pl-0 fr-mb-2w fr-text--lg">
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
          </div>
        </div>

        <div class="fr-col-12 fr-col-md-5">
          <div class="background--white shadow fr-p-2w">
            <h2 class="fr-h3 fr-mb-1w">Ma progression</h2>
            <div class="fr-grid-row">
              <div class="fr-col-6 fr-p-1w">
                <p class="flex flex-column align-items--center fr-mb-1w text--center">
                  <span class="gros-nombre">0</span> <span>Action terminée</span>
                </p>
              </div>
              <div class="fr-col-6 fr-p-1w flex flex-column align-items--center">
                <p class="flex flex-column align-items--center fr-mb-3v text--center">
                  <span class="gros-nombre">0%</span> <span>Mon bilan environnemental</span>
                </p>
                <a class="fr-link fr-link--icon-right fr-icon-arrow-right-line" href="">Compléter</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="breaker"></div>
</template>

<script setup lang="ts">
  import { AccueilConnecteViewModel } from '@/domaines/accueilConnecte/ports/accueilConnecte.presenter';

  defineProps<{
    progression: AccueilConnecteViewModel['progression'] | undefined;
  }>();
</script>

<style scoped>
  .background {
    position: relative;
    background-image: url('/accueil-connecte-background.webp');
    background-size: cover;
  }

  .background > div {
    position: relative;
    z-index: 1;
  }

  h1.fr-h1 {
    font-size: 2.75rem !important;
    line-height: 3.5rem !important;
  }

  .illustration {
    position: absolute;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 0;

    @media (max-width: 48em) {
      width: 100%;
    }
  }

  .fleche {
    position: absolute;
    bottom: -2%;
    left: 20%;
    width: 12.5rem;
    height: 12.5rem;
    z-index: 2;

    @media (max-width: 48em) {
      bottom: -5%;
      left: -7%;
    }
  }

  .gros-nombre {
    font-size: 2.5rem;
    font-weight: bold;
    margin: 1.5rem 0;
  }

  .breaker {
    position: relative;
    z-index: 1;
    background: white;
    height: 10vh;
    width: 120%;
    transform: translateX(-10%) translateY(-6vh) rotate(3deg);
  }

  .marginBottomResponsive {
    padding-bottom: 15rem;
  }

  .contenu {
    min-height: 70vh;
  }
</style>
