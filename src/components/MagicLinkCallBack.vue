<template>
  <div class="fr-container fr-my-3w">
    <div v-if="!alerte.isActive">
      <a v-if="inscritDepuisLeMobile && estSurMobile" :href="magicLinkMobileUrl">Continuer sur l'application mobile</a>
      <p v-else class="fr-h3">Redirection en cours ... Veuillez patienter.</p>
    </div>

    <div v-if="alerte.isActive">
      <Alert :message="alerte.message" :titre="alerte.titre" :type="alerte.type" class="fr-col-12 fr-mt-2w fr-mb-3w" />
      <router-link
        class="fr-btn fr-btn--secondary fr-btn--icon-right fr-icon-arrow-right-line"
        :to="{ name: RouteCommuneName.ACCUEIL }"
        >Je retourne à l'accueil</router-link
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import Alert from '@/components/custom/Alert.vue';
  import { useAlerte } from '@/composables/useAlerte';
  import { AuthentificationResultatPresenterImpl } from '@/domaines/authentification/adapters/authentificationResultatPresenterImpl';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { UtilisateurRepositoryAxios } from '@/domaines/authentification/adapters/utilisateur.repository.axios';
  import { ValiderAuthentificationUtilisateurUsecase } from '@/domaines/authentification/validerAuthentificationUtilisateur.usecase';
  import router, { RouteCommuneName } from '@/router';

  const route = useRoute();
  const origin = route.query.origin as string;

  const inscritDepuisLeMobile = origin === 'mobile';
  const estSurMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const magicLinkMobileUrl = computed(() => window.location.href.replace(/^https?:\/\//, 'jagis://'));
  const { alerte, afficherAlerte } = useAlerte();

  onMounted(async () => {
    if (inscritDepuisLeMobile && estSurMobile) {
      window.location.href = magicLinkMobileUrl.value;
      return;
    }

    const email = route.query.email as string;
    const code = route.query.code as string;
    const validerCompteUtilisateurUsecase = new ValiderAuthentificationUtilisateurUsecase(
      new UtilisateurRepositoryAxios(),
      new SessionRepositoryStore(),
    );
    validerCompteUtilisateurUsecase
      .execute(
        email,
        code,
        new AuthentificationResultatPresenterImpl(route => {
          const requestedRoute = sessionStorage.getItem('requestedRoute');
          sessionStorage.removeItem('requestedRoute');
          router.replace(requestedRoute || route);
        }),
      )
      .catch(reason => {
        afficherAlerte('error', 'Erreur lors de la validation du compte', reason.data.message);
      });
  });
</script>
