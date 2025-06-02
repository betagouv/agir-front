<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-md-7 fr-mx-auto fr-mb-0 background--white fr-p-4w fr-pb-5w border">
      <div class="display-block">
        <BoutonRetourAutomatique class="fr-pl-0 fr-mb-3w" />
      </div>

      <img alt="" src="/verifier_email.svg" class="fr-mb-3w" />
      <h1 class="fr-h2 fr-mb-1w">Vérifiez votre boîte e-mail</h1>
      <p class="fr-text--lg fr-mb-0">
        Un lien de connexion vous a été envoyé à l’adresse&nbsp;:
        <span class="text--bold">{{ email }}</span> pour vous permettre d’accéder à votre compte
      </p>

      <div v-if="!estEnvDeProduction" class="fr-mt-3w">
        <router-link
          :to="{ name: RouteCommuneName.MAGIC_LINK_CALLBACK, query: { email, code: '999999' } }"
          class="fr-btn fr-btn--secondary"
        >
          Se connecter avec le lien magique (sans mail)
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BoutonRetourAutomatique from '@/components/custom/BoutonRetourAutomatique.vue';
  import { RouteCommuneName } from '@/router';
  import { utilisateurStore } from '@/store/utilisateur';

  const email = utilisateurStore().utilisateur.mail || new URLSearchParams(window.location.search).get('email') || '';
  const estEnvDeProduction = import.meta.env.VITE_ENV === 'production';
</script>
