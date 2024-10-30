<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-md-6 fr-mx-auto fr-mb-0 background--white fr-p-4w border border-radius--md">
      <img src="/bg_creation_compte.svg" alt="" />
      <h1 class="fr-h4 fr-mb-1w">Entrez le code reçu par email !</h1>
      <p class="fr-text--lg">
        Pour vérifier votre adresse email et vous permettre d’accéder à votre compte, nous vous avons envoyé un email à
        l’adresse&nbsp;: <strong>{{ email }}</strong>
      </p>
      <Alert
        v-if="alerte.isActive"
        class="fr-col-12 fr-mt-2w"
        :type="alerte.type"
        :titre="alerte.titre"
        :message="alerte.message"
      />
      <form @submit.prevent="validerCode">
        <InputText
          class="fr-col-md-5"
          v-model="code"
          name="code"
          label="Code à usage unique"
          :required="true"
          :maxlength="6"
        />
        <button class="fr-btn fr-mr-4w">Valider</button>
      </form>
      <p class="fr-mt-4w fr-mb-0">Vous n’avez pas reçu de code ?</p>
      <button class="fr-link text--underline" @click="renvoyerCode">Renvoyer le code</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import { useAlerte } from '@/composables/useAlerte';
  import { AuthentificationResultatPresenterImpl } from '@/domaines/authentification/adapters/authentificationResultatPresenterImpl';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { UtilisateurRepositoryAxios } from '@/domaines/authentification/adapters/utilisateur.repository.axios';
  import { RenvoyerCoteOTPUsecase } from '@/domaines/authentification/renvoyerCoteOTPUsecase';
  import { ValiderAuthentificationUtilisateurUsecase } from '@/domaines/authentification/validerAuthentificationUtilisateur.usecase';
  import router from '@/router';
  import { utilisateurStore } from '@/store/utilisateur';

  const code = ref('');
  const email = utilisateurStore().utilisateur.mail || new URLSearchParams(window.location.search).get('email') || '';
  const { alerte, afficherAlerte } = useAlerte();

  const validerCode = async () => {
    const validerCompteUtilisateurUsecase = new ValiderAuthentificationUtilisateurUsecase(
      new UtilisateurRepositoryAxios(),
      new SessionRepositoryStore(),
    );
    validerCompteUtilisateurUsecase
      .execute(
        email,
        code.value,
        new AuthentificationResultatPresenterImpl(route => {
          const requestedRoute = sessionStorage.getItem('requestedRoute');
          sessionStorage.removeItem('requestedRoute');
          router.push(requestedRoute || route);
        }),
      )
      .catch(reason => {
        afficherAlerte('error', 'Erreur lors de la validation du compte', reason.data.message);
      });
  };

  const renvoyerCode = async () => {
    const usecase = new RenvoyerCoteOTPUsecase(new UtilisateurRepositoryAxios());
    usecase
      .execute(email)
      .then(() => {
        afficherAlerte('success', 'Code renvoyé', 'Le code a bien été renvoyé');
      })
      .catch(reason => {
        afficherAlerte('error', 'Erreur lors de la validation du compte', reason.data.message);
      });
  };
</script>
