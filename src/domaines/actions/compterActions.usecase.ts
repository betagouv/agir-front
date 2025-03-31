import { ActionsRepository } from '@/domaines/actions/ports/actions.repository';

export class CompterActionsUsecase {
  constructor(private readonly actionsRepository: ActionsRepository) {}

  async execute() {
    return this.actionsRepository.compterActions();
  }
}
