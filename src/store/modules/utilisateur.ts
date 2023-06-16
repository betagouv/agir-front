import { Commit } from "vuex";

interface State {
  utilisateur: string;
}

export const initialState: State = {
  utilisateur: "",
};

export default {
  namespaced: true,
  state: initialState,
  getters: {
    getUtilisateur(state: State): string {
      return state.utilisateur;
    },
  },
  mutations: {
    setUtilisateur(state: State, utilisateur: string) {
      state.utilisateur = utilisateur;
    },
  },
  actions: {
    reset({ commit }: { commit: Commit }) {
      commit("setUtilisateur", "");
    }
  }
};
