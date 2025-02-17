import { ActionPresenter } from '@/domaines/actions/ports/action.presenter';
import { ActionsRepository, TypeAction } from '@/domaines/actions/ports/actions.repository';

export class ChargerActionUsecase {
  constructor(private readonly actionsRepository: ActionsRepository) {}

  async execute(
    idUtilisateur: string,
    actionId: string,
    typeAction: string,
    presenter: ActionPresenter,
  ): Promise<void> {
    const action = await this.actionsRepository.chargerAction(idUtilisateur, actionId, typeAction as TypeAction);
    presenter.presenteAction(action);
  }
}
