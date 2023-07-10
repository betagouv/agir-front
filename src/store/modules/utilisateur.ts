import { Commit } from "vuex";
import { Utilisateur } from "@/authentification/ports/utilisateur.repository";

interface State {
  utilisateur: string;
  id: string;
  valeurBilanCarbone: string;
  interactionEnCours: string;
}

export const initialState: State = {
  utilisateur: "",
  id: "",
  valeurBilanCarbone: "",
  interactionEnCours: "",
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
    getValeurBilanCarbone(state: State): string {
      return state.valeurBilanCarbone;
    },
    getInteractionEnCours(state: State): string {
      return state.interactionEnCours;
    },
  },
  mutations: {
    setUtilisateur(state: State, utilisateur: Utilisateur) {
      state.utilisateur = utilisateur.nom;
      state.id = utilisateur.id;
    },
    setValeurBilanCarbone(state: State, valeurBilanCarbone: string) {
      state.valeurBilanCarbone = valeurBilanCarbone;
    },
    setInteractionEnCours(state: State, interactionEnCours: string) {
      state.interactionEnCours = interactionEnCours;
    },
  },
  actions: {
    reset({ commit }: { commit: Commit }) {
      commit("setUtilisateur", { nom: "", id: "" });
      commit("setValeurBilanCarbone", "");
      commit("setInteractionEnCours", "");
    },
  },
};
