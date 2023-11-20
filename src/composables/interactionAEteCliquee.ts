import { utilisateurStore } from '@/store/utilisateur';
import { CliquerInteractionUsecase } from '@/interactions/cliquerInteraction.usecase';
import { InteractionsRepositoryAxios } from '@/interactions/adapters/interactionsRepository.axios';
import { interactionEnCoursStore } from '@/store/interaction';

export function useInteraction(interaction: {
  id: string;
  type: string;
  nombreDePointsAGagner: string;
  idDuContenu: string;
}) {
  function interactionAEteCliquee(): void {
    const store = utilisateurStore();
    const idUtilisateur = store.utilisateur.id;
    const useCase = new CliquerInteractionUsecase(new InteractionsRepositoryAxios());
    useCase.execute(idUtilisateur, interaction.id, interaction.type).then(() => {});
    interactionEnCoursStore().setInteractionEnCours({
      id: interaction.id,
      type: interaction.type,
      nombreDePointsAGagner: interaction.nombreDePointsAGagner,
      idDuContenu: interaction.idDuContenu,
    });
  }

  return { interactionAEteCliquee };
}
