import { defineStore } from 'pinia';

export interface OnboardingPostCreationCompteState {
  prenom: string;
  commune: string;
  codePostal: string;
}
export const onboardingPostCreationCompte = defineStore('onboardingPostCreationCompteState', {
  state: (): OnboardingPostCreationCompteState => ({
    prenom: '',
    commune: '',
    codePostal: '',
  }),

  persist: {
    storage: localStorage,
  },
});
