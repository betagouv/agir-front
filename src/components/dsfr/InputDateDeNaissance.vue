<template>
  <fieldset
    id="date-default-1578-fieldset"
    aria-labelledby="date-default-1578-fieldset-legend date-default-1578-fieldset-messages"
    class="fr-fieldset"
    role="group"
  >
    <legend id="date-default-1578-fieldset-legend" class="fr-fieldset__legend">Date de naissance</legend>
    <div class="fr-fieldset__element fr-fieldset__element--inline fr-fieldset__element--number">
      <div class="fr-input-group">
        <label class="fr-label" for="date-default-1578-bday-day">
          Jour
          <span class="fr-hint-text">Exemple : 14</span>
        </label>
        <input
          id="date-default-1578-bday-day"
          v-model="dateDeNaissance.jour"
          class="fr-input"
          name="day"
          type="text"
          :disabled="disabled"
        />
      </div>
    </div>
    <div class="fr-fieldset__element fr-fieldset__element--inline fr-fieldset__element--number">
      <div class="fr-input-group">
        <label class="fr-label" for="date-default-1578-bday-month">
          Mois
          <span class="fr-hint-text">Exemple : 12</span>
        </label>
        <input
          id="date-default-1578-bday-month"
          v-model="dateDeNaissance.mois"
          class="fr-input"
          name="month"
          type="text"
          :disabled="disabled"
        />
      </div>
    </div>
    <div
      class="fr-fieldset__element fr-fieldset__element--inline fr-fieldset__element--inline-grow fr-fieldset__element--year"
    >
      <div class="fr-input-group">
        <label class="fr-label" for="date-default-1578-bday-year">
          Année
          <span class="fr-hint-text">Exemple : 1984</span>
        </label>
        <input
          id="date-default-1578-bday-year"
          v-model="dateDeNaissance.annee"
          class="fr-input"
          name="year"
          type="text"
          :disabled="disabled"
        />
      </div>
    </div>
    <div id="date-default-1578-fieldset-messages" aria-live="assertive" class="fr-messages-group"></div>
  </fieldset>
</template>

<script lang="ts" setup>
  import { computed, defineEmits, defineProps } from 'vue';

  const props = withDefaults(
    defineProps<{
      modelValue: { jour: string; mois: string; annee: string };
      disabled: boolean;
    }>(),
    {
      disabled: false,
    },
  );

  const emit = defineEmits<{
    (event: 'update:modelValue', value: { jour: string; mois: string; annee: string }): void;
  }>();

  const dateDeNaissance = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
  });
</script>
