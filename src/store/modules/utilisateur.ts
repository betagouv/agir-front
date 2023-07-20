import { Commit } from "vuex";
import { Utilisateur } from "@/authentification/ports/utilisateur.repository";
import { EmpreinteViewModel } from "@/bilan/adapters/chargementEmpreinte.presenter.impl";
import { InteractionViewModel } from "@/interactions/adapters/interactions.presenter.impl";

interface State {
  utilisateur: string;
  id: string;
  valeurBilanCarbone: EmpreinteViewModel;
  interactionEnCours: InteractionViewModel | null;
  score: number;
}

export const initialState: State = {
  utilisateur: "",
  id: "",
  valeurBilanCarbone: {
    bilan: "",
    detail: {
      alimentation: 0,
      divers: 0,
      logement: 0,
      servicesSocietaux: 0,
      transport: 0,
    },
  },
  interactionEnCours: null,
  score: 0,
};

export default {
  namespaced: true,
  state: initialState,
  getters: {
    getUtilisateur(state: State): string {
      return state.utilisateur;
    },
    getId(state: State): string {
      return state.id;
    },
    getValeurBilanCarbone(state: State): EmpreinteViewModel {
      return state.valeurBilanCarbone;
    },
    getInteractionEnCours(state: State): InteractionViewModel {
      if (state.interactionEnCours === null) throw Error;
      return state.interactionEnCours;
    },
    getScore(state: State): number {
      return state.score;
    },
  },
  mutations: {
    setUtilisateur(state: State, utilisateur: Utilisateur) {
      state.utilisateur = utilisateur.nom;
      state.id = utilisateur.id;
    },
    setValeurBilanCarbone(state: State, valeurBilanCarbone: EmpreinteViewModel) {
      state.valeurBilanCarbone = valeurBilanCarbone;
    },
    setInteractionEnCours(state: State, interactionEnCours: InteractionViewModel) {
      state.interactionEnCours = interactionEnCours;
    },
    setScore(state: State, score: number) {
      state.score = score;
    },
  },
  actions: {
    reset({ commit }: { commit: Commit }) {
      commit("setUtilisateur", { nom: "", id: "" });
      commit("setValeurBilanCarbone", {
        bilan: "",
        detail: {
          alimentation: 0,
          divers: 0,
          logement: 0,
          servicesSocietaux: 0,
          transport: 0,
        },
      });
      commit("setInteractionEnCours", {});
      commit("setScore", 0);
    },
  },
};
