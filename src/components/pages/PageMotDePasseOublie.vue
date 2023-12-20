<template>
  <div class="fr-container fr-py-6w">
    <form
      class="fr-col-12 fr-col-lg-6 fr-mx-auto fr-mb-0 background--white fr-p-4w border border-radius--md"
      @submit.prevent="recupererMotDePasse"
    >
      <fieldset class="fr-mb-0 fr-fieldset" aria-labelledby="legend-email-forgot">
        <legend class="fr-fieldset__legend fr-px-0 fr-mx-0 text--center" id="legend-email-forgot">
          <h1 class="fr-text--xl">Saisissez votre adresse électronique pour pouvoir redéfinir un mot de passe</h1>
        </legend>
        <div class="fr-fieldset__element">
          <InputMail label="Adresse électronique" v-model="email" name="email" />
        </div>
        <div class="fr-fieldset__element">
          <button class="fr-btn display-block text--center" :disabled="!email" type="submit">Valider</button>
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
  import { RouteCompteName } from '@/router/compte/routes';

  const email = ref('');

  const recupererMotDePasse = () => {
    const commencerRedefinirMotDePasse = new CommencerRedefinirMotDePasseUsecase(new UtilisateurRepositoryAxios());
    commencerRedefinirMotDePasse.execute(email.value).then(() => {
      router.push({ name: RouteCompteName.REDEFINIR_MOT_DE_PASSE, query: { email: email.value } });
    });
  };
</script>
