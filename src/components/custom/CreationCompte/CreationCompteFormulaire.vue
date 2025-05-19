<template>
  <h1 class="fr-h1 fr-mb-4w">Créer mon compte</h1>

  <div class="flex flex-reverse-col fr-mb-3w">
    <p class="text--center">
      <span class="display-block"> En m’inscrivant (y compris avec FranceConnect) j'accepte les </span>
      <router-link :to="{ name: RouteConformiteName.CGU }" class="fr-link" target="_blank"
        >Conditions générales d’utilisation</router-link
      >
    </p>

    <div>
      <FranceConnect class="fr-mb-3w" />

      <h2 class="fr-h3">Avec mon adresse e-mail</h2>
      <form aria-labelledby="identity-fieldset-legend" class="fr-mb-4w" @submit.prevent="performCreerCompteUtilisateur">
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

        <InputMail v-model="compteUtilisateurInput.mail" label="Mon adresse e-mail" name="utilisateur-mail" />

        <button class="fr-btn fr-btn--lg display-block full-width" type="submit">Créer mon compte</button>
      </form>
    </div>
  </div>

  <hr />
  <div class="fr-my-3w text--center">
    <router-link
      :to="{ name: RouteCommuneName.AUTHENTIFICATION }"
      class="fr-link fr-link--icon-right full-width fr-icon-arrow-right-line"
      >J'ai déjà un compte</router-link
    >
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
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
  utilisateurStore().reset();

  const performCreerCompteUtilisateur = async () => {
    creationDeCompteEnErreur.value = false;
    creationDeCompteMessageErreur.value = '';

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
