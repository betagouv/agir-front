<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-lg-6 fr-mx-auto fr-mb-0 background--white fr-p-4w border border-radius--md">
      <h1>Je valide mon compte</h1>
      <p>
        Un code à usage unique vous a été envoyé à l'adresse <strong>{{ email }}</strong>
      </p>
      <form @submit.prevent="validerCode">
        <InputText class="fr-col-md-5" v-model="code" name="code" label="Code à usage unique" />
        <button class="fr-btn fr-mr-4w" :disabled="code.length == 0">Valider</button>
        <button class="fr-btn fr-btn--secondary" type="button" @click="renvoyerCode">Renvoyer le code</button>
        <Alert
          v-if="validationDeCompteEnErreur"
          class="fr-col-12 fr-mt-2w"
          type="error"
          titre="Erreur lors de la validation du compte"
          :message="validationDeCompteMessageErreur"
      />
      <Alert
        v-if="codeRenvoye"
        class="fr-col-12 fr-mt-2w"
        type="info"
        titre="Code renvoyé"
        message="Le code a bien été renvoyé"
        />
      </form>
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
  const code = ref('');
  let validationDeCompteEnErreur = ref<boolean>(false);
  let validationDeCompteMessageErreur = ref<string>('');
  let codeRenvoye = ref<boolean>(false);
  const email = utilisateurStore().utilisateur.mail || new URLSearchParams(window.location.search).get('email') || '';

  const validerCode = async () => {
    const validerCompteUtilisateurUsecase = new ValiderCompteUtilisateurUsecase(
      new UtilisateurRepositoryAxios(),
      new SessionRepositoryStore()
    );
    validerCompteUtilisateurUsecase
      .execute(email, code.value)
      .then(() => {
        validationDeCompteEnErreur.value = false;
        const requestedRoute = sessionStorage.getItem('requestedRoute');
        sessionStorage.removeItem('requestedRoute');
        router.push(requestedRoute || { name: 'coach' });
        sendIdNGC();
      })
      .catch(reason => {
        validationDeCompteMessageErreur.value = reason.data.message;
        validationDeCompteEnErreur.value = true;
      });
  };

  const renvoyerCode = async () => {
    codeRenvoye.value = false;
    validationDeCompteEnErreur.value = false;

    const usecase = new RenvoyerCoteOTPUsecase(new UtilisateurRepositoryAxios());
    usecase
      .execute(email)
      .then(() => {
        codeRenvoye.value = true;
      })
      .catch(reason => {
        codeRenvoye.value = false;
        validationDeCompteMessageErreur.value = reason.data.message;
        validationDeCompteEnErreur.value = true;
      });
  };
</script>
