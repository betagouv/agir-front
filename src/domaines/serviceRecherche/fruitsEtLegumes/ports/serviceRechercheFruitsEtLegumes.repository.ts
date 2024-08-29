import { ServiceRechercheFruitsEtLegumes } from '@/domaines/serviceRecherche/fruitsEtLegumes/recupererServiceFruitsEtLegumes.usecase';

export interface ServiceRechercheFruitsEtLegumesRepository {
  recupererService(idUtilisateur: string, mois: string): Promise<ServiceRechercheFruitsEtLegumes>;
}
