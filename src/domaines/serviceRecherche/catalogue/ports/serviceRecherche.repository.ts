import { ServicesRecherche } from '@/domaines/serviceRecherche/catalogue/recupererServicesRechercheParUnivers.usecase';

export interface ServiceRechercheRepository {
  recupererServicesParUnivers(idUtilisateur: string, univers: string): Promise<ServicesRecherche>;
  recupererServicesPageAccueil(idUtilisateur: string): Promise<ServicesRecherche>;
}
