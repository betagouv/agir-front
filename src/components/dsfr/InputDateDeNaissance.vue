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
          v-if="statusErreurs.erreurJour"
          v-text="statusErreurs.erreurJour"
          class="fr-error-text fr-mt-0"
          :id="`date-default-${keyName}-bday-day-error`"
        />
        <li
          v-if="statusErreurs.erreurMois"
          v-text="statusErreurs.erreurMois"
          class="fr-error-text fr-mt-0"
          :id="`date-default-${keyName}-bday-month-error`"
        />
        <li
          v-if="statusErreurs.erreurAnnee"
          v-text="statusErreurs.erreurAnnee"
          class="fr-error-text fr-mt-0"
          :id="`date-default-${keyName}-bday-year-error`"
        />
        <li
          v-if="statusErreurs.erreurFieldset"
          v-text="statusErreurs.erreurFieldset"
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
    erreurJour: '',
    erreurMois: '',
    erreurAnnee: '',
    erreurFieldset: '',
    afficher: false,
  });

  function resetDateDeNaissanceStatus() {
    statusErreurs.value = {
      erreurJour: '',
      erreurMois: '',
      erreurAnnee: '',
      erreurFieldset: '',
      afficher: false,
    };
  }

  function validation(): boolean {
    resetDateDeNaissanceStatus();

    type Validation = {
      estEnErreur: boolean;
      focusComposantEnErreur: () => void;
      champsStatusErreurs: 'erreurJour' | 'erreurMois' | 'erreurAnnee' | 'erreurFieldset';
      message: string;
    };
    const validations: Validation[] = [
      {
        estEnErreur: !validationJour(dateDeNaissance.value.jour),
        focusComposantEnErreur: () => jourInputRef.value?.focus(),
        champsStatusErreurs: 'erreurJour',
        message: 'Le jour doit être compris entre 1 et 31',
      },
      {
        estEnErreur: !validationMois(dateDeNaissance.value.mois),
        focusComposantEnErreur: () => moisInputRef.value?.focus(),
        champsStatusErreurs: 'erreurMois',
        message: 'Le mois doit être compris entre 1 et 12',
      },
      {
        estEnErreur: !validationAnnee(dateDeNaissance.value.annee),
        focusComposantEnErreur: () => anneeInputRef.value?.focus(),
        champsStatusErreurs: 'erreurAnnee',
        message: `L'année doit être comprise entre 1900 et ${new Date().getFullYear()}`,
      },
      {
        estEnErreur: !validationDateEstPassee(dateDeNaissance.value),
        focusComposantEnErreur: () => fieldsetRef.value?.focus(),
        champsStatusErreurs: 'erreurFieldset',
        message: 'La date de naissance ne peut être dans le futur',
      },
      {
        estEnErreur: !validationDateExiste(dateDeNaissance.value),
        focusComposantEnErreur: () => fieldsetRef.value?.focus(),
        champsStatusErreurs: 'erreurFieldset',
        message: "La date de naissance n'existe pas",
      },
    ];

    let formulaireEnErreur = false;
    for (const validation of validations) {
      if (validation.estEnErreur) {
        if (!formulaireEnErreur) validation.focusComposantEnErreur();
        formulaireEnErreur = true;
        statusErreurs.value.afficher = true;
        statusErreurs.value[validation.champsStatusErreurs] = validation.message;
      }
    }

    if (formulaireEnErreur) return false;

    resetDateDeNaissanceStatus();
    return true;
  }
</script>
