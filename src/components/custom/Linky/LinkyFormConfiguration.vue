<template>
  <form @submit.prevent="parametrerLeService()">
    <InputText name="nom" v-model="nomDeFamille" label="Mon nom de famille" />
    <InputText
      name="prm"
      v-model="parametreDuService"
      label="Mon numéro de PRM"
      description="Il s’agit d’une suite de 14 chiffres qui identifie le logement sur le réseau électrique."
    />
    <Alert
      v-if="alerte.isActive"
      class="fr-col-12 fr-my-2w"
      :type="alerte.type"
      :titre="alerte.titre"
      :message="alerte.message"
    />
    <InputCheckboxUnitaire
      class="fr-mb-2w"
      id="cgu"
      v-model="acceptationCGU"
      label="Je déclare sur l'honneur être titulaire du point ou être mandaté par celui-ci et j'accepte que le service 'J'agis' ait accès à mes données des 2 ans passés et pour les 3 ans à venir. Je peux changer d'avis à tout moment sur mon compte Enedis."
    />
    <button type="submit" class="fr-btn" :disabled="!acceptationCGU || parametreDuService.length != 14">Valider</button>
  </form>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import InputCheckboxUnitaire from '@/components/dsfr/InputCheckboxUnitaire.vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import { useAlerte } from '@/composables/useAlerte';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import {
    ProfileUtilisateurPresenterImpl,
    ProfileUtilisateurViewModel,
  } from '@/domaines/profileUtilisateur/adapters/profileUtilisateur.presenter.impl';
  import {
    ChargerProfileUtilisateurUsecase,
    ProfileUtilisateurRepositoryAxiosImpl,
  } from '@/domaines/profileUtilisateur/chargerProfileUtilisateur.usecase';
  import { MettreAJourProfileUtilisateurUsecase } from '@/domaines/profileUtilisateur/mettreAJourProfileUtilisateurUsecase';
  import { ServiceRepositoryAxios } from '@/domaines/services/adapters/service.repository.axios';
  import { LinkyEventBusImpl } from '@/domaines/services/linkyEventBusImpl';
  import { ParametrerServiceUsecase } from '@/domaines/services/parametrerService.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{ prm: string }>();

  const nomDeFamille = ref<string>('');
  const acceptationCGU = ref<boolean>(false);
  const parametreDuService = defineModel<string>('prm', { default: '' });
  const profileUtilisateurViewModel = ref<ProfileUtilisateurViewModel>();

  const { id: utilisateurId, nom: utilisateurNom } = utilisateurStore().utilisateur;
  const { alerte, afficherAlerte } = useAlerte();

  const parametrerLeService = async () => {
    if (nomDeFamille.value !== utilisateurNom) {
      const usecase = new MettreAJourProfileUtilisateurUsecase(
        new ProfileUtilisateurRepositoryAxiosImpl(),
        new SessionRepositoryStore(),
      );

      const donneesAMettreAjour: ProfileUtilisateurViewModel = {
        ...profileUtilisateurViewModel.value!,
        nom: nomDeFamille.value,
      };

      await usecase.execute(donneesAMettreAjour);
    }

    const parametrerService = new ParametrerServiceUsecase(
      new ServiceRepositoryAxios(),
      LinkyEventBusImpl.getInstance(),
    );

    parametrerService
      .execute(utilisateurId, 'linky', { prm: parametreDuService.value })
      .then()
      .catch(error => afficherAlerte('error', 'Erreur', error.data.message || 'Erreur inattendue'));
  };

  onMounted(async () => {
    const usecase = new ChargerProfileUtilisateurUsecase(new ProfileUtilisateurRepositoryAxiosImpl());

    await usecase.execute(
      utilisateurId,
      new ProfileUtilisateurPresenterImpl(viewModel => {
        profileUtilisateurViewModel.value = viewModel;
        nomDeFamille.value = viewModel.nom;
      }),
    );
  });
</script>
