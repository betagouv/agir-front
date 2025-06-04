<template>
  <section class="fr-mb-4w fr-p-1v">
    <h2 id="label-barre-de-recherche" class="fr-h3">Choisissez une adresse</h2>
    <form @submit.prevent>
      <BarreDeRechercheAdresse
        v-model:adresse="adresse"
        v-model:coordonnees="coordonnees"
        v-model:recherche="recherche"
        label-id="label-barre-de-recherche"
        @update:coordonnees="chargerDonneesPourNouvelleAdresse"
      />

      <EnregistreurAdressePrincipale
        v-if="adresse && coordonnees && avecAdressePrivee"
        :adresse="adresse"
        :coordonnees="coordonnees"
        @enregistrementNouvelleAdresse="avecAdressePrivee = false"
      />
    </form>

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
  import BarreDeRechercheAdresse from '@/components/custom/Form/BarreDeRechercheAdresse.vue';
  import EnregistreurAdressePrincipale from '@/components/custom/Form/EnregistreurAdressePrincipale.vue';
  import BallLoader from '@/components/custom/Thematiques/BallLoader.vue';
  import CarteExterne from '@/components/dsfr/CarteExterne.vue';
  import { useAdressePrincipale } from '@/composables/useAdressePrincipale';
  import { ActionsEventBus } from '@/domaines/actions/actions.eventbus';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository';
  import { TerminerActionUsecase } from '@/domaines/actions/terminerAction.usecase';
  import { BarreDeRechercheViewModel } from '@/domaines/logement/adapters/barreDeRecherche.presenter.impl';
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
  const utilisateurId = utilisateurStore().utilisateur.id;
  const {
    avecAdressePrivee,
    definirAdressePrincipale: definirAdressePrincipaleComposable,
    recupererAdressePourBarreDeRecherche,
  } = useAdressePrincipale();

  const simulateurMaifRepository = new SimulateurMaifRepositoryAxios();

  const recupererStatistiquesCommuneMaifUsecase = new RecupererStatistiquesCommuneMaifUsecase(simulateurMaifRepository);
  const calculerResultatSimulationMaifUsecase = new CalculerResultatSimulationMaifUsecase(simulateurMaifRepository);

  onMounted(async () => {
    await recupererAdressePourBarreDeRecherche(
      utilisateurId,
      async (barreDeRechercheViewModel: BarreDeRechercheViewModel) => {
        coordonnees.value = barreDeRechercheViewModel.coordonnees;
        recherche.value = barreDeRechercheViewModel.recherche;
        await calculerResultatsSimulation();
      },
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
    definirAdressePrincipaleComposable(utilisateurId, adresse.value, coordonnees.value);
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
