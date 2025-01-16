<template>
  <div class="fr-grid fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-lg-3 fr-col-12">
      <div :class="`fr-input-group ${!codePostalValide && 'fr-input-group--error'}`">
        <label class="fr-label" for="codePostal"
          >Code postal
          <span class="fr-hint-text">Format 5 chiffres</span>
        </label>
        <input
          class="fr-input"
          name="codePostal"
          id="codePostal"
          required
          aria-describedby="text-input-error-desc-error"
          type="text"
          @input="updateValue"
          :value="defaultValue"
          :autofocus="autofocus"
        />
        <p v-if="!codePostalValide" id="text-input-error-desc-error" class="fr-error-text">
          Ce code postal n'est pas valide
        </p>
      </div>
    </div>
    <div class="fr-col-md-9 fr-col-12">
      <div class="fr-select-group">
        <label class="fr-label" for="selectCommune">
          Commune
          <span class="fr-hint-text">Veuillez choisir votre commune</span>
        </label>
        <select
          class="fr-select"
          id="selectCommune"
          name="selectCommune"
          :disabled="communes.length === 0"
          @change="updateSelectedCommune"
        >
          <option value="" selected disabled hidden>Selectionnez une option</option>
          <option
            :value="commune"
            :selected="defaultSelectValue === commune"
            v-for="commune in communes"
            :key="commune"
          >
            {{ commune }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ChargementCommunesUsecase } from '@/domaines/communes/chargementCommunesUsecase';
  import { CommuneRepositoryAxios } from '@/domaines/communes/adapters/communeRepositoryAxios';
  import { onMounted, ref } from 'vue';

  const props = defineProps<{
    defaultValue?: string;
    defaultSelectValue?: string;
    autofocus?: boolean;
  }>();

  const communes = ref<string[]>([]);
  const codePostalValide = ref<boolean>(true);
  const usecase = new ChargementCommunesUsecase(new CommuneRepositoryAxios());

  onMounted(async () => {
    if (props.defaultValue) {
      communes.value = await usecase.execute(props.defaultValue);
    }
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'update:selectedCommune', commune: string): void;
    (e: 'update:isCodePostalEnErreur', value: boolean): void;
  }>();

  const updateValue = async event => {
    const inputElement = event.target as HTMLInputElement;

    if (/^\d{5}$/.test(inputElement.value)) {
      communes.value = await usecase.execute(inputElement.value);
      emit('update:selectedCommune', communes.value[0]);
      codePostalValide.value = true;
    } else {
      communes.value = [];
      codePostalValide.value = false;
      emit('update:selectedCommune', '');
    }

    emit('update:modelValue', inputElement.value);
    emit('update:isCodePostalEnErreur', !codePostalValide.value);
  };

  const updateSelectedCommune = (event: Event) => {
    const selectElement = event.target as HTMLSelectElement;
    codePostalValide.value = selectElement.value !== '';

    emit('update:selectedCommune', selectElement.value);
  };
</script>
