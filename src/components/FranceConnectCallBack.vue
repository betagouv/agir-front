<template>
  Redirection en cours ... veuillez patienter.
  <Alert
    v-if="alerte.isActive"
    :message="alerte.message"
    :titre="alerte.titre"
    :type="alerte.type"
    class="fr-col-12 fr-mt-2w"
  />
</template>
<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import Alert from '@/components/custom/Alert.vue';
  import { useAlerte } from '@/composables/useAlerte';
  import { AuthentificationResultatPresenterImpl } from '@/domaines/authentification/adapters/authentificationResultatPresenterImpl';
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
      });
  });
</script>
