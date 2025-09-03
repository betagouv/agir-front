<template>
  <h2 class="fr-h3 text--lh-1-3">
    <span class="underline-courbe underline-courbe--vert">200</span> idées pour faire des économies en réduisant son
    empreinte
  </h2>

  <ul class="fr-p-0 list-style-none fr-tags-group fr-tags-group--sm fr-mb-2w">
    <li class="text--lh-1-3">
      <p class="fr-tag fr-tag--custom-bleu"><span aria-hidden="true" class="fr-pr-1v">🍛</span> Cuisine</p>
    </li>
    <li class="text--lh-1-3">
      <p class="fr-tag fr-tag--custom-bleu"><span aria-hidden="true" class="fr-pr-1v">🚅</span> Déplacements</p>
    </li>
    <li class="text--lh-1-3">
      <p class="fr-tag fr-tag--custom-bleu"><span aria-hidden="true" class="fr-pr-1v">🏠</span> Logement</p>
    </li>
    <li class="text--lh-1-3">
      <p class="fr-tag fr-tag--custom-bleu"><span aria-hidden="true" class="fr-pr-1v">💰</span> Aides financières</p>
    </li>
    <li class="text--lh-1-3"><p class="fr-tag fr-tag--custom-bleu">Solutions pratiques locales</p></li>
  </ul>

  <CreationCompteRapideFormulaire
    class="flex flex-column"
    :label="{ text: 'Juste avec un mail !' }"
    :bouton="{ class: 'fr-btn full-width text--center flex-center' }"
    input-class="full-width fr-mb-1w"
  />
</template>

<script setup lang="ts">
  import CreationCompteRapideFormulaire from '@/components/custom/CreationCompte/CreationCompteRapideFormulaire.vue';
</script>
