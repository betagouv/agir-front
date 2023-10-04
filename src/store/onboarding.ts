import { defineStore } from 'pinia';
import {
  EtapeAlimentation,
  EtapeConsommation,
  EtapeLogement,
  EtapeTransportState,
  OnboardingState,
} from '@/onboarding/evaluerOnboarding.usecase';

export const onboardingStore = defineStore('onboarding', {
  state: (): OnboardingState => ({
    etapeTransport: {
      transports: [],
      avion: 0,
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
    etapeConsommation: {
      consommation: '',
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
    setEtapeConsommation(etapeConsommation: EtapeConsommation) {
      this.etapeConsommation = etapeConsommation;
    },
    reset() {
      this.$reset();
    },
  },

  persist: {
    storage: sessionStorage,
  },
});
