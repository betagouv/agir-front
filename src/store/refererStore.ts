import { defineStore } from 'pinia';

export interface refererStoreState {
  referer: string;
  refererKeyword: string;
}

// Utilisé pour catégoriser les sources de trafic (ex: campagne "widget")
export const refererStore = defineStore('refererStore', {
  state: (): refererStoreState => ({
    referer: '',
    refererKeyword: '',
  }),

  actions: {
    reset() {
      this.$reset();
    },
  },

  persist: {
    storage: sessionStorage,
  },
});
