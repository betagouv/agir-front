<template>
  <div class="fr-grid fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-lg-3 fr-col-12">
      <div
        :class="`fr-input-group ${!codePostalValide && 'fr-input-group--error'}
        ${codePostalNexistePas && 'fr-input-group--error'}`"
      >
        <label class="fr-label" for="codePostal">
          Code postal
          <span class="fr-hint-text">Format 5 chiffres</span>
        </label>
        <input
          autocomplete="postal-code"
          class="fr-input"
          name="codePostal"
          id="codePostal"
          required
          :aria-describedby="`${!codePostalValide ? 'text-input-error-desc-error-invalide' : ''} ${codePostalNexistePas ? 'text-input-error-desc-error-commune' : ''}`"
          type="text"
          v-model="codePostal"
          @input="onCodePostalInput"
          :autofocus="autofocus"
        />
        <p v-if="!codePostalValide" id="text-input-error-desc-error-invalide" class="fr-error-text">
          Ce code postal n'est pas valide
        </p>
        <p v-if="codePostalNexistePas" id="text-input-error-desc-error-commune" class="fr-error-text">
          Ce code postal n'existe pas
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
          <option value="" :selected="!defaultSelectValue" disabled hidden>Selectionnez une option</option>
          <option
            v-for="commune in communes"
            :key="commune.label"
            :value="commune.codeEpci"
            :selected="codeEpci === commune.codeEpci"
          >
            {{ commune.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ChargementCommunesUsecase } from '@/domaines/communes/chargementCommunesUsecase';
  import { CommuneRepositoryAxios } from '@/domaines/communes/adapters/commune.repository.axios';
  import { computed, onMounted, ref } from 'vue';
  import { Commune } from '@/domaines/communes/ports/commune.repository';

  const codePostal = defineModel<string>('codePostal', {
    required: true,
  });
  const codeEpci = defineModel<string>('codeEpci', {
    required: true,
  });
  const commune = defineModel<string>('commune');

  const props = defineProps<{
    autofocus?: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'update:isCodePostalEnErreur', value: boolean): void;
  }>();

  const usecase = new ChargementCommunesUsecase(new CommuneRepositoryAxios());
  const communes = ref<Commune[]>([]);

  const codePostalValide = computed(() => codePostal.value?.toString().length === 5);
  const codePostalNexistePas = computed(() => codePostalValide.value && communes.value?.length === 0);

  onMounted(async () => {
    if (codePostal.value && /^\d{5}$/.test(codePostal.value)) {
      communes.value = await usecase.execute(codePostal.value);
    }
  });

  const onCodePostalInput = async () => {
    if (codePostalValide.value) {
      communes.value = await usecase.execute(codePostal.value);
      if (codePostalNexistePas.value) return;
      codeEpci.value = communes.value[0].codeEpci;
      commune.value = communes.value[0].label;
    } else {
      communes.value = [];
      commune.value = '';
      codeEpci.value = '';
    }

    emit('update:isCodePostalEnErreur', !codePostalValide.value && codePostalNexistePas.value);
  };

  const updateSelectedCommune = (event: Event) => {
    const selectedLabel = (event.target as HTMLSelectElement).value;
    const selected = communes.value.find(c => c.codeEpci === selectedLabel);
    if (selected) {
      codeEpci.value = selected.codeEpci;
      commune.value = selected.label;
    }
  };
</script>
