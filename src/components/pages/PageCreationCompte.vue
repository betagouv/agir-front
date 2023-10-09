<template>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-lg-7">
      <h1 class="inscription__titre">
        <img alt="Plateforme Agir :" src="/logo_agir.png" class="fr-mb-3w display-block" />
        Devenez acteur de la transition écologique !
      </h1>
      <ul class="fr-text--lg">
        <li>Un accompagnement personnalisé adapté en fonction de vos revenus, là où vous habitez et vos goûts</li>
        <li>Un suivi au quotidien</li>
        <li>Des articles pour apprendre de nouvelles choses</li>
      </ul>
      <p class="fr-h2">+ de 200 000 acteurs déjà inscrits</p>
    </div>
    <form
      class="fr-col-12 fr-col-lg-5 fr-mx-auto fr-mb-0 background--white fr-p-4w border border-radius--md"
      @submit.prevent="performCreerCompteUtilisateur"
    >
      <fieldset class="fr-mb-0 fr-fieldset">
        <legend class="fr-fieldset__legend fr-px-0 fr-mx-0" id="identity-fieldset-legend">
          <h2>Création de compte sur Agir</h2>
        </legend>
        <h3>Créer un compte avec FranceConnect</h3>
        <div class="fr-col-12 text--center">
          <BoutonFranceConnect />
        </div>
        <div class="separateur fr-mb-2v">ou</div>
        <h3>Créer un compte en choisissant un identifiant</h3>
        <div class="fr-grid-row fr-grid-row--gutters">
          <div class="fr-col-12 fr-py-0">
            <InputMail label="Adresse électronique" name="utilisateur-mail" v-model="compteUtilisateurInput.mail" />
          </div>
          <div class="fr-col-12 fr-col-lg-6">
            <InputText label="Nom" name="utilisateur-nom" v-model="compteUtilisateurInput.nom" />
          </div>
          <div class="fr-col-12 fr-col-lg-6">
            <InputText label="Prénom" name="utilisateur-prenom" v-model="compteUtilisateurInput.prenom" />
          </div>
        </div>
        <button class="fr-btn display-block fr-col-12 fr-mt-2w" type="submit">Créer mon compte</button>
        <div v-show="creationDeCompteEnErreur" class="fr-alert fr-alert--error fr-col-12 fr-mt-2w fr-mx-1w">
          <h3 class="fr-alert__title">Erreur lors de la création du compte</h3>
          <p>{{ creationDeCompteMessageErreur }}</p>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { CreerCompteUtilisateurUsecase } from '@/compte/creerCompteUtilisateur.usecase';
  import { ref } from 'vue';
  import { CompteUtlisateurViewModel } from '@/compte/adapters/compteUtilisateur.presenter.impl';
  import { SessionRepositoryStore } from '@/authentification/adapters/session.repository.store';
  import { CompteUtilisateurRepositoryImpl } from '@/compte/adapters/compteUtilisateur.repository.impl';
  import router from '@/router';
  import { utilisateurStore } from '@/store/utilisateur';
  import BoutonFranceConnect from '@/components/BoutonFranceConnect.vue';
  import InputMail from '@/components/dsfr/InputMail.vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import { onboardingStore } from '@/store/onboarding';

  type UserInput = Omit<CompteUtlisateurViewModel, 'id' | 'codePostal' | 'revenuFiscal'>;
  let compteUtilisateurInput = ref<UserInput>({
    nom: '',
    mail: '',
    prenom: '',
  });
  let creationDeCompteEnErreur = ref<boolean>(false);
  let creationDeCompteMessageErreur = ref<string>('');
  utilisateurStore().reset();

  const performCreerCompteUtilisateur = () => {
    const creeCompteUseCase = new CreerCompteUtilisateurUsecase(
      new CompteUtilisateurRepositoryImpl(),
      new SessionRepositoryStore()
    );
    creeCompteUseCase
      .execute(compteUtilisateurInput.value, onboardingStore().$state)
      .then(() => {
        router.push({ name: 'coach' });
        creationDeCompteEnErreur.value = false;
      }, null)
      .catch(reason => {
        creationDeCompteMessageErreur.value = reason.data.message;
        creationDeCompteEnErreur.value = true;
      });
  };
</script>

<style scoped>
  @media (min-width: 62rem) {
    .inscription__titre {
      margin-top: 6.25rem;
    }
  }
  .separateur {
    position: relative;
    text-align: center;
    width: 100%;

    &&:before,
    &&:after {
      content: '';
      position: absolute;
      height: 1px;
      width: 45%;
      background-color: #dddddd;
      top: 50%;
    }

    &&:before {
      left: 0;
    }

    &&:after {
      right: 0;
    }
  }
</style>
