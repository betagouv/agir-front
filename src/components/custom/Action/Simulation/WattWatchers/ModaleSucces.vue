<template>
  <div class="fr-modal__content fr-mb-0">
    <div class="flex flex-center fr-mb-2w">
      <img alt="" class="margin-x-auto" src="/prise-fonctionnelle.svg" />
    </div>
    <h1 id="label-id" class="fr-modal__title">Connexion établie</h1>
    <p class="fr-mb-1w">
      La connexion a été établie avec succès. Dans le futur, pour modifier vos informations, rendez-vous dans votre
      profil.
    </p>
  </div>
  <div class="fr-modal__footer fr-mt-0">
    <ul
      class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left"
    >
      <li>
        <button class="fr-btn" @click="passerEtapeSuivante">Continuer</button>
      </li>
      <li>
        <button class="fr-btn fr-btn--secondary" @click="retour">Modifier le numéro</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    modaleId: string;
    numeroCompteurInput?: string;
    nom: string;
    commune: string;
    passerEtapeSuivante: () => void;
    retour: () => void;
  }>();
</script>

<style scoped>
  .accordeon-prm img {
    height: 7.5rem;
  }

  .accordeon-prm h4 {
    font-size: 1.1rem;
  }
</style>
