<template>
  <section>
    <h1 class="fr-h2 fr-mb-4w">Mes informations</h1>
    <div id="scroll-to-alerte">
      <Alert
        v-if="alerte.isActive"
        :message="alerte.message"
        :titre="alerte.titre"
        :type="alerte.type"
        class="fr-col-12 fr-mb-2w"
      />
    </div>
    <form class="fr-mb-0" @submit.prevent="modifierInformation">
      <fieldset aria-labelledby="identité-fieldset-legend" class="fr-mb-1w fr-fieldset fr-px-0 fr-mx-0">
        <legend id="identité-fieldset-legend" class="fr-fieldset__legend fr-px-0 fr-mx-0">
          <h2 class="fr-h3">Mon identité</h2>
        </legend>
        <div class="fr-mb-3w">
          Adresse email : <strong>{{ profileUtlisateurViewModel.mail }}</strong>
        </div>
        <div class="fr-grid-row fr-grid-row--gutters fr-mb-3w">
          <div class="fr-col-lg-6 fr-col-12">
            <InputText
              autocomplete="username"
              v-model="profileUtlisateurViewModel.pseudo"
              :erreur="champsPseudoStatus"
              :required="true"
              description="Obligatoire. Doit être composé de 3 à 21 caractères. Lettres et chiffres uniquement."
              description-class="fr-mt-2w fr-mb-2w"
              label="Pseudonyme"
              name="pseudo"
              @blur="onValidationPseudo()"
              :maxlength="21"
            />
          </div>
          <div class="fr-col-12 fr-col-md-6">
            <InputDateDeNaissance
              class="fr-mb-0"
              ref="dateDeNaissanceComposant"
              v-model="profileUtlisateurViewModel.dateNaissance"
              :disabled="estUnUtilisateurFranceConnect"
              keyName="2"
            />
          </div>
          <div class="fr-col-lg-6 fr-col-12">
            <InputText
              autocomplete="given-name"
              v-model="profileUtlisateurViewModel.prenom"
              :disabled="!profileUtlisateurViewModel.nomPrenomModifiables"
              :erreur="champsPrenomStatus"
              description="Facultatif"
              label="Prénom"
              name="prenom"
              @blur="onValidationPrenom()"
            />
          </div>
          <div class="fr-col-lg-6 fr-col-12">
            <InputText
              autocomplete="family-name"
              v-model="profileUtlisateurViewModel.nom"
              :disabled="!profileUtlisateurViewModel.nomPrenomModifiables"
              :erreur="champsNomStatus"
              description="Facultatif"
              label="Nom"
              name="nom"
              @blur="onValidationNom()"
            />
          </div>
        </div>
      </fieldset>

      <fieldset aria-labelledby="donnee-fieldset-legend" class="fr-mb-0 fr-fieldset fr-px-0 fr-mx-0">
        <legend id="donnee-fieldset-legend" class="fr-fieldset__legend fr-px-0 fr-mx-0">
          <h2 class="fr-h3">Mes données personnelles</h2>
        </legend>
        <div class="full-width">
          <CompteFormulaireRevenuFiscal
            v-model:nombre-de-parts="profileUtlisateurViewModel.nombreDePartsFiscales"
            v-model:revenu-fiscal-de-reference="profileUtlisateurViewModel.revenuFiscal"
            class="fr-mb-4w"
            @update:isRFREnErreur="value => (isRFREnErreur = value)"
          />
        </div>
      </fieldset>

      <div class="fr-accordions-group background--white">
        <Accordeon name-id="ou-trouver">
          <template #titre>Où trouver ces informations&nbsp;?</template>
          <template #contenu>
            <p>
              Le revenu fiscal de référence et votre nombre de parts se trouvent sur la 1ère page de votre dernier avis
              d’impôt.
            </p>
            <p>
              <strong>Nombre de parts&nbsp;:</strong><br />
              Si vous ne disposez pas de votre dernier avis d’impôt, renseignez 1 part pour chaque adulte de votre foyer
              fiscal, puis 0,5 part par enfant jusqu’à 2 enfants, puis 1 part par enfant à partir du 3ème enfant.
            </p>
            <p class="fr-mb-0">
              <strong>Revenu fiscal de référence&nbsp;:</strong><br />
              Si vous ne disposez pas de votre dernier avis d’impôt, renseignez la somme des revenus de toutes les
              personnes avec lequelles vous partagez vos déclarations d’impôts (pour toute l’année) pour vous faire une
              première idée.
            </p>
          </template>
        </Accordeon>
        <Accordeon name-id="pourquoi">
          <template #titre>Pourquoi ces questions&nbsp;?</template>
          <template #contenu>
            <p class="fr-mb-0">
              Votre revenu fiscal de référence et le nombre de parts permettent d’afficher les aides en fonction de vos
              ressources.
            </p>
          </template>
        </Accordeon>
      </div>

      <CompteFormulaireBoutonEnregistrer />
    </form>
  </section>
</template>

<script lang="ts" setup>
  import { ref, useTemplateRef } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import CompteFormulaireBoutonEnregistrer from '@/components/custom/Compte/CompteFormulaireBoutonEnregistrer.vue';
  import CompteFormulaireRevenuFiscal from '@/components/custom/Compte/CompteFormulaireRevenuFiscal.vue';
  import Accordeon from '@/components/dsfr/Accordeon.vue';
  import InputDateDeNaissance from '@/components/dsfr/InputDateDeNaissance.vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import { validationPrenomOuNom, validationPseudoTaille } from '@/components/validations/validationsChampsFormulaire';
  import { useAlerte } from '@/composables/useAlerte';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { ProfileUtilisateurViewModel } from '@/domaines/profileUtilisateur/adapters/profileUtilisateur.presenter.impl';
  import { ProfileUtilisateurRepositoryAxiosImpl } from '@/domaines/profileUtilisateur/chargerProfileUtilisateur.usecase';
  import {
    MettreAJourProfileUtilisateurUsecase,
    ProfileAMettreAJourInput,
  } from '@/domaines/profileUtilisateur/mettreAJourProfileUtilisateurUsecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const { alerte, afficherAlerte } = useAlerte();
  const props = defineProps<{ compteUtlisateurViewModel: ProfileUtilisateurViewModel }>();
  const profileUtlisateurViewModel = ref<ProfileUtilisateurViewModel>(props.compteUtlisateurViewModel);
  const champsPrenomStatus = ref<{ message: string; afficher: boolean }>({ message: '', afficher: false });
  const champsNomStatus = ref<{ message: string; afficher: boolean }>({ message: '', afficher: false });
  const champsPseudoStatus = ref<{ message: string; afficher: boolean }>({ message: '', afficher: false });
  const isRFREnErreur = ref(false);
  const dateDeNaissanceComposant = useTemplateRef('dateDeNaissanceComposant');
  const estUnUtilisateurFranceConnect = utilisateurStore().utilisateur.estUnUtilisateurFranceConnect;

  async function modifierInformation() {
    const formulaireEnErreur =
      !onValidationPseudo() ||
      !onValidationPrenom() ||
      !onValidationNom() ||
      isRFREnErreur.value ||
      !dateDeNaissanceComposant.value?.validation();

    if (formulaireEnErreur) return;
    const usecase = new MettreAJourProfileUtilisateurUsecase(
      new ProfileUtilisateurRepositoryAxiosImpl(),
      new SessionRepositoryStore(),
    );

    const profileAMettreAJour: ProfileAMettreAJourInput = {
      id: profileUtlisateurViewModel.value.id,
      abonnementTransport: profileUtlisateurViewModel.value.abonnementTransport,
      dateNaissance: profileUtlisateurViewModel.value.dateNaissance,
      nom: profileUtlisateurViewModel.value.nom,
      prenom: profileUtlisateurViewModel.value.prenom,
      pseudo: profileUtlisateurViewModel.value.pseudo,
      revenuFiscal: profileUtlisateurViewModel.value.revenuFiscal,
      nombreDePartsFiscales: profileUtlisateurViewModel.value.nombreDePartsFiscales,
      nomPrenomModifiables: profileUtlisateurViewModel.value.nomPrenomModifiables,
    };
    await usecase.execute(profileAMettreAJour);
    afficherAlerte('success', 'Succès', 'Compte correctement mis à jour.');

    const alertElement = document.getElementById('scroll-to-alerte');
    if (alertElement) {
      alertElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function onValidationPrenom(): boolean {
    if (profileUtlisateurViewModel.value.prenom && !validationPrenomOuNom(profileUtlisateurViewModel.value.prenom)) {
      champsPrenomStatus.value = { message: 'Le prénom doit contenir uniquement des lettres', afficher: true };
      return false;
    }
    champsPrenomStatus.value = { message: '', afficher: false };
    return true;
  }

  function onValidationPseudo(): boolean {
    if (!validationPrenomOuNom(profileUtlisateurViewModel.value.pseudo)) {
      champsPseudoStatus.value = {
        message: 'Le pseudonyme ne peut contenir que des lettres ou des chiffres',
        afficher: true,
      };
      return false;
    }
    if (!validationPseudoTaille(profileUtlisateurViewModel.value.pseudo)) {
      champsPseudoStatus.value = { message: 'Le pseudonyme doit contenir entre 3 et 21 caractères', afficher: true };
      return false;
    }
    champsPseudoStatus.value = { message: '', afficher: false };
    return true;
  }

  function onValidationNom(): boolean {
    if (profileUtlisateurViewModel.value.nom && !validationPrenomOuNom(profileUtlisateurViewModel.value.nom)) {
      champsNomStatus.value = { message: 'Le nom doit contenir uniquement des lettres', afficher: true };
      return false;
    }
    champsNomStatus.value = { message: '', afficher: false };
    return true;
  }
</script>
