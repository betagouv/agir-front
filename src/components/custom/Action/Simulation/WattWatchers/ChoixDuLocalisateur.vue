<template>
  <fieldset class="fr-fieldset" id="radio-inline" aria-labelledby="radio-inline-legend radio-inline-messages">
    <legend class="fr-fieldset__legend--regular fr-fieldset__legend" id="radio-inline-legend">
      <h2 class="fr-h3 fr-mb-1w">Localiser mon compteur</h2>
    </legend>

    <div class="fr-grid-row fr-grid-row--gutters full-width fr-m-1w jagis-background--bleu-light fr-p-1w">
      <div class="fr-col-12 fr-col-md-6">
        <div class="fr-radio-group">
          <input
            type="radio"
            value="adresse-postale"
            id="adresse-postale"
            name="choix-localisateur"
            v-model="choixLocalisateur"
          />
          <label class="fr-label" for="adresse-postale">
            <span
              >Avec mon adresse postale
              <span class="fr-badge badge--conseille">conseillé</span>
            </span>
          </label>
        </div>
      </div>
      <div class="fr-col-12 fr-col-md-6">
        <div class="fr-radio-group">
          <input
            type="radio"
            value="numero-prm"
            id="numero-prm"
            name="choix-localisateur"
            v-model="choixLocalisateur"
          />
          <label class="fr-label" for="numero-prm">Avec mon numéro de PRM</label>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
  const choixLocalisateur = defineModel<string>('choixLocalisateur', { default: 'adresse-postale' });
</script>

<style scoped>
  .badge--conseille {
    background-color: #e4eaff;
    color: #1e0c89;
  }
</style>
