<template>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-lg-6 fr-col-12">
      <div class="fr-input-group">
        <label class="fr-label" for="text-input-rfr"> Nombre de parts fiscales de votre foyer </label>
        <input
          required
          class="fr-input fr-col-4"
          name="revenu-fiscal"
          id="text-input-rfr"
          inputmode="numeric"
          type="number"
          v-model="nombreDePartsModel"
          step=".5"
          min="1"
        />
      </div>
    </div>
    <div class="fr-col-lg-6 fr-col-12">
      <InputText
        name="revenu"
        @update:model-value="value => (revenuFiscalDeReferenceModel = Number(value))"
        :model-value="revenuFiscalDeReferenceModel?.toString() || ''"
        label="Revenu fiscal de référence de votre foyer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import InputText from '@/components/dsfr/InputText.vue';

  const nombreDePartsModel = defineModel<number>('nombreDeParts', { default: 1 });
  const revenuFiscalDeReferenceModel = defineModel<number | null>('revenuFiscalDeReference', { default: 0 });
</script>
