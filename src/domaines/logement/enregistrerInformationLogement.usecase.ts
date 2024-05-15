import { LogementRepository } from '@/domaines/logement/ports/logement.repository';
import { Logement } from '@/domaines/logement/recupererInformationLogement.usecase';

export class EnregistrerInformationsLogementUsecase {
  constructor(private readonly logementRepository: LogementRepository) {}

  async execute(idUtilsateur: string, logement: Logement) {
    await this.logementRepository.enregistrerLesInformations(idUtilsateur, logement);
  }
}
