<template>
  <Callout
    :button="{
      text: 'Choisir comme adresse principale',
      onClick: definirAdressePrincipale,
    }"
    :icone-information="false"
    class="fr-mt-3w"
    texte="Voulez-vous utiliser cette adresse comme votre adresse principale à l’avenir&nbsp;?"
  />
</template>

<script setup lang="ts">
  import Callout from '@/components/dsfr/Callout.vue';
  import { LogementRepositoryAxios } from '@/domaines/logement/adapters/logement.repository.axios';
  import { PatcherInformationLogementUsecase } from '@/domaines/logement/patcherInformationLogement.usecase';
  import { Logement } from '@/domaines/logement/recupererInformationLogement.usecase';
  import { sessionAppRawDataStorage } from '@/shell/appRawDataStorage';
  import { AdresseBarreDeRecherche, Coordonnees } from '@/shell/coordonneesType';
  import { utilisateurStore } from '@/store/utilisateur';

  const utilisateurId = utilisateurStore().utilisateur.id;
  const { adresse, coordonnees } = defineProps<{
    adresse: AdresseBarreDeRecherche;
    coordonnees: Coordonnees;
  }>();
  const emit = defineEmits<{
    (e: 'enregistrementNouvelleAdresse'): void;
  }>();

  async function definirAdressePrincipale() {
    if (!adresse || !coordonnees) return;

    const nouveauLogement: Partial<Logement> = {
      coordonnees: {
        latitude: coordonnees.latitude,
        longitude: coordonnees.longitude,
      },
      codePostal: adresse.codePostal,
      codeEpci: adresse.codeEpci,
      numeroRue: adresse.numeroRue,
      rue: adresse.rue,
    };

    const patcherInformationLogementUsecase = new PatcherInformationLogementUsecase(
      new LogementRepositoryAxios(),
      sessionAppRawDataStorage,
    );
    await patcherInformationLogementUsecase.execute(utilisateurId, nouveauLogement);
    emit('enregistrementNouvelleAdresse');
  }
</script>
