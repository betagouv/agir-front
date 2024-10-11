<template>
  <h2 class="fr-h2 text--center"><strong class="text--italic">J'agis</strong> c’est aussi...</h2>
  <div class="grid-container">
    <div class="item1 fr-p-1w">
      <div class="text--center fr-px-2w background--white border-radius--md fr-py-4w">
        <span
          class="fr-icon-money-euro-circle-line border-radius--full text--beige background--beige fr-p-2w display-inline-block fr-mb-2w"
          aria-hidden="true"
        />
        <h3 class="fr-h5 fr-mb-1w">Faire des économies</h3>
        <p class="fr-mb-0">Alléger le budget et les factures liées à votre consommation</p>
      </div>
    </div>
    <div class="item2 fr-p-1w">
      <div class="text--center fr-px-2w background--white border-radius--md fr-py-4w">
        <span
          class="fr-icon-lungs-line border-radius--full text--beige background--beige fr-p-2w display-inline-block fr-mb-2w"
          aria-hidden="true"
        />
        <h3 class="fr-h5 fr-mb-1w">Être en bonne santé</h3>
        <p class="fr-mb-0">Qualité de l'air, pollutions, impacts actuels</p>
      </div>
    </div>
    <div class="item3 fr-p-1w">
      <div class="border-radius--md flex flex-column full-height">
        <p class="text--center fr-px-2w fr-pt-6w text--lh-1-8 fr-mb-0">
          <span class="fr-h1 text--bold">473 902</span>
          <br />kg de CO2-e économisés<br />
          <span class="fr-h6 text--bold">ensemble</span>
        </p>
        <img src="/hp-ensemble.png" class="fr-mt-auto max-full-width" alt="" />
      </div>
    </div>
    <div class="item4 fr-p-1w">
      <div class="text--center background--white border-radius--md fr-px-2w md fr-py-4w">
        <span
          class="fr-icon-parent-line border-radius--full text--beige background--beige fr-p-2w display-inline-block fr-mb-2w"
          aria-hidden="true"
        />
        <h3 class="fr-h5 fr-mb-1w">Protéger sa famille</h3>
        <p class="fr-mb-0">Faire des choix éclairés pour les générations futures</p>
      </div>
    </div>
    <div class="item5 fr-p-1w">
      <div class="text--center fr-px-2w background--white border-radius--md fr-py-4w">
        <span
          class="fr-icon-heart-line border-radius--full text--beige background--beige fr-p-2w display-inline-block fr-mb-2w"
          aria-hidden="true"
        />
        <h3 class="fr-h5 fr-mb-1w">Préserver la nature</h3>
        <p class="fr-mb-0">Limiter les conséquences des changements déjà visibles</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .grid-container {
    display: grid;
    grid-template-columns: 1;
  }

  .item3 > div {
    background-color: #e3d6c5;
  }

  @media (min-width: 48em) {
    .grid-container {
      grid-template-columns: 30% 40% 30%;
      grid-template-rows: repeat(2, auto);
    }

    .item1 {
      grid-column: 1;
      grid-row: 1;
      padding-left: 0 !important;
    }

    .item2 {
      grid-column: 1;
      grid-row: 2;
      padding-left: 0 !important;
    }

    .item3 {
      grid-column: 2;
      grid-row: 1 / span 2;
    }

    .item4 {
      grid-column: 3;
      grid-row: 1;
      padding-right: 0 !important;
    }

    .item5 {
      grid-column: 3;
      grid-row: 2;
      padding-right: 0 !important;
    }
  }

  [class*='fr-icon-']::before {
    --icon-size: 2rem;
  }
</style>
