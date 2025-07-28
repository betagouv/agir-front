import { BarreDeRecherchePresenter } from '@/domaines/logement/ports/barreDeRecherche.presenter';
import { LogementRepository } from '@/domaines/logement/ports/logement.repository';
import { Coordonnees } from '@/shell/coordonneesType';

export interface Adresse {
  codePostal: string;
  codeEpci: string;
  commune_utilisee_dans_le_compte: string;
  commune_label: string;
  coordonnees: Coordonnees;
  numeroRue: string;
  rue: string;
}

export class RecupererAdressePourBarreDeRechercheUsecase {
  constructor(private logementRepository: LogementRepository) {}

  async execute(idUtilisateur: string, barreDeRecherchePresenter: BarreDeRecherchePresenter) {
    const adresse = await this.logementRepository.recupererAdresse(idUtilisateur);

    barreDeRecherchePresenter.presente(adresse);
  }
}
