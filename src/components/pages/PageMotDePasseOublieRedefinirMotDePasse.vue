<template>
  <div class="fr-container fr-py-6w">
    <form
      class="fr-col-12 fr-col-lg-6 fr-mx-auto fr-mb-0 background--white fr-p-4w border border-radius--md"
      @submit.prevent="definirMotDePasse"
    >
      <fieldset class="fr-mb-0 fr-fieldset" aria-labelledby="legend-password-modify">
        <legend class="fr-fieldset__legend fr-px-0 fr-mx-0 text--center" id="legend-password-modify">
          <h1 class="fr-text--xl">Choisir un nouveau mot de passe</h1>
        </legend>
        <p>
          Choisissez un mot de passe et saisissez le code envoyé à l'adresse <strong>: {{ email }}</strong>
        </p>
        <div class="fr-fieldset__element">
          <InputPassword
            class="fr-col-md-11 fr-mt-2w"
            v-model="motDePasse"
            @update:mot-de-passe-valide="onMotDePasseValideChanged"
          />
        </div>
        <div class="fr-fieldset__element">
          <InputText class="fr-col-md-5 fr-mt-2w" v-model="code" name="code" label="Code à usage unique" />
        </div>
        <div class="fr-fieldset__element">
          <button
            class="fr-btn display-block text--center"
            :disabled="!motDePasseValide || code.length === 0"
            type="submit"
          >
            Valider
          </button>
        </div>
        <div class="fr-messages-group">
          <Alert
            v-if="erreur"
            class="fr-col-12 fr-mt-2w"
            type="error"
            titre="Erreur lors de la modification du mot de passe"
            :message="messageErreur"
          />
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import InputPassword from '@/components/custom/InputPassword.vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import { useRoute } from 'vue-router';
  import { UtilisateurRepositoryAxios } from '@/authentification/adapters/utilisateur.repository.axios';
  import { TerminerRedefinirMotDePasseUsecase } from '@/authentification/terminerRedefinirMotDePasse.usecase';
  import router from '@/router';
  import Alert from '@/components/custom/Alert.vue';

  const route = useRoute();

  const email = ref<string>(route.query.email as string);
  const code = ref<string>('');
  const motDePasse = ref<string>('');
  const motDePasseValide = ref(false);
  const erreur = ref<boolean>(false);
  const messageErreur = ref<string>('');

  const onMotDePasseValideChanged = (value: boolean) => {
    motDePasseValide.value = value;
  };
  const definirMotDePasse = () => {
    const terminerRedefinirMotDePasse = new TerminerRedefinirMotDePasseUsecase(new UtilisateurRepositoryAxios());
    terminerRedefinirMotDePasse
      .execute(email.value, motDePasse.value, code.value)
      .then(() => {
        router.push({ name: 'authentification' });
      })
      .catch(reason => {
        erreur.value = true;
        messageErreur.value = reason.data.message;
      });
  };
</script>
