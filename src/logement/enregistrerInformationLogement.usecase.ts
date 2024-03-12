import { LogementRepository } from '@/logement/ports/logement.repository';
import { Logement } from '@/logement/recupererInformationLogement.usecase';
import { SessionRepository } from '@/authentification/authentifierUtilisateur.usecase';

export class EnregistrerInformationsLogementUsecase {
  constructor(
    private readonly logementRepository: LogementRepository,
    private readonly sessionRepository: SessionRepository,
  ) {}

  async execute(idUtilsateur: string, logement: Logement) {
    await this.logementRepository.enregistrerLesInformations(idUtilsateur, logement);
    this.sessionRepository.sauvegarderUtilisateur({
      codePostal: logement.codePostal,
      commune: logement.commune,
    });
  }
}
