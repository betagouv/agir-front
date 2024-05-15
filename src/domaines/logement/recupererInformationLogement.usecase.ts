import { LogementApiModel } from '@/domaines/logement/adapters/logement.repository.axios';
import { LogementPresenter } from '@/domaines/logement/ports/logement.presenter';
import { LogementRepository } from '@/domaines/logement/ports/logement.repository';

export interface Logement {
  codePostal: string;
  commune: string;
  adultes: number;
  enfants: number;
  residence: LogementApiModel['type'];
  proprietaire: boolean;
  superficie: LogementApiModel['superficie'];
  modeDeChauffage: LogementApiModel['chauffage'];
  plusDeQuinzeAns: boolean;
  dpe: LogementApiModel['dpe'];
}

export class RecupererInformationLogementUseCase {
  constructor(private logementRepository: LogementRepository) {}

  async execute(idUtilisateur: string, presenter: LogementPresenter) {
    const reponse = await this.logementRepository.recupererInformation(idUtilisateur);
    presenter.presente(reponse);
  }
}
