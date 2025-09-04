import { defineStore } from 'pinia';

export interface refererStoreState {
  referer: string;
  refererKeyword: string;
}

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
