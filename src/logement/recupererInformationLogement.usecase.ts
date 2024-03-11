import { LogementRepository } from '@/logement/ports/logement.repository';
import { LogementPresenter } from '@/logement/ports/logement.presenter';
import { LogementApiModel } from '@/logement/adapters/logement.repository.axios';

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
