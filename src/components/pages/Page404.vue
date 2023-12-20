<template>
  <div class="fr-container">
    <div class="fr-mt-md-12w fr-mb-md-10w fr-grid-row fr-grid-row--gutters fr-grid-row--middle fr-grid-row--center">
      <div class="fr-py-0 fr-col-12 fr-col-md-6">
        <h1>Page non trouvée</h1>
        <p class="fr-text--sm fr-mb-3w">Erreur 404</p>
        <p class="fr-text--lead fr-mb-3w">
          La page que vous cherchez est introuvable. Excusez-nous pour la gène occasionnée.
        </p>
        <p class="fr-text--sm fr-mb-5w">
          Si vous avez tapé l'adresse web dans le navigateur, vérifiez qu'elle est correcte. La page n’est peut-être
          plus disponible.<br />
          Dans ce cas, pour continuer votre visite vous pouvez consulter notre page d’accueil.
        </p>
        <router-link class="fr-btn" :to="{ name: RouteCoachName.COACH }">Page d'accueil</router-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { RouteCoachName } from '@/router/coach/routes';
</script>
