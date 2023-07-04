<template>
  <div style="margin: 20px" class="fr-grid-row">
    <div :class="getDeviceType() == DeviceType.MOBILE ? 'fr-col-12' : 'fr-col-9'">
      <nav style="text-align: left; margin: 0 0 -15px 30px" role="navigation" class="fr-breadcrumb" aria-label="vous êtes ici :">
        <button class="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb-2831">Voir le fil d’Ariane</button>
        <div class="fr-collapse" id="breadcrumb-2831">
          <ol class="fr-breadcrumb__list">
            <li>
              <a class="fr-breadcrumb__link" href="/coach">Coach</a>
            </li>
            <li>
              <a class="fr-breadcrumb__link" aria-current="page">Faire le suivi du jour</a>
            </li>
          </ol>
        </div>
      </nav>
      <br />
      <div class="col-demo">
        <div class="follow-up-stepper-container">
          <div class="follow-up-stepper-sub-container">
            <h3 v-if="etapeCourante" class="step-title-container">{{ getCurrentStepTitle }}</h3>
            <form @submit.prevent="etapeSuivante">
              <div v-if="etapeCourante" class="fr-stepper__steps" :data-fr-current-step="etapeCourante" :data-fr-steps="3" />
              <br />
              <fieldset class="fr-fieldset" id="checkbox" aria-labelledby="checkbox-legend checkbox-messages">
                <div v-if="etapeCourante == 1">
                  <SuiviDuJourPremiereEtape
                    current-step-question="Comptez combien de repas vous avez consommé avec les aliments suivants :"
                    :etape-courante="etapeCourante"
                    @update:model-value="miseAjourReponseSuiviDuJourAlimentation"
                    :model-value="suiviDuJourAlimentation"
                  />
                </div>
                <div v-else-if="etapeCourante == 2">
                  <SuiviDuJourSecondeEtape
                    current-step-question="Quels transports avez vous utilisé aujourd'hui ?"
                    :etape-courante="etapeCourante"
                    @update:model-value="miseAjourReponseSuiviDuJourTransport"
                    :model-value="suiviDuJourTransport"
                  />
                </div>
                <div class="last-step-container" v-else>
                  <SuiviDuJourResultats
                    :suivi-du-jour-alimentation="suiviDuJourAlimentation"
                    :suivi-du-jour-transport="suiviDuJourTransport"
                    :empreinte-carbone-du-jour="impactCarboneDuJourViewModel"
                  />
                </div>
              </fieldset>
              <div>
                <span v-if="etapeCourante <= 2 && etapeCourante > 1" @click="etapePrecedente" class="step-btn-actions">
                  <span class="fr-icon-arrow-left-line" aria-hidden="true"></span>
                  {{ etapeCourante == 3 ? "Modifier vos réponses" : "Précédent" }}
                </span>
                <button v-if="etapeCourante < 3" class="fr-btn continue-step-button fr-btn-not-rounded" title="Suivant">Continuer</button>
                <span v-if="etapeCourante < 3" @click="sauterEtape" class="step-btn-actions"> Passer la question </span>
                <router-link
                  v-if="etapeCourante == 3"
                  class="fr-btn fr-btn-not-rounded redirect-coach-link"
                  id="button-2864"
                  title="Envoyer le formulaire"
                  :to="{ name: 'coach' }"
                >
                  Retour au coach
                </router-link>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
    <div :class="getDeviceType() == DeviceType.MOBILE ? 'fr-col-12' : 'fr-col-3'">
      <div class="col-demo">
        <br />
        <div class="fr-grid-row fr-grid-row--gutters card-item-list-container">
          <div class="fr-col-12">
            <BilanNosGestesClimat :get-impact-value="store.getters['utilisateur/getValeurBilanCarbone']" />
          </div>
          <div class="fr-col-12">
            <ImpactDuJour :consommation-du-jour="'+ 7'" :equivalent-en-litres="'14'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { DeviceType, getDeviceType } from "@/DeviceType";
import BilanNosGestesClimat from "@/components/BilanNosGestesClimat.vue";
import ImpactDuJour from "@/components/ImpactDuJour.vue";
import MesResultats from "@/components/MesResultats.vue";
import store from "@/store";
import SuiviDuJourResultats from "@/components/SuiviDuJourResultats.vue";
import SuiviDuJourPremiereEtape from "@/components/SuiviDuJourPremiereEtape.vue";
import SuiviDuJourSecondeEtape from "@/components/SuiviDuJourSecondeEtape.vue";
import { EnvoyerSuiviDuJourUsecase } from "@/suivi/envoyerSuiviDuJour.usecase";
import { ImpactCarboneDuJourViewModel, SuiviDuJourPresenterImpl } from "@/suivi/adapters/suiviDuJour.presenter.impl";
import { SuiviDuJourRepositoryInMemory } from "@/suivi/adapters/suiviDuJour.repository.inMemory";
import { SuiviDuJourRepositoryAxios } from "@/suivi/adapters/suiviDuJour.repository.axios";

export default defineComponent({
  name: "SuiviDuJour",
  components: { SuiviDuJourSecondeEtape, SuiviDuJourPremiereEtape, SuiviDuJourResultats, MesResultats, ImpactDuJour, BilanNosGestesClimat },
  computed: {
    store() {
      return store;
    },
    DeviceType() {
      return DeviceType;
    },
    getCurrentStepTitle() {
      if (this.etapeCourante == 1) {
        return "🥦 Alimentation";
      } else if (this.etapeCourante == 2) {
        return "🚗 Transport du quotidien";
      }
      return "Résultat du suivi";
    },
  },
  methods: { getDeviceType },
  setup() {
    let etapeCourante = ref<number>(1);
    let suiviDuJourAlimentation = new Map<string, string>();
    let suiviDuJourTransport = new Map<string, string>();
    const impactCarboneDuJourViewModel = ref<ImpactCarboneDuJourViewModel>({
      valeur: "",
      pictoSens: "",
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
      const idUtilisateur = store.getters["utilisateur/getId"];
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

    function mapImpactCarboneDuJour(impactDuJourViewModel: ImpactCarboneDuJourViewModel) {
      impactCarboneDuJourViewModel.value = impactDuJourViewModel;
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
      impactCarboneDuJourViewModel,
    };
  },
});
</script>
<style scoped>
.card-item-list-container {
  margin: 0 auto;
}

.follow-up-stepper-container {
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  background-color: white;
  margin-left: 20px;
  margin-right: 20px;
}

.follow-up-stepper-sub-container {
  margin: 3em 3em 0 3em;
}

.continue-step-button {
  margin: 20px;
}

.step-btn-actions {
  color: #000091;
  font-weight: bold;
}

.step-btn-actions:hover {
  cursor: pointer;
}

.fill-response-checkbox-container .fr-checkbox-group input[type="checkbox"] + label:before {
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
</style>
