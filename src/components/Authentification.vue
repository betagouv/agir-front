<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-lg-7 fr-mx-auto border background--white fr-p-3w">
      <h1 class="fr-h1 fr-mb-4w">Se connecter</h1>

      <FranceConnect class="fr-mb-3w" />

      <form @submit.prevent="login">
        <fieldset aria-labelledby="login-fieldset-legend" class="fr-mb-0 fr-fieldset">
          <legend id="login-fieldset-legend" class="fr-fieldset__legend">
            <h2 class="fr-mt-2w fr-h3">Avec mon adresse e-mail</h2>
          </legend>
          <Alert
            v-if="loginEnErreur"
            :message="loginMessageErreur"
            aria-live="assertive"
            class="fr-col-12 fr-mb-2w"
            titre="Erreur lors de l'authentification"
            type="error"
          />
          <div class="fr-fieldset__element">
            <InputMail v-model="email" label="Mon adresse email" name="email" />
          </div>
          <div class="fr-fieldset__element fr-mt-2w">
            <button class="fr-btn fr-btn--lg display-block full-width" type="submit">Se connecter</button>
          </div>
        </fieldset>
      </form>
      <div v-if="premiereConnexion" class="background--white fr-pt-4w text--center">
        <hr />
        <div class="fr-my-3w">
          <router-link
            :to="{ name: RouteCompteName.CREATION_COMPTE }"
            class="fr-link fr-link--icon-right full-width fr-icon-arrow-right-line"
            >Je crée mon compte</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import '@gouvfr/dsfr/dist/component/password/password.min.css';
  import Alert from '@/components/custom/Alert.vue';
  import FranceConnect from '@/components/dsfr/FranceConnect.vue';
  import InputMail from '@/components/dsfr/InputMail.vue';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { UtilisateurRepositoryAxios } from '@/domaines/authentification/adapters/utilisateur.repository.axios';
  import { AuthentifierUtilisateurUsecase } from '@/domaines/authentification/authentifierUtilisateur.usecase';
  import router from '@/router';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
  import { utilisateurStore } from '@/store/utilisateur';

  withDefaults(defineProps<{ premiereConnexion?: boolean }>(), {
    premiereConnexion: true,
  });

  const email = ref<string>(utilisateurStore().utilisateur.mail);
  const loginEnErreur = ref<boolean>(false);
  const loginMessageErreur = ref<string>('');
  const inputEmail = ref<HTMLInputElement | undefined>();

  onMounted(() => {
    inputEmail.value = document.querySelector('#email') as HTMLInputElement;
  });

  const login = async () => {
    loginMessageErreur.value = '';
    loginEnErreur.value = false;

    const usecase = new AuthentifierUtilisateurUsecase(new UtilisateurRepositoryAxios(), new SessionRepositoryStore());
    usecase
      .execute(email.value)
      .then(() => {
        router.push({ name: RouteCompteName.VALIDATION_AUTHENTIFICATION, query: { email: email.value } });
      })
      .catch(reason => {
        if (inputEmail.value) inputEmail.value?.focus();
        loginMessageErreur.value = reason.data.message;
        loginEnErreur.value = true;
      });
  };
</script>
