import { defineStore } from 'pinia';

interface EtapeTransportState {
  transports: string[];
  avion: number;
  done: boolean;
}

interface OnboardingState {
  etapeTransport: EtapeTransportState;
}

export const onboardingStore = defineStore('onboarding', {
  state: (): OnboardingState => ({
    etapeTransport: {
      transports: [],
      avion: -1,
      done: false,
    },
  }),

  actions: {
    setEtapeTransport(etapeTransport: EtapeTransportState) {
      this.etapeTransport = etapeTransport;
    },
    reset() {
      this.$reset();
    },
  },

  persist: {
    storage: sessionStorage,
  },
});
