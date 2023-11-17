import { utilisateurStore } from '@/store/utilisateur';
import { CliquerInteractionUsecase } from '@/interactions/cliquerInteraction.usecase';
import { InteractionsRepositoryAxios } from '@/interactions/adapters/interactionsRepository.axios';
import { interactionEnCoursStore } from '@/store/interaction';
import { RecommandationViewModel } from '@/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.presenter.impl';

export function useInteraction(recommandation: RecommandationViewModel) {
  function interactionAEteCliquee(): void {
    const store = utilisateurStore();
    const idUtilisateur = store.utilisateur.id;
    const useCase = new CliquerInteractionUsecase(new InteractionsRepositoryAxios());
    useCase.execute(idUtilisateur, recommandation.id, recommandation.type).then(() => {});
    interactionEnCoursStore().setInteractionEnCours({
      id: recommandation.id,
      type: recommandation.type,
      nombreDePointsAGagner: recommandation.nombreDePointsAGagner,
      idDuContenu: recommandation.contentId,
    });
  }

  return { interactionAEteCliquee };
}
