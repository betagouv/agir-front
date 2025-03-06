import { ActionsRepository } from '@/domaines/actions/ports/actions.repository';
import { ActionsDansUneThematiquePresenter } from '@/domaines/actions/ports/actionsDansUneThematiquePresenter';
import { ThematiqueResumePresenter } from '@/domaines/thematiques/ports/thematiqueResume.presenter';

export class RecupererDetailThematiqueUsecase {
  constructor(private actionsRepository: ActionsRepository) {}

  async execute(
    idUtilisateur: string,
    thematiqueId: string,
    actionsDansUneThematiquePresenter: ActionsDansUneThematiquePresenter,
    thematiqueResumePresenter: ThematiqueResumePresenter,
  ): Promise<void> {
    const actions = await this.actionsRepository.recupererDetailThematique(idUtilisateur, thematiqueId);
    if (actions.idEnchainementKYCs && actions.doitRepondreAuxKYCs) {
      actionsDansUneThematiquePresenter.presenteEnchainementKYCs(actions.idEnchainementKYCs);
    } else {
      actionsDansUneThematiquePresenter.presenteActions(actions.actions);
    }
    await thematiqueResumePresenter.presente(actions.resume);
  }
}
