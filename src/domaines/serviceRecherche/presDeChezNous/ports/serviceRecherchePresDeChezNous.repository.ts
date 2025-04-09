import { ServiceRecherchePresDeChezNousResultatDetail } from '@/domaines/serviceRecherche/presDeChezNous/recupererDetailServicePresDeChezNous.usecase';
import { ServiceRecherchePresDeChezNous } from '@/domaines/serviceRecherche/presDeChezNous/recupererServicePresDeChezNous.usecase';
import { Coordonnees } from '@/shell/coordonneesType';

export interface ServiceRecherchePresDeChezNousRepository {
  recupererService(
    idUtilisateur: string,
    idService: string,
    nombreMaxResultats: number,
    coordonnes?: Coordonnees,
  ): Promise<ServiceRecherchePresDeChezNous>;

  recupererDetail(idUtilisateur: string, idService: string): Promise<ServiceRecherchePresDeChezNousResultatDetail>;
}
