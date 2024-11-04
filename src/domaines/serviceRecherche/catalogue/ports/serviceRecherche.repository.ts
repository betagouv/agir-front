import { ServicesRecherche } from '@/domaines/serviceRecherche/catalogue/recupererServicesRechercheParThematique.usecase';

export interface ServiceRechercheRepository {
  recupererServicesParThematique(idUtilisateur: string, thematiqueId: string): Promise<ServicesRecherche>;
  recupererServicesPageAccueil(idUtilisateur: string): Promise<ServicesRecherche>;
}
