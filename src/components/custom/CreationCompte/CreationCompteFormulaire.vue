<template>
  <form aria-labelledby="identity-fieldset-legend" @submit.prevent="performCreerCompteUtilisateur" class="fr-mb-4w">
    <fieldset class="fr-fieldset fr-mb-0">
      <legend class="fr-fieldset__legend" id="identity-fieldset-legend">
        <h2>Création de compte sur Agir</h2>
      </legend>
      <div class="fr-fieldset__element">
        <InputMail label="Adresse électronique" name="utilisateur-mail" v-model="compteUtilisateurInput.mail" />
      </div>
      <div class="fr-grid-row fr-grid-row--gutters">
        <div class="fr-col-12 fr-col-lg-6">
          <div class="fr-fieldset__element">
            <InputText label="Nom" name="utilisateur-nom" v-model="compteUtilisateurInput.nom" />
          </div>
        </div>
        <div class="fr-col-12 fr-col-lg-6">
          <div class="fr-fieldset__element">
            <InputText label="Prénom" name="utilisateur-prenom" v-model="compteUtilisateurInput.prenom" />
          </div>
        </div>
      </div>
      <div class="fr-fieldset__element">
        <InputPassword
          v-model="compteUtilisateurInput.motDePasse"
          @update:mot-de-passe-valide="onMotDePasseValideChanged"
        />
      </div>
      <div class="fr-fieldset__element fr-mb-0">
        <button class="fr-btn fr-btn--lg display-block full-width" :disabled="!formulaireValide" type="submit">
          Créer votre compte
        </button>
      </div>
      <div class="fr-messages-group">
        <Alert
          v-if="creationDeCompteEnErreur"
          class="fr-col-12 fr-mt-2w"
          type="error"
          titre="Erreur lors de la création du compte"
          :message="creationDeCompteMessageErreur"
        />
      </div>
    </fieldset>
  </form>
  <hr class="fr-pb-4w" />
  <router-link
    :to="{ name: 'authentification' }"
    class="fr-btn fr-btn--lg fr-btn--tertiary-no-outline full-width flex-center"
  >
    J'ai déjà un compte
  </router-link>
</template>

<script setup lang="ts">
  import { CreerCompteUtilisateurUsecase, UserInput } from '@/compte/creerCompteUtilisateur.usecase';
  import { ref } from 'vue';
  import { SessionRepositoryStore } from '@/authentification/adapters/session.repository.store';
  import { CompteUtilisateurRepositoryImpl } from '@/compte/adapters/compteUtilisateur.repository.impl';
  import router from '@/router';
  import { utilisateurStore } from '@/store/utilisateur';
  import InputMail from '@/components/dsfr/InputMail.vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import { onboardingStore } from '@/store/onboarding';
  import InputPassword from '@/components/custom/InputPassword.vue';
  import Alert from '@/components/custom/Alert.vue';

  let compteUtilisateurInput = ref<UserInput>({
    nom: '',
    mail: '',
    prenom: '',
    motDePasse: '',
  });
  let creationDeCompteEnErreur = ref<boolean>(false);
  let creationDeCompteMessageErreur = ref<string>('');
  let formulaireValide = ref<boolean>(false);
  utilisateurStore().reset();

  function onMotDePasseValideChanged(isMotDePasseValide: boolean) {
    formulaireValide.value = isMotDePasseValide;
  }

  const performCreerCompteUtilisateur = () => {
    const creeCompteUseCase = new CreerCompteUtilisateurUsecase(
      new CompteUtilisateurRepositoryImpl(),
      new SessionRepositoryStore()
    );
    creeCompteUseCase
      .execute(compteUtilisateurInput.value, onboardingStore().$state)
      .then(() => {
        router.push({ name: 'validation-compte' });
        creationDeCompteEnErreur.value = false;
      }, null)
      .catch(reason => {
        creationDeCompteMessageErreur.value = reason.data.message;
        creationDeCompteEnErreur.value = true;
      });
  };
</script>
