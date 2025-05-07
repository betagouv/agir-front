import { LogementApiModel } from '@/domaines/logement/adapters/logement.repository.axios';
import { LogementPresenter } from '@/domaines/logement/ports/logement.presenter';
import { LogementRepository } from '@/domaines/logement/ports/logement.repository';
import { Coordonnees } from '@/shell/coordonneesType';

export interface Logement {
  codePostal: string;
  codeEpci: string;
  commune_utilisee_dans_le_compte: string;
  commune_label: string;
  code: string;
  adultes: number;
  enfants: number;
  residence: LogementApiModel['type'];
  proprietaire: boolean;
  superficie: LogementApiModel['superficie'];
  plusDeQuinzeAns: boolean;
  dpe: LogementApiModel['dpe'];
  coordonnees: Coordonnees;
  numeroRue: string;
  rue: string;
}

export class RecupererInformationLogementUseCase {
  constructor(private logementRepository: LogementRepository) {}

  async execute(idUtilisateur: string, presenter: LogementPresenter) {
    const reponse = await this.logementRepository.recupererInformation(idUtilisateur);
    presenter.presente(reponse);
  }
}
