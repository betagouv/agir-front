<template>
  <div class="fr-container fr-py-6w">
    <form
      class="fr-col-12 fr-col-lg-6 fr-mx-auto fr-mb-0 background--white fr-p-4w border border-radius--md"
      @submit.prevent="recupererMotDePasse"
    >
      <fieldset class="fr-mb-0 fr-fieldset">
        <legend class="fr-fieldset__legend fr-px-0 fr-mx-0 text--center" id="identity-fieldset-legend">
          <h2>Saisissez votre adresse électronique pour pouvoir redéfinir un mot de passe</h2>
        </legend>
        <div class="fr-col-12">
          <InputMail label="Adresse électronique" v-model="email" name="email" />
          <button class="fr-btn display-block text--center full-width" :disabled="!email" type="submit">Valider</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
  import InputMail from '@/components/dsfr/InputMail.vue';
  import { ref } from 'vue';
  import router from '@/router';
  import { CommencerRedefinirMotDePasseUsecase } from '@/authentification/commencerRedefinirMotDePasse.usecase';
  import { UtilisateurRepositoryAxios } from '@/authentification/adapters/utilisateur.repository.axios';

  const email = ref('');

  const recupererMotDePasse = () => {
    const commencerRedefinirMotDePasse = new CommencerRedefinirMotDePasseUsecase(new UtilisateurRepositoryAxios());
    commencerRedefinirMotDePasse.execute(email.value).then(() => {
      router.push({ name: 'redefinir-mot-de-passe', query: { email: email.value } });
    });
  };
</script>
