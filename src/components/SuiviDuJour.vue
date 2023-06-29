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
              <fieldset class="fr-fieldset" id="checkbox" aria-labelledby="checkbox-legend checkbox-messages">
                <!-- A sortir dans un component -->
                <div v-if="etapeCourante == 1">
                  <div class="fr-fieldset__element fill-response-checkbox-container">
                    <div style="background-color: #f9f9f9; border-radius: 5px" class="fr-checkbox-group">
                      <input name="checkbox-first-auto-fill" id="checkbox-1" type="checkbox" aria-describedby="checkbox-first-auto-fill-messages" />
                      <label style="padding: 5px 5px 5px 5px" class="fr-label" for="checkbox-first-auto-fill"> Pré-remplir avec ma réponse précédente </label>
                      <div class="fr-messages-group" id="checkbox-first-auto-fill-messages" aria-live="assertive"></div>
                    </div>
                  </div>
                  <h3 v-if="etapeCourante" style="text-align: left; font-size: 25px; margin-left: 5px">{{ getCurrentStepQuestion }}</h3>
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
                </div>
                <!-- ---------------------------- -->
                <!-- A sortir dans un component -->
                <div v-else-if="etapeCourante == 2">
                  <div class="fr-fieldset__element fill-response-checkbox-container">
                    <div style="background-color: #f9f9f9; border-radius: 5px" class="fr-checkbox-group">
                      <input name="checkbox-first-auto-fill" id="checkbox-1" type="checkbox" aria-describedby="checkbox-first-auto-fill-messages" />
                      <label style="padding: 5px 5px 5px 5px" class="fr-label" for="checkbox-first-auto-fill"> Pré-remplir avec ma réponse précédente </label>
                      <div class="fr-messages-group" id="checkbox-first-auto-fill-messages" aria-live="assertive"></div>
                    </div>
                  </div>
                  <h3 v-if="etapeCourante" style="text-align: left; font-size: 25px; margin-left: 5px">{{ getCurrentStepQuestion }}</h3>
                  <div class="transport-km-value-container">
                    <div class="fr-fieldset__element">
                      <div class="fr-checkbox-group">
                        <input v-model="checkboxCar" name="checkbox-car" id="checkbox-car" type="checkbox" aria-describedby="checkbox-car-messages" />
                        <label class="fr-label" for="checkbox-car"> Voiture </label>
                        <div class="fr-messages-group" id="checkbox-car-messages" aria-live="assertive"></div>
                      </div>
                    </div>
                    <div v-if="checkboxCar" class="fr-fieldset__element field-response-container">
                      <div class="number-input-container" id="input-group-2843">
                        <input min="0" value="0" class="fr-input" aria-describedby="text-car-messages" name="text" id="text-car" type="number" />
                        <div class="fr-messages-group" id="text-car-messages" aria-live="assertive"></div>
                      </div>
                      <p class="field-response-desc">Km en voiture</p>
                    </div>
                  </div>
                  <div class="transport-km-value-container">
                    <div class="fr-fieldset__element">
                      <div class="fr-checkbox-group">
                        <input
                          v-model="checkboxMotorcycle"
                          name="checkbox-motorcycle"
                          id="checkbox-motorcycle"
                          type="checkbox"
                          aria-describedby="checkbox-motorcycle-messages"
                        />
                        <label class="fr-label" for="checkbox-motorcycle"> Moto / Scooter </label>
                        <div class="fr-messages-group" id="checkbox-motorcycle-messages" aria-live="assertive"></div>
                      </div>
                    </div>
                    <div v-if="checkboxMotorcycle" class="fr-fieldset__element field-response-container">
                      <div class="number-input-container" id="input-group-2843">
                        <input min="0" value="0" class="fr-input" aria-describedby="text-motorcycle-messages" name="text" id="text-motorcycle" type="number" />
                        <div class="fr-messages-group" id="text-motorcycle-messages" aria-live="assertive"></div>
                      </div>
                      <p class="field-response-desc">Km en scooter</p>
                    </div>
                  </div>
                  <div class="transport-km-value-container">
                    <div class="fr-fieldset__element">
                      <div class="fr-checkbox-group">
                        <input
                          v-model="checkboxSubway"
                          name="checkbox-subway"
                          id="checkbox-subway"
                          type="checkbox"
                          aria-describedby="checkbox-subway-messages"
                        />
                        <label class="fr-label" for="checkbox-subway"> Métro / tramway </label>
                        <div class="fr-messages-group" id="checkbox-subway-messages" aria-live="assertive"></div>
                      </div>
                    </div>
                    <div v-if="checkboxSubway" class="fr-fieldset__element field-response-container">
                      <div class="number-input-container" id="input-group-2843">
                        <input min="0" value="0" class="fr-input" aria-describedby="text-subway-messages" name="text" id="text-subway" type="number" />
                        <div class="fr-messages-group" id="text-subway-messages" aria-live="assertive"></div>
                      </div>
                      <p class="field-response-desc">Km métro</p>
                    </div>
                  </div>
                  <div class="transport-km-value-container">
                    <div class="fr-fieldset__element">
                      <div class="fr-checkbox-group">
                        <input v-model="checkboxTrain" name="checkbox-train" id="checkbox-train" type="checkbox" aria-describedby="checkbox-train-messages" />
                        <label class="fr-label" for="checkbox-train"> Train </label>
                        <div class="fr-messages-group" id="checkbox-train-messages" aria-live="assertive"></div>
                      </div>
                    </div>
                    <div v-if="checkboxTrain" class="fr-fieldset__element field-response-container">
                      <div class="number-input-container" id="input-group-2843">
                        <input min="0" value="0" class="fr-input" aria-describedby="text-train-messages" name="text" id="text-train" type="number" />
                        <div class="fr-messages-group" id="text-train-messages" aria-live="assertive"></div>
                      </div>
                      <p class="field-response-desc">Km en train</p>
                    </div>
                  </div>
                  <div class="transport-km-value-container">
                    <div class="fr-fieldset__element">
                      <div class="fr-checkbox-group">
                        <input
                          v-model="checkboxBicycle"
                          name="checkbox-bicycle"
                          id="checkbox-bicycle"
                          type="checkbox"
                          aria-describedby="checkbox-bicycle-messages"
                        />
                        <label class="fr-label" for="checkbox-bicycle"> Vélo </label>
                        <div class="fr-messages-group" id="checkbox-bicycle-messages" aria-live="assertive"></div>
                      </div>
                    </div>
                    <div v-if="checkboxBicycle" class="fr-fieldset__element field-response-container">
                      <div class="number-input-container" id="input-group-2843">
                        <input min="0" value="0" class="fr-input" aria-describedby="text-bicycle-messages" name="text" id="text-bicycle" type="number" />
                        <div class="fr-messages-group" id="text-bicycle-messages" aria-live="assertive"></div>
                      </div>
                      <p class="field-response-desc">Km en vélo</p>
                    </div>
                  </div>
                  <div class="transport-km-value-container">
                    <div class="fr-fieldset__element">
                      <div class="fr-checkbox-group">
                        <input v-model="checkboxBus" name="checkbox-bus" id="checkbox-bus" type="checkbox" aria-describedby="checkbox-bus-messages" />
                        <label class="fr-label" for="checkbox-bus"> Bus </label>
                        <div class="fr-messages-group" id="checkbox-bus-messages" aria-live="assertive"></div>
                      </div>
                    </div>
                    <div v-if="checkboxBus" class="fr-fieldset__element field-response-container">
                      <div class="number-input-container" id="input-group-2843">
                        <input min="0" value="0" class="fr-input" aria-describedby="text-bus-messages" name="text" id="text-bus" type="number" />
                        <div class="fr-messages-group" id="text-bus-messages" aria-live="assertive"></div>
                      </div>
                      <p class="field-response-desc">Km en bus</p>
                    </div>
                  </div>
                </div>
                <!-- ---------------------------- -->
                <!-- A sortir dans un component -->
                <div v-else>
                  <button
                    style="margin: 0 auto; background-color: white; color: #000091; border: 1px solid rgba(0, 0, 0, 0.19)"
                    class="fr-btn continue-step-button fr-btn-not-rounded"
                    title="Suivant"
                  >
                    Partager vos résultats
                  </button>
                </div>
                <!-- ---------------------------- -->
              </fieldset>
              <div>
                <span v-if="etapeCourante <= 2 && etapeCourante > 1" @click="etapePrecedente" class="step-btn-actions">
                  <span class="fr-icon-arrow-left-line" aria-hidden="true"></span>
                  {{ etapeCourante == 3 ? "Modifier vos réponses" : "Précédent" }}
                </span>
                <button v-if="etapeCourante < 3" @click="etapeSuivante" class="fr-btn continue-step-button fr-btn-not-rounded" title="Suivant">
                  Continuer
                </button>
                <span v-if="etapeCourante < 3" @click="sauterEtape" class="step-btn-actions"> Passer la question </span>
                <button style="margin-left: 10px" v-if="etapeCourante == 3" class="fr-btn fr-btn-not-rounded" id="button-2864" title="Envoyer le formulaire">
                  Retour au coach
                </button>
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
  data() {
    return {
      checkboxCar: true,
      checkboxMotorcycle: true,
      checkboxSubway: false,
      checkboxTrain: false,
      checkboxBicycle: false,
      checkboxBus: false,
    };
  },
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

.fill-response-checkbox-container .fr-checkbox-group input[type="checkbox"] + label:before {
  margin: 10px;
  width: 15px;
  height: 15px;
}

.transport-km-value-container {
  margin-bottom: 15px;
}

.fr-btn-not-rounded {
  border-radius: 0;
}
</style>
