<template>
  <div class="fr-container fr-my-3w">
    <p class="fr-h3">Redirection en cours ... Veuillez patienter.</p>

    <Alert
      v-if="alerte.isActive"
      :message="alerte.message"
      :titre="alerte.titre"
      :type="alerte.type"
      class="fr-col-12 fr-mt-2w"
    />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { AxiosFactory } from '@/axios.factory';
  import Alert from '@/components/custom/Alert.vue';
  import { useAlerte } from '@/composables/useAlerte';
  import { AuthentificationResultatPresenterImpl } from '@/domaines/authentification/adapters/authentificationResultatPresenterImpl';
  import { PostOnboardingRepositoryStore } from '@/domaines/authentification/adapters/postOnboarding.repository.store';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { UtilisateurRepositoryAxios } from '@/domaines/authentification/adapters/utilisateur.repository.axios';
  import { AuthentifierUtilisateurFranceConnectUsecase } from '@/domaines/authentification/authentifierUtilisateurFranceConnect.usecase';
  import router, { RouteCommuneName } from '@/router';

  const { alerte, afficherAlerte } = useAlerte();

  onMounted(async () => {
    const route = useRoute();
    const oidcCode = route.query.code as string;
    const oidcState = route.query.state as string;

    if (route.query.error === 'access_denied') {
      await router.push({ name: RouteCommuneName.ACCUEIL });
    } else {
      const usecase = new AuthentifierUtilisateurFranceConnectUsecase(
        new UtilisateurRepositoryAxios(),
        new SessionRepositoryStore(),
        new PostOnboardingRepositoryStore(),
      );

      await usecase
        .execute(
          oidcCode,
          oidcState,
          new AuthentificationResultatPresenterImpl(route => {
            const requestedRoute = sessionStorage.getItem('requestedRoute');
            sessionStorage.removeItem('requestedRoute');
            router.push(requestedRoute || route);
          }),
        )
        .catch(reason => {
          afficherAlerte(
            'error',
            'Erreur lors la connexion à France Connect. Deconnexion en cours veuillez patienter.',
            reason.data.message,
          );

          setTimeout(() => {
            const axios = AxiosFactory.getAxios();
            axios.post('/logout', { oidc_state: oidcState }).then(reponse => {
              window.location.href = reponse.data.france_connect_logout_url;
            });
          }, 3000);
        });
    }
  });
</script>
