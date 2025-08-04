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
    private readonly action?: ActionDetail,
    private readonly actionsRecommandeesDansUneThematique?: DetailThematique,
    private readonly catalogueActions?: CatalogueActions,
    private readonly actions?: Action[],
  ) {}

  static empty(): ActionsRepositoryMock {
    return new ActionsRepositoryMock();
  }

  static avecActionDetail(actionDetail: ActionDetail): ActionsRepositoryMock {
    return new ActionsRepositoryMock(actionDetail);
  }

  static avecActionsRecommandeesDansUneThematique(actionsRecommandeesDansUneThematique: DetailThematique) {
    return new ActionsRepositoryMock(undefined, actionsRecommandeesDansUneThematique);
  }

  static avecCatalogue(catalogue: CatalogueActions): ActionsRepositoryMock {
    return new ActionsRepositoryMock(undefined, undefined, catalogue);
  }

  static avecActions(actions: Action[]): ActionsRepositoryMock {
    return new ActionsRepositoryMock(undefined, undefined, undefined, actions);
  }

  chargerActionUtilisateur(idUtilisateur: string, idAction: string): Promise<ActionDetail> {
    return Promise.resolve(this.action!);
  }

  chargerActionsRecommandees(idUtilisateur: string): Promise<Action[]> {
    return Promise.resolve(this.actions!);
  }

  chargerCatalogueActionsUtilisateur(): Promise<CatalogueActions> {
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

  compterActions(): Promise<number> {
    return Promise.resolve(0);
  }

  chargerAction(idAction: string, type: TypeAction): Promise<ActionDetail> {
    return Promise.resolve(this.action!);
  }

  chargerCatalogueActions(): Promise<CatalogueActions> {
    return Promise.resolve(this.catalogueActions!);
  }

  chargerCatalogueActionsUtilisateurWinter(idUtilisateur: string): Promise<CatalogueActions> {
    return Promise.resolve(this.catalogueActions!);
  }

  chargerCatalogueActionsMaif(): Promise<CatalogueActions> {
    return Promise.resolve(this.catalogueActions!);
  }

  chargerCatalogueActionsWinter(): Promise<CatalogueActions> {
    return Promise.resolve(this.catalogueActions!);
  }
}
