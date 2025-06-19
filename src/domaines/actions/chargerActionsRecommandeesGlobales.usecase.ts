import { ActionsPresenter } from '@/domaines/actions/ports/actions.presenter';
import { ActionsRepository } from '@/domaines/actions/ports/actions.repository';

export class ChargerActionsRecommandeesGlobalesUsecase {
  constructor(private readonly actionsRepository: ActionsRepository) {}

  async execute(idUtilisateur: string, actionsPresenter: ActionsPresenter): Promise<void> {
    const actions = await this.actionsRepository.chargerActionsRecommandees(idUtilisateur);
    actionsPresenter.presente(actions);
  }
}
