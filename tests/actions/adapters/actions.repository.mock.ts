import {
  Action,
  ActionDetail,
  ActionsRepository,
  CatalogueActions,
  DetailThematique,
  TypeAction,
} from '@/domaines/actions/ports/actions.repository';

export class ActionsRepositoryMock implements ActionsRepository {
  private constructor(
    private readonly actions: Action[],
    private readonly action?: ActionDetail,
    private readonly actionsRecommandeesDansUneThematique?: DetailThematique,
    private readonly catalogueActions?: CatalogueActions,
  ) {}

  static empty(): ActionsRepositoryMock {
    return new ActionsRepositoryMock([]);
  }

  static avecActionDetail(actionDetail: ActionDetail): ActionsRepositoryMock {
    return new ActionsRepositoryMock([], actionDetail);
  }

  static avecActions(actions: Action[]): ActionsRepositoryMock {
    return new ActionsRepositoryMock(actions, undefined);
  }

  static avecCatalogue(catalogue: CatalogueActions): ActionsRepositoryMock {
    return new ActionsRepositoryMock([], undefined, undefined, catalogue);
  }

  static avecActionsRecommandeesDansUneThematique(actionsRecommandeesDansUneThematique: DetailThematique) {
    return new ActionsRepositoryMock([], undefined, actionsRecommandeesDansUneThematique);
  }

  chargerAction(idUtilisateur: string, idAction: string): Promise<ActionDetail> {
    return Promise.resolve(this.action!);
  }

  chargerCatalogueActions(): Promise<CatalogueActions> {
    return Promise.resolve(this.catalogueActions!);
  }

  filtrerCatalogueActions(
    idUtilisateur: string,
    filtresThematiques: string[],
    titre: string,
    filtreDejaVu: boolean,
    filtreDejaRealisees: boolean,
  ): Promise<CatalogueActions> {
    return Promise.resolve(this.catalogueActions!);
  }

  recupererDetailThematique(idUtilisateur: string, thematiqueId: string): Promise<DetailThematique> {
    return Promise.resolve(this.actionsRecommandeesDansUneThematique!);
  }

  terminerAction(idUtilisateur: string, idAction: string, typeAction: TypeAction): Promise<void> {
    return Promise.resolve();
  }

  previsualiser(actionId: string, typeAction: TypeAction): Promise<ActionDetail> {
    return Promise.resolve(this.action!);
  }
}
