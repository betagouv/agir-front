<template>
  <div class="fr-modal__content fr-mb-0">
    <div class="flex flex-center fr-mb-2w">
      <img alt="" class="margin-x-auto" src="/prise-fonctionnelle.svg" />
    </div>
    <h1 id="label-id" class="fr-modal__title">Connexion établie</h1>
    <p class="fr-mb-1w">Ces informations sont-elles correctes ?</p>
    <div class="jagis-background--bleu-light">
      <ul class="text--bold list-style-none fr-p-2w">
        <li class="fr-mb-1w">{{ nom }}</li>
        <li class="text--normal fr-mb-1w">
          <span class="fr-tag fr-icon-map-pin-2-fill fr-tag--icon-left">à {{ commune }}</span>
        </li>
        <li v-if="numeroCompteurInput">Compteur #{{ numeroCompteurInput }}</li>
      </ul>
    </div>
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
