import { ServicesRecherche } from '@/domaines/serviceRecherche/recupererServicesRechercheParUnivers.usecase';

export interface ServiceRechercheRepository {
  recupererServicesParUnivers(idUtilisateur: string, univers: string): Promise<ServicesRecherche>;
  recupererServicesPageAccueil(idUtilisateur: string): Promise<ServicesRecherche>;
}
