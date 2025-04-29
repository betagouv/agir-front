<template>
  <div class="background">
    <img alt="" class="illustration" src="/accueil-connecte-illustration.svg" />
    <img alt="" class="fleche" src="/accueil-connecte-fleche.webp" />

    <div class="fr-container full-height flex flex-column flex-center marginBottomResponsive fr-pb-md-5w contenu">
      <div class="fr-grid-row fr-grid-row--gutters fr-mb-5w">
        <div class="fr-col-12 fr-col-md-7">
          <div class="fr-pt-3w fr-pt-md-0 fr-my-3w fr-mr-3w">
            <h1 class="fr-h1 fr-mr-3w">Des solutions pour la transition écologique à mon échelle</h1>
            <ul class="fr-grid-row fr-grid-row--gutters list-style-none fr-pl-0 fr-mb-2w fr-text--lg">
              <li class="fr-col-auto">
                <span aria-hidden="true" class="fr-icon-check-line text--vert" />
                Selon mes moyens
              </li>
              <li class="fr-col-auto">
                <span aria-hidden="true" class="fr-icon-check-line text--vert" />
                Selon mes lieux de vie
              </li>
              <li class="fr-col-auto">
                <span aria-hidden="true" class="fr-icon-check-line text--vert" />
                Selon mes envies
              </li>
            </ul>
          </div>
        </div>

        <div v-if="progression" class="fr-col-12 fr-col-md-5">
          <div class="background--white shadow fr-pb-2w">
            <h2 class="fr-h3 fr-mb-1w fr-p-3w fr-pb-0">Ma progression</h2>
            <div class="fr-grid-row">
              <div class="fr-col-6">
                <p
                  class="flex flex-column align-items--center flex-space-around text--center bordure-droite fr-mr-md-3v"
                >
                  <span class="gros-nombre">{{ progression.nombreActionsTerminees || 0 }}</span>
                  {{ gererPluriel(progression.nombreActionsTerminees || 0, 'Action terminée', 'Actions terminées') }}
                </p>
              </div>
              <div
                v-if="progression.pourcentageCompletionBilan < 100"
                class="fr-col-6 flex flex-column align-items--center"
              >
                <p class="flex flex-column align-items--center fr-mb-3v text--center">
                  <CercleProgression :pourcentage="progression.pourcentageCompletionBilan || 0" class="fr-mb-1w" />
                  <span>Mon empreinte écologique</span>
                </p>
                <router-link
                  :to="{ name: RouteBilanCarboneName.BILAN_CARBONE }"
                  class="fr-link fr-link--icon-right fr-icon-arrow-right-line"
                  >Compléter
                </router-link>
              </div>
              <div v-else class="fr-col-6 flex flex-column align-items--center flex-space-around">
                <p class="text--center fr-mb-0">
                  <span class="gros-nombre fr-text--bold fr-mt-4w" v-text="progression.tonneBilan" />
                  <span class="text--3xl fr-text--bold">T</span>
                  <span>/ an</span>
                </p>
                <router-link
                  :to="{ name: RouteBilanCarboneName.BILAN_CARBONE }"
                  class="fr-link fr-link--icon-right fr-icon-arrow-right-line text--center"
                  >Mon empreinte<br aria-hidden="true" />
                  écologique
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="breaker"></div>
  <div class="breaker-placeholder"></div>
</template>

<script lang="ts" setup>
  import CercleProgression from '@/components/custom/CercleProgression.vue';
  import { AccueilConnecteViewModel } from '@/domaines/accueilConnecte/ports/accueilConnecte.presenter';
  import { RouteBilanCarboneName } from '@/router/bilanCarbone/routes';
  import { gererPluriel } from '@/shell/pluriel';

  defineProps<{
    progression: AccueilConnecteViewModel['progression'] | undefined;
  }>();
</script>

<style scoped>
  .background {
    position: relative;
    background-color: #f6f4f0;
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
    bottom: -5%;
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
    margin-bottom: 2.5rem;
    padding-top: 1.75rem;
  }

  .breaker {
    position: absolute;
    z-index: 1;
    background: white;
    height: 10vh;
    width: 100%;
    transform: translateY(-6vh);
    clip-path: polygon(0 0, 100% 40%, 100% 100%, 0 100%);
  }

  .breaker-placeholder {
    background: white;
    height: 7.5vh;
  }

  .marginBottomResponsive {
    padding-bottom: 15rem;
  }

  .contenu {
    min-height: 70vh;
  }

  .bordure-droite {
    border-right: 2px solid #eaeaea;
  }
</style>
