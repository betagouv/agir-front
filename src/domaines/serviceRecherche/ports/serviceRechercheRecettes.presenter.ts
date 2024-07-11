import { ServiceRechercheRecettes } from '@/domaines/serviceRecherche/recupererServiceRecettes.usecase';

export interface ServiceRechercheRecettesPresenter {
  presente(serviceRecherche: ServiceRechercheRecettes): void;
}
