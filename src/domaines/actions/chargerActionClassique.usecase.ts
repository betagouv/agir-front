import { ActionPresenter } from '@/domaines/actions/ports/action.presenter';
import { ActionDetail } from '@/domaines/actions/ports/actions.repository';

export class ChargerActionClassiqueUsecase {
  async execute(action: ActionDetail, presenter: ActionPresenter): Promise<void> {
    presenter.presenteActionClassique(action);
  }
}
