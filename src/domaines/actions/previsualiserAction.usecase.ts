import { ChargerActionStrategyFactory } from '@/domaines/actions/chargerAction.usecase';
import { ActionPresenter } from '@/domaines/actions/ports/action.presenter';
import { ActionsRepository, TypeAction } from '@/domaines/actions/ports/actions.repository';

export class PrevisualiserActionUsecase {
  constructor(
    private readonly strategyFactory: ChargerActionStrategyFactory,
    private readonly actionsRepository: ActionsRepository,
    private readonly presenter: ActionPresenter,
  ) {}

  async execute(actionId: string, type: string): Promise<void> {
    const typeAction = type as TypeAction;
    const action = await this.actionsRepository.previsualiser(actionId, typeAction);
    const strategy = this.strategyFactory.getStrategy(typeAction);
    await strategy.execute(action, this.presenter);
  }
}
