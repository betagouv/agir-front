import { Adresse } from '@/domaines/logement/recupererAdressePourBarreDeRecherche.usecase';
import { ResultatWattWatchers } from '@/domaines/simulationWattWatchers/recupererConsommation.usecase';

export interface WattWatchersRepository {
  inscriptionParPrm(utilisateurId: string, prm: string, nom: string): Promise<void>;

  inscriptionParAdresse(utilisateurId: string, nom: string, adresse: Adresse): Promise<void>;

  recupererConsommation(utilisateurId: string): Promise<ResultatWattWatchers>;
}
