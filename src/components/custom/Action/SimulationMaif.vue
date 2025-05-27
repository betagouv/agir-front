<template>
  <section class="fr-mb-4w fr-p-1v">
    <h2 id="label-barre-de-recherche" class="fr-h3">Choisissez une adresse</h2>
    <ServiceBarreDeRechercheAdresse
      v-model:adresse="adresse"
      v-model:coordonnees="coordonnees"
      v-model:recherche="recherche"
      label-id="label-barre-de-recherche"
      @update:coordonnees="chargerDonneesPourNouvelleAdresse"
    />

    <Callout
      v-if="avecAdressePrivee"
      :button="{
        text: 'Choisir comme adresse principale',
        onClick: definirAdressePrincipale,
      }"
      :icone-information="false"
      class="fr-mt-3w"
      texte="Voulez-vous utiliser cette adresse comme votre adresse principale à l’avenir&nbsp;?"
    />

    <section class="fr-mb-3w fr-mt-5w">
      <template v-if="resultatsEnChargement || resultatSimulationMaifViewModel?.risques">
        <h3 class="fr-h4">Vos risques</h3>
        <BallLoader v-if="resultatsEnChargement" />
        <MaifRisques
          v-else-if="resultatSimulationMaifViewModel?.risques"
          :risques="resultatSimulationMaifViewModel.risques"
          class="fr-mb-2w"
        />
      </template>
    </section>

    <h2 class="fr-h3 fr-mt-4w">
      Mes chiffres clés à <span class="text--bleu" v-text="statistiquesCommuneMaifViewModel?.commune" />
    </h2>

    <BallLoader v-if="chiffresClesEnChargement" />
    <div v-else class="fr-grid-row fr-grid-row--gutters">
      <div
        v-for="chiffreCle in statistiquesCommuneMaifViewModel?.chiffresCles"
        :key="chiffreCle.label"
        class="fr-col-12 fr-col-md-4"
      >
        <div class="flex flex-column align-items--center fr-p-1w fr-py-6w shadow full-height position--relative">
          <span class="text--4xl text--bold fr-pb-2w" v-text="chiffreCle.valeur" />
          <span class="text--sm text--center fr-mb-0" v-html="chiffreCle.label" />
          <img v-if="chiffreCle.illustration" :src="chiffreCle.illustration" alt="" class="illustration-chiffre-cles" />
        </div>
      </div>
    </div>
  </section>

  <CarteExterne
    :lien="{ url: 'https://auxalentours.maif.fr/', urlAffichee: 'https://auxalentours.maif.fr/' }"
    class="shadow fr-mb-2w"
    description="Exposition aux risques climatiques, services de proximité, prix de l’immobilier… Retrouvez toutes les informations utiles aux alentours de votre adresse&nbsp;!"
    image-src="/maif-aux-alentours.webp"
    titre="Aux Alentours par MAIF"
  />
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, ref } from 'vue';
  import MaifRisques from '@/components/custom/Action/MaifRisques.vue';
  import ServiceBarreDeRechercheAdresse from '@/components/custom/Service/ServiceBarreDeRechercheAdresse.vue';
  import BallLoader from '@/components/custom/Thematiques/BallLoader.vue';
  import Callout from '@/components/dsfr/Callout.vue';
  import CarteExterne from '@/components/dsfr/CarteExterne.vue';
  import { ActionsEventBus } from '@/domaines/actions/actions.eventbus';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository';
  import { TerminerActionUsecase } from '@/domaines/actions/terminerAction.usecase';
  import {
    BarreDeRecherchePresenterImpl,
    BarreDeRechercheViewModel,
  } from '@/domaines/logement/adapters/barreDeRecherche.presenter.impl';
  import { LogementRepositoryAxios } from '@/domaines/logement/adapters/logement.repository.axios';
  import { PatcherInformationLogementUsecase } from '@/domaines/logement/patcherInformationLogement.usecase';
  import { RecupererAdressePourBarreDeRechercheUsecase } from '@/domaines/logement/recupererAdressePourBarreDeRecherche.usecase';
  import { Logement } from '@/domaines/logement/recupererInformationLogement.usecase';
  import {
    SimulateurMaifPresenterImpl,
    SimulateurMaifViewModel,
  } from '@/domaines/simulationMaif/adapters/simulateurMaif.presenter.impl';
  import { SimulateurMaifRepositoryAxios } from '@/domaines/simulationMaif/adapters/simulateurMaif.repository.axios';
  import {
    StatistiquesCommuneMaifViewModel,
    StatistiquesCommunesMaifPresenterImpl,
  } from '@/domaines/simulationMaif/adapters/statistiquesCommuneMaif.presenter.impl';
  import { CalculerResultatSimulationMaifUsecase } from '@/domaines/simulationMaif/calculerResultatSimulationMaif.usecase';
  import { RecupererStatistiquesCommuneMaifUsecase } from '@/domaines/simulationMaif/recupererStatistiquesCommuneMaifDepuisProfil.usecase';
  import { sessionAppRawDataStorage } from '@/shell/appRawDataStorage';
  import { AdresseBarreDeRecherche, Coordonnees } from '@/shell/coordonneesType';
  import { SimulateursSupportes } from '@/shell/simulateursSupportes';
  import { utilisateurStore } from '@/store/utilisateur';

  const recherche = ref<string>('');
  const coordonnees = ref<Coordonnees>();
  const adresse = ref<AdresseBarreDeRecherche>();
  const statistiquesCommuneMaifViewModel = ref<StatistiquesCommuneMaifViewModel>();
  const resultatSimulationMaifViewModel = ref<SimulateurMaifViewModel>();

  const resultatsEnChargement = ref<boolean>(false);
  const chiffresClesEnChargement = ref<boolean>(false);
  const avecAdressePrivee = ref<boolean>(false);
  const utilisateurId = utilisateurStore().utilisateur.id;

  const logementRepository = new LogementRepositoryAxios();
  const simulateurMaifRepository = new SimulateurMaifRepositoryAxios();

  const recupererAdressePourBarreDeRechercheUsecase = new RecupererAdressePourBarreDeRechercheUsecase(
    logementRepository,
  );
  const recupererStatistiquesCommuneMaifUsecase = new RecupererStatistiquesCommuneMaifUsecase(simulateurMaifRepository);
  const calculerResultatSimulationMaifUsecase = new CalculerResultatSimulationMaifUsecase(simulateurMaifRepository);

  onMounted(async () => {
    await recupererAdressePourBarreDeRechercheUsecase.execute(
      utilisateurId,
      new BarreDeRecherchePresenterImpl(async (barreDeRechercheViewModel: BarreDeRechercheViewModel) => {
        coordonnees.value = barreDeRechercheViewModel.coordonnees;
        recherche.value = barreDeRechercheViewModel.recherche;
        await calculerResultatsSimulation();
      }),
    );

    await recupererChiffresCles();
  });

  async function chargerDonneesPourNouvelleAdresse() {
    await nextTick();
    avecAdressePrivee.value = true;

    await recupererChiffresCles(adresse.value?.codeEpci);
    await calculerResultatsSimulation();
  }

  async function recupererChiffresCles(codeEpci?: string) {
    chiffresClesEnChargement.value = true;
    await recupererStatistiquesCommuneMaifUsecase.execute(
      utilisateurId,
      new StatistiquesCommunesMaifPresenterImpl((vm: StatistiquesCommuneMaifViewModel) => {
        statistiquesCommuneMaifViewModel.value = vm;
      }),
      codeEpci,
    );
    chiffresClesEnChargement.value = false;
  }

  async function calculerResultatsSimulation() {
    if (!coordonnees.value) return;

    resultatsEnChargement.value = true;
    await calculerResultatSimulationMaifUsecase
      .execute(
        utilisateurId,
        coordonnees.value,
        new SimulateurMaifPresenterImpl((vm: SimulateurMaifViewModel) => {
          resultatSimulationMaifViewModel.value = vm;
        }),
      )
      .finally(async () => {
        resultatsEnChargement.value = false;
        await terminerAction();
      });
  }

  function definirAdressePrincipale() {
    if (!adresse.value || !coordonnees.value) return;

    const nouveauLogement: Partial<Logement> = {
      coordonnees: {
        latitude: coordonnees.value.latitude,
        longitude: coordonnees.value.longitude,
      },
      codePostal: adresse.value.codePostal,
      codeEpci: adresse.value.codeEpci,
      numeroRue: adresse.value.numeroRue,
      rue: adresse.value.rue,
    };

    const patcherInformationLogementUsecase = new PatcherInformationLogementUsecase(
      new LogementRepositoryAxios(),
      sessionAppRawDataStorage,
    );
    patcherInformationLogementUsecase.execute(utilisateurId, nouveauLogement).then(async () => {
      avecAdressePrivee.value = false;
    });
  }

  async function terminerAction() {
    const terminerActionUsecase = new TerminerActionUsecase(
      new ActionsRepositoryAxios(),
      ActionsEventBus.getInstance(),
    );
    await terminerActionUsecase.execute(utilisateurId, SimulateursSupportes.MAIF, TypeAction.SIMULATEUR);
  }
</script>

<style scoped>
  .illustration-chiffre-cles {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    width: 27px;
    height: 27px;
  }

  .text--sm {
    font-size: 0.95rem;
    line-height: 1.25rem;
  }
</style>
