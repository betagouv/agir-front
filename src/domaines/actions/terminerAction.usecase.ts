import { ActionsEvent } from '@/domaines/actions/actions.eventbus';
import { ActionsRepository, TypeAction } from '@/domaines/actions/ports/actions.repository';
import { EventBus } from '@/shell/eventBus';

export class TerminerActionUsecase {
  constructor(
    private readonly actionRepository: ActionsRepository,
    private readonly eventBus: EventBus<ActionsEvent>,
  ) {}
  async execute(idUtilisateur: string, idAction: string, typeAction: TypeAction): Promise<void> {
    await this.actionRepository.terminerAction(idUtilisateur, idAction, typeAction);
    this.eventBus.publish(ActionsEvent.A_ETE_REALISEE);
  }
}
