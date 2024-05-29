import { defineStore } from 'pinia';
import {
  EtapeAlimentation,
  EtapeConsommation,
  EtapeLogement,
  EtapeTransportState,
  OnboardingState,
} from '@/domaines/onboarding/evaluerOnboarding.usecase';

export const onboardingStore = defineStore('onboarding', {
  state: (): OnboardingState => ({
    email: '',
    etapeTransport: {
      transports: [],
      avion: 0,
      done: false,
    },
    etapeLogement: {
      code_postal: '',
      commune: '',
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

  getters: {
    estComplet: state =>
      state.etapeAlimentation.done &&
      state.etapeConsommation.done &&
      state.etapeLogement.done &&
      state.etapeTransport.done,
  },

  persist: {
    storage: localStorage,
  },
});
