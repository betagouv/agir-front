<template>
  <div class="position--relative">
    <img src="/accueil-connecte-fleurs.svg" class="image-border-bottom-right fr-hidden fr-unhidden-md" alt="" />

    <div class="fr-container fr-grid-row fr-py-3w paddingVariable position--relative">
      <img src="/accueil-connecte-mobile.webp" loading="lazy" class="image-mobile fr-hidden fr-unhidden-lg" alt="" />
      <div class="fr-col-12 fr-col-lg-5"></div>
      <div class="fr-col-12 fr-col-lg-7">
        <h2 class="fr-h2"><i>J'agis</i> est sur mobile !</h2>

        <p>
          L'application <i class="text--italic">J'agis</i> répond à toutes vos questions et guide vos réflexions du
          quotidien, au moment où vous en avez besoin.
        </p>

        <div class="flex gap--small">
          <div class="fr-p-1v">
            <a
              href="https://play.google.com/store/apps/details?id=fr.gouv.agir"
              target="_blank"
              class="fr-btn background--none no_blank fr-p-0"
            >
              <img
                src="/bouton-google-play.svg"
                loading="lazy"
                alt="Disponible sur Google Play"
                class="display-block full-width"
              />
            </a>
          </div>
          <div class="fr-p-1v">
            <a
              href="https://apps.apple.com/fr/app/jagis/id6504984321"
              target="_blank"
              class="fr-btn background--none no_blank fr-p-0"
            >
              <img
                src="/bouton-app-store.svg"
                loading="lazy"
                alt="Télécharger dans l'App Store"
                class="display-block full-width"
              />
            </a>
          </div>
        </div>
      </div>
    </div>

    <img
      src="/accueil-connecte-mobile.webp"
      loading="lazy"
      class="fr-hidden-lg full-width display-block widthVariable"
      alt=""
    />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
  .image-mobile {
    position: absolute;
    bottom: 0;
    left: -7%;
    height: 100%;
  }
  .image-border-bottom-right {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .widthVariable {
    @media (min-width: 576px) {
      margin: 0 auto;
      width: 75%;
    }
    @media (min-width: 992px) {
      margin: 0 auto;
      width: 50%;
    }
  }
  .paddingVariable {
    @media (min-width: 992px) {
      padding-bottom: 6.5rem !important;
    }
    @media (min-width: 992px) {
      padding-top: 5rem !important;
    }
  }
</style>
