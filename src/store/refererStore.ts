import { defineStore } from 'pinia';
import { Referer } from '@/domaines/compte/ports/referer.repository';

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
    setReferer(referer: string) {
      this.referer = referer;
    },

    setRefererKeyword(refererKeyword: string) {
      this.refererKeyword = refererKeyword;
    },

    reset() {
      this.$reset();
    },
  },

  getters: {
    getReferer(): Referer {
      return this;
    },
  },

  persist: {
    storage: sessionStorage,
  },
});
