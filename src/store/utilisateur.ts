import { defineStore } from 'pinia';
import { Utilisateur } from '@/authentification/ports/utilisateur.repository';
import { EmpreinteViewModel } from '@/bilan/adapters/chargementEmpreinte.presenter.impl';
import { ScoreViewModel } from '@/score/ports/chargementScore.presenter';

export interface UtilisateurStore {
  utilisateur: Utilisateur;
  valeurBilanCarbone: EmpreinteViewModel;
  score: ScoreViewModel;
  tracking: {
    matomo: boolean;
  };
}

export const utilisateurStore = defineStore('utilisateur', {
  state: (): UtilisateurStore => ({
    utilisateur: {
      id: '',
      nom: '',
      codePostal: '',
      commune: '',
      prenom: '',
      mail: '',
      revenuFiscal: null,
      nombreDePartsFiscales: 1,
      abonnementTransport: false,
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
      celebration: null,
      afficherMissionsTermines: false,
    },
    tracking: {
      matomo: true,
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
    setScore(scoreViewModel: ScoreViewModel) {
      this.score = scoreViewModel;
    },

    reset() {
      this.$reset();
    },
  },
  persist: {
    storage: localStorage,
  },
});
