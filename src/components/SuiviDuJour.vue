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
            <h3 v-if="etapeCourante" style="text-align: left; font-size: 25px">{{ getCurrentStepTitle }}</h3>
            <form @submit.prevent="">
              <div v-if="etapeCourante" class="fr-stepper__steps" :data-fr-current-step="etapeCourante" :data-fr-steps="3" />
              <br />
              <h3 v-if="etapeCourante" style="text-align: left; font-size: 25px">{{ getCurrentStepQuestion }}</h3>
              <fieldset class="fr-fieldset" id="checkbox" aria-labelledby="checkbox-legend checkbox-messages">
                <div class="fr-fieldset__element">
                  <div style="background-color: #f9f9f9; border-radius: 5px" class="fr-checkbox-group">
                    <input name="checkbox-1" id="checkbox-1" type="checkbox" aria-describedby="checkbox-1-messages" />
                    <label style="padding: 5px 5px 5px 5px" class="fr-label" for="checkbox-1"> Pré-remplir avec ma réponse précédente </label>
                    <div class="fr-messages-group" id="checkbox-1-messages" aria-live="assertive"></div>
                  </div>
                </div>
                <div class="fr-messages-group" id="checkbox-messages" aria-live="assertive"></div>

                <div class="fr-fieldset__element field-response-container">
                  <div class="number-input-container" id="input-group-2843">
                    <input min="0" value="0" class="fr-input" aria-describedby="text-1-messages" name="text" id="text-1" type="number" />
                    <div class="fr-messages-group" id="text-1-messages" aria-live="assertive"></div>
                  </div>
                  <p class="field-response-desc">Repas avec viande rouge</p>
                </div>
                <div class="fr-fieldset__element field-response-container">
                  <div class="number-input-container" id="input-group-2843">
                    <input min="0" value="0" class="fr-input" aria-describedby="text-2-messages" name="text" id="text-2" type="number" />
                    <div class="fr-messages-group" id="text-2-messages" aria-live="assertive"></div>
                  </div>
                  <p class="field-response-desc">Repas avec viande blanche</p>
                </div>
                <div class="fr-fieldset__element field-response-container">
                  <div class="number-input-container" id="input-group-2843">
                    <input min="0" value="0" class="fr-input" aria-describedby="text-3-messages" name="text" id="text-3" type="number" />
                    <div class="fr-messages-group" id="text-3-messages" aria-live="assertive"></div>
                  </div>
                  <p class="field-response-desc">Repas avec poisson</p>
                </div>
                <div class="fr-fieldset__element field-response-container">
                  <div class="number-input-container" id="input-group-2843">
                    <input min="0" value="0" class="fr-input" aria-describedby="text-4-messages" name="text" id="text-4" type="number" />
                    <div class="fr-messages-group" id="text-4-messages" aria-live="assertive"></div>
                  </div>
                  <p class="field-response-desc">Repas avec produit laitiers (lait, beurre, fromage)</p>
                </div>
                <div class="fr-fieldset__element field-response-container">
                  <div class="number-input-container" id="input-group-2843">
                    <input min="0" value="0" class="fr-input" aria-describedby="text-5-messages" name="text" id="text-5" type="number" />
                    <div class="fr-messages-group" id="text-1-messages" aria-live="assertive"></div>
                  </div>
                  <p class="field-response-desc">Repas avec oeufs</p>
                </div>
              </fieldset>
              <div>
                <span v-if="etapeCourante <= 3" @click="etapePrecedente" class="step-btn-actions">
                  <span class="fr-icon-arrow-left-line" aria-hidden="true"></span>
                  Précédent
                </span>
                <button v-if="etapeCourante < 3" @click="etapeSuivante" class="fr-btn continue-step-button" title="Suivant">Continuer</button>
                <span v-if="etapeCourante < 3" @click="sauterEtape" class="step-btn-actions"> Passer la question </span>
                <button v-if="etapeCourante == 3" class="fr-btn" id="button-2864" title="Envoyer le formulaire">Valider mes réponses</button>
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
import { defineComponent, ref } from "vue";
import { DeviceType, getDeviceType } from "@/DeviceType";
import BilanNosGestesClimat from "@/components/BilanNosGestesClimat.vue";
import ImpactDuJour from "@/components/ImpactDuJour.vue";
import MesResultats from "@/components/MesResultats.vue";
import store from "@/store";

export default defineComponent({
  name: "SuiviDuJour",
  components: { MesResultats, ImpactDuJour, BilanNosGestesClimat },
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
    getCurrentStepQuestion() {
      if (this.etapeCourante == 1) {
        return "Comptez combien de repas vous avez consommé avec les aliments suivants :";
      } else if (this.etapeCourante == 2) {
        return "Quels transports avez vous utilisé aujourd'hui ?";
      }
      return "";
    },
  },
  methods: { getDeviceType },
  setup() {
    let etapeCourante = ref<number>(1);

    function etapeSuivante() {
      etapeCourante.value = etapeCourante.value + 1;
    }
    function etapePrecedente() {
      etapeCourante.value = etapeCourante.value - 1;
    }
    function sauterEtape() {
      etapeCourante.value = etapeCourante.value + 1;
    }

    return {
      etapeCourante,
      sauterEtape,
      etapeSuivante,
      etapePrecedente,
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

.number-input-container {
  width: 80px;
  margin-bottom: 5px;
}

.field-response-container {
  display: flex;
  margin: 0 auto;
}

.field-response-desc {
  margin: 10px;
}

.fr-input {
  box-shadow: inset 0 -2px 0 0 #000091;
}

.fr-checkbox-group input[type="checkbox"] + label:before {
  margin: 10px;
  width: 15px;
  height: 15px;
}
</style>
