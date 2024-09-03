import { defineStore } from 'pinia';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { EmpreinteViewModel } from '@/domaines/bilan/adapters/chargementEmpreinte.presenter.impl';
import { Score } from '@/domaines/score/ports/score.repository';

export interface UtilisateurStore {
  utilisateur: Utilisateur;
  valeurBilanCarbone: EmpreinteViewModel;
  score: Score;
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
      fonctionnalitesDebloquees: [],
      onboardingAEteRealise: false,
      afficherDisclaimerAides: false,
    },
    valeurBilanCarbone: {
      bilan: '',
      details: [],
      valeurMax: 0,
    },
    score: {
      points: 0,
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
    setScore(score: Score) {
      this.score = score;
    },

    reset() {
      this.$reset();
    },
  },
  persist: {
    storage: localStorage,
  },
});
