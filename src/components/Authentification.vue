<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-lg-6 fr-mx-auto fr-p-4w border border-radius--md background--white">
      <form @submit.prevent="login">
        <fieldset class="fr-mb-0 fr-fieldset" aria-labelledby="login-fieldset-legend">
          <legend class="fr-fieldset__legend" id="login-fieldset-legend">
            <h1 class="text--center">Se connecter avec son compte</h1>
          </legend>
          <div class="fr-fieldset__element">
            <InputMail label="Adresse électronique" v-model="email" name="email" />
          </div>
          <div class="fr-fieldset__element">
            <InputPasswordLogin v-model="password" />
          </div>
          <div class="fr-fieldset__element">
            <button class="fr-btn fr-px-8w" type="submit">Se connecter</button>
          </div>
          <Alert
            v-if="loginEnErreur"
            class="fr-col-12 fr-mt-2w"
            type="error"
            titre="Erreur lors de l'authentification"
            :message="loginMessageErreur"
          />
        </fieldset>
      </form>
      <div class="text--center" v-if="premiereConnexion">
        <hr />
        <h2>Première visite ?</h2>
        <router-link :to="{ name: 'creation-compte' }" class="fr-btn fr-btn--secondary fr-px-16w"
          >Créer un compte</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import router from '@/router';
  import { AuthentifierUtilisateurUsecase } from '@/authentification/authentifierUtilisateur.usecase';
  import { UtilisateurRepositoryAxios } from '@/authentification/adapters/utilisateur.repository.axios';
  import { SessionRepositoryStore } from '@/authentification/adapters/session.repository.store';
  import { sendIdNGC } from '@/bilan/middleware/pendingSimulation';
  import InputMail from '@/components/dsfr/InputMail.vue';
  import InputPasswordLogin from '@/components/custom/InputPasswordLogin.vue';
  import Alert from '@/components/custom/Alert.vue';

  withDefaults(defineProps<{ premiereConnexion: boolean }>(), {
    premiereConnexion: true,
  });

  const email = ref<string>('');
  const password = ref<string>('');
  const loginEnErreur = ref<boolean>(false);
  const loginMessageErreur = ref<string>('');

  const login = async () => {
    const usecase = new AuthentifierUtilisateurUsecase(new UtilisateurRepositoryAxios(), new SessionRepositoryStore());
    usecase
      .execute(email.value, password.value)
      .then(() => {
        loginEnErreur.value = false;
        const requestedRoute = sessionStorage.getItem('requestedRoute');
        sessionStorage.removeItem('requestedRoute');
        router.push(requestedRoute || { name: 'coach' });
        sendIdNGC();
      })
      .catch(reason => {
        loginMessageErreur.value = reason.data.message;
        loginEnErreur.value = true;
        if (reason.data.message === 'Utilisateur non actif') {
          router.push({ name: 'validation-compte', query: { email: email.value } });
        }
      });
  };
</script>
