<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-md-6 fr-mx-auto fr-mb-0 background--white fr-p-4w border border-radius--md">
      <img alt="" src="/bg_creation_compte.svg" />
      <p class="text--normal text--bleu fr-mt-1w fr-mb-1w"><span class="fr-text--bold">Question 1</span> sur 3</p>
      <h1 class="fr-h4 fr-mb-1w">Bienvenue sur J'agis ! Faisons connaissance...</h1>

      <form aria-labelledby="identity-fieldset-legend" class="fr-mb-4w" @submit.prevent="validerLaReponse()">
        <fieldset class="fr-fieldset fr-mb-0">
          <legend id="identity-fieldset-legend" class="fr-fieldset__legend fr-text--regular fr-text--lg">
            Nous avons quelques questions à vous poser pour personnaliser votre expérience !
          </legend>
          <div class="fr-fieldset__element">
            <InputText
              v-model="onboardingPostCreationCompte().pseudo"
              :autofocus="true"
              :erreur="champsPseudoStatus"
              :required="true"
              label="Votre pseudonyme"
              name="utilisateur-pseudo"
              @blur="onValidationPseudo"
              :maxlength="30"
            />

            <InputDateDeNaissance
              ref="dateDeNaissanceComposant"
              :key="DATE_DE_NAISSANCE_FORMULAIRE_ID"
              description="Nécessaire pour faciliter votre identification"
              v-if="!utilisateurStore().utilisateur.estUnUtilisateurFranceConnect"
              v-model="onboardingPostCreationCompte().dateDeNaissance"
              :erreur="champsDateDeNaissanceStatus"
              class="fr-mt-4w"
              required
            />
          </div>
        </fieldset>
        <button class="fr-btn fr-mr-4w">Continuer</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, useTemplateRef } from 'vue';
  import InputDateDeNaissance from '@/components/dsfr/InputDateDeNaissance.vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import {
    validationAnnee,
    validationDateEstPassee,
    validationDateExiste,
    validationJour,
    validationMois,
    validationPrenomOuNomOuPseudo,
  } from '@/components/validations/validationsChampsFormulaire';
  import router from '@/router';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
  import { onboardingPostCreationCompte } from '@/store/onboardingPostCreationCompte';
  import { utilisateurStore } from '@/store/utilisateur';

  const DATE_DE_NAISSANCE_FORMULAIRE_ID = 'formulaire-inscription';
  const dateDeNaissanceComposant = useTemplateRef('dateDeNaissanceComposant');

  const validerLaReponse = () => {
    if (!onValidationPseudo()) return;
    if (!onValidationDateDeNaissance()) return;
    router.push({ name: RouteCompteName.POST_CREATION_COMPTE_ETAPE_2 });
  };
  const champsPseudoStatus = ref({ message: '', afficher: false });
  const champsDateDeNaissanceStatus = ref({
    message_jour: '',
    message_mois: '',
    message_annee: '',
    message_general: '',
    afficher: false,
  });

  function resetDateDeNaissanceStatus() {
    champsDateDeNaissanceStatus.value = {
      message_jour: '',
      message_mois: '',
      message_annee: '',
      message_general: '',
      afficher: false,
    };
  }

  function onValidationPseudo(): boolean {
    if (!validationPrenomOuNomOuPseudo(onboardingPostCreationCompte().pseudo)) {
      champsPseudoStatus.value = { message: 'Le pseudonyme doit contenir uniquement des lettres', afficher: true };
      return false;
    }
    champsPseudoStatus.value = { message: '', afficher: false };
    return true;
  }

  function onValidationDateDeNaissance(): boolean {
    let hasError = false;
    resetDateDeNaissanceStatus();

    if (!validationJour(onboardingPostCreationCompte().dateDeNaissance.jour)) {
      dateDeNaissanceComposant.value.focusInput('jour');
      hasError = true;
      champsDateDeNaissanceStatus.value.afficher = true;
      champsDateDeNaissanceStatus.value.message_jour = 'Le jour doit être compris entre 1 et 31';
    }

    if (!validationMois(onboardingPostCreationCompte().dateDeNaissance.mois)) {
      if (!hasError) dateDeNaissanceComposant.value.focusInput('mois');
      hasError = true;
      champsDateDeNaissanceStatus.value.afficher = true;
      champsDateDeNaissanceStatus.value.message_mois = 'Le mois doit être compris entre 1 et 12';
    }

    if (!validationAnnee(onboardingPostCreationCompte().dateDeNaissance.annee)) {
      if (!hasError) dateDeNaissanceComposant.value.focusInput('annee');
      hasError = true;
      const anneeActuelle = new Date().getFullYear();
      champsDateDeNaissanceStatus.value.afficher = true;
      champsDateDeNaissanceStatus.value.message_annee = `L'annee doit être comprise entre 1900 et ${anneeActuelle}`;
    }

    if (!validationDateEstPassee(onboardingPostCreationCompte().dateDeNaissance)) {
      if (!hasError) dateDeNaissanceComposant.value.focusInput('general');
      hasError = true;
      champsDateDeNaissanceStatus.value.afficher = true;
      champsDateDeNaissanceStatus.value.message_general = 'La date de naissance ne peut être dans le futur';
    }

    if (!hasError && !validationDateExiste(onboardingPostCreationCompte().dateDeNaissance)) {
      if (!hasError) dateDeNaissanceComposant.value.focusInput('general');
      hasError = true;
      champsDateDeNaissanceStatus.value.afficher = true;
      champsDateDeNaissanceStatus.value.message_general = "La date de naissance n'existe pas";
    }

    if (hasError) return false;

    resetDateDeNaissanceStatus();
    return true;
  }
</script>
