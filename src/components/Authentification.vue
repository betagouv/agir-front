<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-lg-6 fr-mx-auto fr-p-4w border border-radius--md background--white">
      <h1>Connexion à <i>J'agis</i></h1>

      <FranceConnect />

      <form @submit.prevent="login">
        <fieldset aria-labelledby="login-fieldset-legend" class="fr-mb-0 fr-fieldset">
          <legend id="login-fieldset-legend" class="fr-fieldset__legend">
            <h2 class="fr-mt-2w">Se connecter avec son compte</h2>
          </legend>
          <Alert
            v-if="loginEnErreur"
            :message="loginMessageErreur"
            class="fr-col-12 fr-mb-2w"
            titre="Erreur lors de l'authentification"
            type="error"
            aria-live="assertive"
          />
          <div class="fr-fieldset__element">
            <span class="fr-hint-text">Tous les champs sont obligatoires.</span>
          </div>
          <div class="fr-fieldset__element">
            <InputMail v-model="email" label="Adresse électronique" name="email" />
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
      <div v-if="premiereConnexion" class="background--white fr-p-4w text--center">
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

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import '@gouvfr/dsfr/dist/component/password/password.min.css';
  import Alert from '@/components/custom/Alert.vue';
  import InputPasswordLogin from '@/components/custom/Form/InputPasswordLogin.vue';
  import FranceConnect from '@/components/dsfr/FranceConnect.vue';
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
  const inputEmail = ref<HTMLInputElement | undefined>();

  onMounted(() => {
    inputEmail.value = document.querySelector('#email') as HTMLInputElement;
  });

  const login = async () => {
    loginMessageErreur.value = '';
    loginEnErreur.value = false;

    const usecase = new AuthentifierUtilisateurUsecase(new UtilisateurRepositoryAxios());
    usecase
      .execute(email.value, password.value)
      .then(() => {
        router.push({ name: RouteCompteName.VALIDATION_AUTHENTIFICATION, query: { email: email.value } });
      })
      .catch(reason => {
        if (inputEmail.value) inputEmail.value?.focus();
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
