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
  import Alert from '@/components/custom/Alert.vue';
  import { useAlerte } from '@/composables/useAlerte';
  import { AuthentificationResultatPresenterImpl } from '@/domaines/authentification/adapters/authentificationResultatPresenterImpl';
  import { PostOnboardingRepositoryStore } from '@/domaines/authentification/adapters/postOnboarding.repository.store';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { UtilisateurRepositoryAxios } from '@/domaines/authentification/adapters/utilisateur.repository.axios';
  import { AuthentifierUtilisateurFranceConnectUsecase } from '@/domaines/authentification/authentifierUtilisateurFranceConnect.usecase';
  import router from '@/router';

  const { alerte, afficherAlerte } = useAlerte();

  onMounted(async () => {
    const route = useRoute();
    const oidcCode = route.query.code as string;
    const oidcState = route.query.state as string;
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
        afficherAlerte('error', 'Erreur lors de la validation du compte', reason.data.message);
        setTimeout(() => {
          window.location.href = '/';
        }, 500);
      });
  });
</script>
