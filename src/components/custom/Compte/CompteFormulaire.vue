<template>
  <h2 class="fr-h2">Mes informations</h2>
  <div id="scroll-to-alerte">
    <Alert
      v-if="alerte.isActive"
      class="fr-col-12 fr-mb-2w"
      :type="alerte.type"
      :titre="alerte.titre"
      :message="alerte.message"
    />
  </div>
  <form class="fr-mb-0" @submit.prevent="modifierInformation">
    <div class="fr-grid-row full-width flex-end fr-mb-4w fr-mb-md-2w">
      <button
        type="submit"
        aria-label="Soumettre le formulaire"
        :disabled="formulaireEnErreur"
        class="fr-btn fr-btn--icon-left fr-btn--lg fr-icon-save-3-fill"
      >
        Mettre à jour mes informations
      </button>
    </div>
    <fieldset class="fr-mb-5v fr-fieldset" aria-labelledby="identité-fieldset-legend">
      <legend class="fr-fieldset__legend fr-px-0 fr-mx-0" id="identité-fieldset-legend">
        <h2 class="fr-h3">Mon identité</h2>
      </legend>
      <div class="fr-mb-4w">
        Adresse email : <strong>{{ profileUtlisateurViewModel.mail }}</strong>
      </div>
      <div class="fr-grid-row fr-grid-row--gutters">
        <div class="fr-col-lg-6 fr-col-12">
          <InputText
            :required="true"
            description="obligatoire"
            label="Prénom"
            name="prenom"
            v-model="profileUtlisateurViewModel.prenom"
            :erreur="champsPrenomStatus"
            @blur="onValidationPrenom()"
          />
        </div>
        <div class="fr-col-lg-6 fr-col-12">
          <InputText
            description="facultatif"
            label="Nom"
            name="nom"
            v-model="profileUtlisateurViewModel.nom"
            :erreur="champsNomStatus"
            @blur="onValidationNom()"
          />
        </div>
        <div class="fr-col-lg-6 fr-col-12">
          <InputSelectAnneeDeNaissance
            v-model="profileUtlisateurViewModel.anneeNaissance"
            :default-select-value="profileUtlisateurViewModel.anneeNaissance"
          />
        </div>
      </div>
    </fieldset>
    <fieldset class="fr-mb-0 fr-fieldset" aria-labelledby="donnee-fieldset-legend">
      <legend class="fr-fieldset__legend fr-px-0 fr-mx-0" id="donnee-fieldset-legend">
        <h2 class="fr-h3">Données personnelles</h2>
      </legend>
      <div class="full-width">
        <CompteFormulaireRevenuFiscal
          class="fr-mb-4w"
          v-model:nombre-de-parts="profileUtlisateurViewModel.nombreDePartsFiscales"
          v-model:revenu-fiscal-de-reference="profileUtlisateurViewModel.revenuFiscal"
          @update:isRFREnErreur="value => (isRFREnErreur = value)"
        />
      </div>
    </fieldset>
    <CarteInfo>
      <p class="fr-text--bold">
        <span class="fr-icon-question-line" aria-hidden="true"></span>
        Où trouver ces informations&nbsp;?
      </p>
      <p>
        Le revenu fiscal de référence et votre nombre de parts se trouvent sur la 1ère page de votre dernier avis
        d’impôt.
      </p>
      <p>
        <strong>Nombre de parts&nbsp;:</strong><br />
        Si vous ne disposez pas de votre dernier avis d’impôt, renseignez 1 part pour chaque adulte de votre foyer
        fiscal, puis 0,5 part par enfant jusqu’à 2 enfants, puis 1 part par enfant à partir du 3ème enfant.
      </p>
      <p>
        <strong>Revenu fiscal de référence&nbsp;:</strong><br />
        Si vous ne disposez pas de votre dernier avis d’impôt, renseignez la somme des revenus de toutes les personnes
        avec lequelles vous partagez vos déclarations d’impôts (pour toute l’année) pour vous faire une première idée.
      </p>
      <p class="fr-text--bold">
        <span class="fr-icon-information-line" aria-hidden="true"></span>
        Pourquoi ces questions&nbsp;?
      </p>
      <p class="fr-mb-0">
        Votre revenu fiscal de référence et le nombre de parts permettent d’afficher les aides en fonction de vos
        ressources.
      </p>
    </CarteInfo>

    <div class="fr-grid-row full-width flex-end">
      <button
        type="submit"
        aria-label="Soumettre le formulaire"
        :disabled="formulaireEnErreur"
        class="fr-btn fr-btn--icon-left fr-btn--lg fr-mt-4w fr-icon-save-3-fill"
      >
        Mettre à jour mes informations
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import CarteInfo from '@/components/custom/CarteInfo.vue';
  import CompteFormulaireRevenuFiscal from '@/components/custom/Compte/CompteFormulaireRevenuFiscal.vue';
  import InputSelectAnneeDeNaissance from '@/components/custom/CreationCompte/InputSelectAnneeDeNaissance.vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import { validationNom, validationPrenom } from '@/components/validations/validationsChampsFormulaire';
  import { useAlerte } from '@/composables/useAlerte';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { ProfileUtilisateurViewModel } from '@/domaines/profileUtilisateur/adapters/profileUtilisateur.presenter.impl';
  import { ProfileUtilisateurRepositoryAxiosImpl } from '@/domaines/profileUtilisateur/chargerProfileUtilisateur.usecase';
  import { MettreAJourProfileUtilisateurUsecase } from '@/domaines/profileUtilisateur/mettreAJourProfileUtilisateurUsecase';

  const { alerte, afficherAlerte } = useAlerte();
  const props = defineProps<{ compteUtlisateurViewModel: ProfileUtilisateurViewModel }>();
  const profileUtlisateurViewModel = ref<ProfileUtilisateurViewModel>(props.compteUtlisateurViewModel);
  const champsPrenomStatus = ref<{ message: string; afficher: boolean }>({ message: '', afficher: false });
  const champsNomStatus = ref<{ message: string; afficher: boolean }>({ message: '', afficher: false });
  const isRFREnErreur = ref(false);
  const formulaireEnErreur = computed(() => {
    return !onValidationPrenom() || !onValidationNom() || isRFREnErreur.value;
  });
  async function modifierInformation() {
    if (formulaireEnErreur.value) return;
    const usecase = new MettreAJourProfileUtilisateurUsecase(
      new ProfileUtilisateurRepositoryAxiosImpl(),
      new SessionRepositoryStore(),
    );

    await usecase.execute(profileUtlisateurViewModel.value);
    afficherAlerte('success', 'Succès', 'Compte correctement mis à jour.');

    const alertElement = document.getElementById('scroll-to-alerte');
    if (alertElement) {
      alertElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function onValidationPrenom(): boolean {
    if (!validationPrenom(profileUtlisateurViewModel.value.prenom)) {
      champsPrenomStatus.value = { message: 'Le prénom doit contenir uniquement des lettres', afficher: true };
      return false;
    }
    champsPrenomStatus.value = { message: '', afficher: false };
    return true;
  }

  function onValidationNom(): boolean {
    if (!validationNom(profileUtlisateurViewModel.value.nom)) {
      champsNomStatus.value = { message: 'Le nom doit contenir uniquement des lettres', afficher: true };
      return false;
    }
    champsNomStatus.value = { message: '', afficher: false };
    return true;
  }
</script>
