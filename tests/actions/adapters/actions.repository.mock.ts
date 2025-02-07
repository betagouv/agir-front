import { Action, ActionsRepository } from '@/domaines/actions/ports/actions.repository';

export class ActionsRepositoryMock implements ActionsRepository {
  constructor(private readonly action: Action) {}

  chargerAction(idUtilisateur: string, idAction: string): Promise<Action> {
    return Promise.resolve(this.action);
  }
}
