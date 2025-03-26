<template>
  <div class="fr-container fr-py-6w">
    <h1>Plan du site</h1>
    <ul v-if="!estConnecte">
      <li><a href="/">Accueil</a></li>
      <li><a href="/authentification">Authentification</a></li>
      <li><a href="/mentions-legales">Mention légales</a></li>
      <li><a href="/accessibilite">Accessibilité</a></li>
      <li><a href="/cgu">Conditions générales d'utilisation</a></li>
      <li><a href="/politique-de-confidentialite">Politique de confidentialité</a></li>
      <li><a href="/statistiques">Statistiques</a></li>
    </ul>
    <div v-else>
      <h2 class="fr-h2">Navigation</h2>
      <ul class="fr-mb-3w">
        <li><a href="/agir">Tableau de bord</a></li>
        <li><a href="/aides">Mes aides</a></li>
        <li><a href="/agir/bibliotheque">Ma bibliothèque</a></li>
        <li><a href="/bilan-environnemental">Mon bilan environnemental</a></li>
        <li><a href="/classement">Classement</a></li>
      </ul>

      <h2 class="fr-h2">Thématiques</h2>
      <ul class="fr-mb-3w">
        <li><a href="/thematique/me-nourrir">Me nourrir</a></li>
        <li><a href="/thematique/me-loger">Me loger</a></li>
        <li><a href="/thematique/me-deplacer">Me déplacer</a></li>
        <li><a href="/thematique/consommer">Consommer</a></li>
      </ul>

      <h2 class="fr-h2">Mon profil</h2>
      <ul class="fr-mb-3w">
        <li><a href="/compte">Mes informations</a></li>
        <li><a href="/compte/logement">Mon logement</a></li>
        <li><a href="/compte/mieux-vous-connaitre">Mieux vous connaître</a></li>
        <li><a href="/compte/options-avancees">Options avancées</a></li>
      </ul>

      <h2 class="fr-h2">Informations</h2>
      <ul>
        <li><a href="/mentions-legales">Mention légales</a></li>
        <li><a href="/accessibilite">Accessibilité</a></li>
        <li><a href="/cgu">Conditions générales d'utilisation</a></li>
        <li><a href="/politique-de-confidentialite">Politique de confidentialité</a></li>
        <li><a href="/statistiques">Statistiques</a></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { utilisateurStore } from '@/store/utilisateur';

  const estConnecte = utilisateurStore().utilisateur.id.length > 0;
</script>
