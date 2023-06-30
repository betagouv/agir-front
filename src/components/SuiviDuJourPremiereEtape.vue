<template>
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
      <input
        @input="maFonction(modelValue as Map<string, string>, $event, 'viande-rouge')"
        value="0"
        min="0"
        class="fr-input"
        aria-describedby="text-viande-rouge-messages"
        name="text"
        id="text-viande-rouge"
        type="number"
      />
      <div class="fr-messages-group" id="text-viande-rouge-messages" aria-live="assertive"></div>
    </div>
    <p class="field-response-desc">Repas avec viande rouge</p>
  </div>

  <div class="fr-fieldset__element field-response-container">
    <div class="number-input-container" id="input-group-2843">
      <input
        @input="maFonction(modelValue as Map<string, string>, $event, 'viande-blanche')"
        value="0"
        min="0"
        class="fr-input"
        aria-describedby="text-viande-blanche-messages"
        name="text"
        id="text-viande-blanche"
        type="number"
      />
      <div class="fr-messages-group" id="text-viande-blanche-messages" aria-live="assertive"></div>
    </div>
    <p class="field-response-desc">Repas avec viande blanche</p>
  </div>
  <div class="fr-fieldset__element field-response-container">
    <div class="number-input-container" id="input-group-2843">
      <input
        @input="maFonction(modelValue as Map<string, string>, $event, 'poisson')"
        value="0"
        min="0"
        class="fr-input"
        aria-describedby="text-poisson-messages"
        name="text"
        id="text-poisson"
        type="number"
      />
      <div class="fr-messages-group" id="text-poisson-messages" aria-live="assertive"></div>
    </div>
    <p class="field-response-desc">Repas avec poisson</p>
  </div>
  <div class="fr-fieldset__element field-response-container">
    <div class="number-input-container" id="input-group-2843">
      <input
        @input="maFonction(modelValue as Map<string, string>, $event, 'produits-laitier')"
        :value="(modelValue as Map<string, string>).get('produits-laitier') || '0'"
        min="0"
        class="fr-input"
        aria-describedby="text-laitier-messages"
        name="text"
        id="text-laitier"
        type="number"
      />
      <div class="fr-messages-group" id="text-laitier-messages" aria-live="assertive"></div>
    </div>
    <p class="field-response-desc">Repas avec produit laitiers (lait, beurre, fromage)</p>
  </div>
  <div class="fr-fieldset__element field-response-container">
    <div class="number-input-container" id="input-group-2843">
      <input
        @input="maFonction(modelValue as Map<string, string>, $event, 'oeufs')"
        value="0"
        min="0"
        class="fr-input"
        aria-describedby="text-oeufs-messages"
        name="text"
        id="text-oeufs"
        type="number"
      />
      <div class="fr-messages-group" id="text-oeufs-messages" aria-live="assertive"></div>
    </div>
    <p class="field-response-desc">Repas avec oeufs</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: Map,
  etapeCourante: Number,
  getCurrentStepQuestion: String,
});

const emit = defineEmits(["update:modelValue"]);

function maFonction(currentMap: Map<string, string>, event: Event, key: string) {
  const valeur = (event.target as HTMLInputElement).value;
  currentMap.set(key, valeur);
  emit("update:modelValue", currentMap);
}
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
</style>
