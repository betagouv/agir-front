<template>
  <div class="fr-grid fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-md-3 fr-col-12">
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
  import '@gouvfr/dsfr/dist/component/select/select.min.css';
  import { ChargementCommunesUsecase } from '@/communes/chargementCommunesUsecase';
  import { CommuneRepositoryAxios } from '@/communes/adapters/communeRepositoryAxios';
  import { onMounted, ref } from 'vue';

  const props = defineProps<{
    defaultValue?: string;
    defaultSelectValue?: string;
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
  }>();

  const updateValue = async event => {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.value.length === 5) {
      communes.value = await usecase.execute(inputElement.value);
      codePostalValide.value = communes.value.length !== 0;
      emit('update:selectedCommune', communes.value[0]);
    } else {
      communes.value = [];
      emit('update:selectedCommune', '');
    }

    emit('update:modelValue', inputElement.value);
  };

  const updateSelectedCommune = (event: Event) => {
    const selectElement = event.target as HTMLSelectElement;

    emit('update:selectedCommune', selectElement.value);
  };
</script>
