import { defineStore } from 'pinia';

interface EtapeAlimentation {
  repas: string;
  done: boolean;
}

interface EtapeLogement {
  code_postal: string;
  adultes: number;
  enfants: number;
  residence: string;
  proprietaire: boolean;
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
  etapeAlimentation: EtapeAlimentation;
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
      proprietaire: false,
      superficie: '',
      chauffage: '',
      done: false,
    },
    etapeAlimentation: {
      repas: '',
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
    setEtapeAlimentation(etapeAlimentation: EtapeAlimentation) {
      this.etapeAlimentation = etapeAlimentation;
    },
    reset() {
      this.$reset();
    },
  },

  persist: {
    storage: sessionStorage,
  },
});
