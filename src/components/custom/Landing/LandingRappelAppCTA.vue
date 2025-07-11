<template>
  <div class="background--vert fr-py-12w rappel-app-cta">
    <div class="fr-container">
      <div class="fr-col-md-6 fr-col-12 text--white">
        <h2 class="fr-h2 fr-mb-1w text--white"><i class="text--italic">J'agis</i> sur l'application mobile</h2>
        <p class="text--lh-1-8">
          L'application <i class="text--italic">J'agis</i> répond à toutes vos questions et guide vos réflexions du
          quotidien, au moment où vous en avez besoin.
        </p>
        <div class="fr-grid-row fr-col-md-6 fr-col-12">
          <div class="fr-col-6 fr-p-1v">
            <a
              href="https://play.google.com/store/apps/details?id=fr.gouv.agir"
              target="_blank"
              class="fr-btn background--none no_blank fr-p-0"
            >
              <img src="/bouton-google-play.svg" alt="Disponible sur Google Play" class="display-block full-width" />
            </a>
          </div>
          <div class="fr-col-6 fr-p-1v">
            <a
              href="https://apps.apple.com/fr/app/jagis/id6504984321"
              target="_blank"
              class="fr-btn background--none no_blank fr-p-0"
            >
              <img src="/bouton-app-store.svg" alt="Télécharger dans l'App Store" class="display-block full-width" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @media (min-width: 48rem) {
    .rappel-app-cta {
      background-image: url('/hp-background-rappel-app-cta.webp');
      background-position: 75% bottom;
      background-repeat: no-repeat;
      background-size: auto 90%;
    }
  }
</style>
