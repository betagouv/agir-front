import { ServiceRechercheRecettes } from '@/domaines/serviceRecherche/recupererServiceRecettes.usecase';

export interface ServiceRechercheRecettesRepository {
  recupererService(idUtilisateur: string, typeRecette: string): Promise<ServiceRechercheRecettes>;
}
