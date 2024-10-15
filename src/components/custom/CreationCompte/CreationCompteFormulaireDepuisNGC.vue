<template>
  <form aria-labelledby="identity-fieldset-legend" @submit.prevent="performCreerCompteUtilisateur" class="fr-mb-4w">
    <fieldset class="fr-fieldset fr-mb-0">
      <legend class="fr-fieldset__legend" id="identity-fieldset-legend">
        <img src="/bg_creation_compte.svg" alt="" />
        <h2 class="fr-h4 fr-mb-0">Rejoignez-nous pour continuer</h2>
        <p class="fr-text--regular">
          Indiquez votre adresse e-mail et choisissez un mot de passe pour accéder au service.
        </p>
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
        <InputMail label="Adresse électronique" name="utilisateur-mail" v-model="compteUtilisateurInput.mail" />
      </div>

      <div class="fr-fieldset__element">
        <InputPassword
          v-model="compteUtilisateurInput.motDePasse"
          @update:mot-de-passe-valide="onMotDePasseValideChanged"
          legende="Votre mot de passe doit contenir :"
        />
      </div>
      <div class="fr-fieldset__element">
        <div class="fr-checkbox-group fr-checkbox-group--sm">
          <input name="cgu" id="cgu" type="checkbox" v-model="acceptationCGU" />
          <label class="fr-label fr-mt-1w" for="cgu">
            J'accepte&nbsp;
            <router-link :to="{ name: RouteConformiteName.CGU }" target="_blank"
              >les conditions générales d'utilisation
            </router-link>
          </label>
        </div>
        <div class="fr-checkbox-group fr-checkbox-group--sm">
          <input name="ngc" id="ngc" type="checkbox" v-model="doitPrendreEnCompteIdNGC" />
          <label class="fr-label fr-mt-1w" for="ngc">
            <p>
              Utiliser les informations issues de mon bilan <span class="text--bold"> Nos Gestes Climat</span> pour
              profiter d’une expérience d’usage améliorée
            </p>
          </label>
        </div>
      </div>
      <div class="fr-fieldset__element fr-mb-0 fr-mt-1w">
        <button
          type="submit"
          class="fr-btn fr-btn--lg display-block full-width"
          :disabled="!formulaireValide || !acceptationCGU"
        >
          S'inscrire
        </button>
      </div>
    </fieldset>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import Alert from '@/components/custom/Alert.vue';
  import InputPassword from '@/components/custom/InputPassword.vue';
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
  let doitPrendreEnCompteIdNGC = false;
  const route = useRoute();
  const idNGC = ref<string | null>(route.query.situationId as string | null);
  if (idNGC.value) {
    doitPrendreEnCompteIdNGC = true;
  }

  function onMotDePasseValideChanged(isMotDePasseValide: boolean) {
    formulaireValide.value = isMotDePasseValide;
  }

  const performCreerCompteUtilisateur = async () => {
    const creeCompteUseCase = new CreerCompteUtilisateurUsecase(
      new CompteUtilisateurRepositoryImpl(),
      new SessionRepositoryStore(),
    );
    await creeCompteUseCase
      .execute(
        new CreerComptePresenterImpl(viewModel => {
          router.push({ name: viewModel.route });
        }),
        { ...compteUtilisateurInput.value, situationId: doitPrendreEnCompteIdNGC ? idNGC.value : null },
      )
      .catch(reason => {
        creationDeCompteMessageErreur.value = reason.message;
        creationDeCompteEnErreur.value = true;
        doitPrendreEnCompteIdNGC = true;
        window.scrollTo(0, 0);
      });
  };
</script>
