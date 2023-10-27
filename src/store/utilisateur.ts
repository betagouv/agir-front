import { Utilisateur } from '@/authentification/ports/utilisateur.repository';
import { EmpreinteViewModel } from '@/bilan/adapters/chargementEmpreinte.presenter.impl';
import { InteractionViewModel } from '@/interactions/adapters/interactions.presenter.impl';
import { defineStore } from 'pinia';

interface State {
  utilisateur: Utilisateur;
  valeurBilanCarbone: EmpreinteViewModel;
  interactionEnCours: InteractionViewModel | null;
  score: number;
}

export const utilisateurStore = defineStore('utilisateur', {
  state: (): State => ({
    utilisateur: {
      id: '',
      nom: '',
      codePostal: '',
      prenom: '',
      mail: '',
      revenuFiscal: null,
    },
    valeurBilanCarbone: {
      bilan: '',
      details: [],
      valeurMax: 0,
    },
    interactionEnCours: null,
    score: 0,
  }),
  actions: {
    setUtilisateur(utilisateur: Utilisateur) {
      this.utilisateur = utilisateur;
    },
    setValeurBilanCarbone(valeurBilanCarbone: EmpreinteViewModel) {
      this.valeurBilanCarbone = valeurBilanCarbone;
    },
    setInteractionEnCours(interactionEnCours: InteractionViewModel) {
      this.interactionEnCours = interactionEnCours;
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
