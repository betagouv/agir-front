import { interactionEnCoursStore } from '@/store/interaction';

export function useInteraction(interaction: { type: string; nombreDePointsAGagner: string; idDuContenu: string }) {
  function interactionAEteCliquee(): void {
    interactionEnCoursStore().setInteractionEnCours({
      type: interaction.type,
      nombreDePointsAGagner: interaction.nombreDePointsAGagner,
      idDuContenu: interaction.idDuContenu,
    });
  }

  return { interactionAEteCliquee };
}
