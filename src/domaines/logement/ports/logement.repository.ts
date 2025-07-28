import { Adresse } from '@/domaines/logement/recupererAdressePourBarreDeRecherche.usecase';
import { Logement } from '@/domaines/logement/recupererInformationLogement.usecase';
import { EtatPrm } from '@/domaines/simulationWattWatchers/recupererEtatPrm.usecase';

export interface LogementRepository {
  recupererInformation(utilisateurId: string): Promise<Logement>;
  recupererAdresse(utilisateurId: string): Promise<Adresse>;
  recupererEtatPrm(utilisateurId: string): Promise<EtatPrm>;
  patcherLesInformations(utilisateurId: string, logement: Partial<Logement>): Promise<void>;
}
