import { ServiceRechercheRecettes } from '@/domaines/serviceRecherche/recettes/recupererServiceRecettes.usecase';

export interface ServiceRechercheRecettesPresenter {
  presente(serviceRecherche: ServiceRechercheRecettes): void;
}
