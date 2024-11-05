<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-lg-6 fr-mx-auto fr-p-4w border border-radius--md background--white">
      <form @submit.prevent="login">
        <fieldset class="fr-mb-0 fr-fieldset" aria-labelledby="login-fieldset-legend">
          <legend class="fr-fieldset__legend" id="login-fieldset-legend">
            <h1 class="text--center">Se connecter avec son compte</h1>
          </legend>
          <Alert
            v-if="loginEnErreur"
            class="fr-col-12 fr-mb-2w"
            type="error"
            titre="Erreur lors de l'authentification"
            :message="loginMessageErreur"
          />
          <p class="fr-text--md text--gris-light fr-mt-0 fr-mb-1w fr-ml-1w">Tous les champs sont obligatoires</p>
          <div class="fr-fieldset__element">
            <InputMail label="Adresse électronique" v-model="email" name="email" />
          </div>
          <div class="fr-fieldset__element">
            <InputPasswordLogin v-model="password" />
            <router-link :to="{ name: RouteCompteName.MOT_DE_PASSE_OUBLIE }" class="fr-link fr-mt-1v">
              Mot de passe oublié ?
            </router-link>
          </div>
          <div class="fr-fieldset__element fr-mt-2w">
            <button class="fr-btn fr-btn--lg display-block full-width" type="submit">Se connecter</button>
          </div>
        </fieldset>
      </form>
      <div class="text--center" v-if="premiereConnexion">
        <hr />
        <h2 class="fr-h3">Première visite ?</h2>
        <router-link
          :to="{ name: RouteCompteName.CREATION_COMPTE }"
          class="fr-btn fr-btn--lg fr-btn--secondary display-block full-width"
        >
          Créer un compte
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import '@gouvfr/dsfr/dist/component/password/password.min.css';
  import Alert from '@/components/custom/Alert.vue';
  import InputPasswordLogin from '@/components/custom/InputPasswordLogin.vue';
  import InputMail from '@/components/dsfr/InputMail.vue';
  import { UtilisateurRepositoryAxios } from '@/domaines/authentification/adapters/utilisateur.repository.axios';
  import { AuthentifierUtilisateurUsecase } from '@/domaines/authentification/authentifierUtilisateur.usecase';
  import { RenvoyerCoteOTPUsecase } from '@/domaines/authentification/renvoyerCoteOTPUsecase';
  import router from '@/router';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
  import { utilisateurStore } from '@/store/utilisateur';

  withDefaults(defineProps<{ premiereConnexion?: boolean }>(), {
    premiereConnexion: true,
  });

  const email = ref<string>(utilisateurStore().utilisateur.mail);
  const password = ref<string>('');
  const loginEnErreur = ref<boolean>(false);
  const loginMessageErreur = ref<string>('');

  const login = async () => {
    const usecase = new AuthentifierUtilisateurUsecase(new UtilisateurRepositoryAxios());
    usecase
      .execute(email.value, password.value)
      .then(() => {
        router.push({ name: RouteCompteName.VALIDATION_AUTHENTIFICATION, query: { email: email.value } });
      })
      .catch(reason => {
        loginMessageErreur.value = reason.data.message;
        loginEnErreur.value = true;
        if (reason.data.message === 'Utilisateur non actif') {
          const usecase = new RenvoyerCoteOTPUsecase(new UtilisateurRepositoryAxios());
          usecase.execute(email.value);
          router.push({ name: RouteCompteName.VALIDATION_COMPTE, query: { email: email.value } });
        }
      });
  };
</script>
