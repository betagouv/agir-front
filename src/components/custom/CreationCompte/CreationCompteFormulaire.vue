<template>
  <form aria-labelledby="identity-fieldset-legend" @submit.prevent="performCreerCompteUtilisateur" class="fr-mb-4w">
    <fieldset class="fr-fieldset fr-mb-0">
      <legend class="fr-fieldset__legend" id="identity-fieldset-legend">
        <h2 class="fr-h4 text--center">Inscrivez-vous</h2>
      </legend>
      <div class="fr-messages-group">
        <Alert
          v-if="creationDeCompteEnErreur"
          class="fr-col-12 fr-mb-2w"
          type="error"
          titre="Erreur lors de la création du compte"
          :message="creationDeCompteMessageErreur"
        />
      </div>
      <div class="fr-fieldset__element">
        <InputMail
          label="Adresse électronique"
          name="utilisateur-mail"
          v-model="compteUtilisateurInput.mail"
          :disable="true"
        />
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
        <div class="fr-col-12">
          <div class="fr-fieldset__element">
            <InputSelectAnneeDeNaissance v-model="compteUtilisateurInput.anneeNaissance" />
          </div>
        </div>
        <div class="fr-col-12">
          <div class="fr-fieldset__element">
            <InputCodePostal
              v-model="compteUtilisateurInput.codePostal"
              :default-value="compteUtilisateurInput.codePostal"
              :default-select-value="compteUtilisateurInput.commune"
              @update:selectedCommune="compteUtilisateurInput.commune = $event"
            />
          </div>
        </div>
      </div>
      <div class="fr-fieldset__element">
        <InputPassword
          v-model="compteUtilisateurInput.motDePasse"
          @update:mot-de-passe-valide="onMotDePasseValideChanged"
        />
      </div>
      <div class="fr-fieldset__element">
        <div class="fr-checkbox-group fr-checkbox-group--sm">
          <input name="charte" id="charte" type="checkbox" v-model="acceptationCharte" />
          <label class="fr-label" for="charte">
            J'accepte&nbsp;
            <router-link :to="{ name: RouteConformiteName.CHARTE }" target="_blank"
              >la charte de participation
            </router-link>
          </label>
        </div>
      </div>
      <div class="fr-fieldset__element fr-mb-0">
        <button
          class="fr-btn fr-btn--lg display-block full-width"
          :disabled="!formulaireValide || !acceptationCharte"
          type="submit"
        >
          Créer votre compte
        </button>
      </div>
    </fieldset>
  </form>
  <hr class="fr-pb-4w" />
  <router-link
    :to="{ name: RouteCommuneName.AUTHENTIFICATION }"
    class="fr-btn fr-btn--lg fr-btn--tertiary-no-outline full-width flex-center"
  >
    J'ai déjà un compte
  </router-link>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import InputSelectAnneeDeNaissance from '@/components/custom/CreationCompte/InputSelectAnneeDeNaissance.vue';
  import InputPassword from '@/components/custom/InputPassword.vue';
  import InputCodePostal from '@/components/dsfr/InputCodePostal.vue';
  import InputMail from '@/components/dsfr/InputMail.vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { CompteUtilisateurRepositoryImpl } from '@/domaines/compte/adapters/compteUtilisateur.repository.impl';
  import { CreerComptePresenterImpl } from '@/domaines/compte/adapters/creerComptePresenterImpl';
  import { CreerCompteUtilisateurUsecase, UserInput } from '@/domaines/compte/creerCompteUtilisateur.usecase';
  import router, { RouteCommuneName } from '@/router';
  import { RouteConformiteName } from '@/router/conformite/routes';
  import { onboardingStore } from '@/store/onboarding';
  import { utilisateurStore } from '@/store/utilisateur';

  let compteUtilisateurInput = ref<UserInput>({
    nom: '',
    mail: onboardingStore().email,
    prenom: '',
    motDePasse: '',
    codePostal: '',
    commune: '',
  });
  let creationDeCompteEnErreur = ref<boolean>();
  let creationDeCompteMessageErreur = ref<string>('');
  let formulaireValide = ref<boolean>(false);
  let acceptationCharte = ref<boolean>(false);
  utilisateurStore().reset();

  function onMotDePasseValideChanged(isMotDePasseValide: boolean) {
    formulaireValide.value = isMotDePasseValide;
  }

  const performCreerCompteUtilisateur = () => {
    const creeCompteUseCase = new CreerCompteUtilisateurUsecase(
      new CompteUtilisateurRepositoryImpl(),
      new SessionRepositoryStore(),
    );
    creeCompteUseCase
      .execute(
        new CreerComptePresenterImpl(viewModel => {
          router.push({ name: viewModel.route });
        }),
        compteUtilisateurInput.value,
      )
      .catch(reason => {
        creationDeCompteMessageErreur.value = reason.message;
        creationDeCompteEnErreur.value = true;
        window.scrollTo(0, 0);
      });
  };
</script>
