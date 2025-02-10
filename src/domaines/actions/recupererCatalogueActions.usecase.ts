import { ActionsRepository } from '@/domaines/actions/ports/actions.repository';
import { CatalogueActionsPresenter } from '@/domaines/actions/ports/catalogueActions.presenter';

export class RecupererCatalogueActionsUsecase {
  constructor(private readonly actionsRepository: ActionsRepository) {}

  async execute(idUtilisateur: string, presenter: CatalogueActionsPresenter): Promise<void> {
    const actions = await this.actionsRepository.recupererToutesLesActions(idUtilisateur);
    presenter.presente(actions);
  }
}
