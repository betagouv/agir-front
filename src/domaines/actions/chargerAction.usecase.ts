import { ChargerActionClassiqueUsecase } from '@/domaines/actions/chargerActionClassique.usecase';
import { ChargerActionQuizUsecase } from '@/domaines/actions/chargerActionQuiz.usecase';
import { ChargerActionSimulateurUsecase } from '@/domaines/actions/chargerActionSimulateur.usecase';
import { ActionPresenter } from '@/domaines/actions/ports/action.presenter';
import { ActionsRepository, TypeAction } from '@/domaines/actions/ports/actions.repository';

export class ChargerActionUsecase {
  constructor(
    private chargerActionClassique: ChargerActionClassiqueUsecase,
    private chargerActionQuiz: ChargerActionQuizUsecase,
    private chargerActionSimulateur: ChargerActionSimulateurUsecase,
    private readonly actionsRepository: ActionsRepository,
    private readonly presenter: ActionPresenter,
  ) {}

  async execute(idUtilisateur: string, actionId: string, type: string): Promise<void> {
    const typeAction = type as TypeAction;
    const action = await this.actionsRepository.chargerAction(idUtilisateur, actionId, typeAction);
    if (type === TypeAction.CLASSIQUE) {
      await this.chargerActionClassique.execute(action, this.presenter);
    } else if (type === TypeAction.QUIZZ) {
      await this.chargerActionQuiz.execute(action, this.presenter);
    } else if (type === TypeAction.SIMULATEUR) {
      await this.chargerActionSimulateur.execute(action, this.presenter);
    }
  }
}
