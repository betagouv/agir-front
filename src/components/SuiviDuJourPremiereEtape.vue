<template>
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
  <h3 style="margin: 0 0 0 0.5em">{{ currentStepQuestion }}</h3>
  <div class="fr-messages-group" id="checkbox-messages" aria-live="assertive"></div>
  <div class="fr-fieldset__element field-response-container">
    <div class="number-input-container" id="input-group-2843">
      <input
        @input="handleReponse(modelValue as Map<string, string>, $event, 'viande_rouge')"
        :value="(modelValue as Map<string, string>).get('viande_rouge') || '0'"
        min="0"
        class="fr-input"
        aria-describedby="text-viande-rouge-messages"
        name="text"
        id="text-viande-rouge"
        type="number"
      />
      <div class="fr-messages-group" id="text-viande-rouge-messages" aria-live="assertive"></div>
    </div>
    <p class="field-response-desc">Repas avec viande rouge - boeuf, veau ou agneau</p>
  </div>
  <div class="fr-fieldset__element field-response-container">
    <div class="number-input-container" id="input-group-2843">
      <input
        @input="handleReponse(modelValue as Map<string, string>, $event, 'viande_blanche')"
        :value="(modelValue as Map<string, string>).get('viande_blanche') || '0'"
        min="0"
        class="fr-input"
        aria-describedby="text-viande-blanche-messages"
        name="text"
        id="text-viande-blanche"
        type="number"
      />
      <div class="fr-messages-group" id="text-viande-blanche-messages" aria-live="assertive"></div>
    </div>
    <p class="field-response-desc">Repas avec viande blanche ou fromage principal - poulet, porc, raclette</p>
  </div>
  <div class="fr-fieldset__element field-response-container">
    <div class="number-input-container" id="input-group-2843">
      <input
        @input="handleReponse(modelValue as Map<string, string>, $event, 'poisson_rouge')"
        :value="(modelValue as Map<string, string>).get('poisson_rouge') || '0'"
        min="0"
        class="fr-input"
        aria-describedby="text-poisson-rouge-messages"
        name="text"
        id="text-poisson-rouge"
        type="number"
      />
      <div class="fr-messages-group" id="text-poisson-rouge-messages" aria-live="assertive"></div>
    </div>
    <p class="field-response-desc">Repas avec poisson rouge - thon, saumon, sardine, maquereau, ...</p>
  </div>
  <div class="fr-fieldset__element field-response-container">
    <div class="number-input-container" id="input-group-2843">
      <input
        @input="handleReponse(modelValue as Map<string, string>, $event, 'poisson_blanc')"
        :value="(modelValue as Map<string, string>).get('poissonblanc') || '0'"
        min="0"
        class="fr-input"
        aria-describedby="text-poisson-blanc-messages"
        name="text"
        id="text-poisson-blanc"
        type="number"
      />
      <div class="fr-messages-group" id="text-poisson-blanc-messages" aria-live="assertive"></div>
    </div>
    <p class="field-response-desc">Repas avec poisson blanc - cabillaud, colin, lieu, lotte, ...</p>
  </div>
  <div class="fr-fieldset__element field-response-container">
    <div class="number-input-container" id="input-group-2843">
      <input
        @input="handleReponse(modelValue as Map<string, string>, $event, 'vegetarien')"
        :value="(modelValue as Map<string, string>).get('vegetarien') || '0'"
        min="0"
        class="fr-input"
        aria-describedby="text-laitier-messages"
        name="text"
        id="text-laitier"
        type="number"
      />
      <div class="fr-messages-group" id="text-laitier-messages" aria-live="assertive"></div>
    </div>
    <p class="field-response-desc">Repas avec légumes, oeuf, lait, beurre ou fromage</p>
  </div>
  <div class="fr-fieldset__element field-response-container">
    <div class="number-input-container" id="input-group-2843">
      <input
        @input="handleReponse(modelValue as Map<string, string>, $event, 'vegetalien')"
        :value="(modelValue as Map<string, string>).get('vegetalien') || '0'"
        min="0"
        class="fr-input"
        aria-describedby="text-sans-produit-animal-messages"
        name="text"
        id="text-sans-produit-animal"
        type="number"
      />
      <div class="fr-messages-group" id="text-sans-produit-animal-messages" aria-live="assertive"></div>
    </div>
    <p class="field-response-desc">Repas sans produit animal</p>
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

.date {
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem;
  color: #666;
}
</style>
