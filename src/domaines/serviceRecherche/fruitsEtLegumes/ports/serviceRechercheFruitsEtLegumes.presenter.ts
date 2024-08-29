import { ServiceRechercheFruitsEtLegumes } from '@/domaines/serviceRecherche/fruitsEtLegumes/recupererServiceFruitsEtLegumes.usecase';

export interface ServiceRechercheFruitsEtLegumesPresenter {
  presente(serviceRecherche: ServiceRechercheFruitsEtLegumes): void;
}
