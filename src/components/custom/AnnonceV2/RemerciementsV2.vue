<template>
  <div class="fr-modal__content">
    <div class="fr-grid-row fr-grid-row--gutters fr-mb-2w align-items--center flex-center">
      <div class="fr-col-12 fr-col-md-8">
        <h1 id="fr-modal-title-modal-1" class="fr-modal__title">Merci pour votre soutien !</h1>
        <p>
          Vous avez fait partie des <span class="text--bold">premiers utilisateurs</span> à tester ce nouveau service, à
          nous faire vos retours, et nous permettre de nous améliorer.
        </p>
        <p>
          Pour cela, nous aimerions vous remercier avec <span class="text--bold">ce badge</span> et 100
          <img src="/ic_score.svg" alt="points" /> pour commencer cette
          <span class="text--bold">nouvelle aventure</span>...
        </p>
      </div>
      <img src="/badge-pionnier-illustration.png" alt="" class="illustration fr-col-4" />
    </div>
    <div class="badge flex align-items--center">
      <img src="/badge-pionnier.png" alt="" />
      <div>
        <p class="fr-h4 fr-mb-0">Pionnier</p>
        <p class="fr-mb-0">Présent depuis les premiers jours</p>
      </div>
    </div>
  </div>
  <div class="fr-modal__footer">
    <div
      class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left"
    >
      <button class="fr-btn fr-btn--secondary fr-icon-arrow-right-line fr-btn--icon-right" @click="aContinue = true">
        Récolter 100&nbsp;<img src="/ic_score.svg" alt="points" />
      </button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'RemerciementsV2',
  };
</script>
<style scoped>
  .badge {
    border: 1px solid var(--blue-france-950-100);
    background-color: rgba(245, 245, 254, 0.3);
  }

  .badge > img {
    width: 5rem;
    height: 5rem;
  }

  .illustration {
    object-fit: contain;
  }
</style>
