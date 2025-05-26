<template>
  <div class="background--vert text--white fr-p-3w fr-p-md-5w" id="collectivite">
    <img src="/france-localization.svg" alt="" class="fr-mb-3w" />

    <h3 class="fr-h2 text--white">Collectivités locales et territoires</h3>
    <p class="fr-text--lg">
      Disposez d'un outil gratuit pour centraliser et simplifier la mobilisation citoyenne, suivre l'impact carbone et
      mesurer l'engagement écologique
    </p>

    <ul class="fr-text--lg list-style-none text--lh-1-8 fr-mb-4w fr-pl-0 fr-pl-md-1w">
      <li class="fr-icon-success-line"><span class="text--bold">Accompagner</span> le changement des usages</li>
      <li class="fr-icon-success-line">
        <span class="text--bold">Valoriser</span> les solutions et initiatives locales
      </li>
      <li class="fr-icon-success-line">
        <span class="text--bold">Animer</span> les collectifs citoyens sur votre territoire
      </li>
    </ul>

    <router-link
      :to="{ name: RouteCollectiviteName.LANDING }"
      class="fr-btn fr-btn--secondary fr-btn--lg fr-btn--icon-right fr-icon-arrow-right-s-line shadow--none"
    >
      Prendre contact avec l'équipe
    </router-link>
  </div>
</template>

<style scoped>
  a.fr-btn--secondary {
    border: 1px solid white;
    color: white;
  }

  a.fr-btn--secondary:hover {
    background-color: var(--custom-background-vert-light);
  }

  .fr-icon-success-line::before {
    margin-right: 0.75rem;
  }
</style>
<script setup>
  import { RouteCollectiviteName } from '@/router/collectivites/routes.js';
</script>
