<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane
      page-courante="Faire le suivi du jour"
      :page-hierarchie="[
        {
          label: 'Coach',
          url: 'coach',
        },
      ]"
    />
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-lg-8">
        <div class="follow-up-stepper-container">
          <div class="follow-up-stepper-sub-container">
            <h3 v-if="etapeCourante" class="step-title-container fr-mx-n1w">{{ getCurrentStepTitle }}</h3>
            <form @submit.prevent="etapeSuivante">
              <div
                v-if="etapeCourante"
                class="fr-stepper__steps fr-mx-n1w"
                :data-fr-current-step="etapeCourante"
                :data-fr-steps="3"
              />
              <br />
              <fieldset class="fr-fieldset" id="checkbox" aria-labelledby="checkbox-legend checkbox-messages">
                <div class="selected-step-container fr-mx-n1w" v-if="etapeCourante == 1">
                  <SuiviDuJourPremiereEtape
                    current-step-question="Comptez combien de repas vous avez consommé avec les aliments suivants :"
                    :etape-courante="etapeCourante"
                    @update:model-value="miseAjourReponseSuiviDuJourAlimentation"
                    :model-value="suiviDuJourAlimentation"
                    :dernier-suivi-du-jour-view-model="dernierSuiviDuJourAlimentationViewmodel"
                  />
                </div>
                <div class="selected-step-container fr-mx-n1w" v-else-if="etapeCourante == 2">
                  <SuiviDuJourSecondeEtape
                    current-step-question="Quels transports avez vous utilisé aujourd'hui ?"
                    :etape-courante="etapeCourante"
                    @update:model-value="miseAjourReponseSuiviDuJourTransport"
                    :model-value="suiviDuJourTransport"
                    :dernier-suivi-du-jour-view-model="dernierSuiviDuJourTransportViewmodel"
                  />
                </div>
                <div class="last-step-container fr-container--fluid" v-else>
                  <SuiviDuJourResultats :suivi-du-jour-resultats="suiviDuJourResultatsViewModel" />
                </div>
              </fieldset>
              <div style="text-align: left" class="fr-mx-n1w">
                <span
                  v-if="etapeCourante <= 2 && etapeCourante > 1"
                  @click="etapePrecedente"
                  class="step-btn-actions margin-between-buttons"
                >
                  <span class="fr-icon-arrow-left-line" aria-hidden="true"></span>
                  Précédent
                </span>
                <button
                  v-if="etapeCourante < 3"
                  class="fr-btn fr-btn-not-rounded margin-between-buttons"
                  title="Suivant"
                >
                  Continuer
                </button>
                <button v-if="etapeCourante == 3" class="fr-btn-not-rounded share-btn-container" title="partager">
                  Partager vos résultats
                </button>
                <br />
                <router-link
                  v-if="etapeCourante == 3"
                  class="fr-btn fr-btn-not-rounded redirect-coach-link"
                  id="button-2864"
                  title="Retourner à la page coach"
                  :to="{ name: 'coach' }"
                >
                  Retour à mes actions
                </router-link>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
      <div class="fr-col-12 fr-col-lg-4">
        <BilanNosGestesClimat class="fr-mb-3w" :get-impact-value="store.valeurBilanCarbone" />
        <NombreDePointsDuJour v-if="etapeCourante === 3" class="fr-mb-3w" :nombre-de-points-du-jour="25" />
        <ImpactDuJour
          :consommation-du-jour="suiviDuJourResultatsViewModel.impactCarbonDuJour.valeur"
          :equivalent-en-litres="'14'"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import BilanNosGestesClimat from '@/components/BilanNosGestesClimat.vue';
  import ImpactDuJour from '@/components/ImpactDuJour.vue';
  import SuiviDuJourResultats from '@/components/SuiviDuJourResultats.vue';
  import SuiviDuJourPremiereEtape from '@/components/SuiviDuJourPremiereEtape.vue';
  import SuiviDuJourSecondeEtape from '@/components/SuiviDuJourSecondeEtape.vue';
  import { EnvoyerSuiviDuJourUsecase } from '@/suivi/envoyerSuiviDuJour.usecase';
  import { SuiviDuJourPresenterImpl, SuiviDuJourResultatsViewModel } from '@/suivi/adapters/suiviDuJour.presenter.impl';
  import { SuiviDuJourRepositoryAxios } from '@/suivi/adapters/suiviDuJour.repository.axios';
  import { ObtenirDernierSuiviUsecase } from '@/suivi/obtenirDernierSuivi.usecase';
  import { DateTimeTypeScript } from '@/DateTime';
  import NombreDePointsDuJour from '@/components/NombreDePointsDuJour.vue';
  import {
    DernierSuiviDuJourPresenterImpl,
    DernierSuiviDuJourViewModel,
  } from '@/suivi/adapters/dernierSuiviDuJour.presenter.impl';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { utilisateurStore } from '@/store/utilisateur';

  export default defineComponent({
    name: 'SuiviDuJour',
    components: {
      NombreDePointsDuJour,
      SuiviDuJourSecondeEtape,
      SuiviDuJourPremiereEtape,
      SuiviDuJourResultats,
      ImpactDuJour,
      BilanNosGestesClimat,
      FilDAriane,
    },
    computed: {
      getCurrentStepTitle() {
        if (this.etapeCourante == 1) {
          return '🥦 Alimentation';
        } else if (this.etapeCourante == 2) {
          return '🚗 Transport du quotidien';
        }
        return 'Résultat du suivi';
      },
    },
    setup() {
      let etapeCourante = ref<number>(1);
      let suiviDuJourAlimentation = new Map<string, string>();
      let suiviDuJourTransport = new Map<string, string>();
      let dernierSuiviDuJourAlimentationViewmodel = ref<DernierSuiviDuJourViewModel>();
      let dernierSuiviDuJourTransportViewmodel = ref<DernierSuiviDuJourViewModel>();
      const suiviDuJourResultatsViewModel = ref<SuiviDuJourResultatsViewModel>({
        impactCarbonDuJour: { valeur: '0', pictoSens: '', commentaire: '', variation: '0' },
        suivisPrecedent: { valeursDesSuivis: [], datesDesSuivis: [], moyenneDesSuivis: [] },
        additionCarbone: [],
      });
      const store = utilisateurStore();
      onMounted(() => {
        const idUtilisateur = store.utilisateur.id;

        const chargerDernierSuiviAlimentation = new ObtenirDernierSuiviUsecase(new SuiviDuJourRepositoryAxios());

        function mapSuiviAlimentation(dernierSuiviViewModel: DernierSuiviDuJourViewModel) {
          dernierSuiviDuJourAlimentationViewmodel.value = dernierSuiviViewModel;
        }
        function mapSuiviTransport(dernierSuiviViewModel: DernierSuiviDuJourViewModel) {
          dernierSuiviDuJourTransportViewmodel.value = dernierSuiviViewModel;
        }

        chargerDernierSuiviAlimentation.execute(
          idUtilisateur,
          'alimentation',
          new DernierSuiviDuJourPresenterImpl(mapSuiviAlimentation, new DateTimeTypeScript())
        );
        chargerDernierSuiviAlimentation.execute(
          idUtilisateur,
          'transport',
          new DernierSuiviDuJourPresenterImpl(mapSuiviTransport, new DateTimeTypeScript())
        );
      });

      function etapeSuivante() {
        if (etapeCourante.value == 2) {
          calculEmpreinteDuJour();
        }
        etapeCourante.value = etapeCourante.value + 1;
      }
      function etapePrecedente() {
        etapeCourante.value = etapeCourante.value - 1;
      }
      function sauterEtape() {
        etapeCourante.value = etapeCourante.value + 1;
      }
      const calculEmpreinteDuJour = () => {
        const idUtilisateur = store.utilisateur.id;
        const envoyerSuiviDuJour = new EnvoyerSuiviDuJourUsecase(new SuiviDuJourRepositoryAxios());
        envoyerSuiviDuJour.execute(
          { valeurs: suiviDuJourAlimentation },
          { valeurs: suiviDuJourTransport },
          new SuiviDuJourPresenterImpl(mapImpactCarboneDuJour),
          idUtilisateur
        );
      };

      function miseAjourReponseSuiviDuJourAlimentation(map: Map<string, string>) {
        suiviDuJourAlimentation = map;
      }
      function miseAjourReponseSuiviDuJourTransport(map: Map<string, string>) {
        suiviDuJourTransport = map;
      }

      function mapImpactCarboneDuJour(impactDuJourViewModel: SuiviDuJourResultatsViewModel) {
        suiviDuJourResultatsViewModel.value = impactDuJourViewModel;
      }

      return {
        etapeCourante,
        sauterEtape,
        etapeSuivante,
        etapePrecedente,
        calculEmpreinteDuJour,
        miseAjourReponseSuiviDuJourAlimentation,
        miseAjourReponseSuiviDuJourTransport,
        suiviDuJourAlimentation,
        suiviDuJourTransport,
        dernierSuiviDuJourAlimentationViewmodel,
        dernierSuiviDuJourTransportViewmodel,
        suiviDuJourResultatsViewModel,
        store,
      };
    },
  });
</script>

<style scoped>
  .follow-up-stepper-container {
    border: 1px solid rgba(0, 0, 0, 0.19);
    border-radius: 6px;
    background-color: white;
  }

  .follow-up-stepper-sub-container {
    margin: 2em 2em 0 2em;
  }

  .step-btn-actions {
    color: #000091;
    font-weight: bold;
  }

  .step-btn-actions:hover {
    cursor: pointer;
  }

  .fill-response-checkbox-container .fr-checkbox-group input[type='checkbox'] + label:before {
    margin: 10px;
    width: 15px;
    height: 15px;
  }

  .redirect-coach-link:hover {
    color: white;
  }

  .step-title-container {
    text-align: left;
    font-size: 25px;
  }

  .last-step-container {
    width: 100%;
  }

  .fr-btn-not-rounded {
    border-radius: 0;
  }

  .share-btn-container {
    margin: 10px auto;
    background-color: white;
    color: #000091;
    border: 1px solid rgba(0, 0, 0, 0.19);
  }

  .fr-btn-not-rounded {
    border-radius: 0;
  }

  .selected-step-container {
    width: 100%;
    text-align: left;
  }

  .margin-between-buttons {
    margin: 0 1em 0 0;
  }
</style>
