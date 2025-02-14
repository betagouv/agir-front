<template>
  <img alt="" src="/bg_creation_compte.svg" />
  <FranceConnect class="fr-mb-2w" />
  <h1 class="fr-h4 fr-mb-0">Créez votre compte sur J'agis</h1>
  <form aria-labelledby="identity-fieldset-legend" class="fr-mb-4w" @submit.prevent="performCreerCompteUtilisateur">
    <fieldset class="fr-fieldset fr-mb-0">
      <legend id="identity-fieldset-legend" class="fr-fieldset__legend">
        <span class="fr-text--regular">
          Indiquez votre adresse e-mail et choisissez un mot de passe pour accéder au service.
        </span>
      </legend>
      <div class="fr-messages-group">
        <Alert
          v-if="creationDeCompteEnErreur"
          :message="creationDeCompteMessageErreur"
          class="fr-col-12 fr-mb-2w"
          titre="Erreur lors de la création du compte"
          type="error"
        />
      </div>
      <p class="fr-text--md text--gris-light fr-mt-0 fr-mb-1w fr-ml-1w">Tous les champs sont obligatoires</p>
      <div class="fr-fieldset__element">
        <InputMail v-model="compteUtilisateurInput.mail" label="Adresse électronique" name="utilisateur-mail" />
      </div>

      <div class="fr-fieldset__element">
        <InputPassword
          v-model="compteUtilisateurInput.motDePasse"
          :required="true"
          legende="Votre mot de passe doit contenir :"
          @update:mot-de-passe-valide="onMotDePasseValideChanged"
        />
      </div>
      <div class="fr-fieldset__element">
        <div class="fr-checkbox-group fr-checkbox-group--sm">
          <input id="cgu" v-model="acceptationCGU" name="cgu" type="checkbox" />
          <label class="fr-label fr-mt-1w" for="cgu">
            J'accepte&nbsp;
            <router-link :to="{ name: RouteConformiteName.CGU }" target="_blank"
              >les conditions générales d'utilisation
            </router-link>
          </label>
        </div>
      </div>
      <div class="fr-fieldset__element fr-mb-0 fr-mt-1w">
        <button class="fr-btn fr-btn--lg display-block full-width" type="submit">S'inscrire</button>
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

<script lang="ts" setup>
  import { ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import InputPassword from '@/components/custom/InputPassword.vue';
  import FranceConnect from '@/components/dsfr/FranceConnect.vue';
  import InputMail from '@/components/dsfr/InputMail.vue';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { CompteUtilisateurRepositoryImpl } from '@/domaines/compte/adapters/compteUtilisateur.repository.impl';
  import { CreerComptePresenterImpl } from '@/domaines/compte/adapters/creerComptePresenterImpl';
  import { CreerCompteUtilisateurUsecase, UserInput } from '@/domaines/compte/creerCompteUtilisateur.usecase';
  import router, { RouteCommuneName } from '@/router';
  import { RouteConformiteName } from '@/router/conformite/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  let compteUtilisateurInput = ref<UserInput>({
    mail: '',
    motDePasse: '',
    situationId: null,
  });
  let creationDeCompteEnErreur = ref<boolean>();
  let creationDeCompteMessageErreur = ref<string>('');
  let formulaireValide = ref<boolean>(false);
  let acceptationCGU = ref<boolean>(false);
  utilisateurStore().reset();

  function onMotDePasseValideChanged(isMotDePasseValide: boolean) {
    formulaireValide.value = isMotDePasseValide;
  }

  const performCreerCompteUtilisateur = async () => {
    creationDeCompteEnErreur.value = false;
    if (acceptationCGU.value === false) {
      creationDeCompteMessageErreur.value =
        "Vous devez accepter les conditions générales d'utilisation pour continuer.";
      creationDeCompteEnErreur.value = true;
      window.scrollTo(0, 0);
      return;
    }
    const creeCompteUseCase = new CreerCompteUtilisateurUsecase(
      new CompteUtilisateurRepositoryImpl(),
      new SessionRepositoryStore(),
    );
    await creeCompteUseCase
      .execute(
        new CreerComptePresenterImpl(viewModel => {
          router.push({ name: viewModel.route });
        }),
        { ...compteUtilisateurInput.value, situationId: null },
      )
      .catch(reason => {
        creationDeCompteMessageErreur.value = reason.message;
        creationDeCompteEnErreur.value = true;
        window.scrollTo(0, 0);
      });
  };
</script>
