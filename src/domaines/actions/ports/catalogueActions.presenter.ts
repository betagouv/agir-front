import { CatalogueActions } from '@/domaines/actions/ports/actions.repository';

export interface CatalogueActionsViewModel {
  phraseNombreActions: string;
  filtres: { id: string; label: string; checked: boolean }[];
  actions: ActionDuCatalogueViewModel[];
}

export interface ActionDuCatalogueViewModel {
  code: string;
  titre: string;
  nombreDePersonnes?: string;
  dejaVue: boolean;
  aidesDisponibles?: string;
  url: { name: string; params: { id: string; titre: string; type: string } };
}

export interface CatalogueActionsPresenter {
  presente(catalogueActions: CatalogueActions): void;
}
