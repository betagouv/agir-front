import { LogementRepository } from '@/domaines/logement/ports/logement.repository';
import { Logement } from '@/domaines/logement/recupererInformationLogement.usecase';
import { Adresse } from '@/domaines/logement/recupererAdressePourBarreDeRecherche.usecase';
import { EtatPrm } from '@/domaines/simulationWattWatchers/recupererEtatPrm.usecase';

export class MockLogementRepository implements LogementRepository {
  constructor(private readonly donnees: Logement | Adresse | EtatPrm) {}

  recupererInformation(_utilisateurId: string): Promise<Logement> {
    if (!this.estLogement(this.donnees)) {
      throw new Error('Les données fournies ne sont pas du type Logement');
    }
    return Promise.resolve(this.donnees);
  }

  recupererAdresse(_utilisateurId: string): Promise<Adresse> {
    if (!this.estAdresse(this.donnees)) {
      throw new Error('Les données fournies ne sont pas du type Adresse');
    }
    return Promise.resolve(this.donnees);
  }

  recupererEtatPrm(utilisateurId: string): Promise<EtatPrm> {
    if (!this.estEtatPrm(this.donnees)) {
      throw new Error('Les données fournies ne sont pas du type EtatPrm');
    }
    return Promise.resolve(this.donnees);
  }

  patcherLesInformations(_utilisateurId: string, _logement: Partial<Logement>): Promise<void> {
    return Promise.resolve(undefined);
  }

  private estLogement(donnees: any): donnees is Logement {
    return 'adultes' in donnees;
  }

  private estAdresse(donnees: any): donnees is Adresse {
    return 'commune_label' in donnees && 'codePostal' in donnees;
  }

  private estEtatPrm(donnees: any): donnees is EtatPrm {
    return 'estPrmObsolete' in donnees && 'estPrmPresent' in donnees;
  }
}
