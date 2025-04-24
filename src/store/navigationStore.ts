import { defineStore } from 'pinia';
import { LocationQuery } from 'vue-router';

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    pagePrecedente: { path: '', name: '', query: {} },
  }),
  actions: {
    addRoute(path: string, name: string, query?: LocationQuery) {
      this.pagePrecedente = { path, name, query: query ?? {} };
    },
  },
  persist: {
    storage: localStorage,
  },
});
