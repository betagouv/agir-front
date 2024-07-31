<template>
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
    <div class="fr-grid-row full-width flex-end">
      <button
        type="submit"
        aria-label="Soumettre le formulaire"
        class="fr-btn fr-btn--icon-left fr-btn--lg fr-icon-save-3-fill"
      >
        Mettre à jour vos informations
      </button>
    </div>
    <fieldset class="fr-mb-5v fr-fieldset" aria-labelledby="identité-fieldset-legend">
      <legend class="fr-fieldset__legend fr-px-0 fr-mx-0" id="identité-fieldset-legend">
        <h2>Identité personnelle</h2>
      </legend>
      <div class="fr-grid-row fr-grid-row--gutters">
        <div class="fr-col-lg-6 fr-col-12">
          <InputText
            :required="true"
            description="obligatoire"
            label="Prénom"
            name="prenom"
            v-model="profileUtlisateurViewModel.prenom"
          />
        </div>
        <div class="fr-col-lg-6 fr-col-12">
          <InputText description="facultatif" label="Nom" name="nom" v-model="profileUtlisateurViewModel.nom" />
        </div>
        <div class="fr-col-lg-6 fr-col-12">
          <InputMail label="Adresse électronique" v-model="profileUtlisateurViewModel.mail" name="mail" />
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
        <h2>Données personnelles</h2>
      </legend>
      <div class="fr-grid-row fr-grid-row--gutters fr-col-12 fr-pb-4w">
        <div class="fr-col-6">
          <div class="fr-input-group">
            <label class="fr-label" for="text-input-rfr"> Nombre de parts fiscales de votre foyer </label>
            <input
              required
              class="fr-input fr-col-4"
              name="revenu-fiscal"
              id="text-input-rfr"
              inputmode="numeric"
              type="number"
              v-model="profileUtlisateurViewModel.nombreDePartsFiscales"
              step=".5"
              min="1"
            />
          </div>
        </div>
        <div class="fr-col-6">
          <InputText
            name="revenu"
            @update:model-value="value => (profileUtlisateurViewModel.revenuFiscal = Number(value))"
            :model-value="profileUtlisateurViewModel.revenuFiscal?.toString() || ''"
            label="Revenu fiscal de référence de votre foyer"
          />
        </div>
      </div>
      <CarteInfo>
        <p class="fr-text--bold">
          <span class="fr-icon-question-line" aria-hidden="true"></span>
          Où trouver ces informations
        </p>
        <p>
          Le <strong>revenu fiscal de référence</strong> et votre <strong>nombre de parts</strong> se trouvent sur la
          1ère page de votre dernier avis d’impôt.<br />
          <strong>Nombre de part</strong><br />
          Si vous ne disposez pas de votre dernier avis d’impôt, renseignez 1 part pour chaque adulte de votre foyer
          fiscal, puis 0,5 part par enfant jusqu’à 2 enfants, puis 1 part par enfant à partir du 3ème enfant.
        </p>
        <p>
          Si vous ne disposez pas de votre dernier avis d’impôt, renseignez la somme des revenus de toutes les personnes
          avec lequelles vous partagez vos déclarations d’impôts (pour toute l’année) pour vous faire une première idée.
        </p>
        <p class="fr-text--bold">
          <span class="fr-icon-information-line" aria-hidden="true"></span>
          Pourquoi ces questions ?
        </p>
        <p class="fr-mb-0">
          Votre <strong>revenu fiscal de référence</strong> et le <strong>nombre de parts</strong> permettent d’afficher
          les aides en fonction de vos ressources.
        </p>
      </CarteInfo>

      <div class="fr-grid-row full-width flex-end">
        <button
          type="submit"
          aria-label="Soumettre le formulaire"
          class="fr-btn fr-btn--icon-left fr-btn--lg fr-mt-4w fr-icon-save-3-fill"
        >
          Mettre à jour vos informations
        </button>
      </div>
    </fieldset>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import CarteInfo from '@/components/custom/CarteInfo.vue';
  import InputSelectAnneeDeNaissance from '@/components/custom/CreationCompte/InputSelectAnneeDeNaissance.vue';
  import InputMail from '@/components/dsfr/InputMail.vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import { useAlerte } from '@/composables/useAlerte';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { ProfileUtilisateurViewModel } from '@/domaines/profileUtilisateur/adapters/profileUtilisateur.presenter.impl';
  import { ProfileUtilisateurRepositoryAxiosImpl } from '@/domaines/profileUtilisateur/chargerProfileUtilisateur.usecase';
  import { MettreAJourProfileUtilisateurUsecase } from '@/domaines/profileUtilisateur/mettreAJourProfileUtilisateurUsecase';

  const { alerte, afficherAlerte } = useAlerte();
  const props = defineProps<{ compteUtlisateurViewModel: ProfileUtilisateurViewModel }>();
  const profileUtlisateurViewModel = ref<ProfileUtilisateurViewModel>(props.compteUtlisateurViewModel);
  async function modifierInformation() {
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
</script>
