import { CatalogueActions } from '@/domaines/actions/ports/actions.repository';

export interface FiltresCatalogueActionsViewModel {
  phraseNombreActions: string;
  filtres: { id: string; label: string; checked: boolean }[];
}

export interface CatalogueActionsPresenter {
  presenteCatalogue(catalogueActions: CatalogueActions): Promise<void>;
}
