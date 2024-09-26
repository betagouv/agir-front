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
      <InputTextAvecIcon
        name="revenu"
        @update:model-value="
          value => {
            const numberValue = Number(value);
            if (isNaN(numberValue)) {
              revenuFiscalDeReferenceModel = 0;
            } else {
              revenuFiscalDeReferenceModel = numberValue;
            }
          }
        "
        :model-value="revenuFiscalDeReferenceModel?.toString() || ''"
        label="Revenu fiscal de référence de votre foyer"
        icon="fr-icon-money-euro-circle-line"
        :erreur="champsRFRStatus"
        @blur="onValidationRFR"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import InputTextAvecIcon from '@/components/dsfr/InputTextAvecIcon.vue';
  const nombreDePartsModel = defineModel<number>('nombreDeParts', { default: 1 });
  const revenuFiscalDeReferenceModel = defineModel<number | null>('revenuFiscalDeReference');
  const champsRFRStatus = ref<{ message: string; afficher: boolean }>({ message: '', afficher: false });

  const emit = defineEmits<{
    (e: 'update:isRFREnErreur', value: boolean): void;
  }>();

  const onValidationRFR = () => {
    if (revenuFiscalDeReferenceModel.value < 0) {
      champsRFRStatus.value = { message: 'Le revenu fiscal de référence doit être positif', afficher: true };
      emit('update:isRFREnErreur', true);
    } else {
      champsRFRStatus.value = { message: '', afficher: false };
      emit('update:isRFREnErreur', false);
    }
  };
</script>
