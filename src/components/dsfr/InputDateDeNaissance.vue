<template>
  <div>
    <fieldset
      id="date-default-1578-fieldset"
      aria-labelledby="date-default-1578-fieldset-legend date-default-1578-fieldset-messages"
      class="fr-fieldset"
      role="group"
    >
      <legend id="date-default-1578-fieldset-legend" class="fr-fieldset__legend text--normal fr-mb-0">
        Votre date de naissance
      </legend>
      <div class="fr-fieldset__element fr-fieldset__element--inline fr-fieldset__element--number">
        <div class="fr-input-group">
          <label class="fr-label" for="date-default-1578-bday-day">
            Jour
            <span class="fr-hint-text">Exemple : 14</span>
          </label>
          <input
            id="date-default-1578-bday-day"
            aria-describedby="date-default-1578-bday-day-error"
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
          <label class="fr-label" for="date-default-1578-bday-month">
            Mois
            <span class="fr-hint-text">Exemple : 12</span>
          </label>
          <input
            id="date-default-1578-bday-month"
            aria-describedby="date-default-1578-bday-month-error"
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
          <label class="fr-label" for="date-default-1578-bday-year">
            Année
            <span class="fr-hint-text">Exemple : 1984</span>
          </label>
          <input
            id="date-default-1578-bday-year"
            aria-describedby="date-default-1578-bday-year-error"
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
    </fieldset>
    <template v-if="erreur?.afficher">
      <Alert
        v-if="erreur.message_jour"
        titre="Erreur"
        :message="erreur.message_jour"
        type="error"
        id="date-default-1578-bday-day-error"
      />
      <Alert
        v-if="erreur.message_mois"
        titre="Erreur"
        :message="erreur.message_mois"
        type="error"
        id="date-default-1578-bday-month-error"
      />
      <Alert
        v-if="erreur.message_annee"
        titre="Erreur"
        :message="erreur.message_annee"
        type="error"
        id="date-default-1578-bday-year-error"
      />
      <Alert
        v-if="erreur.message_general"
        titre="Erreur"
        :message="erreur.message_general"
        type="error"
        id="date-default-1578-fieldset-messages"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { withDefaults, defineProps, defineModel } from 'vue';
  import Alert from '@/components/custom/Alert.vue';

  const dateDeNaissance = defineModel<{ jour: string; mois: string; annee: string }>();

  const props = withDefaults(
    defineProps<{
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
</script>
