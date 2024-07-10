import { ServiceRechercheFruitsEtLegumes } from '@/domaines/serviceRecherche/recupererServiceFruitsEtLegumes.usecase';

export interface ServiceRechercheFruitsEtLegumesRepository {
  recupererService(idUtilisateur: string, mois: string): Promise<ServiceRechercheFruitsEtLegumes>;
}
