import { ChargerActionBilanUsecase } from '@/domaines/actions/chargerActionBilan.usecase';
import { ChargerActionClassiqueUsecase } from '@/domaines/actions/chargerActionClassique.usecase';
import { ChargerActionQuizUsecase } from '@/domaines/actions/chargerActionQuiz.usecase';
import { ChargerActionSimulateurUsecase } from '@/domaines/actions/chargerActionSimulateur.usecase';
import { ActionPresenter } from '@/domaines/actions/ports/action.presenter';
import { ActionDetail, ActionsRepository, TypeAction } from '@/domaines/actions/ports/actions.repository';

export interface ChargerActionStrategy {
  execute(action: ActionDetail, presenter: ActionPresenter): Promise<void>;
}

export class ChargerActionStrategyFactory {
  private readonly strategies: Record<TypeAction, ChargerActionStrategy>;

  constructor(
    chargerActionClassique: ChargerActionClassiqueUsecase,
    chargerActionQuiz: ChargerActionQuizUsecase,
    chargerActionSimulateur: ChargerActionSimulateurUsecase,
    chargerActionBilan: ChargerActionBilanUsecase,
  ) {
    this.strategies = {
      [TypeAction.CLASSIQUE]: chargerActionClassique,
      [TypeAction.QUIZZ]: chargerActionQuiz,
      [TypeAction.SIMULATEUR]: chargerActionSimulateur,
      [TypeAction.BILAN]: chargerActionBilan,
    };
  }

  getStrategy(type: TypeAction): ChargerActionStrategy {
    const strategy = this.strategies[type];
    if (!strategy) {
      throw new Error(`Aucune stratégie trouvée pour le type d'action : ${type}`);
    }
    return this.strategies[type];
  }
}

export class ChargerActionUsecase {
  constructor(
    private readonly strategyFactory: ChargerActionStrategyFactory,
    private readonly actionsRepository: ActionsRepository,
    private readonly presenter: ActionPresenter,
  ) {}

  async execute(idUtilisateur: string, actionId: string, type: string): Promise<void> {
    const typeAction = type as TypeAction;
    const action = await this.actionsRepository.chargerAction(idUtilisateur, actionId, typeAction);
    const strategy = this.strategyFactory.getStrategy(typeAction);
    await strategy.execute(action, this.presenter);
  }
}
