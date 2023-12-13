import { interactionEnCoursStore } from '@/store/interaction';

export function useInteraction(interaction: {
  id: string;
  type: string;
  nombreDePointsAGagner: string;
  idDuContenu: string;
}) {
  function interactionAEteCliquee(): void {
    interactionEnCoursStore().setInteractionEnCours({
      id: interaction.id,
      type: interaction.type,
      nombreDePointsAGagner: interaction.nombreDePointsAGagner,
      idDuContenu: interaction.idDuContenu,
    });
  }

  return { interactionAEteCliquee };
}
