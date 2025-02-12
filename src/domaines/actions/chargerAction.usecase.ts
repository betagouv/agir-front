import { ChargerActionClassiqueUsecase } from '@/domaines/actions/chargerActionClassique.usecase';
import { ChargerActionQuizUsecase } from '@/domaines/actions/chargerActionQuiz.usecase';
import { ActionPresenter } from '@/domaines/actions/ports/action.presenter';
import { ActionsRepository, TypeAction } from '@/domaines/actions/ports/actions.repository';

export class ChargerActionUsecase {
  constructor(
    private chargerActionClassique: ChargerActionClassiqueUsecase,
    private chargerActionQuiz: ChargerActionQuizUsecase,
    private readonly actionsRepository: ActionsRepository,
    private readonly presenter: ActionPresenter,
  ) {}

  async execute(idUtilisateur: string, actionId: string, typeAction: string): Promise<void> {
    const action = await this.actionsRepository.chargerAction(idUtilisateur, actionId, typeAction as TypeAction);
    if (action.type === 'classique') {
      await this.chargerActionClassique.execute(action, this.presenter);
    } else if (action.type === 'quiz') {
      await this.chargerActionQuiz.execute(action, this.presenter);
    }
  }
}
