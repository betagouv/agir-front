import { LogementRepository } from '@/domaines/logement/ports/logement.repository';
import { Logement } from '@/domaines/logement/recupererInformationLogement.usecase';
import { AppRawDataStorage } from '@/shell/appRawDataStorage';

export class EnregistrerInformationsLogementUsecase {
  constructor(
    private readonly logementRepository: LogementRepository,
    private readonly appRawDataStorage: AppRawDataStorage,
  ) {}

  async execute(idUtilsateur: string, logement: Logement) {
    await this.logementRepository.enregistrerLesInformations(idUtilsateur, logement);
    this.appRawDataStorage.clearAllItems();
  }
}
