import { defineStore } from 'pinia';

interface State {
  bilan: {
    alimentation: number;
    transports: number;
    logement: number;
    consommation: number;
  } | null;
}

export const onboardingBilanStore = defineStore('onboardingBilan', {
  state: (): State => ({
    bilan: null,
  }),
  actions: {
    setBilan(bilan) {
      this.bilan = bilan;
    },

    reset() {
      this.$reset();
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
