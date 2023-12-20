<template>
  <div class="fr-container fr-py-6w">
    <div class="background--white border border-radius--md fr-col-lg-6 fr-p-3w fr-mx-auto">
      <img alt="" src="/logo.svg" />
      <h1 class="fr-mt-2w">Merci pour votre intérêt !</h1>
      <h2 class="fr-h4">Malheureusement, votre adresse électronique ne fait pas partie de la liste autorisée.</h2>
      <p>Ce service est <span class="fr-text--bold">en cours d’expérimentation et sur invitation uniquement.</span></p>
      <p class="fr-mt-2w">Nous ouvrirons le service à tous, très prochainement.</p>
      <p class="fr-my-2w">
        En attendant, vous pouvez vous inscrire à la liste d’attente pour être informé de l’ouverture du service.
      </p>
      <a class="fr-icon-mail-line fr-icon--xs fr-text-action-high--blue-france" href="mailto:contact@agir.beta.gouv.fr">
        contact@agir.beta.gouv.fr</a
      >

      <div class="fr-grid-row">
        <router-link class="fr-btn fr-mt-5v" :to="{ name: RouteCompteName.CREATION_COMPTE }">
          Se connecter avec une autre adresse électronique
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { RouteCompteName } from '@/router/compte/routes.js';
</script>
