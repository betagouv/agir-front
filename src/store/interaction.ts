import { defineStore } from 'pinia';

export interface InteractionEnCours {
  id: string;
  nombreDePointsAGagner: string;
  type: string;
  idDuContenu: string;
}
interface State {
  interactionEnCours: InteractionEnCours | null;
}

export const interactionEnCoursStore = defineStore('interaction', {
  state: (): State => ({
    interactionEnCours: null,
  }),
  actions: {
    setInteractionEnCours(interaction: InteractionEnCours) {
      this.interactionEnCours = interaction;
    },

    reset() {
      this.$reset();
    },
  },
  persist: {
    storage: localStorage,
  },
});
