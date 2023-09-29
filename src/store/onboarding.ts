import { defineStore } from 'pinia';

interface EtapeLogement {
  code_postal: string;
  adultes: number;
  enfants: number;
  residence: string;
  propriétaire: boolean;
  superficie: string;
  chauffage: string;
  done: boolean;
}

interface EtapeTransportState {
  transports: string[];
  avion: number;
  done: boolean;
}

interface OnboardingState {
  etapeTransport: EtapeTransportState;
  etapeLogement: EtapeLogement;
}

export const onboardingStore = defineStore('onboarding', {
  state: (): OnboardingState => ({
    etapeTransport: {
      transports: [],
      avion: -1,
      done: false,
    },
    etapeLogement: {
      code_postal: '',
      adultes: 0,
      enfants: 0,
      residence: '',
      propriétaire: false,
      superficie: '',
      chauffage: '',
      done: false,
    },
  }),

  actions: {
    setEtapeTransport(etapeTransport: EtapeTransportState) {
      this.etapeTransport = etapeTransport;
    },
    setEtapeLogement(etapeLogement: EtapeLogement) {
      this.etapeLogement = etapeLogement;
    },
    reset() {
      this.$reset();
    },
  },

  persist: {
    storage: sessionStorage,
  },
});
