<template>
  <div class="fr-fieldset__element fill-response-checkbox-container">
    <div class="fr-checkbox-group fr-custom-checkbox-group">
      <input name="checkbox-second-auto-fill" id="checkbox-second-auto-fill" type="checkbox" aria-describedby="checkbox-second-auto-fill-messages" />
      <label class="fr-label fr-custom-label" for="checkbox-second-auto-fill"> Pré-remplir avec ma réponse précédente </label>
      <div class="fr-messages-group" id="checkbox-second-auto-fill-messages" aria-live="assertive"></div>
    </div>
  </div>
  <h3 v-if="etapeCourante" class="step-list-container">{{ currentStepQuestion }}</h3>
  <div class="transport-km-value-container">
    <div class="fr-fieldset__element">
      <div class="fr-checkbox-group">
        <input
          v-model="checkboxCar"
          @change="handleTransportType($event, checkboxCar)"
          name="checkbox-car"
          id="checkbox-car"
          type="checkbox"
          aria-describedby="checkbox-car-messages"
        />
        <label class="fr-label" for="checkbox-car"> Voiture </label>
        <div class="fr-messages-group" id="checkbox-car-messages" aria-live="assertive"></div>
      </div>
    </div>
    <div v-if="checkboxCar" class="fr-fieldset__element field-response-container">
      <div class="number-input-container" id="input-group-2843">
        <input
          @input="handleReponse(modelValue as Map<string, string>, $event, 'voiture')"
          min="0"
          :value="(modelValue as Map<string, string>).get('voiture') || '0'"
          class="fr-input"
          aria-describedby="text-car-messages"
          name="text"
          id="text-car"
          type="number"
        />
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
        <input
          @input="handleReponse(modelValue as Map<string, string>, $event, 'moto')"
          min="0"
          :value="(modelValue as Map<string, string>).get('moto') || '0'"
          class="fr-input"
          aria-describedby="text-motorcycle-messages"
          name="text"
          id="text-motorcycle"
          type="number"
        />
        <div class="fr-messages-group" id="text-motorcycle-messages" aria-live="assertive"></div>
      </div>
      <p class="field-response-desc">Km en scooter</p>
    </div>
  </div>
  <div class="transport-km-value-container">
    <div class="fr-fieldset__element">
      <div class="fr-checkbox-group">
        <input v-model="checkboxSubway" name="checkbox-subway" id="checkbox-subway" type="checkbox" aria-describedby="checkbox-subway-messages" />
        <label class="fr-label" for="checkbox-subway"> Métro / tramway </label>
        <div class="fr-messages-group" id="checkbox-subway-messages" aria-live="assertive"></div>
      </div>
    </div>
    <div v-if="checkboxSubway" class="fr-fieldset__element field-response-container">
      <div class="number-input-container" id="input-group-2843">
        <input
          @input="handleReponse(modelValue as Map<string, string>, $event, 'metro/tramway')"
          min="0"
          :value="(modelValue as Map<string, string>).get('metro/tramway') || '0'"
          class="fr-input"
          aria-describedby="text-subway-messages"
          name="text"
          id="text-subway"
          type="number"
        />
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
        <input
          @input="handleReponse(modelValue as Map<string, string>, $event, 'train')"
          min="0"
          :value="(modelValue as Map<string, string>).get('train') || '0'"
          class="fr-input"
          aria-describedby="text-train-messages"
          name="text"
          id="text-train"
          type="number"
        />
        <div class="fr-messages-group" id="text-train-messages" aria-live="assertive"></div>
      </div>
      <p class="field-response-desc">Km en train</p>
    </div>
  </div>
  <div class="transport-km-value-container">
    <div class="fr-fieldset__element">
      <div class="fr-checkbox-group">
        <input v-model="checkboxBicycle" name="checkbox-bicycle" id="checkbox-bicycle" type="checkbox" aria-describedby="checkbox-bicycle-messages" />
        <label class="fr-label" for="checkbox-bicycle"> Vélo </label>
        <div class="fr-messages-group" id="checkbox-bicycle-messages" aria-live="assertive"></div>
      </div>
    </div>
    <div v-if="checkboxBicycle" class="fr-fieldset__element field-response-container">
      <div class="number-input-container" id="input-group-2843">
        <input
          @input="handleReponse(modelValue as Map<string, string>, $event, 'velo')"
          min="0"
          :value="(modelValue as Map<string, string>).get('velo') || '0'"
          class="fr-input"
          aria-describedby="text-bicycle-messages"
          name="text"
          id="text-bicycle"
          type="number"
        />
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
        <input
          @input="handleReponse(modelValue as Map<string, string>, $event, 'bus')"
          min="0"
          :value="(modelValue as Map<string, string>).get('bus') || '0'"
          class="fr-input"
          aria-describedby="text-bus-messages"
          name="text"
          id="text-bus"
          type="number"
        />
        <div class="fr-messages-group" id="text-bus-messages" aria-live="assertive"></div>
      </div>
      <p class="field-response-desc">Km en bus</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  modelValue: Map,
  etapeCourante: Number,
  currentStepQuestion: String,
});

const emit = defineEmits(["update:modelValue"]);

let checkboxCar = ref<boolean>(true);
let checkboxMotorcycle = ref<boolean>(true);
let checkboxSubway = ref<boolean>(false);
let checkboxBicycle = ref<boolean>(false);
let checkboxBus = ref<boolean>(false);
let checkboxTrain = ref<boolean>(false);

function handleReponse(currentMap: Map<string, string>, event: Event, key: string) {
  const valeur = (event.target as HTMLInputElement).value;
  currentMap.set(key, valeur);
  emit("update:modelValue", currentMap);
}

function handleTransportType(event: Event, currentStatus: boolean) {
  checkboxCar.value = !currentStatus;
}
</script>

<style scoped>
.transport-km-value-container {
  margin-bottom: 15px;
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

.fr-custom-label {
  padding: 5px 5px 5px 5px;
}
</style>
