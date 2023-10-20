<template>
  <div class="fr-container fr-py-6w">
    <form
      class="fr-col-12 fr-col-lg-6 fr-mx-auto fr-mb-0 background--white fr-p-4w border border-radius--md"
      @submit.prevent="login"
    >
      <fieldset class="fr-mb-0 fr-fieldset">
        <legend class="fr-fieldset__legend fr-px-0 fr-mx-0 text--center" id="identity-fieldset-legend">
          <h2>Utilisez FranceConnect pour vous connecter ou créer votre compte</h2>
        </legend>
        <p>
          FranceConnect est la solution proposée par l’État pour sécuriser et simplifier la connexion aux services en
          ligne.
        </p>
        <div class="fr-col-12 text--center">
          <BoutonFranceConnect />
        </div>
        <div class="separateur fr-mb-2v">ou</div>
        <div class="fr-col-12">
          <h2 class="text--center">Vous avez déjà un compte</h2>
          <InputMail label="Adresse électronique" v-model="email" name="email" />
          <InputPasswordLogin v-model="password" />
          <button class="fr-btn display-block text--center full-width" type="submit">Se connecter</button>
        </div>
        <Alert
          v-if="loginEnErreur"
          class="fr-col-12 fr-mt-2w"
          type="error"
          titre="Erreur lors de l'authentification"
          :message="loginMessageErreur"
        />
        <div class="fr-col-12" v-if="premiereConnexion">
          <div class="separateur--full fr-mt-4w"></div>
          <h2 class="text--center fr-mt-6w">Première visite ?</h2>
          <ul class="fr-btns-group">
            <li>
              <button class="fr-btn fr-btn--secondary" @click="goToCreerUnCompte">Créer un compte</button>
            </li>
          </ul>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import router from '@/router';
  import { AuthentifierUtilisateurUsecase } from '@/authentification/authentifierUtilisateur.usecase';
  import { UtilisateurRepositoryAxios } from '@/authentification/adapters/utilisateur.repository.axios';
  import { SessionRepositoryStore } from '@/authentification/adapters/session.repository.store';
  import { sendIdNGC } from '@/bilan/middleware/pendingSimulation';
  import BoutonFranceConnect from '@/components/BoutonFranceConnect.vue';
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

  const goToCreerUnCompte = async () => {
    await router.push({ name: 'creation-compte' });
  };
</script>

<style scoped>
  .separateur {
    position: relative;
    text-align: center;
    width: 100%;

    &&:before,
    &&:after {
      content: '';
      position: absolute;
      height: 1px;
      width: 45%;
      background-color: #dddddd;
      top: 50%;
    }

    &&:before {
      left: 0;
    }

    &&:after {
      right: 0;
    }
  }

  .separateur--full {
    position: relative;
    text-align: center;
    width: 100%;

    &&:before,
    &&:after {
      content: '';
      position: absolute;
      height: 1px;
      width: 100%;
      background-color: #dddddd;
      top: 50%;
    }

    &&:before {
      left: 0;
    }

    &&:after {
      right: 0;
    }
  }
</style>
