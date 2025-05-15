<template>
  <h1 class="fr-h2">Créer un compte sur <i>J'agis</i></h1>
  <img alt="" src="/bg_creation_compte.svg" />
  <FranceConnect class="fr-mb-2w" />
  <h2 class="fr-h3">Se créer un compte en choisissant un identifiant</h2>
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
          aria-live="assertive"
          class="fr-col-12 fr-mb-2w"
          titre="Erreur lors de la création du compte"
          type="error"
        />
      </div>
      <div class="fr-fieldset__element">
        <p class="fr-hint-text">Tous les champs sont obligatoires</p>
      </div>
      <div class="fr-fieldset__element">
        <InputMail v-model="compteUtilisateurInput.mail" label="Adresse électronique" name="utilisateur-mail" />
      </div>

      <div class="fr-fieldset__element">
        <div class="fr-checkbox-group fr-checkbox-group--sm">
          <input id="cgu" ref="inputCGU" v-model="acceptationCGU" name="cgu" type="checkbox" />
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
  import { ref, useTemplateRef } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
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
    situationId: null,
  });
  let creationDeCompteEnErreur = ref<boolean>();
  let creationDeCompteMessageErreur = ref<string>('');
  let acceptationCGU = ref<boolean>(false);
  utilisateurStore().reset();

  const inputCGU = useTemplateRef<HTMLInputElement>('inputCGU');

  const performCreerCompteUtilisateur = async () => {
    creationDeCompteEnErreur.value = false;
    creationDeCompteMessageErreur.value = '';
    if (acceptationCGU.value === false) {
      if (inputCGU.value) {
        inputCGU.value.focus();
      }
      creationDeCompteMessageErreur.value =
        "Vous devez accepter les conditions générales d'utilisation pour continuer.";
      creationDeCompteEnErreur.value = true;
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
      });
  };
</script>

<style scoped>
  #cgu:focus {
    outline: solid var(--blue-france-sun-113-625);
  }
</style>
