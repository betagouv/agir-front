<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
    <div class="fr-col-md-8">
      <h2 class="fr-h4 text--white">Vous changez de situation perso ou pro ?</h2>
      <p class="text--white text--bold fr-text--xl">
        Le coach vous conseille et vous accompagne à tout moment avec des conseils et actions adaptées à vos
        changements.
      </p>
      <ul class="fr-m-0 text--underline fr-text--xl text--white">
        <li>Vous attendez un enfant</li>
        <li>Vous déménagez</li>
        <li>Vous changez d’emploi</li>
      </ul>
    </div>
    <div class="fr-col-md-4">
      <router-link :to="{ name: 'mon-compte' }" class="fr-btn fr-btn--icon-left fr-icon-user-heart-line border--white">
        Signalez un changement
      </router-link>
    </div>
  </div>
</template>
