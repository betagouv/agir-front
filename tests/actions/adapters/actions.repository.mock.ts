import {
  Action,
  ActionDetail,
  ActionsRecommandeesDansUneThematique,
  ActionsRepository,
} from '@/domaines/actions/ports/actions.repository';

export class ActionsRepositoryMock implements ActionsRepository {
  private constructor(
    private readonly actions: Action[],
    private readonly action?: ActionDetail,
    private readonly actionsRecommandeesDansUneThematique?: ActionsRecommandeesDansUneThematique,
  ) {}

  static avecActionDetail(actionDetail: ActionDetail): ActionsRepositoryMock {
    return new ActionsRepositoryMock([], actionDetail);
  }

  static avecActions(actions: Action[]): ActionsRepositoryMock {
    return new ActionsRepositoryMock(actions, undefined);
  }

  static avecActionsRecommandeesDansUneThematique(
    actionsRecommandeesDansUneThematique: ActionsRecommandeesDansUneThematique,
  ) {
    return new ActionsRepositoryMock([], undefined, actionsRecommandeesDansUneThematique);
  }

  chargerAction(idUtilisateur: string, idAction: string): Promise<ActionDetail> {
    return Promise.resolve(this.action!);
  }

  chargerCatalogueActions(): Promise<Action[]> {
    return Promise.resolve(this.actions);
  }

  recupererActionsPersonnalisees(
    idUtilisateur: string,
    thematiqueId: string,
  ): Promise<ActionsRecommandeesDansUneThematique> {
    return Promise.resolve(this.actionsRecommandeesDansUneThematique!);
  }

  filtrerCatalogueActions(
    idUtilisateur: string,
    filtresThematiques: string[],
    titre: string,
    filtreDejaVu: boolean,
  ): Promise<Action[]> {
    return Promise.resolve([]);
  }
}
