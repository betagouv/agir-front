<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-lg-5 fr-mx-auto fr-mb-0 background--white fr-p-4w border border-radius--md">
      <h1 class="fr-h4">Validez votre compte</h1>
      <p class="fr-text--lg">
        Un code à usage unique vous a été envoyé à l’adresse suivante : <strong>{{ email }}</strong>
      </p>
      <form @submit.prevent="validerCode">
        <InputText class="fr-col-md-5" v-model="code" name="code" label="Code à usage unique" />
        <button class="fr-btn fr-mr-4w" :disabled="code.length == 0">Valider</button>
      </form>
      <p class="fr-mt-4w fr-mb-0">Vous n’avez pas reçu de code ?</p>
      <button class="fr-link fr-icon-mail-line fr-link--icon-left text--underline" @click="renvoyerCode">
        Renvoyer le code
      </button>
      <Alert
        v-if="alerte.isActive"
        class="fr-col-12 fr-mt-2w"
        :type="alerte.type"
        :titre="alerte.titre"
        :message="alerte.message"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import { ValiderCompteUtilisateurUsecase } from '@/authentification/validerCompteUtilisateur.usecase';
  import { SessionRepositoryStore } from '@/authentification/adapters/session.repository.store';
  import { utilisateurStore } from '@/store/utilisateur';
  import router from '@/router';
  import Alert from '@/components/custom/Alert.vue';
  import { sendIdNGC } from '@/bilan/middleware/pendingSimulation';
  import { UtilisateurRepositoryAxios } from '@/authentification/adapters/utilisateur.repository.axios';
  import { RenvoyerCoteOTPUsecase } from '@/authentification/renvoyerCoteOTPUsecase';
  import { useAlerte } from '@/composables/useAlerte';
  import { RouteCoachName } from '@/router/coach/routeCoachName';

  const code = ref('');
  const email = utilisateurStore().utilisateur.mail || new URLSearchParams(window.location.search).get('email') || '';
  const { alerte, afficherAlerte } = useAlerte();

  const validerCode = async () => {
    const validerCompteUtilisateurUsecase = new ValiderCompteUtilisateurUsecase(
      new UtilisateurRepositoryAxios(),
      new SessionRepositoryStore()
    );
    validerCompteUtilisateurUsecase
      .execute(email, code.value)
      .then(() => {
        const requestedRoute = sessionStorage.getItem('requestedRoute');
        sessionStorage.removeItem('requestedRoute');
        router.push(requestedRoute || { name: RouteCoachName.COACH });
        sendIdNGC();
      })
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
