import { ActionPresenter } from '@/domaines/actions/ports/action.presenter';
import { ActionsRepository } from '@/domaines/actions/ports/actions.repository';

export class ChargerActionUsecase {
  constructor(private readonly actionsRepository: ActionsRepository) {}

  async execute(actionId: string, presenter: ActionPresenter): Promise<void> {
    const action = await this.actionsRepository.chargerAction('idUtilisateur', actionId);
    presenter.presenteAction(action);
  }
}
