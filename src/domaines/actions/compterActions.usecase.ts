import { ActionsRepository, CompteurActions } from '@/domaines/actions/ports/actions.repository';

export class CompterActionsUsecase {
  constructor(private readonly actionsRepository: ActionsRepository) {}

  async execute(): Promise<CompteurActions> {
    return await this.actionsRepository.compterActions();
  }
}
