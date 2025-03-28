<template>
  <div>
    <fieldset
      :id="`date-default-${keyName}-fieldset`"
      :aria-labelledby="`date-default-${keyName}-fieldset-legend date-default-${keyName}-fieldset-messages`"
      class="fr-fieldset"
      :class="statusErreurs?.afficher ? 'fr-fieldset--error' : ''"
      role="group"
    >
      <legend
        :id="`date-default-${keyName}-fieldset-legend`"
        class="fr-fieldset__legend text--normal fr-mb-0"
        ref="fieldsetRef"
      >
        Votre date de naissance
        <span v-if="description" class="fr-hint-text">{{ description }}</span>
      </legend>

      <div class="fr-fieldset__element fr-fieldset__element--inline fr-fieldset__element--number">
        <div class="fr-input-group">
          <label class="fr-label" :for="`date-default-${keyName}-bday-day`">
            Jour
            <span class="fr-hint-text">Exemple : 14</span>
          </label>
          <input
            ref="jourInputRef"
            :id="`date-default-${keyName}-bday-day`"
            :aria-describedby="`date-default-${keyName}-bday-day-error`"
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
          <label class="fr-label" :for="`date-default-${keyName}-bday-month`">
            Mois
            <span class="fr-hint-text">Exemple : 12</span>
          </label>
          <input
            ref="moisInputRef"
            :id="`date-default-${keyName}-bday-month`"
            :aria-describedby="`date-default-${keyName}-bday-month-error`"
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
          <label class="fr-label" :for="`date-default-${keyName}-bday-year`">
            Année
            <span class="fr-hint-text">Exemple : 1984</span>
          </label>
          <input
            ref="anneeInputRef"
            :id="`date-default-${keyName}-bday-year`"
            :aria-describedby="`date-default-${keyName}-bday-year-error`"
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
      <ul v-if="statusErreurs?.afficher" class="list-style-none fr-px-1w fr-mt-0">
        <li
          v-if="statusErreurs.message_jour"
          v-text="statusErreurs.message_jour"
          class="fr-error-text fr-mt-0"
          :id="`date-default-${keyName}-bday-day-error`"
        />
        <li
          v-if="statusErreurs.message_mois"
          v-text="statusErreurs.message_mois"
          class="fr-error-text fr-mt-0"
          :id="`date-default-${keyName}-bday-month-error`"
        />
        <li
          v-if="statusErreurs.message_annee"
          v-text="statusErreurs.message_annee"
          class="fr-error-text fr-mt-0"
          :id="`date-default-${keyName}-bday-year-error`"
        />
        <li
          v-if="statusErreurs.message_general"
          v-text="statusErreurs.message_general"
          class="fr-error-text fr-mt-0"
          :id="`date-default-${keyName}-fieldset-messages`"
        />
      </ul>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, defineModel, ref } from 'vue';
  import {
    validationAnnee,
    validationDateEstPassee,
    validationDateExiste,
    validationJour,
    validationMois,
  } from '@/components/validations/validationsChampsFormulaire';

  const dateDeNaissance = defineModel<{ jour: string; mois: string; annee: string }>({
    default: { jour: '', mois: '', annee: '' },
  });

  defineExpose({ validation });

  const props = defineProps<{
    keyName: string;
    description?: string;
    disabled?: boolean;
    required?: boolean;
  }>();

  const jourInputRef = ref<HTMLInputElement | null>();
  const moisInputRef = ref<HTMLInputElement | null>();
  const anneeInputRef = ref<HTMLInputElement | null>();
  const fieldsetRef = ref<HTMLInputElement | null>();
  const statusErreurs = ref({
    message_jour: '',
    message_mois: '',
    message_annee: '',
    message_general: '',
    afficher: false,
  });

  function resetDateDeNaissanceStatus() {
    statusErreurs.value = {
      message_jour: '',
      message_mois: '',
      message_annee: '',
      message_general: '',
      afficher: false,
    };
  }

  function validation(): boolean {
    let hasError = false;
    resetDateDeNaissanceStatus();

    if (!validationJour(dateDeNaissance.value.jour)) {
      jourInputRef.value?.focus();
      hasError = true;
      statusErreurs.value.afficher = true;
      statusErreurs.value.message_jour = 'Le jour doit être compris entre 1 et 31';
    }

    if (!validationMois(dateDeNaissance.value.mois)) {
      if (!hasError) moisInputRef.value?.focus();
      hasError = true;
      statusErreurs.value.afficher = true;
      statusErreurs.value.message_mois = 'Le mois doit être compris entre 1 et 12';
    }

    if (!validationAnnee(dateDeNaissance.value.annee)) {
      if (!hasError) anneeInputRef.value?.focus();
      hasError = true;
      const anneeActuelle = new Date().getFullYear();
      statusErreurs.value.afficher = true;
      statusErreurs.value.message_annee = `L'annee doit être comprise entre 1900 et ${anneeActuelle}`;
    }

    if (!validationDateEstPassee(dateDeNaissance.value)) {
      if (!hasError) fieldsetRef.value?.focus();
      hasError = true;
      statusErreurs.value.afficher = true;
      statusErreurs.value.message_general = 'La date de naissance ne peut être dans le futur';
    }

    if (!hasError && !validationDateExiste(dateDeNaissance.value)) {
      if (!hasError) fieldsetRef.value?.focus();
      hasError = true;
      statusErreurs.value.afficher = true;
      statusErreurs.value.message_general = "La date de naissance n'existe pas";
    }

    if (hasError) return false;

    resetDateDeNaissanceStatus();
    return true;
  }
</script>
