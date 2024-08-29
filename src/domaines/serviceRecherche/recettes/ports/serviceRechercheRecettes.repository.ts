import { Recette } from '@/domaines/serviceRecherche/recettes/recupererDetailServiceRecettes.usecase';
import { ServiceRechercheRecettes } from '@/domaines/serviceRecherche/recettes/recupererServiceRecettes.usecase';

export interface ServiceRechercheRecettesRepository {
  recupererService(idUtilisateur: string, typeRecette: string): Promise<ServiceRechercheRecettes>;
  recupererDetailRecette(idUtilisateur: string, idRecette: string): Promise<Recette>;
}
