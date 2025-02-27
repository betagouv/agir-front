import { CatalogueActions } from '@/domaines/actions/ports/actions.repository';

export interface CatalogueActionsViewModel {
  phraseNombreActions: string;
  filtres: { id: string; label: string; checked: boolean }[];
}

export interface CatalogueActionsPresenter {
  presente(catalogueActions: CatalogueActions): void;
}
