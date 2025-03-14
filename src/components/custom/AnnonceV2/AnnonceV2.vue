<template>
  <div class="fr-modal__content">
    <div class="fr-grid-row fr-grid-row--gutters align-items--center flex-center">
      <div class="fr-col-12 fr-col-md-8">
        <h1 id="fr-modal-title-modal-1" class="fr-modal__title">Il y a du nouveau sur J’agis !</h1>
        <p>
          Nous avons écouté vos retours et concocté une toute
          <span class="text--bold">nouvelle version</span> du service.
        </p>
        <p>
          <span class="text--bold">Personnalisez votre expérience</span> en quelques questions et obtenez des
          <span class="text--bold">idées d’actions</span> concrètes, avec tous les
          <span class="text--bold">outils</span>, <span class="text--bold">adresses</span> et
          <span class="text--bold">aides financières</span> pour y arriver !
        </p>
      </div>
      <img src="/pop-in-v2-illustration.svg" alt="" class="full-width fr-col-4" />
    </div>
  </div>
  <div class="fr-modal__footer">
    <div
      class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left"
    >
      <button class="fr-btn fr-btn--secondary fr-icon-arrow-right-line fr-btn--icon-right" @click="aContinue = true">
        Continuer
      </button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'AnnonceV2',
  };
</script>
<style scoped>
  .badge > img {
    width: 5rem;
    height: 5rem;
  }
</style>
