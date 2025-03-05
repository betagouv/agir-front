import { defineStore } from 'pinia';

export interface OnboardingPostCreationCompteState {
  pseudo: string;
  commune: string;
  codePostal: string;
}

export const onboardingPostCreationCompte = defineStore('onboardingPostCreationCompteState', {
  state: (): OnboardingPostCreationCompteState => ({
    pseudo: '',
    commune: '',
    codePostal: '',
  }),

  persist: {
    storage: localStorage,
  },
});
