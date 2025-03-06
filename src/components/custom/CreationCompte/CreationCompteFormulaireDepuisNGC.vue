<template>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col">
      <img alt="" src="/bg_creation_compte.svg" />
    </div>
    <div>
      <div class="fr-grid-row border border-radius--md fr-p-2w align-items--center fr-mb-md-0 fr-mb-5w">
        <img alt="" class="fr-mr-2w" src="/ic_ngc_small.webp" width="60" />
        <div class="flex-column text--bold">
          <span class="text--black">MON BILAN</span>
          <div class="fr-grid-row align-items--center text--orange-dark">
            <span class="text--4xl fr-mr-1v">{{ bilanTonnes }}</span>
            <span class="text--lh-1">
              tonnes<br />
              de CO2e/an
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <h1 class="fr-mb-2w">Rejoignez-nous pour continuer</h1>
  <p>
    En créant un compte vous acceptez de transférer les données liées à votre bilan
    <span class="text--bold">Nos Gestes Climat</span>
    pour profiter d’une expérience d’usage améliorée
  </p>
  <FranceConnect :situation-id="idNGC" class="fr-mb-2w" />

  <h2>Créez votre compte sur J'agis</h2>
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
      <div class="fr-fieldset__element">
        <InputMail v-model="compteUtilisateurInput.mail" label="Adresse électronique" name="utilisateur-mail" />
      </div>

      <div class="fr-fieldset__element">
        <InputPassword
          v-model="compteUtilisateurInput.motDePasse"
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
            <p>
              et de transférer les informations issues de mon bilan
              <span class="text--bold">Nos Gestes Climat</span> pour profiter d’une expérience d’usage améliorée
            </p>
          </label>
        </div>
      </div>
      <div class="fr-fieldset__element fr-mb-0 fr-mt-1w">
        <button
          :disabled="!formulaireValide || !acceptationCGU"
          class="fr-btn fr-btn--lg display-block full-width"
          type="submit"
        >
          S'inscrire
        </button>
      </div>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import Alert from '@/components/custom/Alert.vue';
  import InputPassword from '@/components/custom/Form/InputPassword.vue';
  import FranceConnect from '@/components/dsfr/FranceConnect.vue';
  import InputMail from '@/components/dsfr/InputMail.vue';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { CompteUtilisateurRepositoryImpl } from '@/domaines/compte/adapters/compteUtilisateur.repository.impl';
  import { CreerComptePresenterImpl } from '@/domaines/compte/adapters/creerComptePresenterImpl';
  import { CreerCompteUtilisateurUsecase, UserInput } from '@/domaines/compte/creerCompteUtilisateur.usecase';
  import router from '@/router';
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
  const route = useRoute();
  const idNGC = ref<string | null>(route.query.situationId as string | null);
  const bilanTonnes = ref<string | null>(route.query.bilan_tonnes as string | null);

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
        { ...compteUtilisateurInput.value, situationId: idNGC.value },
      )
      .catch(reason => {
        creationDeCompteMessageErreur.value = reason.message;
        creationDeCompteEnErreur.value = true;
        window.scrollTo(0, 0);
      });
  };
</script>
