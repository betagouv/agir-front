<template>
  <h3 style="margin: 0 0 0 0.5em" v-if="etapeCourante">{{ currentStepQuestion }}</h3>
  <div class="fr-fieldset__element fill-response-checkbox-container">
    <div style="background-color: #f6f6f6; border-radius: 5px" class="fr-checkbox-group fr-custom-checkbox-group" v-if="dernierSuiviDuJourViewModel">
      <input
        :checked="isChecked"
        @change="handleCheckboxChange"
        name="checkbox-first-auto-fill"
        id="checkbox-first-auto-fill"
        type="checkbox"
        aria-describedby="checkbox-first-auto-fill-messages"
      />
      <label class="fr-label fr-custom-label" for="checkbox-first-auto-fill">
        Pré-remplir avec ma réponse précédente <span class="date fr-ml-1-5v">({{ dernierSuiviDuJourViewModel.date }})</span>
      </label>
      <div class="fr-messages-group" id="checkbox-first-auto-fill-messages" aria-live="assertive"></div>
    </div>
  </div>
  <div class="fr-grid-row">
    <div class="fr-col">
      <div class="col-demo">
        <h3 style="margin: 0 0 0 0.5em">Transport Individuel</h3>
        <div class="fr-fieldset__element field-response-container">
          <div class="number-input-container" id="input-group-2843">
            <input
              @input="handleReponse(modelValue as Map<string, string>, $event, 'km_voiture')"
              min="0"
              :value="(modelValue as Map<string, string>).get('km_voiture') || '0'"
              class="fr-input my-custom-input"
              aria-describedby="text-car-messages"
              name="text"
              id="text-car"
              type="number"
              placeholder="0 km"
            />
            <div class="fr-messages-group" id="text-car-messages" aria-live="assertive"></div>
          </div>
          <p class="field-response-desc">Km en voiture</p>
        </div>
        <div class="fr-fieldset__element field-response-container">
          <div class="number-input-container" id="input-group-2843">
            <input
              @input="handleReponse(modelValue as Map<string, string>, $event, 'km_scooter')"
              min="0"
              :value="(modelValue as Map<string, string>).get('km_scooter') || '0'"
              class="fr-input"
              aria-describedby="text-motorcycle-messages"
              name="text"
              id="text-motorcycle"
              type="number"
              placeholder="0 km"
            />
            <div class="fr-messages-group" id="text-motorcycle-messages" aria-live="assertive"></div>
          </div>
          <p class="field-response-desc">Km en scooter</p>
        </div>
        <div class="fr-fieldset__element field-response-container">
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
              placeholder="0 km"
            />
            <div class="fr-messages-group" id="text-bicycle-messages" aria-live="assertive"></div>
          </div>
          <p class="field-response-desc">Km en vélo</p>
        </div>
        <div class="fr-fieldset__element field-response-container">
          <div class="number-input-container" id="input-group-2843">
            <input
              @input="handleReponse(modelValue as Map<string, string>, $event, 'pied')"
              min="0"
              :value="(modelValue as Map<string, string>).get('pied') || '0'"
              class="fr-input"
              aria-describedby="text-foot-messages"
              name="text"
              id="text-foot"
              type="number"
              placeholder="0 km"
            />
            <div class="fr-messages-group" id="text-foot-messages" aria-live="assertive"></div>
          </div>
          <p class="field-response-desc">Km à pied</p>
        </div>
      </div>
    </div>
    <div class="fr-col">
      <div class="col-demo">
        <h3 style="margin: 0 0 0 0.5em">Transport en commun</h3>
        <div class="fr-fieldset__element field-response-container">
          <div class="number-input-container" id="input-group-2843">
            <input
              @input="handleReponse(modelValue as Map<string, string>, $event, 'metro_tram')"
              :value="(modelValue as Map<string, string>).get('metro_tram') || 'hh:mm'"
              class="fr-input"
              aria-describedby="text-subway-messages"
              name="text"
              id="text-subway"
              type="text"
              placeholder="hh:mm"
            />
            <div class="fr-messages-group" id="text-subway-messages" aria-live="assertive"></div>
          </div>
          <p class="field-response-desc">Métro / Tramway</p>
        </div>
        <div class="fr-fieldset__element field-response-container">
          <div class="number-input-container" id="input-group-2843">
            <input
              @input="handleReponse(modelValue as Map<string, string>, $event, 'train')"
              min="0"
              :value="(modelValue as Map<string, string>).get('train') || 'hh:mm'"
              class="fr-input"
              aria-describedby="text-train-messages"
              name="text"
              id="text-train"
              type="text"
              placeholder="hh:mm"
            />
            <div class="fr-messages-group" id="text-train-messages" aria-live="assertive"></div>
          </div>
          <p class="field-response-desc">Train</p>
        </div>
        <div class="fr-fieldset__element field-response-container">
          <div class="number-input-container" id="input-group-2843">
            <input
              @input="handleReponse(modelValue as Map<string, string>, $event, 'bus')"
              :value="(modelValue as Map<string, string>).get('bus') || 'hh:mm'"
              class="fr-input"
              aria-describedby="text-bus-messages"
              name="text"
              id="text-bus"
              type="text"
              placeholder="hh:mm"
            />
            <div class="fr-messages-group" id="text-bus-messages" aria-live="assertive"></div>
          </div>
          <p class="field-response-desc">Bus</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { DernierSuiviDuJourViewModel } from "@/suivi/adapters/dernierSuiviDuJour.presenter.impl";
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    modelValue: Map,
    etapeCourante: Number,
    currentStepQuestion: String,
    dernierSuiviDuJourViewModel: {
      type: Object as () => DernierSuiviDuJourViewModel,
    },
  },
  setup(props, { emit }) {
    const isChecked = ref(false);

    watch(isChecked, (value) => {
      if (value && props.dernierSuiviDuJourViewModel) {
        const { clefsEtValeurs } = props.dernierSuiviDuJourViewModel;
        props.modelValue?.clear();
        for (const [key, value] of clefsEtValeurs) {
          props.modelValue?.set(key, value);
        }
      } else {
        props.modelValue?.clear();
      }
      emit("update:modelValue", props.modelValue);
    });

    function handleReponse(currentMap: Map<string, string>, event: Event, key: string) {
      const valeur = (event.target as HTMLInputElement).value;
      currentMap.set(key, valeur);
      emit("update:modelValue", currentMap);
    }

    const handleCheckboxChange = (): void => {
      isChecked.value = !isChecked.value;
      if (isChecked.value) {
      } else {
        console.log("La case est décochée");
      }
    };

    return {
      isChecked,
      handleCheckboxChange,
      handleReponse,
    };
  },
});
</script>

<style scoped>
.number-input-container {
  width: 100px;
  margin-bottom: 5px;
}

.field-response-container {
  display: flex;
  margin: 10px auto;
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

.date {
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;
  color: #666;
}
</style>
