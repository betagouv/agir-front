<template>
  <div>
    <form class="fr-mb-0 background--white fr-p-4w border border-radius--md" @submit.prevent="modifierInformation">
      <fieldset class="fr-mb-5v fr-fieldset" aria-labelledby="identité-fieldset-legend">
        <legend class="fr-fieldset__legend fr-px-0 fr-mx-0" id="identité-fieldset-legend">
          <h2>Identité personnelle</h2>
        </legend>
        <div class="fr-col-12">
          <InputText label="Nom" name="nom" v-model="compteUtlisateurViewModel.nom" />
          <InputText label="Prénom" name="prenom" v-model="compteUtlisateurViewModel.prenom" />
          <InputMail label="Adresse électronique" v-model="compteUtlisateurViewModel.mail" name="mail" />
        </div>
      </fieldset>
      <fieldset class="fr-mb-0 fr-fieldset" aria-labelledby="donnee-fieldset-legend">
        <legend class="fr-fieldset__legend fr-px-0 fr-mx-0" id="donnee-fieldset-legend">
          <h2>Données personnelles</h2>
        </legend>
        <div class="fr-col-12">
          <div class="fr-grid-row">
            <InputText
              label="Revenu fiscal de référence"
              name="revenu-fiscal"
              v-model="compteUtlisateurViewModel.revenuFiscal"
            />
            <CarteInfo class="fr-ml-md-4w fr-col-md-8">
              <p class="fr-icon-information-line fr-m-0">
                Votre <strong>revenu fiscal de référence</strong> permet d’afficher les aides en fonction de vos
                ressources.
              </p>
            </CarteInfo>
          </div>
          <div class="fr-grid-row">
            <InputCodePostal
              v-model="compteUtlisateurViewModel.codePostal"
              :defaultValue="compteUtlisateurViewModel.codePostal"
              :defaultSelectValue="compteUtlisateurViewModel.commune"
              @update:selectedCommune="compteUtlisateurViewModel.commune = $event"
            />
            <CarteInfo class="fr-ml-md-4w fr-mt-3w">
              <p class="fr-icon-information-line fr-m-0">
                Votre <strong>code postal</strong> permet de consulter les aides locales.
              </p>
            </CarteInfo>
          </div>
          <button class="fr-btn fr-mt-4w">Mettre à jour</button>
        </div>
      </fieldset>
    </form>
    <Alert
      v-if="success"
      class="fr-col-12 fr-mt-2w"
      type="success"
      titre="Succès"
      message="Compte correctement mis à jour."
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { CompteUtlisateurViewModel } from '@/compte/adapters/compteUtilisateur.presenter.impl';
  import { MettreAJourCompteUtilisateurUsecase } from '@/compte/mettreAJourCompteUtilisateur.usecase';
  import { CompteUtilisateurRepositoryImpl } from '@/compte/adapters/compteUtilisateur.repository.impl';
  import { SessionRepositoryStore } from '@/authentification/adapters/session.repository.store';
  import InputText from '@/components/dsfr/InputText.vue';
  import InputMail from '@/components/dsfr/InputMail.vue';
  import InputCodePostal from '@/components/dsfr/InputCodePostal.vue';
  import Alert from '@/components/custom/Alert.vue';
  import CarteInfo from '@/components/custom/CarteInfo.vue';

  const props = defineProps<{
    compteUtlisateurViewModel: CompteUtlisateurViewModel;
  }>();

  let success = ref(false);
  const compteUtlisateurViewModel = ref<CompteUtlisateurViewModel>(props.compteUtlisateurViewModel);

  async function modifierInformation() {
    const usecase = new MettreAJourCompteUtilisateurUsecase(
      new CompteUtilisateurRepositoryImpl(),
      new SessionRepositoryStore()
    );
    await usecase.execute(compteUtlisateurViewModel.value);
    success.value = true;
  }
</script>
