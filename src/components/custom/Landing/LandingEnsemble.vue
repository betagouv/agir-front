<template>
  <h2 class="fr-h2 text--center"><strong class="text--italic">J'agis</strong> c’est aussi...</h2>
  <div class="grid-container">
    <div class="item1 text--center fr-px-2w background--white border-radius--md fr-py-4w">
      <span
        class="fr-icon-money-euro-circle-line border-radius--full text--beige background--beige fr-p-1w display-inline-block fr-mb-2w"
        aria-hidden="true"
      />
      <h3 class="fr-h5">Faire des économies</h3>
      <p class="fr-mb-0">Alléger le budget et les factures liées à votre consommation</p>
    </div>
    <div class="item2 text--center fr-px-2w background--white border-radius--md fr-py-4w">
      <span
        class="fr-icon-lungs-line border-radius--full text--beige background--beige fr-p-1w display-inline-block fr-mb-2w"
        aria-hidden="true"
      />
      <h3 class="fr-h5">Être en bonne santé</h3>
      <p class="fr-mb-0">Qualité de l'air, pollutions, impacts actuels</p>
    </div>
    <div class="item3">Item 3</div>
    <div class="item4 text--center fr-px-2w background--white border-radius--md fr-py-4w">
      <span
        class="fr-icon-parent-line border-radius--full text--beige background--beige fr-p-1w display-inline-block fr-mb-2w"
        aria-hidden="true"
      />
      <h3 class="fr-h5">Protéger sa famille</h3>
      <p class="fr-mb-0">Faire des choix éclairés pour les générations futures</p>
    </div>
    <div class="item5 text--center fr-px-2w background--white border-radius--md fr-py-4w">
      <span
        class="fr-icon-heart-line border-radius--full text--beige background--beige fr-p-1w display-inline-block fr-mb-2w"
        aria-hidden="true"
      />
      <h3 class="fr-h5">Préserver la nature</h3>
      <p class="fr-mb-0">Limiter les conséquences des changements déjà visibles</p>
    </div>
  </div>
</template>

<style scoped>
  .grid-container {
    display: grid;
    grid-template-columns: 1;
    gap: 2rem;
  }

  @media (min-width: 48em) {
    .grid-container {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, auto);
      gap: 2rem;
    }

    .item1 {
      grid-column: 1;
      grid-row: 1;
    }

    .item2 {
      grid-column: 1;
      grid-row: 2;
    }

    .item3 {
      height: 150px;
      grid-column: 2;
      grid-row: 1 / span 2;
    }

    .item4 {
      grid-column: 3;
      grid-row: 1;
    }

    .item5 {
      grid-column: 3;
      grid-row: 2;
    }
  }

  [class*='fr-icon-']::before {
    --icon-size: 2rem;
  }
</style>
