import { defineStore } from 'pinia';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';

export interface UtilisateurStore {
  utilisateur: Utilisateur;
  tracking: {
    matomoEstInactif: boolean;
  };
  disclaimer: {
    afficherDisclaimerGeneral: boolean;
  };
}

export const utilisateurStore = defineStore('utilisateur', {
  state: (): UtilisateurStore => ({
    utilisateur: {
      id: '',
      nom: '',
      prenom: '',
      mail: '',
      onboardingAEteRealise: false,
      afficherDisclaimerAides: false,
      token: '',
      pseudo: '',
      estUnUtilisateurFranceConnect: false,
      afficherMessageReset: false,
      possedeUneAdresseComplete: false,
    },
    tracking: {
      matomoEstInactif: false,
    },
    disclaimer: {
      afficherDisclaimerGeneral: true,
    },
  }),
  actions: {
    setUtilisateur(utilisateur: Partial<Utilisateur>) {
      this.utilisateur = {
        ...this.utilisateur,
        ...utilisateur,
      };
    },
    reset() {
      this.$reset();
    },
  },
  getters: {
    estConnecte: (state): boolean => {
      return state.utilisateur.id.length > 0;
    },
  },
  persist: {
    storage: localStorage,
  },
});
