import { defineStore } from 'pinia';

export interface OnboardingPostCreationCompteState {
  pseudo: string;
  codeEpci: string;
  commune: string;
  codePostal: string;
  dateDeNaissance: { jour: string; mois: string; annee: string };
}

export const onboardingPostCreationCompte = defineStore('onboardingPostCreationCompteState', {
  state: (): OnboardingPostCreationCompteState => ({
    pseudo: '',
    codeEpci: '',
    commune: '',
    codePostal: '',
    dateDeNaissance: { jour: '', mois: '', annee: '' },
  }),

  persist: {
    storage: localStorage,
  },
});
