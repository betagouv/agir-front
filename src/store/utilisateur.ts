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
}

export const utilisateurStore = defineStore('utilisateur', {
  state: (): UtilisateurStore => ({
    utilisateur: {
      id: '',
      nom: '',
      prenom: '',
      mail: '',
      fonctionnalitesDebloquees: [],
    },
    valeurBilanCarbone: {
      bilan: '',
      details: [],
      valeurMax: 0,
    },
    score: {
      points: 0,
      niveau: 0,
      nombreDePointsDansLeNiveau: 0,
      nombreDePointsDuNiveau: 0,
    },
    tracking: {
      matomoEstInactif: false,
    },
  }),
  actions: {
    setUtilisateur(utilisateur: Partial<Utilisateur>) {
      this.utilisateur = {
        ...this.utilisateur,
        ...utilisateur,
      };
    },
    setValeurBilanCarbone(valeurBilanCarbone: EmpreinteViewModel) {
      this.valeurBilanCarbone = valeurBilanCarbone;
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
