import { defineStore } from 'pinia';

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    pagePrecedente: { path: '', name: '' },
  }),
  actions: {
    addRoute(path: string, name: string) {
      this.pagePrecedente = { path, name };
    },
  },
  persist: {
    storage: localStorage,
  },
});
