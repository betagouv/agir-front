<template>
  <h2 class="fr-h2 fr-mb-6w text--center">Un titre pour l'a11y sivouuuuplééé</h2>
  <ul class="fr-grid-row flex-space-around fr-grid-row--gutters">
    <li class="fr-col-md-5 fr-col-12 fr-grid-row align-items--start">
      <div class="border--beige fr-p-1v fr-mr-2w border-radius--l">
        <span
          class="fr-icon-money-euro-circle-line fr-p-1w background--white display-block border-radius--l text--beige"
          aria-hidden="true"
        />
      </div>
      <div class="fr-col">
        <h3 class="fr-h6 fr-mb-0">Des aides et subventions</h3>
        <p class="fr-mb-0">Découvrez tous les dispositifs qui vous donneront les moyens d’agir</p>
      </div>
    </li>
    <li class="fr-col-md-5 fr-col-12 fr-grid-row align-items--start">
      <div class="border--beige fr-p-1v fr-mr-2w border-radius--l">
        <span
          class="fr-icon-stethoscope-line fr-p-1w background--white display-block border-radius--l text--beige"
          aria-hidden="true"
        />
      </div>
      <div class="fr-col">
        <h3 class="fr-h6 fr-mb-0">Votre bilan</h3>
        <p class="fr-mb-0">Faites le point sur vos habitudes et suivez votre progression au fil du temps</p>
      </div>
    </li>
    <li class="fr-col-md-5 fr-col-12 fr-grid-row align-items--start">
      <div class="border--beige fr-p-1v fr-mr-2w border-radius--l">
        <span
          class="fr-icon-store-line fr-p-1w background--white display-block border-radius--l text--beige"
          aria-hidden="true"
        />
      </div>
      <div class="fr-col">
        <h3 class="fr-h6 fr-mb-0">Des solutions locales</h3>
        <p class="fr-mb-0">Trouvez toutes les initiatives et informations autour de chez vous</p>
      </div>
    </li>
    <li class="fr-col-md-5 fr-col-12 fr-grid-row align-items--start">
      <div class="border--beige fr-p-1v fr-mr-2w border-radius--l">
        <span
          class="fr-icon-search-line fr-p-1w background--white display-block border-radius--l text--beige"
          aria-hidden="true"
        />
      </div>
      <div class="fr-col">
        <h3 class="fr-h6 fr-mb-0">De l'info</h3>
        <p class="fr-mb-0">Comprenez ce qui se cache derrière vos choix du quotidien avec nos contenus ludiques</p>
      </div>
    </li>
  </ul>
</template>

<style scoped>
  [class*='fr-icon-']::before {
    --icon-size: 2rem;
  }
</style>
