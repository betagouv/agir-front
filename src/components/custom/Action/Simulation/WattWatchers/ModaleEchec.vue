<template>
  <div class="fr-modal__content fr-mb-0">
    <div class="flex flex-center fr-mb-2w">
      <img src="/prise-non-fonctionnelle.svg" alt="" class="margin-x-auto" />
    </div>
    <h1 id="label-id" class="fr-modal__title">La connexion a échouée</h1>
    <p class="fr-mb-1w">Nous n’avons pas trouvé de compteur relié aux informations que nous vous avez données.</p>
  </div>
  <div class="fr-modal__footer fr-mt-0">
    <ul
      class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left"
    >
      <li class="force-full-width">
        <button class="fr-btn force-full-width" @click="modifierNumero">Renseigner mon numéro de compteur</button>
      </li>
      <li class="force-full-width">
        <button class="fr-btn fr-btn--secondary force-full-width" @click="retour">Retour</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    modaleId: string;
    modifierNumero: () => void;
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

  .force-full-width {
    width: 100%;
  }
</style>
