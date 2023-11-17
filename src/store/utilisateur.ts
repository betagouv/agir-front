import { Utilisateur } from '@/authentification/ports/utilisateur.repository';
import { EmpreinteViewModel } from '@/bilan/adapters/chargementEmpreinte.presenter.impl';
import { defineStore } from 'pinia';

interface State {
  utilisateur: Utilisateur;
  valeurBilanCarbone: EmpreinteViewModel;
  score: number;
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
    },
    valeurBilanCarbone: {
      bilan: '',
      details: [],
      valeurMax: 0,
    },
    score: 0,
  }),
  actions: {
    setUtilisateur(utilisateur: Utilisateur) {
      this.utilisateur = utilisateur;
    },
    setValeurBilanCarbone(valeurBilanCarbone: EmpreinteViewModel) {
      this.valeurBilanCarbone = valeurBilanCarbone;
    },
    setScore(score: number) {
      this.score = score;
    },

    reset() {
      this.$reset();
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
