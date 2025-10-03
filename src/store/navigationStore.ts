import { defineStore } from 'pinia';
import { LocationQuery } from 'vue-router';

interface PageHistory {
  path: string;
  name: string;
  query: LocationQuery;
}

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    historiquePage: [] as PageHistory[],
    maxHistorique: 5,
    navigationRetour: false,
  }),

  actions: {
    addRoute(path: string, name: string, query?: LocationQuery) {
      // Ne fait rien si on est en mode navigation retour (évite les doubles enregistrements)
      if (this.navigationRetour) {
        this.navigationRetour = false;
        return;
      }

      const nouvellePage = { path, name, query: query ?? {} };

      const dernierePage = this.historiquePage[0];
      if (dernierePage && dernierePage.path === path && dernierePage.name === name) {
        // On évite les doublons
        return;
      }

      this.historiquePage.unshift(nouvellePage);

      if (this.historiquePage.length > this.maxHistorique) {
        this.historiquePage.pop();
      }
    },

    popRoute() {
      if (this.historiquePage.length > 0) {
        this.historiquePage.shift();
        this.navigationRetour = true;
      }
      return this.dernierePage;
    },
  },
  getters: {
    dernierePage(): PageHistory {
      return this.historiquePage[0] || { path: '', name: '', query: {} };
    },

    hasHistory(): boolean {
      return this.historiquePage.length > 0;
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
