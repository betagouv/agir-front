import { createStore, Store } from "vuex";

interface State {
  utilisateur: string;
}

const initialState: State = {
  utilisateur: "",
};

const utilisateurStore: Store<State> = createStore({
  state: initialState,
  mutations: {
    setUtilisateur(state: State, utilisateur: string) {
      state.utilisateur = utilisateur;
    },
  },
  getters: {
    getUtilisateur(state: State): string {
      return state.utilisateur;
    },
  },
});

export default utilisateurStore;
