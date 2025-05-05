<template>
  <section class="fr-mb-4w border fr-p-4w">
    <h2 class="fr-h3" id="label-barre-de-recherche">Choisissez une adresse</h2>
    <ServiceBarreDeRechercheAdresse
      v-model:adresse="adresse"
      v-model:coordonnees="coordonnees"
      v-model:recherche="recherche"
      label-id="label-barre-de-recherche"
    />

    <Callout
      class="fr-mt-3w"
      v-if="avecAdressePrivee"
      texte="Voulez-vous utiliser cette adresse comme votre adresse principale à l’avenir ?"
      button-text="Choisir comme adresse principale"
      :icone-information="false"
      :on-click="definirAdressePrincipale"
    />

    <section class="fr-mb-3w fr-mt-5w">
      <template v-if="resultatsEnChargement || resultatSimulationMaifViewModel?.risques">
        <h3 class="fr-h4">Vos risques</h3>
        <BallLoader v-if="resultatsEnChargement" />
        <MaifRisques
          v-else-if="resultatSimulationMaifViewModel?.risques"
          class="fr-mb-2w"
          :risques="resultatSimulationMaifViewModel.risques"
        />
      </template>

      <template v-if="resultatSimulationMaifViewModel?.lienKit">
        <h3 class="fr-h4 fr-mb-1w fr-mt-3w">Votre kit de prévention Maif</h3>
        <p class="fr-my-2w">
          Vous habitez dans une zone inondable ou argileuse, découvrez votre kit de prévention pour agir - vous aussi -
          à votre échelle.
        </p>
        <a
          class="fr-btn fr-btn--secondary"
          target="_blank"
          rel="noopener noreferrer"
          :href="resultatSimulationMaifViewModel?.lienKit"
        >
          Télécharger mon kit de prévention
        </a>
      </template>
    </section>

    <h2 class="fr-h3 fr-mt-4w">
      Mes chiffres clés à <span class="text--bleu" v-text="statistiquesCommuneMaifViewModel?.commune" />
    </h2>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div
        class="fr-col-12 fr-col-md-4"
        v-for="chiffreCle in statistiquesCommuneMaifViewModel?.chiffresCles"
        :key="chiffreCle.label"
      >
        <div class="flex flex-column align-items--center fr-p-3w shadow full-height">
          <span class="text--3xl text--bold text--bleu-minor fr-pb-2w" v-text="chiffreCle.valeur" />
          <span class="text--center fr-mb-0" v-html="chiffreCle.label" />
        </div>
      </div>
    </div>
  </section>

  <CarteExterne
    class="shadow fr-mb-2w"
    titre="MAIF - Aux alentours"
    description="Exposition aux risques climatiques, services de proximité, prix de l’immobilier… Retrouvez toutes les informations utiles aux alentours de votre adresse !"
    :lien="{ url: 'https://auxalentours.maif.fr/', urlAffichee: 'https://auxalentours.maif.fr/' }"
    image-src="/maif-aux-alentours.webp"
  />
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import MaifRisques from '@/components/custom/Action/MaifRisques.vue';
  import ServiceBarreDeRechercheAdresse from '@/components/custom/Service/ServiceBarreDeRechercheAdresse.vue';
  import BallLoader from '@/components/custom/Thematiques/BallLoader.vue';
  import Callout from '@/components/dsfr/Callout.vue';
  import CarteExterne from '@/components/dsfr/CarteExterne.vue';
  import { LogementRepositoryAxios } from '@/domaines/logement/adapters/logement.repository.axios';
  import { PatcherInformationLogementUsecase } from '@/domaines/logement/patcherInformationLogement.usecase';
  import { Logement } from '@/domaines/logement/recupererInformationLogement.usecase';
  import {
    SimulateurMaifPresenterImpl,
    SimulateurMaifViewModel,
  } from '@/domaines/simulationMaif/adapters/simulateurMaif.presenter.impl';
  import { SimulateurMaifRepositoryAxios } from '@/domaines/simulationMaif/adapters/simulateurMaif.repository.axios';
  import {
    StatistiquesCommuneMaifViewModel,
    StatistiquesCommunesMaifPresenter,
  } from '@/domaines/simulationMaif/adapters/statistiquesCommuneMaif.presenter.impl';
  import { CalculerResultatSimulationMaifUsecase } from '@/domaines/simulationMaif/calculerResultatSimulationMaif.usecase';
  import { RecupererStatistiquesCommuneMaifUsecase } from '@/domaines/simulationMaif/recupererStatistiquesCommuneMaifDepuisProfil.usecase';
  import { RecupererStatistiquesEndroitMaifUsecase } from '@/domaines/simulationMaif/recupererStatistiquesEndroitMaif.usecase';
  import { Adresse, Coordonnees } from '@/shell/coordonneesType';
  import { utilisateurStore } from '@/store/utilisateur';

  const recherche = ref<string>('');
  const coordonnees = ref<Coordonnees>();
  const adresse = ref<Adresse>();
  const resultatsEnChargement = ref<boolean>(false);
  const avecAdressePrivee = ref<boolean>(false);
  const statistiquesCommuneMaifViewModel = ref<StatistiquesCommuneMaifViewModel>();
  const resultatSimulationMaifViewModel = ref<SimulateurMaifViewModel>();

  const simulateurMaifRepository = new SimulateurMaifRepositoryAxios();
  const recupererStatistiquesCommuneMaifUsecase = new RecupererStatistiquesCommuneMaifUsecase(simulateurMaifRepository);
  const recupererStatistiquesEndroitMaifUsecase = new RecupererStatistiquesEndroitMaifUsecase(simulateurMaifRepository);
  const calculerResultatSimulationMaifUsecase = new CalculerResultatSimulationMaifUsecase(simulateurMaifRepository);
  const utilisateurId = utilisateurStore().utilisateur.id;

  onMounted(async () => {
    await recupererStatistiquesCommuneMaifUsecase.execute(
      utilisateurId,
      new StatistiquesCommunesMaifPresenter((vm: StatistiquesCommuneMaifViewModel) => {
        statistiquesCommuneMaifViewModel.value = vm;
      }),
    );
  });

  watch(
    () => coordonnees.value,
    async () => {
      if (!coordonnees.value) return;
      resultatsEnChargement.value = true;

      avecAdressePrivee.value = true;
      await calculerResultatSimulationMaifUsecase
        .execute(
          utilisateurId,
          coordonnees.value,
          new SimulateurMaifPresenterImpl((vm: SimulateurMaifViewModel) => {
            resultatSimulationMaifViewModel.value = vm;
          }),
        )
        .finally(() => {
          resultatsEnChargement.value = false;
        });

      console.log(adresse.value);
      if (adresse.value?.commune && adresse.value?.coordonnees) {
        await recupererStatistiquesEndroitMaifUsecase.execute(
          utilisateurId,
          adresse.value.commune,
          adresse.value.coordonnees,
          new StatistiquesCommunesMaifPresenter((vm: StatistiquesCommuneMaifViewModel) => {
            statistiquesCommuneMaifViewModel.value = vm;
          }),
        );
      }
    },
  );

  function definirAdressePrincipale() {
    if (!adresse.value || !coordonnees.value) return;
    const nouveauLogement: Partial<Logement> = {
      coordonnees: {
        latitude: coordonnees.value.latitude,
        longitude: coordonnees.value.longitude,
      },
      codePostal: adresse.value.codePostal,
      commune_utilisee_dans_le_compte: adresse.value.commune.toUpperCase(),
      numeroRue: adresse.value.numeroRue,
      rue: adresse.value.rue,
      commune_label: adresse.value.commune,
    };

    const patcherInformationLogementUsecase = new PatcherInformationLogementUsecase(new LogementRepositoryAxios());
    patcherInformationLogementUsecase.execute(utilisateurId, nouveauLogement).then(async () => {
      avecAdressePrivee.value = false;
    });
  }
</script>
