<template>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col">
      <h1 class="fr-h1">Créer mon compte sur <i>J'agis</i></h1>
    </div>
    <div>
      <div class="fr-grid-row border border-radius--md fr-p-2w align-items--center fr-mb-md-0 fr-mb-5w shadow--light">
        <img alt="" class="fr-mr-2w" src="/ic_ngc_small.webp" width="60" />
        <div class="flex-column text--bold">
          <span class="text--black">MON EMPREINTE</span>
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
  <p>
    En créant un compte, vous acceptez de transférer les données liées à votre bilan
    <i class="text--bold text--normal">Nos&nbsp;Gestes&nbsp;Climat</i> pour profiter d’une expérience d’usage améliorée
  </p>

  <div class="flex flex-reverse-col">
    <p class="text--center">
      <span class="display-block"> En m’inscrivant (y compris avec FranceConnect) j'accepte les </span>
      <router-link :to="{ name: RouteConformiteName.CGU }" class="fr-link" target="_blank"
        >Conditions générales d’utilisation</router-link
      >
    </p>
    <div>
      <FranceConnect :situation-id="idNGC" class="fr-mb-3w" />

      <h2 class="fr-h3">Avec mon adresse e-mail</h2>
      <form class="fr-mb-4w" @submit.prevent="performCreerCompteUtilisateur">
        <div class="fr-messages-group">
          <Alert
            v-if="creationDeCompteEnErreur"
            :message="creationDeCompteMessageErreur"
            class="fr-col-12 fr-mb-2w"
            titre="Erreur lors de la création du compte"
            type="error"
          />
        </div>
        <InputMail v-model="compteUtilisateurInput.mail" label="Adresse électronique" name="utilisateur-mail" />
        <button
          :disabled="!compteUtilisateurInput.mail"
          class="fr-btn fr-btn--lg display-block full-width"
          type="submit"
        >
          Créer mon compte
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import Alert from '@/components/custom/Alert.vue';
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
    situationId: null,
  });
  let creationDeCompteEnErreur = ref<boolean>();
  let creationDeCompteMessageErreur = ref<string>('');
  utilisateurStore().reset();
  const route = useRoute();
  const idNGC = ref<string | null>(route.query.situationId as string | null);
  const bilanTonnes = ref<string | null>(route.query.bilan_tonnes as string | null);

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
