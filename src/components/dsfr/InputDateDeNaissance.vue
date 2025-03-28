<template>
  <div>
    <fieldset
      :id="`date-default-${key}-fieldset`"
      :aria-labelledby="`date-default-${key}-fieldset-legend date-default-${key}-fieldset-messages`"
      class="fr-fieldset"
      :class="erreur?.afficher ? 'fr-fieldset--error' : ''"
      role="group"
    >
      <legend
        :id="`date-default-${key}-fieldset-legend`"
        class="fr-fieldset__legend text--normal fr-mb-0"
        ref="general-input"
      >
        Votre date de naissance
        <span v-if="description" class="fr-hint-text">{{ description }}</span>
      </legend>
      <div class="fr-fieldset__element fr-fieldset__element--inline fr-fieldset__element--number">
        <div class="fr-input-group">
          <label class="fr-label" :for="`date-default-${key}-bday-day`">
            Jour
            <span class="fr-hint-text">Exemple : 14</span>
          </label>
          <input
            ref="jour-input"
            :id="`date-default-${key}-bday-day`"
            :aria-describedby="`date-default-${key}-bday-day-error`"
            v-model="dateDeNaissance.jour"
            :disabled="disabled"
            class="fr-input"
            name="day"
            type="text"
            :maxlength="2"
            :required="required"
          />
        </div>
      </div>
      <div class="fr-fieldset__element fr-fieldset__element--inline fr-fieldset__element--number">
        <div class="fr-input-group">
          <label class="fr-label" :for="`date-default-${key}-bday-month`">
            Mois
            <span class="fr-hint-text">Exemple : 12</span>
          </label>
          <input
            ref="mois-input"
            :id="`date-default-${key}-bday-month`"
            :aria-describedby="`date-default-${key}-bday-month-error`"
            v-model="dateDeNaissance.mois"
            :disabled="disabled"
            class="fr-input"
            name="month"
            type="text"
            :maxlength="2"
            :required="required"
          />
        </div>
      </div>
      <div
        class="fr-fieldset__element fr-fieldset__element--inline fr-fieldset__element--inline-grow fr-fieldset__element--year"
      >
        <div class="fr-input-group">
          <label class="fr-label" :for="`date-default-${key}-bday-year`">
            Année
            <span class="fr-hint-text">Exemple : 1984</span>
          </label>
          <input
            ref="annee-input"
            :id="`date-default-${key}-bday-year`"
            :aria-describedby="`date-default-${key}-bday-year-error`"
            v-model="dateDeNaissance.annee"
            :disabled="disabled"
            class="fr-input"
            name="year"
            type="text"
            :maxlength="4"
            :required="required"
          />
        </div>
      </div>
      <ul v-if="erreur?.afficher" class="list-style-none fr-px-1w fr-mt-0">
        <li
          v-if="erreur.message_jour"
          v-text="erreur.message_jour"
          class="fr-error-text fr-mt-0"
          :id="`date-default-${key}-bday-day-error`"
        />
        <li
          v-if="erreur.message_mois"
          v-text="erreur.message_mois"
          class="fr-error-text fr-mt-0"
          :id="`date-default-${key}-bday-month-error`"
        />
        <li
          v-if="erreur.message_annee"
          v-text="erreur.message_annee"
          class="fr-error-text fr-mt-0"
          :id="`date-default-${key}-bday-year-error`"
        />
        <li
          v-if="erreur.message_general"
          v-text="erreur.message_general"
          class="fr-error-text fr-mt-0"
          :id="`date-default-${key}-fieldset-messages`"
        />
      </ul>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
  import { withDefaults, defineProps, defineModel } from 'vue';

  const dateDeNaissance = defineModel<{ jour: string; mois: string; annee: string }>({
    default: { jour: '', mois: '', annee: '' },
  });

  const props = withDefaults(
    defineProps<{
      key: string;
      description?: string;
      disabled?: boolean;
      required?: boolean;
      erreur?: {
        message_jour: string;
        message_mois: string;
        message_annee: string;
        message_general: string;
        afficher: boolean;
      };
    }>(),
    {
      disabled: false,
    },
  );

  function focusInput(type: 'jour' | 'mois' | 'annee' | 'general') {
    const input: HTMLInputElement = this.$refs[`${type}-input`];
    input.focus();
  }

  defineExpose({
    focusInput,
  });
</script>
