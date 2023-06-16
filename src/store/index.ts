import utilisateur from "./modules/utilisateur.ts";
// TODO : fix me
// @ts-ignore
import { Commit, createStore } from "vuex";
import VuexPersistence from "vuex-persist";

export default createStore({
  modules: {
    utilisateur: utilisateur,
  },
  plugins: [
    new VuexPersistence({
      storage: window.sessionStorage,
    }).plugin,
  ],
});
