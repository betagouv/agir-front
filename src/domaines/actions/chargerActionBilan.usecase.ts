import { ChargerActionStrategy } from '@/domaines/actions/chargerAction.usecase';
import { ActionPresenter } from '@/domaines/actions/ports/action.presenter';
import { ActionDetail } from '@/domaines/actions/ports/actions.repository';

export class ChargerActionBilanUsecase implements ChargerActionStrategy {
  async execute(action: ActionDetail, presenter: ActionPresenter): Promise<void> {
    presenter.presenteActionBilan(action);
  }
}
