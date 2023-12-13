import { Utilisateur } from '@/authentification/ports/utilisateur.repository';
import { EmpreinteViewModel } from '@/bilan/adapters/chargementEmpreinte.presenter.impl';
import { defineStore } from 'pinia';
import { ScoreViewModel } from '@/score/ports/chargementScore.presenter';

interface State {
  utilisateur: Utilisateur;
  valeurBilanCarbone: EmpreinteViewModel;
  score: ScoreViewModel;
}

export const utilisateurStore = defineStore('utilisateur', {
  state: (): State => ({
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
    },
  }),
  actions: {
    setUtilisateur(utilisateur: Utilisateur) {
      this.utilisateur = utilisateur;
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
    storage: sessionStorage,
  },
});
