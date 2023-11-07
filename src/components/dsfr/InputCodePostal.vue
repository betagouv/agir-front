<template>
  <div class="fr-input-group">
    <label class="fr-label" for="codePostal">Code postal</label>
    <input class="fr-input" name="codePostal" id="codePostal" type="text" @input="updateValue" :value="defaultValue" />
  </div>

  <div class="fr-select-group">
    <label class="fr-label" for="selectCommune">
      Sélection d'une commune
      <span class="fr-hint-text">Veuillez remplir un code postal valide</span>
    </label>
    <select
      class="fr-select"
      id="selectCommune"
      name="selectCommune"
      :disabled="communes.length === 0"
      @change="updateSelectedCommune"
    >
      <option value="" selected disabled hidden>Selectionnez une option</option>
      <option :value="commune" :selected="defaultSelectValue === commune" v-for="commune in communes" :key="commune">
        {{ commune }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
  import { ChargementCommunesUsecase } from '@/communes/chargementCommunesUsecase';
  import { CommuneRepositoryAxios } from '@/communes/adapters/communeRepositoryAxios';
  import { onMounted, ref } from 'vue';

  const props = defineProps<{
    defaultValue?: string;
    defaultSelectValue?: string;
  }>();

  const communes = ref<string[]>([]);
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
    } else {
      communes.value = [];
    }

    emit('update:modelValue', inputElement.value);
  };

  const updateSelectedCommune = (event: Event) => {
    const selectElement = event.target as HTMLSelectElement;

    emit('update:selectedCommune', selectElement.value);
  };
</script>
