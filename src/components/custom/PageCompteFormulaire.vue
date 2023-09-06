<template>
  <form class="fr-mb-0" id="identity" @submit.prevent="modifierInformation">
    <fieldset class="fr-mb-0 fr-fieldset" id="identity-fieldset" aria-labelledby="identity-fieldset-legend identity-fieldset-messages">
      <legend class="fr-fieldset__legend" id="identity-fieldset-legend">
        <h6>Identité personnelle</h6>
      </legend>
      <div class="fr-fieldset__element">
        <fieldset class="fr-fieldset" id="name-1836" aria-labelledby="name-1836-messages">
          <div class="fr-fieldset__element">
            <div class="fr-input-group">
              <label class="fr-label" for="family-name-1829"> Nom </label>
              <input
                class="fr-input"
                spellcheck="false"
                autocomplete="family-name"
                aria-describedby="family-name-1829-messages"
                name="family-name"
                id="family-name-1829"
                type="text"
                v-model="compteUtlisateurViewModel.nom"
              />
              <div class="fr-messages-group" id="family-name-1829-messages" aria-live="assertive"></div>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="fr-fieldset__element">
        <fieldset class="fr-fieldset" id="mail-1836" aria-labelledby="mail-1836-messages">
          <div class="fr-fieldset__element">
            <div class="fr-input-group">
              <label class="fr-label" for="mail-name-1829"> Adresse électronique </label>
              <input
                class="fr-input"
                spellcheck="false"
                autocomplete="mail-name"
                aria-describedby="mail-name-1829-messages"
                name="mail-name"
                id="mail-name-1829"
                type="text"
                v-model="compteUtlisateurViewModel.mail"
              />
              <div class="fr-messages-group" id="mail-name-1829-messages" aria-live="assertive"></div>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="fr-fieldset__element">
        <fieldset class="fr-fieldset" id="codepostal-1836" aria-labelledby="codepostal-1836-messages">
          <div class="fr-fieldset__element">
            <div class="fr-input-group">
              <label class="fr-label" for="codepostal-name-1829"> Adresse électronique </label>
              <input
                class="fr-input"
                spellcheck="false"
                autocomplete="codepostal-name"
                aria-describedby="codepostal-name-1829-messages"
                name="codepostal-name"
                id="codepostal-name-1829"
                type="text"
                v-model="compteUtlisateurViewModel.codePostal"
              />
              <div class="fr-messages-group" id="mail-name-1829-messages" aria-live="assertive"></div>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="fr-fieldset__element">
        <button class="fr-btn" type="submit">Valider</button>
      </div>
    </fieldset>
  </form>
</template>
<script setup lang="ts">
import { CompteUtlisateurViewModel } from "@/compte/adapters/compteUtilisateur.presenter.impl";

const props = defineProps<{
  compteUtlisateurViewModel: CompteUtlisateurViewModel;
}>();

function modifierInformation() {
  console.log(props.compteUtlisateurViewModel);
}
</script>
