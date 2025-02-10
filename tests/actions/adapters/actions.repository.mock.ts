import { Action, ActionDetail, ActionsRepository } from '@/domaines/actions/ports/actions.repository';

export class ActionsRepositoryMock implements ActionsRepository {
  private constructor(
    private readonly actions: Action[],
    private readonly action?: ActionDetail,
  ) {}

  static avecActionDetail(actionDetail: ActionDetail): ActionsRepositoryMock {
    return new ActionsRepositoryMock([], actionDetail);
  }

  static avecActions(actions: Action[]): ActionsRepositoryMock {
    return new ActionsRepositoryMock(actions, undefined);
  }

  chargerAction(idUtilisateur: string, idAction: string): Promise<ActionDetail> {
    return Promise.resolve(this.action!);
  }

  recupererToutesLesActions(): Promise<Action[]> {
    return Promise.resolve(this.actions);
  }
}
