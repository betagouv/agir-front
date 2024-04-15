<template>
  <div class="fr-input-group">
    <label class="fr-label" for="text-input-rfr">
      Nombre de parts fiscales de votre foyer (Pré-calculé à partir des membres de votre foyer)
    </label>
    <input
      required
      class="fr-input fr-col-md-2 fr-col-4"
      name="revenu-fiscal"
      id="text-input-rfr"
      inputmode="numeric"
      type="number"
      v-model="nombreDePartsModel"
      step=".5"
      min="1"
    />
  </div>
  <BoutonRadio
    legende="Revenu fiscal de référence de votre foyer"
    legende-size="m"
    name="seuil-revenu-fiscal-de-reference"
    orientation="horizontal"
    :options="seuilRevenuFiscalDeReference"
    col="fr-col"
    v-model="revenuFiscalDeReferenceModel"
    :default-value="revenuFiscalDeReferenceModel?.toString()"
  />
</template>

<script setup lang="ts">
  import { defineModel, ref, watch } from 'vue';
  import BoutonRadio from '@/components/custom/BoutonRadio.vue';
  import { calculerSeuils } from '@/shell/calculerSeuils';

  const nombreDePartsModel = defineModel<number>('nombreDeParts', { default: 1 });
  const revenuFiscalDeReferenceModel = defineModel<number | null>('revenuFiscalDeReference', { default: 0 });

  const seuilRevenuFiscalDeReference = ref(calculerSeuils(nombreDePartsModel.value));

  watch(nombreDePartsModel, () => {
    seuilRevenuFiscalDeReference.value = calculerSeuils(nombreDePartsModel.value);
  });
</script>
