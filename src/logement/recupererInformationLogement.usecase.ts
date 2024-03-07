import { LogementRepository } from '@/logement/ports/logement.repository';
import { LogementPresenter } from '@/logement/ports/logement.presenter';

export interface Logement {
  codePostal: string;
  commune: string;
  adultes: number;
  enfants: number;
  residence: string;
  proprietaire: string;
  superficie: string;
  modeDeChauffage: string;
  plusDeQuinzeAns: string;
  dpe: string;
}

export class RecupererInformationLogementUseCase {
  constructor(private logementRepository: LogementRepository) {}

  async execute(idUtilisateur: string, presenter: LogementPresenter) {
    const reponse = await this.logementRepository.recupererInformation(idUtilisateur);
    presenter.presente(reponse);
  }
}
