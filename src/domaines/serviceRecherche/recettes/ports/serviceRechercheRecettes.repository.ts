import { ServiceRechercheRecettes } from '@/domaines/serviceRecherche/recettes/recupererServiceRecettes.usecase';

export interface ServiceRechercheRecettesRepository {
  recupererService(idUtilisateur: string, typeRecette: string): Promise<ServiceRechercheRecettes>;
}
