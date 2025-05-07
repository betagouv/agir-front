<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-md-6 fr-mx-auto fr-mb-0 background--white fr-p-4w border">
      <img alt="" src="/bg_creation_compte.svg" />
      <h1 class="fr-h4 fr-mb-1w">Un lien de connexion vous a été envoyé !</h1>
      <p class="fr-text--lg">
        Pour vérifier votre adresse email et vous permettre d’accéder à votre compte, nous vous avons envoyé un email à
        l’adresse&nbsp;: <strong>{{ email }}</strong>
      </p>

      <div v-if="!estEnvDeProduction">
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
  import { RouteCommuneName } from '@/router';
  import { utilisateurStore } from '@/store/utilisateur';

  const email = utilisateurStore().utilisateur.mail || new URLSearchParams(window.location.search).get('email') || '';
  const estEnvDeProduction = import.meta.env.VITE_ENV === 'production';
</script>
