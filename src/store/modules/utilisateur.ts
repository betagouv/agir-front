import { Commit } from "vuex";
import { Utilisateur } from "@/authentification/ports/utilisateur.repository";

interface State {
  utilisateur: string;
  id: string;
}

export const initialState: State = {
  utilisateur: "",
  id: "",
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
  },
  mutations: {
    setUtilisateur(state: State, utilisateur: Utilisateur) {
      state.utilisateur = utilisateur.nom;
      state.id = utilisateur.id;
    },
  },
  actions: {
    reset({ commit }: { commit: Commit }) {
      commit("setUtilisateur", { nom: "", id: "" });
    },
  },
};
