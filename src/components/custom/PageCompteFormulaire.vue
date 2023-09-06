<template>
  <form class="fr-mb-0 background--white fr-p-4w border border-radius--md" @submit.prevent="modifierInformation">
    <fieldset class="fr-mb-0 fr-fieldset">
      <legend class="fr-fieldset__legend" id="identity-fieldset-legend">
        <h6>Identité personnelle</h6>
      </legend>
      <div class="fr-fieldset__element">
        <fieldset class="fr-fieldset">
          <div class="fr-fieldset__element">
            <div class="fr-input-group">
              <label class="fr-label" for="family-name-1829"> Nom </label>
              <input
                class="fr-input"
                spellcheck="false"
                autocomplete="family-name"
                name="family-name"
                id="family-name-1829"
                type="text"
                v-model="compteUtlisateurViewModel.nom"
              />
            </div>
          </div>
        </fieldset>
      </div>
      <div class="fr-fieldset__element">
        <fieldset class="fr-fieldset">
          <div class="fr-fieldset__element">
            <div class="fr-input-group">
              <label class="fr-label" for="mail-1829"> Adresse électronique </label>
              <input
                class="fr-input"
                spellcheck="false"
                autocomplete="mail-name"
                name="mail"
                id="mail-1829"
                type="email"
                v-model="compteUtlisateurViewModel.mail"
              />
            </div>
          </div>
        </fieldset>
      </div>
      <div class="fr-fieldset__element">
        <fieldset class="fr-fieldset">
          <div class="fr-fieldset__element">
            <div class="fr-input-group">
              <label class="fr-label" for="codepostal-name-1829"> Code Postal </label>
              <input
                class="fr-input"
                spellcheck="false"
                autocomplete="codepostal-name"
                name="codepostal-name"
                id="codepostal-name-1829"
                type="text"
                v-model="compteUtlisateurViewModel.codePostal"
              />
            </div>
          </div>
        </fieldset>
      </div>
      <div class="fr-fieldset__element">
        <button class="fr-btn" type="submit">Mettre à jour</button>
      </div>
    </fieldset>
  </form>
</template>
<script setup lang="ts">
import { CompteUtlisateurViewModel } from "@/compte/adapters/compteUtilisateur.presenter.impl";
import { CompteUtilisateurRepositoryImpl } from "@/compte/adapters/compteUtilisateur.repository.impl";
import { MettreAJourCompteUtilisateurUsecase } from "@/compte/mettreAJourCompteUtilisateur.usecase";

const props = defineProps<{
  compteUtlisateurViewModel: CompteUtlisateurViewModel;
}>();

function modifierInformation() {
  const usecase = new MettreAJourCompteUtilisateurUsecase(new CompteUtilisateurRepositoryImpl());
  usecase.execute(props.compteUtlisateurViewModel);
}
</script>
