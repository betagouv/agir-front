<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-md-7 fr-mx-auto fr-mb-0 background--white fr-p-4w fr-pb-5w border">
      <div class="display-block">
        <router-link
          class="fr-btn fr-btn--tertiary-no-outline fr-btn--icon-left fr-icon-arrow-left-line fr-pl-0 fr-mb-3w"
          :to="{ path: useNavigationStore().pagePrecedente.path }"
        >
          Retour
        </router-link>
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

        <a :href="magicLinkMobileUrl" class="fr-btn fr-btn--secondary">Se connecter avec l'application mobile</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { RouteCommuneName } from '@/router';
  import { useNavigationStore } from '@/store/navigationStore';
  import { utilisateurStore } from '@/store/utilisateur';

  const estEnvDeProduction = import.meta.env.VITE_ENV === 'production';
  const email = utilisateurStore().utilisateur.mail || new URLSearchParams(window.location.search).get('email') || '';

  const baseHost = window.location.host;
  const path = '/authentification/validation-lien-magique';

  const magicLinkMobileUrl = computed(() => {
    return `jagis://${baseHost}${path}?email=${email}&code=999999`;
  });
</script>
