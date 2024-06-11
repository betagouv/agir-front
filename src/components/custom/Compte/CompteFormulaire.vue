<template>
  <div>
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
            <InputText label="Prénom" name="prenom" v-model="profileUtlisateurViewModel.prenom" />
          </div>
          <div class="fr-col-lg-6 fr-col-12">
            <InputText label="Nom" name="nom" v-model="profileUtlisateurViewModel.nom" />
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
        <div class="fr-grid fr-grid-row">
          <div class="fr-col-12">
            <InputTrancheDeRevenu
              v-model:nombre-de-parts="profileUtlisateurViewModel.nombreDePartsFiscales"
              v-model:revenu-fiscal-de-reference="profileUtlisateurViewModel.revenuFiscal"
            />
            <CarteInfo>
              <p class="fr-icon-information-line fr-m-0">
                Votre <strong>revenu fiscal de référence</strong> et le <strong>nombre de parts</strong> permettent
                d’afficher les aides en fonction de vos ressources.
              </p>
            </CarteInfo>
          </div>
        </div>
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
    <Alert
      v-if="alerte.isActive"
      class="fr-col-12 fr-mt-2w"
      :type="alerte.type"
      :titre="alerte.titre"
      :message="alerte.message"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import CarteInfo from '@/components/custom/CarteInfo.vue';
  import InputSelectAnneeDeNaissance from '@/components/custom/CreationCompte/InputSelectAnneeDeNaissance.vue';
  import InputTrancheDeRevenu from '@/components/custom/InputTrancheDeRevenu.vue';
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
  }
</script>
