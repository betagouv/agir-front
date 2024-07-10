import { ServiceRechercheFruitsEtLegumes } from '@/domaines/serviceRecherche/recupererServiceFruitsEtLegumes.usecase';

export interface ServiceRechercheFruitsEtLegumesPresenter {
  presente(serviceRecherche: ServiceRechercheFruitsEtLegumes): void;
}
