<template>
  <div>
    <fieldset
      :id="`date-naissance-${keyName}-fieldset`"
      :aria-labelledby="`date-naissance-${keyName}-fieldset-legend ${statusErreurs.erreurFieldset ? `date-naissance-${keyName}-${cleDateDeNaissance.DATE_NEXISTE_PAS}-error` : ''}`"
      class="fr-fieldset"
      :class="statusErreurs?.afficher ? 'fr-fieldset--error' : ''"
      role="group"
    >
      <legend
        :id="`date-naissance-${keyName}-fieldset-legend`"
        class="fr-fieldset__legend text--normal fr-mb-0"
        ref="fieldsetRef"
      >
        Votre date de naissance
        <span v-if="description" class="fr-hint-text">{{ description }}</span>
      </legend>

      <div class="fr-fieldset__element fr-fieldset__element--inline fr-fieldset__element--number">
        <div class="fr-input-group">
          <label class="fr-label" :for="`date-naissance-${keyName}-${cleDateDeNaissance.JOUR}`">
            Jour
            <span class="fr-hint-text">Exemple : 14</span>
          </label>
          <input
            autocomplete="bday-day"
            ref="jourInputRef"
            :id="`date-naissance-${keyName}-${cleDateDeNaissance.JOUR}`"
            :aria-describedby="
              statusErreurs.erreurJour ? `date-naissance-${keyName}-${cleDateDeNaissance.JOUR}-error` : ''
            "
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
          <label class="fr-label" :for="`date-naissance-${keyName}-${cleDateDeNaissance.MOIS}`">
            Mois
            <span class="fr-hint-text">Exemple : 12</span>
          </label>
          <input
            autocomplete="bday-month"
            ref="moisInputRef"
            :id="`date-naissance-${keyName}-${cleDateDeNaissance.MOIS}`"
            :aria-describedby="
              statusErreurs.erreurMois ? `date-naissance-${keyName}-${cleDateDeNaissance.MOIS}-error` : ''
            "
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
          <label class="fr-label" :for="`date-naissance-${keyName}-${cleDateDeNaissance.ANNEE}`">
            Année
            <span class="fr-hint-text">Exemple : 1984</span>
          </label>
          <input
            autocomplete="bday-year"
            ref="anneeInputRef"
            :id="`date-naissance-${keyName}-${cleDateDeNaissance.ANNEE}`"
            :aria-describedby="
              statusErreurs.erreurJour ? `date-naissance-${keyName}-${cleDateDeNaissance.ANNEE}-error` : ''
            "
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
          :key="key"
          v-for="(message, key) in erreursFiltrees"
          v-text="message"
          class="fr-error-text fr-mt-0"
          :id="`date-naissance-${keyName}-${key}-error`"
        />
      </ul>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
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

  enum cleDateDeNaissance {
    JOUR = 'jour',
    MOIS = 'mois',
    ANNEE = 'anneee',
    DATE_NEXISTE_PAS = 'date-ko',
  }

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

  const erreursFiltrees = computed(() => {
    if (!statusErreurs) return {};

    return Object.fromEntries(
      Object.entries({
        [cleDateDeNaissance.JOUR]: statusErreurs.value.erreurJour,
        [cleDateDeNaissance.MOIS]: statusErreurs.value.erreurMois,
        [cleDateDeNaissance.ANNEE]: statusErreurs.value.erreurAnnee,
        [cleDateDeNaissance.DATE_NEXISTE_PAS]: statusErreurs.value.erreurFieldset,
      }).filter(([, message]) => message),
    );
  });

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
